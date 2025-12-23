export const LEVEL_THRESHOLDS = [
  { name: "Novice", min: 0 },
  { name: "Skilled", min: 200 },
  { name: "Expert", min: 1000 },
  { name: "Master", min: 2000 },
  { name: "Sage", min: 3000 },
  { name: "Legendary", min: 4000 },
  { name: "Eternal", min: 5000 },
] as const;

export type LevelName = (typeof LEVEL_THRESHOLDS)[number]["name"];

export function calculateLevel(score: number): LevelName {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i].min) {
      return LEVEL_THRESHOLDS[i].name;
    }
  }
  return LEVEL_THRESHOLDS[0].name;
}
