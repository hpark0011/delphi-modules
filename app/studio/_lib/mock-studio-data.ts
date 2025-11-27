export type Engagements = {
  conversations: {
    value: number;
    change: number;
    isPositive: boolean;
  };
  activeUsers: {
    value: number;
    change: number;
    isPositive: boolean;
  };
};

export type Highlights = {
  unansweredQuestions: {
    value: number;
  };
  productMentions: {
    value: number;
  };
  peopleHighlights: {
    value: number;
  };
  insights: {
    value: number;
  };
};

export type TrainingCard = {
  icon: string;
  title: string;
  description: string;
  points: number;
};

// Sample data - replace with actual data fetching
export const mockEngagements: Engagements = {
  conversations: {
    value: 418,
    change: 36,
    isPositive: true,
  },
  activeUsers: {
    value: 231,
    change: 21,
    isPositive: true,
  },
};

export const mockHighlights: Highlights = {
  unansweredQuestions: {
    value: 32,
  },
  productMentions: {
    value: 8,
  },
  peopleHighlights: {
    value: 24,
  },
  insights: {
    value: 16,
  },
};

export const mockTrainingCards: TrainingCard[] = [
  {
    icon: "import",
    title: "Import your website",
    description: "Connect your blog or website content",
    points: 5,
  },
  {
    icon: "upload",
    title: "Upload your documents",
    description: "Add PDFs, presentations, and files",
    points: 5,
  },
  {
    icon: "connect",
    title: "Connect your notes",
    description: "Link your note-taking apps",
    points: 5,
  },
  {
    icon: "podcast",
    title: "Find your podcast appearances",
    description: "Claim podcast episodes you've been on",
    points: 15,
  },
  {
    icon: "childhood",
    title: "Talk about your childhood",
    description:
      "Increase the accuracy and variety of questions your mind can answer",
    points: 30,
  },
  {
    icon: "education",
    title: "Talk about your education",
    description:
      "Complete the Big 5 assessment to understand your communication style",
    points: 30,
  },
  {
    icon: "topic",
    title: "Choose your next topic",
    description: "Pick another area to train your Delphi on",
    points: 15,
  },
  {
    icon: "claim",
    title: "Claim your content",
    description: "Verify content we found about you online",
    points: 15,
  },
];
