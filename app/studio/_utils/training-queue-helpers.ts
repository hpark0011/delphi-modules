import type { TrainingDocType } from "../../../components/mind-dialog/training-queue-context";

/**
 * Returns the default training duration for a given document type
 * @param docType - The type of document being trained
 * @returns Duration in milliseconds
 */
export function getDurationByDocType(docType: TrainingDocType): number {
  switch (docType) {
    case "interview":
      return 6000;
    case "youtube":
      return 3500;
    case "x":
      return 4000;
    case "website":
      return 3500;
    case "podcast":
      return 3000;
    case "file":
    case "generic":
    default:
      return 3500;
  }
}

/**
 * Safely updates score with error handling
 * @param scoreFn - Function to update the score
 * @param points - Points to add/subtract
 * @param action - Description of the action for error logging
 */
export function updateScoreSafely(
  scoreFn: (points: number) => void,
  points: number,
  action: string
): void {
  try {
    scoreFn(points);
  } catch (error) {
    console.error(`Failed to ${action} score:`, error);
  }
}
