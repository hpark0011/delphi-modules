"use client";

import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { useMindDialog } from "./mind-dialog-2";
import { showTrainingQueueToast } from "./training-queue-toast";

const gridContentItems = ["X", "Youtube", "Website", "Podcast"];

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
        "bg-card p-4 px-5 pr-4 shadow-card-primary rounded-2xl group hover:bg-white/10 dark:hover:bg-white/10 cursor-pointer",
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
  const { addToQueue } = useTrainingQueue();
  const { close } = useMindDialog();

  const handleAddContent = (itemName?: string) => {
    let itemsToAdd: Array<{
      name: string;
      docType:
        | "interview"
        | "youtube"
        | "x"
        | "website"
        | "podcast"
        | "file"
        | "generic";
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
      itemsToAdd = [
        { name: "Podcast 1", docType: "podcast", shouldDelete: true },
      ];
    }

    if (itemsToAdd.length > 0) {
      addToQueue(itemsToAdd);
      const itemCount = itemsToAdd.length;
      showTrainingQueueToast(
        itemCount,
        <Icon name='CheckedCircleFillIcon' className='size-5 text-green-500' />
      );
      close();
    }
  };

  return (
    <div className='flex flex-col min-w-0 min-h-0 h-full'>
      <div className='flex flex-col gap-2'>
        <ContentCard
          title='Interview mode'
          description='Train your Delphi by answering questions relevant to you.'
          onAdd={() => handleAddContent("Interview mode")}
          className='h-[220px]'
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
  );
}
