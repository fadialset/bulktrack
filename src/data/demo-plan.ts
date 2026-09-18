import type { ExerciseDefinition, WeeklyPlan, WorkoutDefinition } from '../models/types';
import { enrichExercise } from './exercises';
import { addDays, formatISODate, getMonday } from '../utils/dates';

function ex(
  id: string,
  name: string,
  targetWeightKg: number,
  restSeconds = 90,
  sets = 3,
  min = 10,
  max = 12,
  extras: Partial<ExerciseDefinition> = {},
): ExerciseDefinition {
  return enrichExercise({
    id,
    name,
    sets,
    repRange: { min, max },
    targetWeightKg,
    restSeconds,
    ...extras,
  });
}

function workout(id: string, name: string, exercises: ExerciseDefinition[]): WorkoutDefinition {
  return { id, name, estimatedMinutes: 55, exercises };
}

export function createDemoPlan(now = new Date()): WeeklyPlan {
  const monday = getMonday(now);
  const startDate = formatISODate(monday);
  const endDate = formatISODate(addDays(monday, 6));

  return {
    schemaVersion: 2,
    type: 'bulkTrackWeeklyPlan',
    week: { number: 4, startDate, endDate },
    targets: {
      goal: 'lean_bulk',
      targetWeightKg: 72,
      weeklyWeightGainKg: { min: 0.2, max: 0.3 },
      proteinGrams: 140,
      calorieGuidance: 2600,
      waterLitres: 2.5,
      creatineGrams: 5,
      mealGuidance: [
        'protein-rich breakfast',
        'proper lunch',
        'Syrian dinner',
        'night protein shake',
      ],
    },
    coachNote:
      'This week we are establishing the three full-body sessions. Keep loads as written, hit the top of the rep range when you can, and do not intentionally increase calories.',
    schedule: [
      { day: 'monday', type: 'gym', workoutId: 'full_body_a' },
      { day: 'tuesday', type: 'swimming' },
      { day: 'wednesday', type: 'gym', workoutId: 'full_body_b' },
      { day: 'thursday', type: 'gym', workoutId: 'full_body_c' },
      { day: 'friday', type: 'delivery_recovery' },
      { day: 'saturday', type: 'delivery_recovery' },
      { day: 'sunday', type: 'weekly_review' },
    ],
    workouts: [
      workout('full_body_a', 'Full Body A', [
        ex('chest_press', 'Chest Press', 30, 90, 3, 10, 12, {
          warmup: { enabled: true, instruction: '1 light set × 12 reps' },
          alternatives: [{ exerciseId: 'incline_chest_press', name: 'Incline Chest Press', reason: 'Machine unavailable', targetWeightKg: 27.5 }],
        }),
        ex('lat_pulldown', 'Lat Pulldown', 35),
        ex('leg_press', 'Leg Press', 80, 120),
        ex('shoulder_press', 'Shoulder Press', 20),
        ex('biceps_curl', 'Biceps Curl Machine', 15, 75),
        ex('triceps_pushdown', 'Triceps Pushdown', 20, 75),
      ]),
      workout('full_body_b', 'Full Body B', [
        ex('incline_chest_press', 'Incline Chest Press', 27.5, 90, 3, 10, 12, {
          warmup: { enabled: true, instruction: '1 light set × 12 reps' },
        }),
        ex('lat_pulldown', 'Lat Pulldown', 35),
        ex('seated_row', 'Seated Row', 30),
        ex('shoulder_press', 'Shoulder Press', 20),
        ex('leg_press', 'Leg Press', 80, 120),
        ex('biceps_curl', 'Biceps Curl Machine', 15, 75),
      ]),
      workout('full_body_c', 'Full Body C', [
        ex('chest_press', 'Chest Press', 30, 90, 3, 10, 12, {
          warmup: { enabled: true, instruction: '1 light set × 12 reps' },
          alternatives: [{ exerciseId: 'incline_chest_press', name: 'Incline Chest Press', reason: 'Machine unavailable', targetWeightKg: 27.5 }],
        }),
        ex('lat_pulldown', 'Lat Pulldown', 35),
        ex('leg_press', 'Leg Press', 80, 120),
        ex('shoulder_press', 'Shoulder Press', 20),
        ex('triceps_pushdown', 'Triceps Pushdown', 20, 75),
        ex('rear_delt', 'Rear Delt / Reverse Pec Deck', 15, 60, 3, 12, 15),
      ]),
    ],
  };
}
