"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { createContext, useContext, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  MIND_DIALOG_TABS,
  DEFAULT_MIND_DIALOG_TAB,
  MindDialogTabId,
  getMindDialogWidthClass,
} from "./mind-dialog-config";
import { MindProgressBar } from "./mind-progress-bar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMindScore } from "./mind-score-context";
import { useTrainingStatus } from "@/hooks/use-training-status";
import type { IconName } from "@/components/ui/icon";

// Re-export for convenience
export type { MindDialogTabId } from "./mind-dialog-config";

interface MindDialogContextType {
  setActiveTab: (tab: MindDialogTabId) => void;
  openWithTab: (tab: MindDialogTabId) => void;
  close: () => void;
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
  const { hasActiveItems, finishedCount, totalCount } = useTrainingStatus();

  return (
    <div className='flex-shrink-0 flex flex-col rounded-[16px] m-1 mb-0 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87  dark:border-white/3 dark:bg-black/40 p-2 pb-1 relative'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px]'>
        <MindProgressBar
          progressToNextLevel={progressToNextLevel}
          nextLevelThreshold={nextLevelThreshold}
          progressCap={progressCap}
          lastIncrement={lastIncrement}
          lastDecrement={lastDecrement}
        />
      </div>
      <div className='flex justify-end items-center'>
        <VisuallyHidden>
          <DialogTitle>Mind</DialogTitle>
        </VisuallyHidden>
        <Button size='sm' className='h-7' variant='glossy'>
          Preview
        </Button>
      </div>

      <div className='flex flex-col items-center justify-center mb-6 gap-1'>
        <div className='text-5xl text-white tracking-tighter font-medium w-full text-center'>
          {/* Mind Score */}
          {current}
        </div>
        <div className='text-sm text-text-muted w-full text-center'>
          {level}
        </div>
      </div>

      <div className='flex justify-center'>
        <TabsList className='gap-0.5'>
          {MIND_DIALOG_TABS.map((tab) => {
            // Dynamic config for training-status tab when items are being processed
            const isTrainingTab = tab.id === "training-status";
            const icon: IconName =
              isTrainingTab && hasActiveItems ? "LoaderCircleIcon" : tab.icon;
            const label =
              isTrainingTab && hasActiveItems
                ? `Learning ${finishedCount}/${totalCount}`
                : tab.label;
            const iconClassName =
              isTrainingTab && hasActiveItems
                ? "size-4 text-current animate-spin"
                : "size-4 text-current";

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className='text-[13px] h-7 rounded-md px-2 tracking-tight text-text-muted hover:bg-white/10 data-[state=active]:bg-white/10 data-[state=active]:text-white gap-1 pl-1.5'
              >
                <Icon name={icon} className={iconClassName} aria-hidden='true' />
                {label}
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
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MindDialogTabId>(defaultTab);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const openWithTab = (tab: MindDialogTabId) => {
    setActiveTab(tab);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  // Get width class for current tab
  const dialogWidthClass = useMemo(
    () => getMindDialogWidthClass(activeTab),
    [activeTab]
  );

  return (
    <MindDialogContext.Provider
      value={{ setActiveTab, openWithTab, close: closeDialog }}
    >
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent
          // showCloseButton
          className={`p-0 sm:max-w-[calc(100%-2rem)] ${dialogWidthClass} rounded-2xl max-h-[90vh] h-full flex flex-col overflow-hidden bg-extra-light`}
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MindDialogTabId)}
            className='w-full flex flex-col h-full min-h-0 gap-0'
          >
            {/* Fixed Header Section */}
            <MindDialogHeader />

            {/* Scrollable Content Section */}
            <div className='flex-1 overflow-y-auto min-h-0 p-4'>
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
