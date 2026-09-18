import type {
  AppState,
  ExercisePerformance,
  PhotoPose,
  WeeklyMeasurement,
  WeeklyReview,
  WeeklyReviewExport,
  WorkoutSession,
} from '../models/types';
import { monthKey } from '../utils/dates';
import { weekStats } from './progress-calculator';

export function buildWeeklyExport(state: AppState, review: WeeklyReview): WeeklyReviewExport {
  const stats = weekStats(state, review.startDate, review.endDate);
  const profile = state.profile;
  const plan = state.activePlan;
  const latestBody = latestMonthly(state.measurements, review.endDate);

  return {
    schemaVersion: 2,
    type: 'bulkTrackWeeklyReview',
    user: {
      heightCm: profile?.heightCm ?? 0,
      goal: profile?.goal ?? plan?.targets.goal ?? 'lean_bulk',
      targetWeightKg: profile?.targetWeightKg ?? plan?.targets.targetWeightKg ?? 0,
    },
    week: {
      number: review.weekNumber,
      startDate: review.startDate,
      endDate: review.endDate,
    },
    measurements: {
      weightKg: review.measurements.weightKg,
      waistCm: review.measurements.waistCm ?? latestBody?.waistCm,
      armCm: review.measurements.armCm ?? latestBody?.armCm,
    },
    changeSinceLastWeek: stats.changeSinceLastWeek,
    training: {
      plannedSessions: stats.plannedSessions,
      completedSessions: stats.completedSessions,
      sessions: stats.completedWorkouts.map((session) => serializeSession(session)),
    },
    adherence: stats.adherence,
    sleep: { averageHours: stats.averageSleep },
    monthlyProgress: monthlyProgress(state, review),
    weeklyFeeling: review.weeklyFeeling,
    userNotes: review.userNotes,
  };
}

function serializeSession(session: WorkoutSession) {
  return {
    date: session.date,
    workoutId: session.workoutId,
    durationMinutes: session.durationMinutes,
    feeling: session.feeling,
    exercises: session.exercises.map((exercise) => serializeExercise(exercise)),
    notes: session.notes ?? '',
  };
}

function serializeExercise(exercise: ExercisePerformance) {
  const planned = exercise.plannedExerciseId;
  const performed = exercise.performedExerciseId ?? planned;
  if (exercise.status === 'skipped') {
    return {
      plannedExerciseId: planned,
      status: 'skipped' as const,
      skipReason: exercise.skipReason ?? ('machine_unavailable' as const),
      name: exercise.name,
    };
  }
  return {
    plannedExerciseId: planned,
    performedExerciseId: performed,
    name: exercise.name,
    status: 'completed' as const,
    ...(planned !== performed
      ? { substitutionReason: exercise.substitutionReason ?? ('machine_unavailable' as const) }
      : {}),
    sets: exercise.sets
      .filter((set) => set.done && set.reps > 0)
      .map((set) => ({ weightKg: set.weightKg, reps: set.reps })),
  };
}

function monthlyProgress(state: AppState, review: WeeklyReview): WeeklyReviewExport['monthlyProgress'] {
  if (!review.monthlyRecorded) return { recorded: false };
  const month = monthKey(review.endDate);
  const photos = state.photos.filter((p) => p.month === month);
  const hasPose = (pose: PhotoPose) => photos.some((p) => p.pose === pose);
  return {
    recorded: true,
    measurements: {
      waistCm: review.measurements.waistCm,
      armCm: review.measurements.armCm,
      chestCm: review.measurements.chestCm,
      shouldersCm: review.measurements.shouldersCm,
      forearmCm: review.measurements.forearmCm,
      thighCm: review.measurements.thighCm,
    },
    photosRecorded: {
      front: hasPose('front'),
      side: hasPose('side'),
      back: hasPose('back'),
    },
  };
}

function latestMonthly(all: WeeklyMeasurement[], before: string): WeeklyMeasurement | undefined {
  return [...all]
    .filter((m) => m.date <= before && isMonthlyMeasurement(m))
    .sort((a, b) => a.date.localeCompare(b.date))
    .at(-1);
}

export function isMonthlyMeasurement(m: WeeklyMeasurement): boolean {
  return [m.waistCm, m.armCm, m.chestCm, m.shouldersCm, m.forearmCm, m.thighCm].some((v) => v != null);
}

export function exportFilename(weekNumber: number): string {
  return `bulkTrack-week-${weekNumber}-review.json`;
}
