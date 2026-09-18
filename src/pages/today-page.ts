import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store, scheduleLabel } from '../data/store';
import { completedOnDate, estimatedMinutes, lastCompletedWorkout, lastExerciseSets } from '../services/progress-calculator';
import { formatShortDate, inRange, todayISO, weekdayKey } from '../utils/dates';
import { navigate } from '../router';
import type { AppState, DailyAdherence, OnPlan, ScheduledDay, WeeklyPlan } from '../models/types';
import { uid } from '../utils/numbers';
import '../components/stepper-input';

@customElement('today-page')
export class TodayPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .hero-title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin-bottom: 6px;
      }
      .meta {
        font-size: 15px;
        color: var(--text-secondary);
      }
      .choices {
        display: flex;
        gap: 8px;
      }
    `,
  ];

  private toggle(date: string, key: keyof DailyAdherence): void {
    const current = store.get().adherence[date];
    const value = !current?.[key];
    store.upsertAdherence(date, { [key]: value });
  }

  private startWorkout(plan: WeeklyPlan, day: ScheduledDay): void {
    if (!day.workoutId) return;
    const workout = plan.workouts.find((w) => w.id === day.workoutId);
    if (!workout) return;
    const existing = store.get().activeWorkout;
    if (existing && !existing.completedAt) {
      navigate('workout');
      return;
    }
    store.setActiveWorkout({
      id: uid('session'),
      workoutId: workout.id,
      name: workout.name,
      date: todayISO(),
      startedAt: new Date().toISOString(),
      exercises: workout.exercises.map((exercise) => {
        const last = lastExerciseSets(store.get(), exercise.id);
        return {
          plannedExerciseId: exercise.id,
          performedExerciseId: exercise.id,
          name: exercise.name,
          status: 'pending' as const,
          sets: Array.from({ length: exercise.sets }, (_, i) => ({
            weightKg: last?.[i]?.weightKg ?? exercise.targetWeightKg,
            reps: last?.[i]?.reps ?? exercise.repRange.max,
            done: false,
          })),
        };
      }),
      currentExerciseIndex: 0,
    });
    navigate('workout');
  }

  private mainCard(state: AppState) {
    const date = todayISO();
    const plan = state.activePlan;
    const active = state.activeWorkout;

    if (!plan) {
      return html`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">No active plan</h2>
          <p class="body">Import your weekly plan to get started.</p>
          <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('settings')}>
            Import plan
          </button>
        </div>
      `;
    }

    if (active && !active.completedAt) {
      return html`
        <div class="card raised">
          <p class="kicker">Workout in progress</p>
          <h2 class="hero-title">${active.name}</h2>
          <p class="meta">Pick up where you left off.</p>
          <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('workout')}>
            Resume
          </button>
        </div>
      `;
    }

    if (!inRange(date, plan.week.startDate, plan.week.endDate)) {
      const review = state.reviews.find((r) => r.startDate === plan.week.startDate);
      if (date > plan.week.endDate) {
        return html`
          <div class="card">
            <p class="kicker">Week ${plan.week.number}</p>
            <h2 class="hero-title">${review?.exportedAt ? 'Review exported ✓' : 'Week complete ✓'}</h2>
            <p class="body">${state.pendingPlan ? "Next week's plan is ready." : "Waiting for next week's plan."}</p>
            <button
              class="btn primary block"
              style="margin-top:16px"
              @click=${() => navigate(state.pendingPlan ? 'import' : 'settings')}
            >
              ${state.pendingPlan ? 'Start week' : 'Import next week'}
            </button>
          </div>
        `;
      }
      return html`
        <div class="card">
          <p class="kicker">Upcoming</p>
          <h2 class="hero-title">Week ${plan.week.number} starts soon</h2>
          <p class="body">${formatShortDate(plan.week.startDate)}</p>
        </div>
      `;
    }

    const day = plan.schedule.find((d) => d.day === weekdayKey(date));
    if (!day) {
      return html`
        <div class="card">
          <h2 class="hero-title">Nothing planned</h2>
          <p class="body">No session on the current plan for today.</p>
        </div>
      `;
    }

    const done = completedOnDate(state, date, day.workoutId ?? day.type);
    const review = state.reviews.find((r) => r.startDate === plan.week.startDate);

    if (day.type === 'weekly_review') {
      if (review) {
        return html`
          <div class="card">
            <p class="kicker">Sunday</p>
            <h2 class="hero-title">Week complete ✓</h2>
            <p class="body">
              ${state.pendingPlan ? "Next week's plan is ready." : 'Waiting for next week’s plan.'}
            </p>
            <button
              class="btn primary block"
              style="margin-top:16px"
              @click=${() => navigate(state.pendingPlan ? 'import' : 'settings')}
            >
              ${state.pendingPlan ? 'Start week' : 'Import next week'}
            </button>
          </div>
        `;
      }
      return html`
        <div class="card raised">
          <p class="kicker">Sunday Review</p>
          <h2 class="hero-title">Your weekly review is ready.</h2>
          <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('review')}>
            Complete weekly review
          </button>
        </div>
      `;
    }

    if (day.type === 'swimming') {
      if (done) {
        return html`
          <div class="card">
            <p class="kicker">Today</p>
            <h2 class="hero-title">Swimming complete ✓</h2>
            <p class="body">Nice. Recovery is the next useful thing.</p>
          </div>
        `;
      }
      return html`
        <div class="card raised">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Swimming</h2>
          <button
            class="btn primary block"
            style="margin-top:16px"
            @click=${() => store.markDayComplete(date, 'swimming', 'Swimming', 'swimming')}
          >
            Mark swimming complete
          </button>
        </div>
      `;
    }

    if (day.type === 'delivery_recovery') {
      return html`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Recovery Day</h2>
          <p class="body">No gym today.</p>
          <p class="meta" style="margin-top:8px">Delivery shift / recovery</p>
        </div>
      `;
    }

    const workout = plan.workouts.find((w) => w.id === day.workoutId);
    if (done) {
      const next = nextDayLabel(plan, day);
      return html`
        <div class="card">
          <p class="kicker">Today</p>
          <h2 class="hero-title">Workout complete ✓</h2>
          <p class="body">${done.durationMinutes ? `${done.durationMinutes} min` : workout?.name}</p>
          ${next ? html`<p class="meta" style="margin-top:10px">Next: ${next}</p>` : null}
        </div>
      `;
    }

    const last = workout ? lastCompletedWorkout(state, workout.id) : undefined;
    return html`
      <div class="card raised">
        <p class="kicker">Gym day</p>
        <h2 class="hero-title">${workout?.name ?? 'Workout'}</h2>
        <p class="meta">${workout?.exercises.length ?? 0} exercises</p>
        <p class="meta">Approx. ${workout ? estimatedMinutes(workout.exercises) : 55} min</p>
        <button class="btn primary block" style="margin-top:16px" @click=${() => this.startWorkout(plan, day)}>
          Start workout
        </button>
        ${last
          ? html`<p class="meta" style="margin-top:12px">Last ${workout?.name}: ${formatShortDate(last.date)}</p>`
          : null}
      </div>
    `;
  }

  render() {
    const state = store.get();
    const date = todayISO();
    const log = state.adherence[date] ?? { date };

    return html`
      <section class="page">
        ${this.mainCard(state)}

        <div class="card">
          <p class="kicker">Today</p>
          ${habitRow('Protein target', Boolean(log.proteinTarget), () => this.toggle(date, 'proteinTarget'))}
          ${habitRow('Creatine', Boolean(log.creatine), () => this.toggle(date, 'creatine'))}
          ${habitRow('Night shake', Boolean(log.shake), () => this.toggle(date, 'shake'))}
          ${habitRow('Water target', Boolean(log.waterTarget), () => this.toggle(date, 'waterTarget'))}
          <div class="row" style="min-height:52px">
            <span>Sleep</span>
            ${log.sleepHours == null
              ? html`<button class="btn ghost" @click=${() => store.upsertAdherence(date, { sleepHours: 7.5 })}>
                  Add sleep
                </button>`
              : html`<stepper-input
                  .value=${log.sleepHours}
                  .step=${0.5}
                  .min=${0}
                  .max=${14}
                  suffix="h"
                  @change=${(e: CustomEvent<number>) => store.upsertAdherence(date, { sleepHours: e.detail })}
                ></stepper-input>`}
          </div>
        </div>

        <div class="card stack">
          <p class="kicker">Meals</p>
          ${habitRow('Breakfast', Boolean(log.breakfast), () => this.toggle(date, 'breakfast'))}
          ${habitRow('Lunch', Boolean(log.lunch), () => this.toggle(date, 'lunch'))}
          ${habitRow('Dinner', Boolean(log.dinner), () => this.toggle(date, 'dinner'))}
          <p class="body">On plan today?</p>
          <div class="choices">
            ${onPlanButton('yes', 'Yes', log.onPlan)}
            ${onPlanButton('mostly', 'Mostly', log.onPlan)}
            ${onPlanButton('no', 'No', log.onPlan)}
          </div>
          <div class="field">
            <label>Anything unusual?</label>
            <input
              placeholder="Had pizza Saturday night."
              .value=${log.note ?? ''}
              @change=${(e: Event) =>
                store.upsertAdherence(date, { note: (e.target as HTMLInputElement).value })}
            />
          </div>
        </div>
      </section>
    `;
  }
}

function habitRow(label: string, on: boolean, onClick: () => void) {
  return html`
    <button class="habit" @click=${onClick}>
      <span>${label}</span>
      <span class="check ${on ? 'on' : ''}">${on ? '✓' : ''}</span>
    </button>
  `;
}

function onPlanButton(value: OnPlan, label: string, current?: OnPlan) {
  return html`
    <button class="choice ${current === value ? 'on' : ''}" @click=${() => store.upsertAdherence(todayISO(), { onPlan: value })}>
      ${label}
    </button>
  `;
}

function nextDayLabel(plan: WeeklyPlan, day: ScheduledDay): string | undefined {
  const idx = plan.schedule.findIndex((d) => d.day === day.day);
  const next = plan.schedule[idx + 1];
  return next ? scheduleLabel(next, plan) : undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'today-page': TodayPage;
  }
}
