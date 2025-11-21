"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  title: string;
  isActive?: boolean;
}

interface TopicSidebarProps {
  topics: Topic[];
  onStartNewTopic?: () => void;
}

export function TopicSidebar({ topics, onStartNewTopic }: TopicSidebarProps) {
  return (
    <div className='hidden lg:block fixed left-0 p-4 top-1/2 -translate-y-1/2 max-w-44 xl:max-w-52 2xl:max-w-64 space-y-1'>
      <div className='space-y-2'>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={cn(
              "w-full text-left px-4 py-2 rounded-lg transition-colors",
              topic.isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {topic.title}
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
