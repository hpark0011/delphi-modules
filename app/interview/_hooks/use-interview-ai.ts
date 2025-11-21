"use client";

import { useState, useCallback } from "react";
import type { Message, Topic, TopicStatus } from "../_types";

const TOPIC_QUESTIONS: Record<string, string[]> = {
  "life-story": [
    "Let's start with your life story. Where did you grow up, and what was your childhood like?",
    "That's fascinating! Who were the most influential people in your early life?",
    "How did your upbringing shape who you are today?",
    "Tell me about your education journey. What were the pivotal moments?",
    "What's a memory from your past that still resonates with you deeply?",
  ],
  career: [
    "Let's talk about your career. What drew you to your current field?",
    "What specific milestones are you looking to achieve in the coming years?",
    "How do you define success in your professional life?",
    "What's the biggest challenge you've overcome in your career?",
    "Where do you see yourself professionally in 5 years?",
  ],
  values: [
    "What values guide your decisions in life?",
    "How did you come to hold these beliefs?",
    "What principles would you never compromise on?",
    "How do your values influence your daily choices?",
    "What do you believe is most important in life?",
  ],
  "turning-points": [
    "Tell me about a moment that changed the direction of your life.",
    "How did that experience shape your perspective?",
    "What did you learn about yourself during that time?",
    "Looking back, would you change anything about how you handled it?",
    "What turning points are you grateful for?",
  ],
  passions: [
    "What are you most passionate about?",
    "When did you discover this passion?",
    "How do you pursue this passion in your daily life?",
    "What does this passion bring to your life?",
    "How do you want to grow in this area?",
  ],
  wisdom: [
    "What's the most important lesson life has taught you?",
    "What advice would you give to your younger self?",
    "What wisdom do you want to pass on to others?",
    "How have your perspectives changed over the years?",
    "What do you know now that you wish you'd known earlier?",
  ],
};

const FOLLOW_UP_RESPONSES = [
  "Thank you for sharing that. ",
  "That's really insightful. ",
  "I appreciate you opening up about that. ",
  "That's a powerful perspective. ",
  "I can see how meaningful that is to you. ",
];

interface UseInterviewAIOptions {
  initialTopicId?: string;
  userName?: string;
}

export function useInterviewAI(options: UseInterviewAIOptions = {}) {
  const { initialTopicId = "career", userName = "there" } = options;

  const [topics, setTopics] = useState<Topic[]>(() =>
    Object.entries(TOPIC_QUESTIONS).map(([id, questions]) => ({
      id,
      title: id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      status: id === initialTopicId ? "IN_PROGRESS" : "NOT_STARTED",
      completionPercentage: 0,
      messages:
        id === initialTopicId
          ? [
              {
                id: "initial-1",
                type: "question" as const,
                content: `Hello ${userName}! ${questions[0]}`,
                timestamp: new Date(),
              },
            ]
          : [],
    }))
  );

  const [currentTopicId, setCurrentTopicId] = useState<string>(initialTopicId);
  const [isLoading, setIsLoading] = useState(false);

  const currentTopic = topics.find((t) => t.id === currentTopicId);
  const messages = currentTopic?.messages ?? [];

  const getNextQuestion = useCallback(
    (topicId: string, answeredCount: number): string | null => {
      const questions = TOPIC_QUESTIONS[topicId];
      if (!questions || answeredCount >= questions.length) return null;
      return questions[answeredCount];
    },
    []
  );

  const submitAnswer = useCallback(
    async (answer: string) => {
      if (!currentTopicId || isLoading) return;

      const answerMessage: Message = {
        id: `answer-${Date.now()}`,
        type: "answer",
        content: answer,
        timestamp: new Date(),
      };

      // Add user's answer
      setTopics((prev) =>
        prev.map((topic) =>
          topic.id === currentTopicId
            ? { ...topic, messages: [...topic.messages, answerMessage] }
            : topic
        )
      );

      setIsLoading(true);

      // Simulate AI thinking
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 700)
      );

      // Calculate answered questions count
      const currentMessages =
        topics.find((t) => t.id === currentTopicId)?.messages ?? [];
      const answeredCount =
        currentMessages.filter((m) => m.type === "answer").length + 1;
      const totalQuestions = TOPIC_QUESTIONS[currentTopicId]?.length ?? 5;
      const completionPercentage = Math.round(
        (answeredCount / totalQuestions) * 100
      );

      // Get next question
      const nextQuestion = getNextQuestion(currentTopicId, answeredCount);

      if (nextQuestion) {
        const prefix =
          FOLLOW_UP_RESPONSES[
            Math.floor(Math.random() * FOLLOW_UP_RESPONSES.length)
          ];
        const questionMessage: Message = {
          id: `question-${Date.now()}`,
          type: "question",
          content: prefix + nextQuestion,
          timestamp: new Date(),
        };

        setTopics((prev) =>
          prev.map((topic) =>
            topic.id === currentTopicId
              ? {
                  ...topic,
                  messages: [...topic.messages, questionMessage],
                  completionPercentage,
                }
              : topic
          )
        );
      } else {
        // Topic completed
        setTopics((prev) =>
          prev.map((topic) =>
            topic.id === currentTopicId
              ? {
                  ...topic,
                  status: "COMPLETED" as TopicStatus,
                  completionPercentage: 100,
                }
              : topic
          )
        );
      }

      setIsLoading(false);
    },
    [currentTopicId, isLoading, topics, getNextQuestion]
  );

  const skipQuestion = useCallback(() => {
    if (!currentTopicId || isLoading) return;

    const currentMessages =
      topics.find((t) => t.id === currentTopicId)?.messages ?? [];
    const answeredCount = currentMessages.filter(
      (m) => m.type === "answer"
    ).length;
    const nextQuestion = getNextQuestion(currentTopicId, answeredCount + 1);

    if (nextQuestion) {
      const questionMessage: Message = {
        id: `question-${Date.now()}`,
        type: "question",
        content: nextQuestion,
        timestamp: new Date(),
      };

      setTopics((prev) =>
        prev.map((topic) =>
          topic.id === currentTopicId
            ? { ...topic, messages: [...topic.messages, questionMessage] }
            : topic
        )
      );
    }
  }, [currentTopicId, isLoading, topics, getNextQuestion]);

  const switchTopic = useCallback((topicId: string) => {
    setCurrentTopicId(topicId);
    setTopics((prev) =>
      prev.map((topic) => {
        if (topic.id === topicId && topic.status === "NOT_STARTED") {
          const questions = TOPIC_QUESTIONS[topicId];
          return {
            ...topic,
            status: "IN_PROGRESS" as TopicStatus,
            messages: [
              {
                id: `initial-${topicId}`,
                type: "question" as const,
                content: questions?.[0] ?? "Tell me more about this topic.",
                timestamp: new Date(),
              },
            ],
          };
        }
        return topic;
      })
    );
  }, []);

  const startNewTopic = useCallback(() => {
    const nextTopic = topics.find((t) => t.status === "NOT_STARTED");
    if (nextTopic) {
      switchTopic(nextTopic.id);
    }
  }, [topics, switchTopic]);

  return {
    topics,
    currentTopic,
    currentTopicId,
    messages,
    isLoading,
    submitAnswer,
    skipQuestion,
    switchTopic,
    startNewTopic,
  };
}
