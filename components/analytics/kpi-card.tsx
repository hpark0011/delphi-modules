"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { MetricValue, QuestionMetric, TimeMetric } from "@/app/analytics/types"

interface KPICardProps {
  label: string
  metric: MetricValue | QuestionMetric | TimeMetric
  className?: string
}

function isQuestionMetric(metric: MetricValue | QuestionMetric | TimeMetric): metric is QuestionMetric {
  return 'answered' in metric && 'total' in metric
}

function isTimeMetric(metric: MetricValue | QuestionMetric | TimeMetric): metric is TimeMetric {
  return 'hours' in metric && 'minutes' in metric
}

function formatValue(metric: MetricValue | QuestionMetric | TimeMetric): string {
  if (isQuestionMetric(metric)) {
    return `${metric.answered}/${metric.total}`
  }
  
  if (isTimeMetric(metric)) {
    return `${metric.hours}hr ${metric.minutes}min`
  }
  
  if (metric.formatted) {
    return metric.formatted
  }
  
  if (metric.value >= 1000) {
    return `${(metric.value / 1000).toFixed(1)}K`
  }
  
  return metric.value.toString()
}

export function KPICard({ label, metric, className }: KPICardProps) {
  const TrendIcon = metric.isPositive ? TrendingUp : TrendingDown
  const trendColor = metric.isPositive ? "text-green-600" : "text-red-600"
  const trendBgColor = metric.isPositive ? "bg-green-50" : "bg-red-50"
  
  return (
    <Card className={cn("border-gray-200 shadow-sm", className)}>
      <CardContent className="p-5">
        <div className="space-y-3">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">
                {formatValue(metric)}
              </p>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md",
              trendBgColor
            )}>
              <TrendIcon className={cn("h-3 w-3", trendColor)} />
              <span className={cn("text-xs font-medium", trendColor)}>
                {Math.abs(metric.change)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}