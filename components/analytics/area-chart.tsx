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

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className='bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700'>
      <p className='text-sm font-medium mb-1'>{label}</p>
      <p className='text-lg font-semibold'>
        {formatCompactNumber(payload[0].value)}
      </p>
    </div>
  );
};

export function AreaChartComponent({
  data,
  title,
  color = "#ea580c",
  className,
  yAxisDomain,
}: AreaChartProps) {
  const gradientId = React.useId();

  return (
    <Card className={cn("rounded-[24px] border-none p-4 ", className)}>
      <CardHeader className='pb-2 px-0'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ResponsiveContainer width='100%' height={452}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
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
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              domain={yAxisDomain}
              tickFormatter={(v) => formatCompactNumber(v as number)}
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
