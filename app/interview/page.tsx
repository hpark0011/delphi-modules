"use client";

import { useState } from "react";
import {
  TopicSidebar,
  ConversationDisplay,
  InterviewInput,
} from "./_components";
import { useInterviewAI } from "./_hooks/use-interview-ai";

export default function InterviewPage() {
  const [recording, setRecording] = useState(false);

  const {
    topics,
    currentTopic,
    messages,
    isLoading,
    submitAnswer,
    skipQuestion,
    switchTopic,
    startNewTopic,
  } = useInterviewAI({ userName: "Hyunsol" });

  const handleVoiceRecord = () => {
    setRecording(!recording);
    console.log("Voice recording:", !recording);
  };

  const sidebarTopics = topics.map((t) => ({
    id: t.id,
    title: t.title,
    isActive: t.id === currentTopic?.id,
    completionPercentage: t.completionPercentage,
    status: t.status,
  }));

  return (
    <>
      <TopicSidebar
        topics={sidebarTopics}
        onStartNewTopic={startNewTopic}
        onTopicSelect={switchTopic}
      />

      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto">
          <ConversationDisplay
            title={currentTopic?.title ?? "Interview"}
            messages={messages}
            onSkip={skipQuestion}
            isLoading={isLoading}
          />
        </div>

        <InterviewInput
          onSubmit={submitAnswer}
          onVoiceRecord={handleVoiceRecord}
          isLoading={isLoading}
          recording={recording}
          disabled={isLoading}
        />
      </div>
    </>
  );
}
