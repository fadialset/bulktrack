import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { lastExerciseSets } from '../services/progress-calculator';
import { definitionFromAlternative, enrichExercise } from '../data/exercises';
import { formatTimer } from '../utils/dates';
import { navigate } from '../router';
import type {
  ExerciseAlternative,
  ExerciseDefinition,
  ExercisePerformance,
  WorkoutFeeling,
  WorkoutSession,
} from '../models/types';
import '../components/stepper-input';
import '../components/machine-image';

@customElement('workout-page')
export class WorkoutPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .top {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 8px;
        padding-top: calc(12px + env(safe-area-inset-top, 0px));
      }
      .progress {
        height: 6px;
        border-radius: 99px;
        background: var(--surface-raised);
        overflow: hidden;
      }
      .progress > span {
        display: block;
        height: 100%;
        background: var(--accent);
      }
      .set-row {
        display: grid;
        gap: 8px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
      .set-top,
      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .controls {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .head {
        font-size: 12px;
        color: var(--text-secondary);
      }
      .timer {
        position: sticky;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px;
        border-radius: 16px;
        background: var(--surface-raised);
        border: 1px solid var(--border);
      }
      .time {
        font-size: 28px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .sheet-bg {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: flex-end;
        z-index: 20;
      }
      .sheet {
        width: 100%;
        max-width: var(--max-width);
        margin: 0 auto;
        max-height: 86vh;
        overflow: auto;
        background: var(--surface);
        border-radius: 24px 24px 0 0;
        padding: 20px 20px calc(20px + env(safe-area-inset-bottom, 0px));
      }
      .sheet machine-image {
        border-radius: 16px;
        margin-bottom: 14px;
      }
      .feel,
      .alt-card {
        display: grid;
        gap: 8px;
      }
      .info-btn {
        min-height: 44px;
        justify-content: flex-start;
        gap: 8px;
      }
    `,
  ];

  @state() private sheet: 'info' | 'unavailable' | 'alts' | null = null;
  @state() private finishing = false;
  @state() private restUntil: number | null = null;
  @state() private now = Date.now();
  @state() private notes = '';
  private timer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = Date.now()), 250);
  }

  disconnectedCallback(): void {
    if (this.timer) window.clearInterval(this.timer);
    super.disconnectedCallback();
  }

  private session(): WorkoutSession | null {
    return store.get().activeWorkout;
  }

  private plannedDef(session: WorkoutSession): ExerciseDefinition | undefined {
    const workout = store.get().activePlan?.workouts.find((w) => w.id === session.workoutId);
    const logged = session.exercises[session.currentExerciseIndex];
    const raw =
      workout?.exercises.find((e) => e.id === logged?.plannedExerciseId) ??
      workout?.exercises[session.currentExerciseIndex];
    return raw ? enrichExercise(raw) : undefined;
  }

  private currentDef(session: WorkoutSession): ExerciseDefinition | undefined {
    const planned = this.plannedDef(session);
    const logged = session.exercises[session.currentExerciseIndex];
    if (!planned || !logged) return planned;
    if (logged.performedExerciseId && logged.performedExerciseId !== planned.id) {
      const alt = planned.alternatives?.find((a) => a.exerciseId === logged.performedExerciseId);
      if (alt) return definitionFromAlternative(planned, alt);
    }
    return planned;
  }

  private persist(session: WorkoutSession): void {
    store.saveActiveWorkout({ ...session, exercises: session.exercises.map((e) => ({ ...e, sets: [...e.sets] })) });
  }

  private completeSet(session: WorkoutSession, exerciseIndex: number, setIndex: number): void {
    const exercise = session.exercises[exerciseIndex];
    const set = exercise?.sets[setIndex];
    if (!exercise || !set || exercise.status === 'skipped') return;
    set.done = !set.done;
    if (exercise.sets.some((s) => s.done)) exercise.status = 'completed';
    this.persist(session);
    if (set.done) {
      const rest = this.currentDef(session)?.restSeconds ?? 90;
      const lastExercise = exerciseIndex === session.exercises.length - 1;
      const lastSet = setIndex === exercise.sets.length - 1;
      if (!(lastExercise && lastSet)) this.restUntil = Date.now() + rest * 1000;
    }
  }

  private next(session: WorkoutSession): void {
    this.sheet = null;
    if (session.currentExerciseIndex >= session.exercises.length - 1) {
      this.finishing = true;
      this.restUntil = null;
      return;
    }
    session.currentExerciseIndex += 1;
    this.persist(session);
  }

  private prev(session: WorkoutSession): void {
    session.currentExerciseIndex = Math.max(0, session.currentExerciseIndex - 1);
    this.persist(session);
    this.finishing = false;
    this.sheet = null;
  }

  private skip(session: WorkoutSession, logged: ExercisePerformance): void {
    logged.status = 'skipped';
    logged.skipReason = 'machine_unavailable';
    logged.sets = [];
    this.persist(session);
    this.sheet = null;
    this.next(session);
  }

  private useAlternative(session: WorkoutSession, logged: ExercisePerformance, alt: ExerciseAlternative): void {
    const planned = this.plannedDef(session);
    if (!planned) return;
    const def = definitionFromAlternative(planned, alt);
    const last = lastExerciseSets(store.get(), def.id);
    logged.performedExerciseId = def.id;
    logged.name = def.name;
    logged.status = 'pending';
    logged.substitutionReason = 'machine_unavailable';
    logged.skipReason = undefined;
    logged.sets = Array.from({ length: def.sets }, (_, i) => ({
      weightKg: last?.[i]?.weightKg ?? def.targetWeightKg,
      reps: last?.[i]?.reps ?? def.repRange.max,
      done: false,
    }));
    this.persist(session);
    this.sheet = null;
  }

  private finish(session: WorkoutSession, feeling: WorkoutFeeling): void {
    const completed: WorkoutSession = {
      ...session,
      completedAt: new Date().toISOString(),
      durationMinutes: Math.max(
        1,
        Math.round((Date.now() - new Date(session.startedAt).getTime()) / 60000),
      ),
      feeling,
      notes: this.notes.trim() || undefined,
      exercises: session.exercises.map((exercise) => ({
        ...exercise,
        status: exercise.status === 'skipped' ? 'skipped' : 'completed',
      })),
    };
    store.completeWorkout(completed);
    navigate('today');
  }

  private finishScreen(session: WorkoutSession) {
    const sets = session.exercises.reduce((sum, e) => sum + e.sets.filter((s) => s.done).length, 0);
    const skipped = session.exercises.filter((e) => e.status === 'skipped').length;
    const minutes = Math.max(1, Math.round((Date.now() - new Date(session.startedAt).getTime()) / 60000));
    return html`
      <section class="page">
        <div class="card">
          <p class="kicker">Done</p>
          <h1 class="title">Workout complete</h1>
          <p class="body" style="margin-top:8px">Great work.</p>
          <p class="meta" style="margin-top:16px">${session.exercises.length - skipped} exercises</p>
          <p class="body">${sets} sets</p>
          ${skipped ? html`<p class="body">${skipped} skipped</p>` : null}
          <p class="body">${minutes} minutes</p>
        </div>
        <div class="card stack">
          <p>How did today's workout feel?</p>
          <div class="feel">
            <button class="btn secondary block" @click=${() => this.finish(session, 'too_easy')}>Too easy</button>
            <button class="btn primary block" @click=${() => this.finish(session, 'good')}>Good</button>
            <button class="btn secondary block" @click=${() => this.finish(session, 'too_hard')}>Too hard</button>
          </div>
          <div class="field">
            <label>Anything I should know?</label>
            <textarea
              placeholder="Shoulder felt uncomfortable, machine unavailable, felt tired, etc."
              .value=${this.notes}
              @input=${(e: Event) => (this.notes = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>
        </div>
      </section>
    `;
  }

  private infoSheet(def: ExerciseDefinition) {
    return html`
      <div class="sheet-bg" @click=${() => (this.sheet = null)}>
        <div class="sheet" @click=${(e: Event) => e.stopPropagation()}>
          ${def.machineImage
            ? html`<machine-image src=${def.machineImage} alt=${def.machine ?? def.name}></machine-image>`
            : null}
          <h2 class="title">${def.name}</h2>
          ${def.machine ? html`<p class="body" style="margin:8px 0 12px">${def.machine}</p>` : null}
          ${def.setup?.length
            ? html`<p class="kicker">Setup</p>
                ${def.setup.map((s) => html`<p class="body">• ${s}</p>`)}`
            : null}
          ${def.execution?.length
            ? html`<p class="kicker" style="margin-top:12px">Execution</p>
                ${def.execution.map((s, i) => html`<p class="body">${i + 1}. ${s}</p>`)}`
            : null}
          ${def.commonMistake
            ? html`<p class="kicker" style="margin-top:12px">Common mistake</p>
                <p class="body">${def.commonMistake}</p>`
            : null}
          <button class="btn primary block" style="margin-top:16px" @click=${() => (this.sheet = null)}>Close</button>
        </div>
      </div>
    `;
  }

  private unavailableSheet(session: WorkoutSession, logged: ExercisePerformance, planned: ExerciseDefinition) {
    return html`
      <div class="sheet-bg" @click=${() => (this.sheet = null)}>
        <div class="sheet" @click=${(e: Event) => e.stopPropagation()}>
          <h2 class="title">Machine unavailable</h2>
          <p class="body" style="margin:8px 0 16px">Use an alternative exercise or skip this exercise today.</p>
          ${planned.alternatives?.length
            ? html`<button class="btn primary block" @click=${() => (this.sheet = 'alts')}>Use alternative</button>`
            : html`<p class="body">No alternative in this week's plan.</p>`}
          <button class="btn secondary block" @click=${() => this.skip(session, logged)}>Skip today</button>
          <button class="btn ghost block" @click=${() => (this.sheet = null)}>Cancel</button>
        </div>
      </div>
    `;
  }

  private altsSheet(session: WorkoutSession, logged: ExercisePerformance, planned: ExerciseDefinition) {
    return html`
      <div class="sheet-bg" @click=${() => (this.sheet = null)}>
        <div class="sheet" @click=${(e: Event) => e.stopPropagation()}>
          <h2 class="title">${planned.name} unavailable</h2>
          <p class="body" style="margin:8px 0 16px">Alternative</p>
          ${(planned.alternatives ?? []).map((alt) => {
            const def = definitionFromAlternative(planned, alt);
            return html`
              <div class="card alt-card">
                <strong>${def.name}</strong>
                ${def.machine ? html`<p class="body">${def.machine}</p>` : null}
                <p class="body">${def.sets} × ${def.repRange.min}–${def.repRange.max}</p>
                <p class="metric">${def.targetWeightKg} kg</p>
                <button class="btn primary block" @click=${() => this.useAlternative(session, logged, alt)}>
                  Use this
                </button>
              </div>
            `;
          })}
          <button class="btn ghost block" @click=${() => (this.sheet = 'unavailable')}>Cancel</button>
        </div>
      </div>
    `;
  }

  render() {
    const session = this.session();
    if (!session) {
      return html`
        <section class="page">
          <div class="card">
            <h1 class="title">No workout in progress</h1>
            <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('today')}>
              Back to Today
            </button>
          </div>
        </section>
      `;
    }

    if (this.finishing) return this.finishScreen(session);

    const index = session.currentExerciseIndex;
    const logged = session.exercises[index];
    const planned = this.plannedDef(session);
    const def = this.currentDef(session);
    const last = lastExerciseSets(store.get(), logged?.performedExerciseId ?? logged?.plannedExerciseId ?? '');
    const remaining = this.restUntil ? (this.restUntil - this.now) / 1000 : 0;
    const pct = ((index + 1) / session.exercises.length) * 100;
    const anyDone = Boolean(logged?.sets.some((s) => s.done));
    const showWarmup = Boolean(def?.warmup?.enabled && def.warmup.instruction && !anyDone);
    const step = def?.weightStepKg ?? 2.5;

    return html`
      <section class="page">
        <div class="top">
          <div class="row">
            <p class="kicker">${session.name}</p>
            <button class="btn ghost" @click=${() => navigate('today')}>Close</button>
          </div>
          <h1 class="title">${logged?.name ?? 'Exercise'}</h1>
          <p class="body">Exercise ${index + 1} of ${session.exercises.length}</p>
          <div class="progress"><span style="width:${pct}%"></span></div>
        </div>

        <div class="card stack">
          <p class="kicker">Last session</p>
          ${last
            ? html`<p class="metric">${last[0]?.weightKg ?? '—'} kg</p>
                <p class="body">${last.map((s) => s.reps).join(' / ')} reps</p>`
            : html`<p class="body">First time logging this.</p>`}
        </div>

        <div class="card stack">
          <div class="row">
            <div>
              <p class="kicker">Today</p>
              <p class="body">
                Target: ${def?.targetWeightKg ?? logged?.sets[0]?.weightKg} kg · ${def?.repRange.min}–${def?.repRange.max} reps
              </p>
            </div>
          </div>
          ${showWarmup ? html`<p class="body">Warm-up · ${def?.warmup?.instruction}</p>` : null}
          <button class="btn ghost info-btn" @click=${() => (this.sheet = 'info')}>ⓘ How to do this</button>
          <div class="head">Sets</div>
          ${logged?.sets.map(
            (set, setIndex) => html`
              <div class="set-row">
                <div class="set-top">
                  <strong>Set ${setIndex + 1}</strong>
                  <button class="check ${set.done ? 'on' : ''}" @click=${() => this.completeSet(session, index, setIndex)}>
                    ${set.done ? '✓' : ''}
                  </button>
                </div>
                <div class="controls">
                  <stepper-input
                    .value=${set.weightKg}
                    .step=${step}
                    suffix="kg"
                    @change=${(e: CustomEvent<number>) => {
                      set.weightKg = e.detail;
                      this.persist(session);
                    }}
                  ></stepper-input>
                  <stepper-input
                    .value=${set.reps}
                    .step=${1}
                    suffix="reps"
                    @change=${(e: CustomEvent<number>) => {
                      set.reps = e.detail;
                      this.persist(session);
                    }}
                  ></stepper-input>
                </div>
              </div>
            `,
          )}
        </div>

        <button class="btn ghost block" @click=${() => (this.sheet = 'unavailable')}>Machine unavailable?</button>
        <button class="btn primary block" @click=${() => this.next(session)}>
          ${index >= session.exercises.length - 1 ? 'Finish workout' : 'Next exercise'}
        </button>
        ${index > 0 ? html`<button class="btn ghost block" @click=${() => this.prev(session)}>Previous</button>` : null}

        ${remaining > 0
          ? html`
              <div class="timer">
                <span class="time">${formatTimer(remaining)}</span>
                <button class="btn secondary" @click=${() => (this.restUntil = (this.restUntil ?? 0) + 30000)}>+30 sec</button>
                <button class="btn ghost" @click=${() => (this.restUntil = null)}>Skip</button>
              </div>
            `
          : null}

        ${this.sheet === 'info' && def ? this.infoSheet(def) : null}
        ${this.sheet === 'unavailable' && logged && planned ? this.unavailableSheet(session, logged, planned) : null}
        ${this.sheet === 'alts' && logged && planned ? this.altsSheet(session, logged, planned) : null}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workout-page': WorkoutPage;
  }
}
