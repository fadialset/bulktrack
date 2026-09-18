import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store, scheduleLabel } from '../data/store';
import { enrichExercise } from '../data/exercises';
import { formatRange } from '../utils/dates';
import { navigate } from '../router';
import type { ExerciseDefinition, WorkoutDefinition } from '../models/types';
import '../components/machine-image';

@customElement('plan-page')
export class PlanPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .day {
        width: 100%;
        min-height: 56px;
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 12px;
        align-items: center;
        padding: 10px 0;
        border: 0;
        border-bottom: 1px solid var(--border);
        background: transparent;
        color: inherit;
        text-align: left;
      }
      .day:last-child {
        border-bottom: 0;
      }
      .ex-card {
        padding: 0;
        overflow: hidden;
      }
      .ex-body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .ex-meta {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        margin-top: 10px;
      }
      .kg {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.03em;
      }
      machine-image {
        border-radius: 18px 18px 0 0;
      }
    `,
  ];

  @property() workoutId = '';

  render() {
    const state = store.get();
    const plan = state.activePlan;
    if (!plan) {
      return html`
        <section class="page">
          <div class="card">
            <h1 class="title">No active plan</h1>
            <p class="body" style="margin-top:8px">Import a weekly plan to see this week’s training.</p>
            <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('settings')}>
              Import plan
            </button>
          </div>
        </section>
      `;
    }

    const selected = plan.workouts.find((w) => w.id === this.workoutId);
    if (selected) return this.workoutDetail(selected);

    const t = plan.targets;
    return html`
      <section class="page">
        <div class="card">
          <p class="kicker">Week ${plan.week.number}</p>
          <h1 class="title">${formatRange(plan.week.startDate, plan.week.endDate)}</h1>
          <p class="body" style="margin-top:12px">Goal: Lean bulk</p>
          <p class="body">Target gain: +${t.weeklyWeightGainKg.min}–${t.weeklyWeightGainKg.max} kg/week</p>
          <p class="body">Protein: ${t.proteinGrams} g/day</p>
          ${t.calorieGuidance ? html`<p class="body">Calorie guidance: ~${t.calorieGuidance} kcal</p>` : null}
        </div>

        ${plan.coachNote
          ? html`
              <div class="card">
                <p class="kicker">Coach note</p>
                <p class="body">${plan.coachNote}</p>
              </div>
            `
          : null}

        <div class="card">
          <p class="kicker">Training</p>
          ${plan.schedule.map((day) => {
            const label = scheduleLabel(day, plan);
            const gym = day.type === 'gym';
            return html`
              <button class="day" ?disabled=${!gym} @click=${() => gym && navigate('plan', day.workoutId)}>
                <strong>${day.day.slice(0, 3).toUpperCase()}</strong>
                <span>${label}</span>
              </button>
            `;
          })}
        </div>

        ${t.mealGuidance?.length
          ? html`
              <div class="card stack">
                <p class="kicker">Meal guidance</p>
                ${t.mealGuidance.map((item) => html`<p class="body">• ${item}</p>`)}
              </div>
            `
          : null}
      </section>
    `;
  }

  private workoutDetail(workout: WorkoutDefinition) {
    return html`
      <section class="page">
        <button class="btn ghost" @click=${() => navigate('plan')}>← Plan</button>
        <div class="card">
          <h1 class="title">${workout.name}</h1>
          <p class="body">${workout.exercises.length} exercises</p>
        </div>
        ${workout.exercises.map((raw) => this.exerciseCard(enrichExercise(raw)))}
      </section>
    `;
  }

  private exerciseCard(exercise: ExerciseDefinition) {
    return html`
      <div class="card ex-card">
        ${exercise.machineImage
          ? html`<machine-image src=${exercise.machineImage} alt=${exercise.machine ?? exercise.name}></machine-image>`
          : null}
        <div class="ex-body">
          <strong>${exercise.name}</strong>
          ${exercise.machine ? html`<p class="body">${exercise.machine}</p>` : null}
          <div class="ex-meta">
            <span class="body">${exercise.sets} × ${exercise.repRange.min}–${exercise.repRange.max}</span>
            <span class="kg">${exercise.targetWeightKg} kg</span>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'plan-page': PlanPage;
  }
}
