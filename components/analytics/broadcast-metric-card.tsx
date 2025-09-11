"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import * as React from "react";

interface BroadcastMetricCardProps {
  label: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  unit?: string;
  className?: string;
}

export function BroadcastMetricCard({
  label,
  value,
  change,
  changeType,
  unit = "%",
  className,
}: BroadcastMetricCardProps) {
  const isPositive = changeType === "increase";
  const Icon = isPositive ? ArrowUp : ArrowDown;
  
  return (
    <div
      className={cn(
        "bg-white dark:bg-card rounded-[24px] p-4 shadow-card-primary flex flex-col gap-2",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold">
          {value}{unit}
        </span>
        <div
          className={cn(
            "flex items-center gap-1 text-sm",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          <Icon className="w-3 h-3" />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        from 2% (last week)
      </p>
    </div>
  );
}