"use client";

import { MindProgressBar } from "@/app/studio/_components/mindscore/mind-progress-bar";
import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import {
  generateShadowString,
  getLevelShadowColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_MIND_DIALOG_TAB,
  MIND_DIALOG_TABS,
  MindDialogTabId,
  getMindDialogWidthClass,
} from "./mind-dialog-config";
import { type TrainingItemStatus } from "@/utils/training-status-helpers";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";

// Re-export for convenience
export type { MindDialogTabId } from "./mind-dialog-config";

interface MindDialogContextType {
  setActiveTab: (tab: MindDialogTabId) => void;
  openWithTab: (
    tab: MindDialogTabId,
    initialFilter?: TrainingItemStatus | "all"
  ) => void;
  close: () => void;
  initialFilter: TrainingItemStatus | "all" | null;
  clearInitialFilter: () => void;
}

const MindDialogContext = createContext<MindDialogContextType | null>(null);

export function useMindDialog() {
  const context = useContext(MindDialogContext);
  if (!context) {
    throw new Error("useMindDialog must be used within MindDialog");
  }
  return context;
}

interface MindDialogProps {
  children: React.ReactNode;
  defaultTab?: MindDialogTabId;
}

function MindDialogHeader() {
  const {
    current,
    level,
    progressToNextLevel,
    nextLevelThreshold,
    progressCap,
    lastIncrement,
    lastDecrement,
  } = useMindScore();
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const { queue, clearQueue } = useTrainingQueue();
  const { hasActiveItems, activeCount, queueStatus } =
    useTrainingStatus(hasUserReviewed);
  const { close } = useMindDialog();

  // Reset review state when queue becomes active or empty
  useEffect(() => {
    if (queueStatus === "active" && !hasUserReviewed) {
      setHasUserReviewed(true);
    }
    if (queue.length === 0 && !hasUserReviewed) {
      setHasUserReviewed(true);
    }
  }, [queueStatus, hasUserReviewed, queue.length]);

  const onPreviewClick = () => {
    // Mark as reviewed to change status from "finished" to "dull"
    if (queueStatus === "finished") {
      setHasUserReviewed(true);
    }
    clearQueue();
    close();
  };

  // Get level-based colors and generate shadow
  const levelColors = getLevelShadowColors(level);
  const defaultShadow = generateShadowString(levelColors, false);

  return (
    <div
      className='mind-area flex-shrink-0 flex flex-col m-1 mb-0 overflow-hidden bg-black  dark:border-white/3 p-2 pb-1 relative'
      style={{
        boxShadow: defaultShadow.replace(/_/g, " "),
      }}
    >
      <div className='absolute top-[3px] left-1/2 -translate-x-1/2 w-full max-w-[320px]'>
        <MindProgressBar
          progressToNextLevel={progressToNextLevel}
          nextLevelThreshold={nextLevelThreshold}
          progressCap={progressCap}
          lastIncrement={lastIncrement}
          lastDecrement={lastDecrement}
        />
      </div>
      <div className='flex justify-end items-center z-10 relative pt-2 pr-2'>
        <VisuallyHidden>
          <DialogTitle>Mind</DialogTitle>
        </VisuallyHidden>
        <Button
          size='sm'
          className='h-7.5 relative gap-1 has-[>svg]:pl-0.5 pl-2 rounded-full cursor-pointer'
          variant='glossy'
          onClick={onPreviewClick}
        >
          <MindStatusIcon status={queueStatus} />
          <span>Preview</span>
        </Button>
      </div>

      <div className='flex flex-col items-center justify-center mb-6 gap-1'>
        <div className='text-6xl text-white tracking-tighter font-medium w-full text-center'>
          {/* Mind Score */}
          {current}
        </div>
        <div className='text-[15px] font-medium text-center text-white/70'>
          {level}
        </div>
      </div>

      <div className='flex justify-center relative z-10'>
        <TabsList className='gap-0.5'>
          {MIND_DIALOG_TABS.map((tab) => {
            // Dynamic config for training-status tab when items are being processed
            const isTrainingTab = tab.id === "training-status";
            const isActiveTraining = isTrainingTab && hasActiveItems;
            const icon: IconName = tab.icon;
            const label = isActiveTraining ? (
              <>Learning {activeCount} Items</>
            ) : (
              tab.label
            );

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "text-[13px] h-7 rounded-md px-2 tracking-tight text-text-tertiary-inverse dark:text-white/60 hover:bg-white/10 dark:hover:bg-white/10 data-[state=active]:bg-white/10 dark:data-[state=active]:bg-white/10 data-[state=active]:text-white gap-1 pl-1.5",
                  isActiveTraining && "gap-0.5"
                )}
              >
                {isActiveTraining ? (
                  <MindStatusIcon status='active' />
                ) : (
                  <Icon
                    name={icon}
                    className='size-4 text-current'
                    aria-hidden='true'
                  />
                )}
                <span
                  className={cn(
                    "whitespace-nowrap",
                    isActiveTraining && "ml-0.5"
                  )}
                >
                  {label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* Mind Area Inner */}
      <div className='mind-area-inner studio absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] shadow-[inset_0px_-1px_1px_1px_rgba(255,255,255,0.7),inset_0px_2px_2px_2px_rgba(255,255,255,0.4),inset_0px_6px_6px_2px_rgba(255,255,255,0.2)] blur-[6px]' />
    </div>
  );
}

export function MindDialogHeader2() {
  return (
    <div className='flex flex-col justify-between items-center w-full'>
      <VisuallyHidden>
        <DialogTitle>Mind</DialogTitle>
      </VisuallyHidden>
      <div className='mt-2'>
        <MindWidgetSmall />
      </div>
    </div>
  );
}

export function MindDialog({
  children,
  defaultTab = DEFAULT_MIND_DIALOG_TAB,
}: MindDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MindDialogTabId>(defaultTab);
  const [initialFilter, setInitialFilter] = useState<
    TrainingItemStatus | "all" | null
  >(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Clear initial filter when dialog closes
    if (!isOpen) {
      setInitialFilter(null);
    }
  };

  const openWithTab = (
    tab: MindDialogTabId,
    filter?: TrainingItemStatus | "all"
  ) => {
    setActiveTab(tab);
    if (filter) {
      setInitialFilter(filter);
    }
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setInitialFilter(null);
  };

  const clearInitialFilter = () => {
    setInitialFilter(null);
  };

  // Get width class for current tab
  const dialogWidthClass = useMemo(
    () => getMindDialogWidthClass(activeTab),
    [activeTab]
  );

  return (
    <MindDialogContext.Provider
      value={{
        setActiveTab,
        openWithTab,
        close: closeDialog,
        initialFilter,
        clearInitialFilter,
      }}
    >
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent
          // showCloseButton
          className={`p-0 sm:max-w-2xl ${dialogWidthClass} rounded-[36px] max-h-[90vh] h-full flex flex-col overflow-hidden bg-dialog`}
          style={{
            boxShadow:
              "0 2px 2px 0 rgba(255, 255, 255, 1) inset,  0 10.213px 10.213px -5.107px rgba(0, 0, 0, 0.03), 0 5.107px 5.107px -2.553px rgba(0, 0, 0, 0.03), 0 2.553px 2.553px -2px rgba(0, 0, 0, 0.03), 0 0.638px 0.638px -0.319px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MindDialogTabId)}
            className='w-full flex flex-col h-full min-h-0 gap-0'
          >
            {/* Fixed Header Section */}
            {/* <MindDialogHeader /> */}
            <MindDialogHeader2 />

            {/* Scrollable Content Section */}
            <div className='flex-1 overflow-y-auto min-h-0 p-4 pt-2'>
              {MIND_DIALOG_TABS.map((tab) => {
                const TabComponent = tab.component;
                return (
                  <TabsContent key={tab.id} value={tab.id} className='mt-0'>
                    <TabComponent />
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </MindDialogContext.Provider>
  );
}
