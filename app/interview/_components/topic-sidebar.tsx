"use client";

import { useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Fade-in animation wrapper
function AnimateFadeIn({
  children,
  initialDelay = 0,
  duration = 0.2,
  ...motionProps
}: HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  initialDelay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      {...motionProps}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: "easeInOut", delay: initialDelay }}
    >
      {children}
    </motion.div>
  );
}

// Progress bar component
function TopicProgressBar({
  topicId,
  progress,
  onClick,
  isCurrentTopic,
}: {
  topicId: string;
  progress: number;
  onClick?: () => void;
  isCurrentTopic: boolean;
}) {
  const width = progress <= 0 ? 0 : progress >= 1 ? 100 : progress * 100;

  return (
    <div
      className={cn(
        "h-0.5 w-1.5 bg-muted rounded-full",
        "transition-all duration-150 ease-in-out",
        "relative overflow-hidden",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <motion.div
        key={`progress-bar-${topicId}`}
        className={cn(
          "h-full",
          isCurrentTopic ? "bg-orange-500" : "bg-muted-foreground"
        )}
        style={{ width: `${width}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </div>
  );
}

// Title with optional percentage badge
function TopicProgressItemTitle({
  title,
  icon,
  isCurrentTopic,
  onClick,
  className,
  percentageValue,
}: {
  title?: string;
  icon?: React.ReactNode;
  isCurrentTopic: boolean;
  onClick?: () => void;
  className?: string;
  percentageValue?: number;
}) {
  const showBadge =
    percentageValue !== undefined &&
    percentageValue > 0 &&
    percentageValue < 100;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      onClick={onClick}
    >
      <AnimateFadeIn initialDelay={0.1} duration={0.3}>
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-muted-foreground text-xs xl:text-sm font-medium line-clamp-3 xl:line-clamp-2 text-left",
              isCurrentTopic && "text-foreground",
              "hover:text-foreground cursor-pointer",
              icon ? "group ml-0" : "ml-1"
            )}
          >
            {icon}
            {title}
          </p>
          {showBadge && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0.5 bg-orange-500/20 text-orange-600"
            >
              {percentageValue}%
            </Badge>
          )}
        </div>
      </AnimateFadeIn>
    </div>
  );
}

// Topic progress item with bars
function TopicProgressItem({
  topic,
  topicProgress,
  isCurrentTopic,
  onTopicClick,
}: {
  topic: Topic;
  topicProgress: number;
  isCurrentTopic: boolean;
  onTopicClick: (topic: Topic) => void;
}) {
  const percentageValue = Math.round(topicProgress * 100);

  return (
    <div className="flex items-start gap-1">
      <div className="space-y-1 relative">
        <div
          className={cn(
            "h-0.5 w-4 rounded-full shrink-0",
            isCurrentTopic
              ? "bg-orange-500"
              : topicProgress > 0
                ? "bg-muted-foreground"
                : "bg-muted",
            "transition-all duration-200 ease-in-out"
          )}
        />
        {Array.from({ length: 9 }).map((_, index) => (
          <TopicProgressBar
            key={`progress-bar-${topic.id}-${index}`}
            progress={topicProgress * 10 - index}
            topicId={topic.id}
            isCurrentTopic={isCurrentTopic}
            onClick={() => onTopicClick(topic)}
          />
        ))}
      </div>
      <TopicProgressItemTitle
        title={topic.title}
        isCurrentTopic={isCurrentTopic}
        onClick={() => onTopicClick(topic)}
        className="-mt-[7px] xl:-mt-[9px]"
        percentageValue={percentageValue}
      />
    </div>
  );
}

// New topic button
function NewCustomTopicProgressItem({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-1">
      <div className="space-y-1">
        <div
          className={cn(
            "h-0.5 w-4 rounded-full shrink-0",
            "bg-muted",
            "transition-all duration-200 ease-in-out"
          )}
        />
        {Array.from({ length: 9 }).map((_, index) => (
          <TopicProgressBar
            key={`new-topic-bar-${index}`}
            progress={0}
            topicId=""
            isCurrentTopic={false}
          />
        ))}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="-mt-[7px] xl:-mt-[9px] hover:bg-transparent p-0 h-auto"
        onClick={onClick}
        disabled={disabled}
      >
        <TopicProgressItemTitle
          icon={
            <Plus className="size-3 text-muted-foreground inline-block mr-0.5 mb-0.5 group-hover:text-foreground" />
          }
          title="Start a New Topic"
          isCurrentTopic={false}
        />
      </Button>
    </div>
  );
}

export function TopicSidebar({
  topics,
  onStartNewTopic,
  onTopicSelect,
}: TopicSidebarProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleTopicClick = (topic: Topic) => {
    onTopicSelect?.(topic.id);
  };

  return (
    <div
      className={cn(
        "hidden lg:block",
        "fixed left-0 p-4 top-1/2 -translate-y-1/2",
        "max-w-44 xl:max-w-52 2xl:max-w-64",
        "space-y-1"
      )}
    >
      <ScrollArea
        ref={scrollAreaRef}
        className="h-72 space-y-1 relative overflow-hidden"
      >
        <div className="h-90 space-y-1 py-8 pr-4 relative">
          {topics.map((topic) => {
            const isCurrentTopic = topic.isActive ?? false;
            // Convert percentage (0-100) to progress (0-1)
            const progress =
              topic.completionPercentage !== undefined
                ? topic.completionPercentage / 100
                : topic.status === "COMPLETED"
                  ? 1.0
                  : 0.0;

            return (
              <TopicProgressItem
                key={`topic-${topic.id}`}
                topic={topic}
                topicProgress={progress}
                isCurrentTopic={isCurrentTopic}
                onTopicClick={handleTopicClick}
              />
            );
          })}
          <NewCustomTopicProgressItem onClick={onStartNewTopic} />
        </div>

        {/* top and bottom gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        {/* hides scrollbar */}
        <div className="absolute inset-y-0 right-0 w-2.5 bg-background z-50" />
      </ScrollArea>
    </div>
  );
}
