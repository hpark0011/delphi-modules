"use client";

import { MindProgressBar } from "@/app/studio/_components/mindscore/mind-progress-bar";
import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import {
  generateShadowString,
  getLevelShadowColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { IconName } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export function MindDialogHeader2({ level }: { level: string }) {
  return (
    <div className='flex flex-col justify-between items-center w-full'>
      <VisuallyHidden>
        <DialogTitle>Mind</DialogTitle>
      </VisuallyHidden>
      <div className='mt-2 flex flex-col items-center justify-center gap-6'>
        <MindWidgetSmall disableClick />
        {/* Mind level */}
        <div className='font-medium text-center text-sand-10'>{level}</div>
      </div>
      <div className='flex justify-center relative z-10 mt-8 mb-3'>
        {/* Training status & add knowledge tabs */}
        <TabsList className='p-[1px] px-1 rounded-[12px] gap-1'>
          {MIND_DIALOG_TABS.map((tab) => {
            const icon: IconName = tab.icon;

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className='text-[14px] h-9 rounded-full px-2.5 pr-3 tracking-tight text-sand-9 dark:text-white/60  dark:hover:bg-white/10 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:text-sand-11 gap-1 bg-sand-10/10 hover:bg-sand-10/20'
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
