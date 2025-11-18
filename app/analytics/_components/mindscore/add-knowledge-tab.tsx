"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
        "text-left px-3 py-1.5 rounded-md text-sm transition-colors justify-between flex items-baseline",
        selectedCategory === category
          ? "bg-[#F6F6F5] dark:bg-[#2C2C2A] text-text-primary font-medium"
          : "text-[#8D8D86] dark:text-neutral-500 hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A]"
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
        <button
          onClick={onAdd}
          className='bg-transparent border border-light rounded-full p-2 group-hover:bg-light transition-colors'
        >
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

  const handleAddContent = (itemName?: string) => {
    // Placeholder for add content functionality
    console.log("Add content for category:", selectedCategory, itemName);
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
