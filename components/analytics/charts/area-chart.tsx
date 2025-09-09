"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCompactNumber } from "@/lib/utils";
import {
  ChartTooltipRoot,
  ChartTooltipLabel,
  ChartTooltipValue,
  ChartTooltipChange,
  ChartTooltipContent,
} from "./chart-tooltip";

interface AreaChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  title: string;
  color?: string;
  className?: string;
  yAxisDomain?: [number, number];
}

// Custom tooltip is defined inside the component to access the series data

export function AreaChartComponent({
  data,
  title,
  color = "#ea580c",
  className,
  yAxisDomain,
}: AreaChartProps) {
  const gradientId = React.useId();
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === "dark";

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload?: { date?: string; value?: number };
    }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (!active || !payload || !payload.length) return null;

    const currentValue = payload[0].value;
    const currentIndex =
      typeof label === "string" ? data.findIndex((d) => d.date === label) : -1;
    const previousValue =
      currentIndex > 0 ? data[currentIndex - 1]?.value : undefined;

    return (
      <ChartTooltipRoot className='pb-1.5'>
        <ChartTooltipLabel label={label || ""} />
        <ChartTooltipContent>
          <ChartTooltipValue value={currentValue} />
          <ChartTooltipChange
            currentValue={currentValue}
            previousValue={previousValue}
          />
        </ChartTooltipContent>
      </ChartTooltipRoot>
    );
  };

  return (
    <Card className={cn("rounded-[24px] border-none p-0", className)}>
      <CardHeader className='py-3 px-4 [.border-b]:pb-3 gap-0'>
        <CardTitle className='text-sm font-medium text-muted-foreground p-0'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 pr-4 pb-4'>
        <ResponsiveContainer width='100%' height={454}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={color} stopOpacity={0.3} />
                <stop offset='100%' stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='4 4'
              vertical={false}
              stroke={isDark ? "#21201C" : "#F1F0EF"}
            />

            <XAxis
              dataKey='date'
              tick={{ fontSize: 12, fill: "#8D8D86" }}
              tickLine={false}
              axisLine={{ stroke: isDark ? "#21201C" : "#F1F0EF" }}
              tickMargin={8}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#8D8D86" }}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
              domain={yAxisDomain}
              tickFormatter={(v) => formatCompactNumber(v as number)}
              tickMargin={4}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type='monotone'
              dataKey='value'
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
