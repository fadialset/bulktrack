import type {
  AppState,
  DailyAdherence,
  DayType,
  PhotoPose,
  ScheduledDay,
  UserProfile,
  WeeklyMeasurement,
  WeeklyPlan,
  WeeklyReview,
  WorkoutSession,
} from '../models/types';
import { emptyState } from '../models/types';
import { loadState, saveState } from './repository';
import { photoDelete, photoGet, photoPut, resetDatabase } from './database';
import { uid } from '../utils/numbers';
import { monthKey, todayISO } from '../utils/dates';

type Listener = () => void;

let state: AppState = emptyState();
const listeners = new Set<Listener>();
let persistChain: Promise<void> = Promise.resolve();

function notify(): void {
  listeners.forEach((fn) => fn());
}

function persist(): void {
  persistChain = persistChain.then(() => saveState(state)).catch((error) => {
    console.error('Failed to save BulkTrack data', error);
  });
}

function mutate(fn: (current: AppState) => AppState): void {
  state = fn(state);
  persist();
  notify();
}

export const store = {
  ready: Promise.resolve(),

  async init(): Promise<void> {
    state = await loadState();
    notify();
  },

  get(): AppState {
    return state;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  completeOnboarding(profile: UserProfile, plan: WeeklyPlan | null): void {
    mutate((current) => ({
      ...current,
      onboardingComplete: true,
      profile,
      activePlan: plan,
      pendingPlan: null,
      measurements: [
        {
          date: todayISO(),
          weightKg: profile.currentWeightKg,
        },
        ...current.measurements.filter((m) => m.date !== todayISO()),
      ],
    }));
  },

  updateProfile(patch: Partial<UserProfile>): void {
    mutate((current) => ({
      ...current,
      profile: current.profile ? { ...current.profile, ...patch } : current.profile,
    }));
  },

  setPendingPlan(plan: WeeklyPlan | null): void {
    mutate((current) => ({ ...current, pendingPlan: plan }));
  },

  startWeek(): void {
    mutate((current) => {
      if (!current.pendingPlan) return current;
      const plan = current.pendingPlan;
      return {
        ...current,
        activePlan: plan,
        pendingPlan: null,
        profile: current.profile
          ? {
              ...current.profile,
              targetWeightKg: plan.targets.targetWeightKg,
              goal: plan.targets.goal,
            }
          : current.profile,
      };
    });
  },

  upsertAdherence(date: string, patch: Partial<DailyAdherence>): void {
    mutate((current) => {
      const existing = current.adherence[date] ?? { date };
      return {
        ...current,
        adherence: {
          ...current.adherence,
          [date]: { ...existing, ...patch, date },
        },
      };
    });
  },

  setActiveWorkout(session: WorkoutSession | null): void {
    mutate((current) => ({ ...current, activeWorkout: session }));
  },

  saveActiveWorkout(session: WorkoutSession): void {
    mutate((current) => ({ ...current, activeWorkout: session }));
  },

  completeWorkout(session: WorkoutSession): void {
    mutate((current) => ({
      ...current,
      activeWorkout: null,
      sessions: [session, ...current.sessions.filter((s) => s.id !== session.id)],
    }));
  },

  markDayComplete(date: string, workoutId: string, name: string, type: DayType): void {
    const session: WorkoutSession = {
      id: uid('session'),
      workoutId,
      name,
      date,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      durationMinutes: type === 'swimming' ? 30 : undefined,
      exercises: [],
      currentExerciseIndex: 0,
    };
    mutate((current) => ({
      ...current,
      sessions: [session, ...current.sessions.filter((s) => !(s.date === date && s.workoutId === workoutId))],
    }));
  },

  saveMeasurement(measurement: WeeklyMeasurement): void {
    mutate((current) => ({
      ...current,
      measurements: [
        measurement,
        ...current.measurements.filter((m) => m.date !== measurement.date),
      ].sort((a, b) => a.date.localeCompare(b.date)),
    }));
  },

  saveReview(review: WeeklyReview): void {
    mutate((current) => ({
      ...current,
      reviews: [review, ...current.reviews.filter((r) => r.startDate !== review.startDate)],
    }));
  },

  markReviewExported(startDate: string): void {
    mutate((current) => ({
      ...current,
      reviews: current.reviews.map((r) =>
        r.startDate === startDate ? { ...r, exportedAt: new Date().toISOString() } : r,
      ),
    }));
  },

  async addPhoto(blob: Blob, pose: PhotoPose, date = todayISO()): Promise<void> {
    const month = monthKey(date);
    const existing = state.photos.find((p) => p.month === month && p.pose === pose);
    const id = uid('photo');
    await photoPut(id, blob);
    if (existing) await photoDelete(existing.id);
    mutate((current) => ({
      ...current,
      photos: [{ id, date, month, pose }, ...current.photos.filter((p) => p.id !== existing?.id)],
    }));
  },

  async removePhoto(id: string): Promise<void> {
    await photoDelete(id);
    mutate((current) => ({
      ...current,
      photos: current.photos.filter((p) => p.id !== id),
    }));
  },

  getPhoto: photoGet,

  restoreBackup(next: AppState): void {
    mutate(() => ({ ...emptyState(), ...next, schemaVersion: 2 }));
  },

  async reset(): Promise<void> {
    listeners.clear();
    await persistChain;
    await resetDatabase();
    state = emptyState();
    try {
      localStorage.removeItem('bulktrack:v1');
    } catch {
      /* ignore */
    }
    window.location.hash = '#/today';
    window.location.reload();
  },
};

export function scheduleLabel(day: ScheduledDay, plan: WeeklyPlan | null): string {
  if (day.type === 'swimming') return 'Swimming';
  if (day.type === 'delivery_recovery') return 'Delivery / recovery';
  if (day.type === 'weekly_review') return 'Weekly review';
  const workout = plan?.workouts.find((w) => w.id === day.workoutId);
  return workout?.name ?? 'Gym';
}

export type { AppState };
