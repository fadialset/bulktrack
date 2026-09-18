import type {
  DayType,
  ExerciseAlternative,
  ExerciseDefinition,
  ScheduledDay,
  WeeklyPlan,
  WorkoutDefinition,
} from '../models/types';
import { enrichExercise } from '../data/exercises';
import type { Weekday } from '../models/types';

export type ImportResult = { ok: true; plan: WeeklyPlan } | { ok: false; error: string };

const WEEKDAYS: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.map((v) => asString(v)).filter((v): v is string => Boolean(v));
  return items.length ? items : undefined;
}

function normalizeDay(value: unknown): Weekday | undefined {
  const raw = asString(value)?.toLowerCase();
  return WEEKDAYS.find((d) => d === raw);
}

function normalizeType(value: unknown): DayType | undefined {
  const raw = asString(value)?.toLowerCase().replace(/[\s-]+/g, '_');
  if (raw === 'gym') return 'gym';
  if (raw === 'swimming') return 'swimming';
  if (raw === 'weekly_review' || raw === 'sunday_review' || raw === 'review') return 'weekly_review';
  if (
    raw === 'delivery_recovery' ||
    raw === 'recovery' ||
    raw === 'rest' ||
    raw === 'delivery' ||
    raw === 'delivery_work'
  ) {
    return 'delivery_recovery';
  }
  return undefined;
}

function parseRepRange(value: unknown): { min: number; max: number } | undefined {
  if (Array.isArray(value) && value.length >= 2) {
    const min = asNumber(value[0]);
    const max = asNumber(value[1]);
    if (min != null && max != null) return { min, max };
  }
  if (isRecord(value)) {
    const min = asNumber(value.min);
    const max = asNumber(value.max);
    if (min != null && max != null) return { min, max };
  }
  return undefined;
}

function parseSchedule(value: unknown): ScheduledDay[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  const days: ScheduledDay[] = [];
  for (const item of value) {
    if (!isRecord(item)) return undefined;
    const day = normalizeDay(item.day);
    const type = normalizeType(item.type);
    if (!day || !type) return undefined;
    const workoutId = asString(item.workoutId);
    days.push({ day, type, workoutId: type === 'gym' ? workoutId : undefined });
  }
  return days;
}

function parseWorkouts(value: unknown): WorkoutDefinition[] {
  if (!Array.isArray(value)) return [];
  const workouts: WorkoutDefinition[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const id = asString(item.id);
    const name = asString(item.name);
    if (!id || !name || !Array.isArray(item.exercises)) continue;
    const exercises = item.exercises.flatMap((raw) => {
      if (!isRecord(raw)) return [];
      const exerciseId = asString(raw.id) ?? asString(raw.exerciseId);
      const exerciseName = asString(raw.name);
      const sets = asNumber(raw.sets);
      const targetWeightKg = asNumber(raw.targetWeightKg) ?? asNumber(raw.recommendedWorkingWeightKg);
      const repRange = parseRepRange(raw.repRange);
      if (!exerciseId || !exerciseName || sets == null || targetWeightKg == null || !repRange) return [];
      return [
        enrichExercise({
          id: exerciseId,
          name: exerciseName,
          machine: asString(raw.machine),
          machineImage: asString(raw.machineImage),
          setup: asStringArray(raw.setup),
          execution: asStringArray(raw.execution),
          commonMistake: asString(raw.commonMistake),
          sets,
          repRange,
          targetWeightKg,
          restSeconds: asNumber(raw.restSeconds),
          weightStepKg: asNumber(raw.weightStepKg),
          warmup: parseWarmup(raw.warmup),
          alternatives: parseAlternatives(raw.alternatives),
        }),
      ];
    });
    workouts.push({
      id,
      name,
      estimatedMinutes: asNumber(item.estimatedMinutes),
      exercises,
    });
  }
  return workouts;
}

function parseWarmup(value: unknown): ExerciseDefinition['warmup'] | undefined {
  if (!isRecord(value)) return undefined;
  const enabled = value.enabled === true || value.enabled === 'true';
  if (!enabled && value.enabled !== false) return undefined;
  return {
    enabled,
    instruction: asString(value.instruction),
  };
}

