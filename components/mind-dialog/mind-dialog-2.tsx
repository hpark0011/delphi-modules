"use client";

import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { cn } from "@/lib/utils";
import { type TrainingItemStatus } from "@/utils/training-status-helpers";
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

export function MindDialogHeader2({ level }: { level: string }) {
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

  return (
    <div className='flex flex-col justify-between items-center w-full relative'>
      <VisuallyHidden>
        <DialogTitle>Mind</DialogTitle>
      </VisuallyHidden>
      <div className='flex justify-end items-center z-10 pt-2 pr-2 w-full absolute top-2 right-2'>
        <Button
          size='sm'
          className='h-8 relative gap-1 has-[>svg]:pl-0.5 pl-2 rounded-full cursor-pointer'
          variant='glossy'
          onClick={onPreviewClick}
        >
          <MindStatusIcon status={queueStatus} />
          <span>Preview</span>
        </Button>
      </div>
      <div className='mt-2 flex flex-col items-center justify-center gap-6'>
        <MindWidgetSmall disableClick />
        {/* Mind level */}
        <div className='font-medium text-center text-sand-10'>{level}</div>
      </div>
      <div className='flex justify-center relative z-10 mt-8 mb-3 items-center'>
        {/* Training status & add knowledge tabs */}
        <TabsList className='gap-1'>
          {MIND_DIALOG_TABS.map((tab) => {
            const icon: IconName = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  // Base styles
                  "text-[14px] h-9 rounded-full px-2.5 pr-3 tracking-tight gap-1",
                  // Default state
                  "text-sand-9 dark:text-white/60 bg-sand-10/8",
                  // Hover state
                  "hover:bg-sand-10/20 dark:hover:bg-white/10",
                  // Active state
                  "data-[state=active]:bg-sand-1 data-[state=active]:text-sand-11 dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-[inset_0_2px_1px_0px_rgba(255,255,255,1),inset_0_-1px_1px_0px_rgba(255,255,255,1)] dark:data-[state=active]:shadow-[inset_0_2px_1px_0px_rgba(0,0,0,0.1),inset_0_-1px_1px_0px_rgba(0,0,0,0.1)]",
                  // Conditional styles
                  tab.id === "training-status" && "gap-0.5"
                )}
              >
                <Icon
                  name={icon}
                  className='size-4 text-sand-8'
                  aria-hidden='true'
                />
                <span className='whitespace-nowrap'>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </div>
  );
}

export function MindDialog({
  children,
  defaultTab = DEFAULT_MIND_DIALOG_TAB,
}: MindDialogProps) {
  const { level } = useMindScore();
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
          className={`p-0 sm:max-w-2xl ${dialogWidthClass} rounded-[36px] max-h-[87vh] h-full flex flex-col overflow-hidden bg-dialog`}
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
            <MindDialogHeader2 level={level} />

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
