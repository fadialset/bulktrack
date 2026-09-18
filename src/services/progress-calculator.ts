import type {
  AppState,
  DailyAdherence,
  ExerciseDefinition,
  WeeklyMeasurement,
  WeeklyPlan,
  WorkoutSession,
} from '../models/types';
import { inRange, parseISODate, todayISO } from '../utils/dates';
import { average } from '../utils/numbers';

export interface StrengthCard {
  exerciseId: string;
  name: string;
  fromKg: number;
  toKg: number;
}

export interface WeekStats {
  plannedSessions: number;
  completedSessions: number;
  completedWorkouts: WorkoutSession[];
  adherence: {
    foodDaysOnPlan: number;
    proteinTargetDays: number;
    creatineDays: number;
    shakeDays: number;
    waterTargetDays: number;
  };
  averageSleep: number | null;
  changeSinceLastWeek: {
    weightKg: number;
    waistCm: number;
    armCm: number;
  };
}

export function completedOnDate(state: AppState, date: string, workoutId?: string): WorkoutSession | undefined {
  return state.sessions.find(
    (s) => s.date === date && s.completedAt && (!workoutId || s.workoutId === workoutId),
  );
}

export function lastCompletedWorkout(state: AppState, workoutId: string): WorkoutSession | undefined {
  return state.sessions.find((s) => s.workoutId === workoutId && s.completedAt);
}

export function lastExerciseSets(state: AppState, exerciseId: string): { weightKg: number; reps: number }[] | undefined {
  for (const session of state.sessions) {
    if (!session.completedAt) continue;
    const match = session.exercises.find(
      (e) =>
        e.status !== 'skipped' &&
        (e.performedExerciseId === exerciseId || e.plannedExerciseId === exerciseId || (e as { exerciseId?: string }).exerciseId === exerciseId),
    );
    const done = match?.sets.filter((s) => s.done && s.reps > 0) ?? [];
    if (done.length) return done.map((s) => ({ weightKg: s.weightKg, reps: s.reps }));
  }
  return undefined;
}

export function sortedMeasurements(state: AppState): WeeklyMeasurement[] {
  return [...state.measurements].sort((a, b) => a.date.localeCompare(b.date));
}

export function measurementsInRange(state: AppState, range: '1m' | '3m' | 'all'): WeeklyMeasurement[] {
  const all = sortedMeasurements(state);
  if (range === 'all' || !all.length) return all;
  const latest = parseISODate(all[all.length - 1]?.date ?? todayISO());
  const months = range === '1m' ? 1 : 3;
  const from = new Date(latest);
  from.setMonth(from.getMonth() - months);
  const fromISO = from.toISOString().slice(0, 10);
  return all.filter((m) => m.date >= fromISO);
}

export function totalWeightChange(state: AppState): { start?: number; current?: number; delta?: number } {
  const all = sortedMeasurements(state);
  const start = all[0]?.weightKg;
  const current = all[all.length - 1]?.weightKg;
  if (start == null || current == null) return {};
  return { start, current, delta: round1(current - start) };
}

