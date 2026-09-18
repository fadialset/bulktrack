import type { ExerciseAlternative, ExerciseDefinition } from '../models/types';

export interface ExerciseGuide {
  id: string;
  aliases: string[];
  name: string;
  machine?: string;
  machineImage?: string;
  setup: string[];
  execution: string[];
  commonMistake: string;
  restSeconds: number;
  weightStepKg: number;
}

export function machineImagePath(exerciseId: string): string {
  return `/exercise-images/${exerciseId.replace(/_/g, '-')}.png`;
}

export const EXERCISE_GUIDES: ExerciseGuide[] = [
  {
    id: 'chest_press',
    aliases: ['chest_press_machine', 'chest press'],
    name: 'Chest Press',
    machine: 'Technogym Chest Press',
    machineImage: machineImagePath('chest_press'),
    setup: ['Seat so handles line up with mid-chest', 'Hands in a comfortable grip', 'Back flat against the pad'],
    execution: [
      'Press until elbows are almost straight',
      'Keep shoulder blades on the pad',
      'Control the return without slamming the stack',
    ],
    commonMistake: 'Do not let the shoulders roll forward.',
    restSeconds: 90,
    weightStepKg: 5,
  },
  {
    id: 'incline_chest_press',
    aliases: ['incline_chest_press_machine'],
    name: 'Incline Chest Press',
    machine: 'Technogym Incline Chest Press',
    machineImage: machineImagePath('incline_chest_press'),
    setup: ['Seat so handles meet the upper chest', 'Ribs down', 'Shoulders packed'],
    execution: ['Drive slightly up and in', 'Keep wrists stacked over elbows', 'Stop just short of lockout'],
    commonMistake: 'Do not arch the lower back off the pad.',
    restSeconds: 90,
    weightStepKg: 5,
  },
  {
    id: 'lat_pulldown',
    aliases: [],
    name: 'Lat Pulldown',
    machine: 'Lat pulldown',
    machineImage: machineImagePath('lat_pulldown'),
    setup: ['Thigh pads snug', 'Grip slightly wider than shoulders', 'Lean back only a few degrees'],
    execution: ['Pull the bar to the upper chest', 'Drive elbows down', 'Control the stretch at the top'],
    commonMistake: 'Do not yank with the arms or pull behind the neck.',
    restSeconds: 90,
    weightStepKg: 5,
  },
  {
    id: 'seated_row',
    aliases: ['seated_row_machine'],
    name: 'Seated Row',
    machine: 'Seated row machine',
    machineImage: machineImagePath('seated_row'),
    setup: ['Chest against the pad if present', 'Handles at mid-torso', 'Shoulders down'],
    execution: ['Row elbows past the torso', 'Squeeze the shoulder blades', 'Stretch forward with control'],
    commonMistake: 'Do not shrug or swing the torso.',
    restSeconds: 90,
    weightStepKg: 5,
  },
  {
    id: 'shoulder_press',
    aliases: ['shoulder_press_machine'],
    name: 'Shoulder Press',
    machine: 'Technogym Shoulder Press',
    machineImage: machineImagePath('shoulder_press'),
    setup: ['Handles start around ear height', 'Lower back against the pad', 'Neutral wrist'],
    execution: ['Press up without shrugging', 'Lower until elbows are around 90 degrees', 'Keep ribs down'],
    commonMistake: 'Do not flare the ribs or lock out hard.',
    restSeconds: 90,
    weightStepKg: 5,
  },
  {
    id: 'leg_press',
    aliases: [],
    name: 'Leg Press',
    machine: 'Leg press',
    machineImage: machineImagePath('leg_press'),
    setup: ['Feet hip-to-shoulder width, mid-platform', 'Do not lock the sled at the top', 'Hold the handles lightly'],
    execution: [
      'Lower until thighs are around 90 degrees if hips allow',
      'Drive through the whole foot',
      'Keep the lower back on the pad',
    ],
    commonMistake: 'Do not let the lower back round at the bottom.',
    restSeconds: 120,
    weightStepKg: 5,
  },
  {
    id: 'biceps_curl',
    aliases: ['biceps_curl_machine'],
    name: 'Biceps Curl Machine',
    machine: 'Biceps curl machine',
    machineImage: machineImagePath('biceps_curl'),
    setup: ['Chest against the pad', 'Elbows in line with the pivot', 'Full stretch at the bottom'],
    execution: ['Curl without swinging', 'Squeeze at the top', 'Lower for 2–3 seconds'],
    commonMistake: 'Do not let the elbows slide or swing the stack.',
    restSeconds: 75,
    weightStepKg: 2.5,
  },
  {
    id: 'triceps_pushdown',
    aliases: ['cable_triceps_pushdown', 'triceps_extension_machine'],
    name: 'Triceps Pushdown',
    machine: 'Cable triceps pushdown',
    machineImage: machineImagePath('triceps_pushdown'),
    setup: ['High pulley, bar or rope', 'Elbows glued to the sides', 'Soft knees'],
    execution: [
      'Push down until arms are straight',
      'Let the bar rise only to around 90 degrees',
      'Keep elbows still',
    ],
    commonMistake: 'Do not flare the elbows or turn it into a chest press.',
    restSeconds: 75,
    weightStepKg: 2.5,
  },
  {
    id: 'rear_delt',
    aliases: ['rear_delt_reverse_pec_deck'],
    name: 'Rear Delt / Reverse Pec Deck',
    machine: 'Reverse pec deck',
    machineImage: machineImagePath('rear_delt'),
    setup: ['Face the pad', 'Handles at shoulder height', 'Soft elbows'],
    execution: ['Open the arms until they line up with the shoulders', 'Squeeze the rear delts', 'Control the return'],
    commonMistake: 'Do not row with the elbows or use a heavy stack.',
    restSeconds: 60,
    weightStepKg: 2.5,
  },
  {
    id: 'leg_extension',
    aliases: [],
    name: 'Leg Extension',
    machine: 'Leg extension',
    machineImage: machineImagePath('leg_extension'),
    setup: ['Pad just above the ankles', 'Knees in line with the pivot'],
    execution: ['Extend fully without pain', 'Squeeze the quads', 'Lower slowly'],
    commonMistake: 'Do not use momentum.',
    restSeconds: 60,
    weightStepKg: 5,
  },
  {
    id: 'leg_curl',
    aliases: ['seated_leg_curl', 'lying_leg_curl'],
    name: 'Leg Curl',
    machine: 'Seated leg curl',
    machineImage: machineImagePath('leg_curl'),
    setup: ['Thigh pad snug', 'Ankle pad just above the heels', 'Hips stay down'],
    execution: ['Curl as far as the machine allows', 'Pause', 'Resist the return'],
    commonMistake: 'Do not lift the hips off the seat.',
    restSeconds: 60,
    weightStepKg: 5,
  },
];

