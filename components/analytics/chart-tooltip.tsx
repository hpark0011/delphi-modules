"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/utils";

interface ChartTooltipRootProps {
  children: React.ReactNode;
  className?: string;
}

export function ChartTooltipRoot({
  children,
  className,
}: ChartTooltipRootProps) {
  return (
    <div
      className={cn(
        "bg-[#21201C] px-3 py-2 rounded-[12px] shadow-xl border border-[#3A3935]/5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ChartTooltipLabelProps {
  label: string;
  className?: string;
}

export function ChartTooltipLabel({
  label,
  className,
}: ChartTooltipLabelProps) {
  return (
    <p className={cn("text-sm font-medium mb-1 text-[#8D8D86]", className)}>
      {label}
    </p>
  );
}

interface ChartTooltipValueProps {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}

export function ChartTooltipValue({
  value,
  className,
  formatter = formatCompactNumber,
}: ChartTooltipValueProps) {
  return (
    <p className={cn("text-lg font-medium text-white", className)}>
      {formatter(value)}
    </p>
  );
}

interface ChartTooltipChangeProps {
  currentValue: number;
  previousValue?: number;
  className?: string;
}

export function ChartTooltipChange({
  currentValue,
  previousValue,
  className,
}: ChartTooltipChangeProps) {
  let percentageText = "0%";
  let changeClass = "text-[var(--color-trend-neutral)]";

  if (typeof previousValue === "number" && previousValue !== 0) {
    const rawChange = ((currentValue - previousValue) / previousValue) * 100;
    const rounded = Math.abs(rawChange) < 0.1 ? 0 : rawChange;
    const sign = rounded > 0 ? "+" : rounded < 0 ? "-" : "";
    percentageText = `${sign}${Math.abs(rounded).toFixed(1)}%`;

    changeClass =
      rounded > 0
        ? "text-[var(--color-trend-positive)]"
        : rounded < 0
          ? "text-[var(--color-trend-negative)]"
          : "text-[var(--color-trend-neutral)]";
  }

  return (
    <p className={cn("text-sm font-medium", changeClass, className)}>
      {percentageText}
    </p>
  );
}

interface ChartTooltipItemProps {
  color: string;
  label: string;
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}

export function ChartTooltipItem({
  color,
  label,
  value,
  className,
  formatter = formatCompactNumber,
}: ChartTooltipItemProps) {
  return (
    <div className={cn("flex items-center gap-2 w-[144px]", className)}>
      <div
        className='w-[10px] h-[10px] rounded-[3px] flex-shrink-0'
        style={{ backgroundColor: color }}
      />
      <span className='text-sm text-gray-300'>{label}</span>
      <span className='text-sm ml-auto text-white'>{formatter(value)}</span>
    </div>
  );
}

interface ChartTooltipContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ChartTooltipContent({
  children,
  className,
}: ChartTooltipContentProps) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>{children}</div>
  );
}

interface ChartTooltipItemsProps {
  children: React.ReactNode;
  className?: string;
}

export function ChartTooltipItems({
  children,
  className,
}: ChartTooltipItemsProps) {
  return <div className={cn("space-y-0", className)}>{children}</div>;
}

// Utility function to calculate percentage change
export function calculatePercentageChange(
  currentValue: number,
  previousValue?: number
): { text: string; trend: "positive" | "negative" | "neutral" } {
  if (typeof previousValue !== "number" || previousValue === 0) {
    return { text: "0%", trend: "neutral" };
  }

  const rawChange = ((currentValue - previousValue) / previousValue) * 100;
  const rounded = Math.abs(rawChange) < 0.1 ? 0 : rawChange;
  const sign = rounded > 0 ? "+" : rounded < 0 ? "-" : "";
  const text = `${sign}${Math.abs(rounded).toFixed(1)}%`;
  const trend = rounded > 0 ? "positive" : rounded < 0 ? "negative" : "neutral";

  return { text, trend };
}