export function averageWeeklyChange(state: AppState): number | null {
  const all = sortedMeasurements(state);
  if (all.length < 2) return null;
  const first = parseISODate(all[0]?.date ?? '');
  const last = parseISODate(all[all.length - 1]?.date ?? '');
  const weeks = Math.max(1, (last.getTime() - first.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const start = all[0]?.weightKg ?? 0;
  const current = all[all.length - 1]?.weightKg ?? 0;
  return round1((current - start) / weeks);
}

export function monthlyMeasurements(state: AppState): WeeklyMeasurement[] {
  return sortedMeasurements(state).filter(
    (m) =>
      m.waistCm != null ||
      m.armCm != null ||
      m.chestCm != null ||
      m.shouldersCm != null ||
      m.forearmCm != null ||
      m.thighCm != null,
  );
}

export function measurementDelta(
  all: WeeklyMeasurement[],
  key: 'weightKg' | 'waistCm' | 'armCm',
): { from?: number; to?: number; delta?: number } {
  const values = all
    .map((m) => m[key])
    .filter((v): v is number => typeof v === 'number');
  const from = values[0];
  const to = values[values.length - 1];
  if (from == null || to == null) return {};
  return { from, to, delta: round1(to - from) };
}

export function strengthProgress(state: AppState): StrengthCard[] {
  const map = new Map<string, { name: string; first: number; last: number }>();
  const chronological = [...state.sessions].filter((s) => s.completedAt).reverse();
  for (const session of chronological) {
    for (const exercise of session.exercises) {
      const done = exercise.sets.filter((s) => s.done && s.weightKg > 0);
      if (!done.length || exercise.status === 'skipped') continue;
      const id = exercise.performedExerciseId ?? exercise.plannedExerciseId;
      const top = Math.max(...done.map((s) => s.weightKg));
      const existing = map.get(id);
      if (!existing) map.set(id, { name: exercise.name, first: top, last: top });
      else existing.last = top;
    }
  }
  return [...map.entries()]
    .map(([exerciseId, v]) => ({
      exerciseId,
      name: v.name,
      fromKg: v.first,
      toKg: v.last,
    }))
    .sort((a, b) => Math.abs(b.toKg - b.fromKg) - Math.abs(a.toKg - a.fromKg));
}

export function planChanges(previous: WeeklyPlan | null, next: WeeklyPlan): Array<{ name: string; from?: number; to?: number }> {
  const prevWeights = new Map<string, { name: string; kg: number }>();
  for (const workout of previous?.workouts ?? []) {
    for (const exercise of workout.exercises) {
      prevWeights.set(exercise.id, { name: exercise.name, kg: exercise.targetWeightKg });
    }
  }
  const seen = new Set<string>();
  const changes: Array<{ name: string; from?: number; to?: number }> = [];
  for (const workout of next.workouts) {
    for (const exercise of workout.exercises) {
      if (seen.has(exercise.id)) continue;
      seen.add(exercise.id);
      const prev = prevWeights.get(exercise.id);
      changes.push({ name: exercise.name, from: prev?.kg, to: exercise.targetWeightKg });
    }
  }
  return changes;
}

export function weekStats(state: AppState, startDate: string, endDate: string): WeekStats {
  const plan = state.activePlan;
  const plannedSessions = plan?.schedule.filter((d) => d.type === 'gym').length ?? 0;
  const completedWorkouts = state.sessions
    .filter((s) => s.completedAt && inRange(s.date, startDate, endDate) && s.workoutId !== 'swimming')
    .sort((a, b) => a.date.localeCompare(b.date));
  const dates = Object.keys(state.adherence)
    .filter((d) => inRange(d, startDate, endDate))
    .sort();
  const logs: DailyAdherence[] = dates.map((d) => state.adherence[d]).filter((v): v is DailyAdherence => Boolean(v));

  const previous = sortedMeasurements(state)
    .filter((m) => m.date < startDate)
    .at(-1);
  const current = sortedMeasurements(state).filter((m) => inRange(m.date, startDate, endDate)).at(-1);
  const monthly = monthlyMeasurements(state).filter((m) => m.date <= endDate);
  const currentMonthly = monthly.at(-1);
  const previousMonthly = monthly.filter((m) => m.date < startDate).at(-1);

  return {
    plannedSessions,
    completedSessions: completedWorkouts.length,
    completedWorkouts,
    adherence: {
      foodDaysOnPlan: logs.filter((l) => l.onPlan === 'yes' || l.onPlan === 'mostly').length,
      proteinTargetDays: logs.filter((l) => l.proteinTarget).length,
      creatineDays: logs.filter((l) => l.creatine).length,
      shakeDays: logs.filter((l) => l.shake).length,
      waterTargetDays: logs.filter((l) => l.waterTarget).length,
    },
    averageSleep: round1Nullable(average(logs.map((l) => l.sleepHours).filter((v): v is number => v != null))),
    changeSinceLastWeek: {
      weightKg: round1((current?.weightKg ?? 0) - (previous?.weightKg ?? current?.weightKg ?? 0)),
      waistCm: round1((currentMonthly?.waistCm ?? 0) - (previousMonthly?.waistCm ?? currentMonthly?.waistCm ?? 0)),
      armCm: round1((currentMonthly?.armCm ?? 0) - (previousMonthly?.armCm ?? currentMonthly?.armCm ?? 0)),
    },
  };
}

export function estimatedMinutes(exercises: ExerciseDefinition[]): number {
  const totalSeconds = exercises.reduce((sum, exercise) => {
    const rest = exercise.restSeconds ?? 90;
    return sum + exercise.sets * (rest + 40);
  }, 0);
  return Math.max(20, Math.round(totalSeconds / 60));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function round1Nullable(n: number | null): number | null {
  return n == null ? null : round1(n);
}
