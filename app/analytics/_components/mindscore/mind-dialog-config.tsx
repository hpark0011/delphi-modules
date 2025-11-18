import React from "react";
import type { IconName } from "@/components/ui/icon";
import { TrainingStatusTab } from "./training-status-tab";
import { KnowledgeTab } from "./knowledge-tab";
import { AddKnowledgeTab } from "./add-knowledge-tab";

export interface MindDialogTabConfig {
  id: string;
  label: string;
  component: React.ComponentType;
  widthClass: "w-4xl" | "w-6xl" | "w-3xl";
  icon: IconName;
}

export const MIND_DIALOG_TABS: MindDialogTabConfig[] = [
  {
    id: "training-status",
    label: "Training Status",
    component: TrainingStatusTab,
    widthClass: "w-4xl",
    icon: "ChartBarFillIcon",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    component: KnowledgeTab,
    widthClass: "w-6xl",
    icon: "SquareStackFillIcon",
  },
  {
    id: "add-knowledge",
    label: "Add Knowledge",
    component: AddKnowledgeTab,
    widthClass: "w-3xl",
    icon: "PlusIcon",
  },
] as const;

// Generate tab ID type from config
export type MindDialogTabId = (typeof MIND_DIALOG_TABS)[number]["id"];

// Get default tab ID
export const DEFAULT_MIND_DIALOG_TAB: MindDialogTabId = "training-status";

// Helper function to get tab config by ID
export function getMindDialogTabConfig(
  id: MindDialogTabId
): MindDialogTabConfig {
  const tab = MIND_DIALOG_TABS.find((t) => t.id === id);
  if (!tab) {
    throw new Error(`Tab with id "${id}" not found in MIND_DIALOG_TABS`);
  }
  return tab;
}

// Helper function to get width class for a tab
export function getMindDialogWidthClass(
  tabId: MindDialogTabId
): "w-4xl" | "w-6xl" | "w-3xl" {
  return getMindDialogTabConfig(tabId).widthClass;
}
