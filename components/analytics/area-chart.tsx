"use client";

import * as React from "react";
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

    let percentageText = "0%";
    let isPositive = false;
    let isNegative = false;

    if (typeof previousValue === "number" && previousValue !== 0) {
      const rawChange = ((currentValue - previousValue) / previousValue) * 100;
      const rounded = Math.abs(rawChange) < 0.1 ? 0 : rawChange;
      const sign = rounded > 0 ? "+" : rounded < 0 ? "-" : "";
      percentageText = `${sign}${Math.abs(rounded).toFixed(1)}%`;
      isPositive = rounded > 0;
      isNegative = rounded < 0;
    }

    const percentageClass = isPositive
      ? "text-[#208368]"
      : isNegative
        ? "text-[#E5484D]"
        : "text-[#8D8D86]";

    return (
      <div className='bg-[#21201C]  p-3 rounded-lg shadow-lg border border-[#3A3935]'>
        <p className='text-sm font-medium mb-1 text-[#8D8D86]'>{label}</p>
        <div className='flex items-baseline gap-2'>
          <p className='text-lg font-semibold text-white'>
            {formatCompactNumber(currentValue)}
          </p>
          <p className={cn("text-sm font-medium", percentageClass)}>
            {percentageText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("rounded-[24px] border-none p-0", className)}>
      <CardHeader className='py-3 px-4 [.border-b]:pb-3 gap-0 border-[#F1F0EF] dark:border-[#21201C] border-b'>
        <CardTitle className='text-sm font-medium text-muted-foreground p-0'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 pr-4 pb-4'>
        <ResponsiveContainer width='100%' height={452}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={color} stopOpacity={0.5} />
                <stop offset='100%' stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#f0f0f0'
            />

            <XAxis
              dataKey='date'
              tick={{ fontSize: 12, fill: "#8D8D86" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
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
              cursor={{ stroke: "rgba(0, 0, 0, 0.1)" }}
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
