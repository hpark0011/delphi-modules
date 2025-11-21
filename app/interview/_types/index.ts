export type TopicStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";

export interface Message {
  id: string;
  type: "question" | "answer";
  content: string;
  timestamp?: Date;
}

export interface Topic {
  id: string;
  title: string;
  status: TopicStatus;
  completionPercentage: number;
  messages: Message[];
}

export interface InterviewState {
  topics: Topic[];
  currentTopicId: string | null;
  isLoading: boolean;
}

export const INTERVIEW_TOPICS = [
  { id: "life-story", title: "Life Story" },
  { id: "career", title: "Career Goals" },
  { id: "values", title: "Values & Beliefs" },
  { id: "turning-points", title: "Turning Points" },
  { id: "passions", title: "Passions" },
  { id: "wisdom", title: "Wisdom" },
] as const;
