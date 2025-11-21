"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMindDialog } from "./mind-dialog";
import { useMindScore } from "./mind-score-context";

type ContentCategory =
  | "Popular"
  | "Interview"
  | "Websites"
  | "YouTube"
  | "Socials"
  | "Files"
  | "Podcasts"
  | "Snippets"
  | "Notes Apps"
  | "Messaging Apps";

const categories: ContentCategory[] = [
  "Popular",
  "Interview",
  "Websites",
  "YouTube",
  "Socials",
  "Files",
  "Podcasts",
  "Snippets",
  "Notes Apps",
  "Messaging Apps",
];

const gridContentItems = ["X", "Youtube", "Website", "Podcast"];

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-shrink-0 w-40 flex flex-col'>
      <div className='flex flex-col gap-1'>{children}</div>
    </div>
  );
}

Sidebar.displayName = "Sidebar";

interface SidebarItemProps {
  category: ContentCategory;
  selectedCategory: ContentCategory;
  setSelectedCategory: (category: ContentCategory) => void;
}

function SidebarItem({
  category,
  selectedCategory,
  setSelectedCategory,
}: SidebarItemProps) {
  return (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={cn(
        "text-left px-3 py-1.5 rounded-md text-sm transition-colors justify-between flex items-baseline ",
        selectedCategory === category
          ? "bg-white dark:bg-[#2C2C2A] text-text-primary font-medium"
          : "text-[#8D8D86] dark:text-neutral-500 hover:bg-white dark:hover:bg-[#2C2C2A]"
      )}
    >
      {category}
      {category === "Interview" && <Badge variant='new'>New</Badge>}
    </button>
  );
}

SidebarItem.displayName = "SidebarItem";

interface ContentCardProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  className?: string;
}

function ContentCard({
  title,
  description,
  onAdd,
  className,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-card p-4 px-5 pr-4 shadow-card-primary rounded-2xl group hover:bg-extra-light/50 cursor-pointer",
        className
      )}
      onClick={onAdd}
    >
      <div className='flex items-end justify-between h-full'>
        <div className='flex flex-col gap-0.5 '>
          <h1
            className={cn(
              "font-medium text-lg leading-[1.2]",
              !description && "text-text-primary"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className='text-[14px] leading-[1.4] text-text-tertiary'>
              {description}
            </p>
          )}
        </div>
        <button className='bg-transparent border border-light rounded-full p-2 group-hover:bg-light transition-colors'>
          <Icon name='PlusIcon' className='size-5 text-icon-medium' />
        </button>
      </div>
    </div>
  );
}

ContentCard.displayName = "ContentCard";

export function AddKnowledgeTab() {
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory>("Popular");
  const { addToQueue } = useTrainingQueue();
  const { close } = useMindDialog();

  const handleAddContent = (itemName?: string) => {
    let itemsToAdd: Array<{
      name: string;
      docType: "interview" | "youtube" | "x" | "website" | "podcast" | "file" | "generic";
      shouldFail?: boolean;
      shouldDelete?: boolean;
    }> = [];

    if (itemName === "Interview mode") {
      itemsToAdd = [
        { name: "Interview Question 1", docType: "interview" },
        { name: "Interview Question 2", docType: "interview" },
        { name: "Interview Question 3", docType: "interview" },
      ];
    } else if (itemName === "Youtube") {
      itemsToAdd = [
        { name: "YouTube Video 1", docType: "youtube" },
        { name: "YouTube Video 2", docType: "youtube" },
        { name: "YouTube Video 3", docType: "youtube" },
        { name: "YouTube Video 4", docType: "youtube" },
      ];
    } else if (itemName === "X") {
      itemsToAdd = [{ name: "X Post 1", docType: "x" }];
    } else if (itemName === "Website") {
      itemsToAdd = [
        { name: "Website 1", docType: "website", shouldFail: true },
        { name: "Website 2", docType: "website", shouldFail: true },
      ];
    } else if (itemName === "Podcast") {
      itemsToAdd = [{ name: "Podcast 1", docType: "podcast", shouldDelete: true }];
    }

    if (itemsToAdd.length > 0) {
      addToQueue(itemsToAdd);
      close();
    }
  };

  return (
    <div className='flex gap-4 h-full min-h-0'>
      {/* Sidebar */}
      <Sidebar>
        {categories.map((category) => (
          <SidebarItem
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </Sidebar>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0 min-h-0'>
        {/* Body */}
        <div className='flex flex-col gap-2 pr-2'>
          <ContentCard
            title='Interview mode'
            description='Train your Delphi by answering questions relevant to you.'
            onAdd={() => handleAddContent("Interview mode")}
            className='h-[240px]'
          />
          {/* 2x2 Grid */}
          <div className='flex-1 min-h-0 grid grid-cols-2 gap-2'>
            {gridContentItems.map((item) => (
              <ContentCard
                key={item}
                title={item}
                onAdd={() => handleAddContent(item)}
                className='h-[152px]'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
