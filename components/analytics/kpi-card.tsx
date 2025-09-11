"use client";

import React from "react";
import type {
  MetricValue,
  QuestionMetric,
  TimeMetric,
} from "@/app/analytics/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  metric: MetricValue | QuestionMetric | TimeMetric;
  className?: string;
}

function isQuestionMetric(
  metric: MetricValue | QuestionMetric | TimeMetric
): metric is QuestionMetric {
  return "answered" in metric && "total" in metric;
}

function isTimeMetric(
  metric: MetricValue | QuestionMetric | TimeMetric
): metric is TimeMetric {
  return "hours" in metric && "minutes" in metric;
}

function formatValue(
  metric: MetricValue | QuestionMetric | TimeMetric
): string | React.ReactNode {
  if (isQuestionMetric(metric)) {
    return (
      <>
        <span>{metric.answered}</span>
        <span className='text-sm text-[#8D8D86]'>
          <span className='mx-[1px]'>/</span> {metric.total}
        </span>
      </>
    );
  }

  if (isTimeMetric(metric)) {
    return `${metric.hours}hr ${metric.minutes}min`;
  }

  if (metric.formatted) {
    return metric.formatted;
  }

  if (metric.value >= 1000) {
    return `${(metric.value / 1000).toFixed(1)}K`;
  }

  return metric.value.toString();
}

export function KPICard({ label, metric, className }: KPICardProps) {
  const trendColor = metric.isPositive
    ? "text-[var(--color-trend-positive)]"
    : "text-[var(--color-trend-negative)]";

  return (
    <Card
      className={cn(
        "rounded-[24px] border-none shadow-none bg-transparent py-2.5 px-4 w-full dark:bg-transparent",
        className,
        "flex-1"
      )}
    >
      <CardContent className='p-0 border-none'>
        <div className='space-y-4'>
          <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400 w-full text-start'>
            {label}
          </p>
          <div className='flex items-baseline gap-2'>
            <p className='text-3xl tracking-[-0.04em] text-text-[#21201C] dark:text-text-[#EEEEEC]'>
              {formatValue(metric)}
            </p>
            <span className={cn("text-sm font-medium", trendColor)}>
              {metric.isPositive ? "+" : "-"}
              {Math.abs(metric.change)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
