import type { AppState, ExercisePerformance, WorkoutSession } from '../models/types';
import { emptyState } from '../models/types';
import { kvGet, kvSet } from './database';

const STATE_KEY = 'state';

export async function loadState(): Promise<AppState> {
  try {
    localStorage.removeItem('bulktrack:v1');
  } catch {
    /* ignore */
  }
  const saved = await kvGet<AppState>(STATE_KEY);
  if (!saved || saved.schemaVersion !== 2) return emptyState();
  return {
    ...emptyState(),
    ...saved,
    settings: saved.settings ?? { units: 'metric' },
    sessions: (saved.sessions ?? []).map(normalizeSession),
    adherence: saved.adherence ?? {},
    measurements: saved.measurements ?? [],
    reviews: saved.reviews ?? [],
    photos: saved.photos ?? [],
  };
}

function normalizeSession(session: WorkoutSession): WorkoutSession {
  return {
    ...session,
    exercises: (session.exercises ?? []).map(normalizeExercise),
  };
}

function normalizeExercise(exercise: ExercisePerformance & { exerciseId?: string }): ExercisePerformance {
  const planned = exercise.plannedExerciseId ?? exercise.exerciseId ?? '';
  return {
    plannedExerciseId: planned,
    performedExerciseId: exercise.performedExerciseId ?? planned,
    name: exercise.name,
    status: exercise.status ?? (exercise.sets?.some((s) => s.done) ? 'completed' : 'pending'),
    skipReason: exercise.skipReason,
    substitutionReason: exercise.substitutionReason,
    sets: exercise.sets ?? [],
  };
}

export async function saveState(state: AppState): Promise<void> {
  await kvSet(STATE_KEY, state);
}
