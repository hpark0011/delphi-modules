import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(
  value: number,
  options: { maximumFractionDigits?: number } = {}
): string {
  const { maximumFractionDigits = 1 } = options;

  if (!Number.isFinite(value)) return String(value);

  const absolute = Math.abs(value);
  const sign = value < 0 ? -1 : 1;

  const thresholds = [
    { limit: 1_000_000_000_000, suffix: "t" },
    { limit: 1_000_000_000, suffix: "b" },
    { limit: 1_000_000, suffix: "m" },
    { limit: 1_000, suffix: "k" },
  ] as const;

  for (const { limit, suffix } of thresholds) {
    if (absolute >= limit) {
      const formatted = (sign * (absolute / limit))
        .toFixed(maximumFractionDigits)
        .replace(/\.0+$/, "")
        .replace(/(\.[1-9]*)0+$/, "$1");
      return `${formatted}${suffix}`;
    }
  }

  return String(value);
}
