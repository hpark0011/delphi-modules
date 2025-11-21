"use client";

import { useState } from "react";
import {
  TopicSidebar,
  ConversationDisplay,
  InterviewInput,
  type Message,
} from "./_components";

export default function InterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "question",
      content:
        "Hello again, Hyunsol! Our last conversation was about your approach to building teams obsessed with greatness. Next, I'd love to know more about your own career goals. What do they look like for you in the coming years?",
    },
    {
      id: "2",
      type: "answer",
      content: "hello",
    },
    {
      id: "3",
      type: "question",
      content:
        "Hyunsol, given your work at Disquiet, what specific milestones are you looking to achieve within the next few years?",
    },
  ]);

  const topics = [
    {
      id: "1",
      title: "Career Goals",
      isActive: true,
    },
  ];

  const handleSubmit = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "answer",
      content: text,
    };
    setMessages([...messages, newMessage]);
  };

  const handleVoiceRecord = () => {
    console.log("Voice recording started");
  };

  const handleSkip = () => {
    console.log("Question skipped");
  };

  const handleStartNewTopic = () => {
    console.log("Start new topic");
  };

  return (
    <>
      <TopicSidebar topics={topics} onStartNewTopic={handleStartNewTopic} />

      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto">
          <ConversationDisplay
            title="Career Goals"
            messages={messages}
            onSkip={handleSkip}
          />
        </div>

        <InterviewInput
          onSubmit={handleSubmit}
          onVoiceRecord={handleVoiceRecord}
        />
      </div>
    </>
  );
}