function parseAlternatives(value: unknown): ExerciseAlternative[] | undefined {
  if (!Array.isArray(value) || !value.length) return undefined;
  const alts: ExerciseAlternative[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const exerciseId = asString(item.exerciseId) ?? asString(item.id);
    const name = asString(item.name);
    if (!exerciseId || !name) continue;
    alts.push({
      exerciseId,
      name,
      machine: asString(item.machine),
      machineImage: asString(item.machineImage),
      reason: asString(item.reason),
      targetWeightKg: asNumber(item.targetWeightKg),
      sets: asNumber(item.sets),
      repRange: parseRepRange(item.repRange),
      weightStepKg: asNumber(item.weightStepKg),
    });
  }
  return alts.length ? alts : undefined;
}

export function parseWeeklyPlan(input: unknown): ImportResult {
  if (!isRecord(input)) {
    return { ok: false, error: 'That file is not valid JSON.' };
  }

  if (
    input.schemaVersion === '1.0' ||
    input.importType === 'weekly_plan' ||
    input.type === 'weekly_plan' ||
    input.exportType === 'weekly_checkin'
  ) {
    return {
      ok: false,
      error: 'This is a BulkTrack V1 file. Ask ChatGPT for schemaVersion 2 (type: bulkTrackWeeklyPlan).',
    };
  }

  if (input.schemaVersion !== 2 && input.schemaVersion !== '2') {
    return {
      ok: false,
      error: `Unsupported schema version (${String(input.schemaVersion ?? 'missing')}). This app expects schemaVersion 2.`,
    };
  }

  if (input.type !== 'bulkTrackWeeklyPlan') {
    return {
      ok: false,
      error: `Unsupported file type (${String(input.type ?? 'missing')}). Expected bulkTrackWeeklyPlan.`,
    };
  }

  if (!isRecord(input.week)) {
    return { ok: false, error: 'Plan is missing week dates.' };
  }

  const weekNumber = asNumber(input.week.number);
  const startDate = asString(input.week.startDate);
  const endDate = asString(input.week.endDate);
  if (weekNumber == null || !startDate || !endDate) {
    return { ok: false, error: 'Plan week must include number, startDate and endDate.' };
  }

  if (!isRecord(input.targets)) {
    return { ok: false, error: 'Plan is missing targets.' };
  }

  const targetWeightKg = asNumber(input.targets.targetWeightKg);
  const proteinGrams = asNumber(input.targets.proteinGrams) ?? asNumber(input.targets.proteinTargetG);
  const gain = isRecord(input.targets.weeklyWeightGainKg) ? input.targets.weeklyWeightGainKg : undefined;
  const gainMin = asNumber(gain?.min);
  const gainMax = asNumber(gain?.max);
  if (targetWeightKg == null || proteinGrams == null || gainMin == null || gainMax == null) {
    return { ok: false, error: 'Plan targets must include protein, weight goal and weekly gain range.' };
  }

  const schedule = parseSchedule(input.schedule);
  if (!schedule) {
    return { ok: false, error: 'Plan schedule is missing or invalid.' };
  }

  const workouts = parseWorkouts(input.workouts);
  const gymDays = schedule.filter((d) => d.type === 'gym');
  for (const day of gymDays) {
    if (!day.workoutId || !workouts.some((w) => w.id === day.workoutId)) {
      return { ok: false, error: `Gym day ${day.day} points to a missing workout.` };
    }
  }

  const plan: WeeklyPlan = {
    schemaVersion: 2,
    type: 'bulkTrackWeeklyPlan',
    week: { number: weekNumber, startDate, endDate },
    targets: {
      goal: 'lean_bulk',
      targetWeightKg,
      weeklyWeightGainKg: { min: gainMin, max: gainMax },
      proteinGrams,
      calorieGuidance: asNumber(input.targets.calorieGuidance),
      waterLitres: asNumber(input.targets.waterLitres),
      creatineGrams: asNumber(input.targets.creatineGrams),
      mealGuidance: asStringArray(input.targets.mealGuidance),
    },
    coachNote: asString(input.coachNote) ?? '',
    schedule,
    workouts,
  };

  return { ok: true, plan };
}

export function parseJsonFile(text: string): ImportResult {
  try {
    return parseWeeklyPlan(JSON.parse(text) as unknown);
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' };
  }
}
