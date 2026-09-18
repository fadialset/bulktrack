export const APP_VERSION = '2.0.0';
export const SCHEMA_VERSION = 2 as const;

export type Goal = 'lean_bulk';
export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DayType = 'gym' | 'swimming' | 'delivery_recovery' | 'weekly_review';
export type WorkoutFeeling = 'too_easy' | 'good' | 'too_hard';
export type WeekFeeling = 'easy' | 'good' | 'hard';
export type OnPlan = 'yes' | 'mostly' | 'no';
export type PhotoPose = 'front' | 'side' | 'back';

export interface UserProfile {
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  goal: Goal;
}

export interface RepRange {
  min: number;
  max: number;
}

export interface ExerciseWarmup {
  enabled: boolean;
  instruction?: string;
}

export interface ExerciseAlternative {
  exerciseId: string;
  name: string;
  machine?: string;
  machineImage?: string;
  reason?: string;
  targetWeightKg?: number;
  sets?: number;
  repRange?: RepRange;
  weightStepKg?: number;
  restSeconds?: number;
  setup?: string[];
  execution?: string[];
  commonMistake?: string;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  machine?: string;
  machineImage?: string;
  setup?: string[];
  execution?: string[];
  commonMistake?: string;
  sets: number;
  repRange: RepRange;
  targetWeightKg: number;
  restSeconds?: number;
  weightStepKg?: number;
  warmup?: ExerciseWarmup;
  alternatives?: ExerciseAlternative[];
}

export interface WorkoutDefinition {
  id: string;
  name: string;
  estimatedMinutes?: number;
  exercises: ExerciseDefinition[];
}

export interface ScheduledDay {
  day: Weekday;
  type: DayType;
  workoutId?: string;
}

export interface WeeklyTargets {
  goal: Goal;
  targetWeightKg: number;
  weeklyWeightGainKg: { min: number; max: number };
  proteinGrams: number;
  calorieGuidance?: number;
  waterLitres?: number;
  creatineGrams?: number;
  mealGuidance?: string[];
}

export interface WeeklyPlan {
  schemaVersion: 2;
  type: 'bulkTrackWeeklyPlan';
  week: {
    number: number;
    startDate: string;
    endDate: string;
  };
  targets: WeeklyTargets;
  coachNote: string;
  schedule: ScheduledDay[];
  workouts: WorkoutDefinition[];
}

export interface SetPerformance {
  weightKg: number;
  reps: number;
  done: boolean;
}

export type ExerciseStatus = 'pending' | 'completed' | 'skipped';
export type SkipReason = 'machine_unavailable';

export interface ExercisePerformance {
  plannedExerciseId: string;
  performedExerciseId?: string;
  name: string;
  status: ExerciseStatus;
  skipReason?: SkipReason;
  substitutionReason?: SkipReason;
  sets: SetPerformance[];
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  name: string;
  date: string;
  startedAt: string;
  completedAt?: string;
  durationMinutes?: number;
  exercises: ExercisePerformance[];
  currentExerciseIndex: number;
  feeling?: WorkoutFeeling;
  notes?: string;
}

export interface DailyAdherence {
  date: string;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  proteinTarget?: boolean;
  shake?: boolean;
  creatine?: boolean;
  waterTarget?: boolean;
  sleepHours?: number;
  onPlan?: OnPlan;
  note?: string;
}

export interface WeeklyMeasurement {
  date: string;
  weightKg: number;
  waistCm?: number;
  armCm?: number;
  chestCm?: number;
  shouldersCm?: number;
  forearmCm?: number;
  thighCm?: number;
}

export interface WeeklyReview {
  weekNumber: number;
  startDate: string;
  endDate: string;
  completedAt: string;
  exportedAt?: string;
  measurements: WeeklyMeasurement;
  monthlyRecorded?: boolean;
  weeklyFeeling?: WeekFeeling;
  userNotes?: string;
}

export interface ProgressPhotoMeta {
  id: string;
  date: string;
  month: string;
  pose?: PhotoPose;
}

export interface AppSettings {
  units: 'metric';
}

export interface AppState {
  schemaVersion: 2;
  onboardingComplete: boolean;
  profile: UserProfile | null;
  settings: AppSettings;
  activePlan: WeeklyPlan | null;
  pendingPlan: WeeklyPlan | null;
  activeWorkout: WorkoutSession | null;
  sessions: WorkoutSession[];
  adherence: Record<string, DailyAdherence>;
  measurements: WeeklyMeasurement[];
  reviews: WeeklyReview[];
  photos: ProgressPhotoMeta[];
}

export interface WeeklyReviewExport {
  schemaVersion: 2;
  type: 'bulkTrackWeeklyReview';
  user: {
    heightCm: number;
    goal: Goal;
    targetWeightKg: number;
  };
  week: {
    number: number;
    startDate: string;
    endDate: string;
  };
  measurements: {
    weightKg: number;
    waistCm?: number;
    armCm?: number;
  };
  changeSinceLastWeek: {
    weightKg: number;
    waistCm: number;
    armCm: number;
  };
  training: {
    plannedSessions: number;
    completedSessions: number;
    sessions: Array<{
      date: string;
      workoutId: string;
      durationMinutes?: number;
      feeling?: WorkoutFeeling;
      exercises: Array<{
        plannedExerciseId: string;
        performedExerciseId?: string;
        name: string;
        status: 'completed' | 'skipped';
        substitutionReason?: SkipReason;
        skipReason?: SkipReason;
        sets?: Array<{ weightKg: number; reps: number }>;
      }>;
      notes?: string;
    }>;
  };
  adherence: {
    foodDaysOnPlan: number;
    proteinTargetDays: number;
    creatineDays: number;
    shakeDays: number;
    waterTargetDays: number;
  };
  sleep: {
    averageHours: number | null;
  };
  monthlyProgress:
    | { recorded: false }
    | {
        recorded: true;
        measurements: {
          waistCm?: number;
          armCm?: number;
          chestCm?: number;
          shouldersCm?: number;
          forearmCm?: number;
          thighCm?: number;
        };
        photosRecorded: {
          front: boolean;
          side: boolean;
          back: boolean;
        };
      };
  weeklyFeeling?: WeekFeeling;
  userNotes?: string;
}

export interface AppBackup {
  schemaVersion: 2;
  type: 'bulkTrackBackup';
  exportedAt: string;
  state: AppState;
  photos: Array<{ id: string; mime: string; dataUrl: string }>;
}

export function emptyState(): AppState {
  return {
    schemaVersion: SCHEMA_VERSION,
    onboardingComplete: false,
    profile: null,
    settings: { units: 'metric' },
    activePlan: null,
    pendingPlan: null,
    activeWorkout: null,
    sessions: [],
    adherence: {},
    measurements: [],
    reviews: [],
    photos: [],
  };
}
