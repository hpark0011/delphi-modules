"use client";

import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopicStatus } from "../_types";

interface Topic {
  id: string;
  title: string;
  isActive?: boolean;
  completionPercentage?: number;
  status?: TopicStatus;
}

interface TopicSidebarProps {
  topics: Topic[];
  onStartNewTopic?: () => void;
  onTopicSelect?: (topicId: string) => void;
}

export function TopicSidebar({ topics, onStartNewTopic, onTopicSelect }: TopicSidebarProps) {
  return (
    <div className='hidden lg:block fixed left-0 p-4 top-1/2 -translate-y-1/2 max-w-44 xl:max-w-52 2xl:max-w-64 space-y-1'>
      <div className='space-y-2'>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect?.(topic.id)}
            className={cn(
              "w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between gap-2",
              topic.isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <span className="truncate">{topic.title}</span>
            {topic.status === "COMPLETED" && (
              <Check className="h-4 w-4 text-green-500 shrink-0" />
            )}
            {topic.status === "IN_PROGRESS" && topic.completionPercentage !== undefined && topic.completionPercentage > 0 && (
              <span className="text-xs text-muted-foreground shrink-0">
                {topic.completionPercentage}%
              </span>
            )}
          </button>
        ))}

        <button
          onClick={onStartNewTopic}
          className='w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Start a New Topic
        </button>
      </div>
    </div>
  );
}
