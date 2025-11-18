"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { createContext, useContext, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  MIND_DIALOG_TABS,
  DEFAULT_MIND_DIALOG_TAB,
  MindDialogTabId,
  getMindDialogWidthClass,
} from "./mind-dialog-config";

// Re-export for convenience
export type { MindDialogTabId } from "./mind-dialog-config";

interface MindDialogContextType {
  setActiveTab: (tab: MindDialogTabId) => void;
  openWithTab: (tab: MindDialogTabId) => void;
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

export function MindDialog({
  children,
  defaultTab = DEFAULT_MIND_DIALOG_TAB,
}: MindDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MindDialogTabId>(defaultTab);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset to default when closing
      setActiveTab(defaultTab);
    }
  };

  const openWithTab = (tab: MindDialogTabId) => {
    setActiveTab(tab);
    setOpen(true);
  };

  // Get width class for current tab
  const dialogWidthClass = useMemo(
    () => getMindDialogWidthClass(activeTab),
    [activeTab]
  );

  return (
    <MindDialogContext.Provider value={{ setActiveTab, openWithTab }}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent
          // showCloseButton
          className={`p-3 sm:max-w-[calc(100%-2rem)] ${dialogWidthClass} rounded-xl max-h-[80vh] h-full flex flex-col overflow-hidden`}
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MindDialogTabId)}
            className='w-full flex flex-col h-full min-h-0'
          >
            {/* Fixed Header Section */}
            <div className='flex-shrink-0 flex flex-col gap-4 pb-4'>
              <div className='flex justify-between items-center'>
                <DialogTitle className='p-1 px-2'>Mind</DialogTitle>
                <Button size='sm' className='h-7'>
                  Preivew
                </Button>
              </div>
              <div className='flex justify-start'>
                <TabsList>
                  {MIND_DIALOG_TABS.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Scrollable Content Section */}
            <div className='flex-1 overflow-y-auto min-h-0'>
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