export function findGuide(idOrName: string): ExerciseGuide | undefined {
  const needle = idOrName.trim().toLowerCase().replace(/[\s-]+/g, '_');
  return EXERCISE_GUIDES.find(
    (g) =>
      g.id === needle ||
      g.aliases.includes(needle) ||
      g.name.toLowerCase().replace(/[\s-]+/g, '_') === needle,
  );
}

export function enrichExercise(exercise: ExerciseDefinition): ExerciseDefinition {
  const guide = findGuide(exercise.id) ?? findGuide(exercise.name);
  if (!guide) {
    return {
      ...exercise,
      machineImage: exercise.machineImage ?? machineImagePath(exercise.id),
      weightStepKg: exercise.weightStepKg ?? 2.5,
    };
  }
  return {
    ...exercise,
    machine: exercise.machine ?? guide.machine,
    machineImage: exercise.machineImage ?? guide.machineImage,
    setup: exercise.setup?.length ? exercise.setup : guide.setup,
    execution: exercise.execution?.length ? exercise.execution : guide.execution,
    commonMistake: exercise.commonMistake ?? guide.commonMistake,
    restSeconds: exercise.restSeconds ?? guide.restSeconds,
    weightStepKg: exercise.weightStepKg ?? guide.weightStepKg,
    alternatives: exercise.alternatives?.map((alt) => enrichAlternative(alt)),
  };
}

export function enrichAlternative(alt: ExerciseAlternative): ExerciseAlternative {
  const guide = findGuide(alt.exerciseId) ?? findGuide(alt.name);
  return {
    ...alt,
    name: alt.name || guide?.name || alt.exerciseId,
    machine: alt.machine ?? guide?.machine,
    machineImage: alt.machineImage ?? guide?.machineImage ?? machineImagePath(alt.exerciseId),
    weightStepKg: alt.weightStepKg ?? guide?.weightStepKg ?? 2.5,
    restSeconds: alt.restSeconds ?? guide?.restSeconds,
    setup: alt.setup?.length ? alt.setup : guide?.setup,
    execution: alt.execution?.length ? alt.execution : guide?.execution,
    commonMistake: alt.commonMistake ?? guide?.commonMistake,
  };
}

export function definitionFromAlternative(
  planned: ExerciseDefinition,
  alt: ExerciseAlternative,
): ExerciseDefinition {
  const filled = enrichAlternative(alt);
  return enrichExercise({
    id: filled.exerciseId,
    name: filled.name,
    machine: filled.machine,
    machineImage: filled.machineImage,
    setup: filled.setup,
    execution: filled.execution,
    commonMistake: filled.commonMistake,
    sets: filled.sets ?? planned.sets,
    repRange: filled.repRange ?? planned.repRange,
    targetWeightKg: filled.targetWeightKg ?? planned.targetWeightKg,
    restSeconds: filled.restSeconds ?? planned.restSeconds,
    weightStepKg: filled.weightStepKg,
  });
}
