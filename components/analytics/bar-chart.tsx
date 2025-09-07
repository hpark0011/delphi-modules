"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BarChartProps {
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
      <p className='text-lg font-semibold'>{payload[0].value}</p>
    </div>
  );
};

export function BarChartComponent({ 
  data, 
  title, 
  color = "#ea580c",
  className,
  yAxisDomain 
}: BarChartProps) {
  return (
    <Card
      className={cn(
        "rounded-[24px] border-none shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),_0_10px_20px_-5px_rgba(0,0,0,0.05),_0_1px_1px_0_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <ResponsiveContainer width='100%' height={200}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
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
            />
            
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            
            <Bar
              dataKey='value'
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}