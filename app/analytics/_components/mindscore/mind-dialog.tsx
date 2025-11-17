"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { createContext, useContext, useState } from "react";
import { KnowledgeTab } from "./knowledge-tab";
import { TrainingStatusTab } from "./training-status-tab";

interface MindDialogContextType {
  setActiveTab: (tab: "training-status" | "knowledge") => void;
  openWithTab: (tab: "training-status" | "knowledge") => void;
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
  defaultTab?: "training-status" | "knowledge";
}

export function MindDialog({
  children,
  defaultTab = "training-status",
}: MindDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"training-status" | "knowledge">(
    defaultTab
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset to default when closing
      setActiveTab(defaultTab);
    }
  };

  const openWithTab = (tab: "training-status" | "knowledge") => {
    setActiveTab(tab);
    setOpen(true);
  };

  return (
    <MindDialogContext.Provider value={{ setActiveTab, openWithTab }}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent
          showCloseButton
          className={`p-3 sm:max-w-[calc(100%-2rem)] ${
            activeTab === "knowledge" ? "w-6xl" : "w-3xl"
          } rounded-xl max-h-[80vh] overflow-y-auto h-full`}
        >
          <DialogTitle className='p-1 mb-2 px-2'>Mind</DialogTitle>
          <div className='flex flex-col'>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "training-status" | "knowledge")
              }
              className='w-full'
            >
              <div className='flex justify-start'>
                <TabsList>
                  <TabsTrigger value='training-status'>
                    Training Status
                  </TabsTrigger>
                  <TabsTrigger value='knowledge'>Knowledge</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value='training-status'>
                <TrainingStatusTab />
              </TabsContent>
              <TabsContent value='knowledge'>
                <KnowledgeTab />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </MindDialogContext.Provider>
  );
}
