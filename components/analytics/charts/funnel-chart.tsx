"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCompactNumber } from "@/lib/utils";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartTooltipItem,
  ChartTooltipItems,
  ChartTooltipLabel,
  ChartTooltipRoot,
} from "./chart-tooltip";

const CHART_COLORS = {
  broadcastSent: "#FF713B",
  openRate: "#FF713B",
  engagementRate: "#FF713B",
  clickRate: "#FF713B",
  unsubscribeRate: "#671E0F",
} as const;

interface FunnelChartProps {
  data: Array<{
    stage: string;
    percentage: number;
    count: number;
  }>;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    payload: {
      stage: string;
      percentage: number;
      count: number;
    };
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;

  return (
    <ChartTooltipRoot>
      <ChartTooltipLabel label={data.stage} className='mb-2' />
      <ChartTooltipItems>
        <ChartTooltipItem
          color='#FF5722'
          label='Percentage'
          value={data.percentage}
        />
        <ChartTooltipItem color='#FF5722' label='Count' value={data.count} />
      </ChartTooltipItems>
    </ChartTooltipRoot>
  );
};

export function FunnelChart({ data, className }: FunnelChartProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === "dark";

  const getBarColor = (stage: string) => {
    switch (stage) {
      case "Broadcast Sent":
        return CHART_COLORS.broadcastSent;
      case "Open Rate":
        return CHART_COLORS.openRate;
      case "Engagement Rate":
        return CHART_COLORS.engagementRate;
      case "Click Rate":
        return CHART_COLORS.clickRate;
      case "Unsubscribe Rate":
        return CHART_COLORS.unsubscribeRate;
      default:
        return CHART_COLORS.broadcastSent;
    }
  };

  return (
    <Card
      className={cn(
        "rounded-[24px] border-none shadow-card-primary p-0 gap-6",
        className
      )}
    >
      <CardHeader className='py-3 px-4 gap-0'>
        <CardTitle className='text-sm font-medium text-foreground'>
          Broadcast Funnel Rates
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 relative pb-4'>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
            barCategoryGap='15%'
          >
            <CartesianGrid
              strokeDasharray='4 4'
              vertical={false}
              stroke={isDark ? "#21201C" : "#F1F0EF"}
            />

            <XAxis
              dataKey='stage'
              tick={{ fontSize: 11, fill: "#8D8D86" }}
              tickLine={false}
              axisLine={{ stroke: isDark ? "#21201C" : "#F1F0EF" }}
              tickMargin={8}
              angle={0}
              textAnchor='middle'
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#8D8D86" }}
              tickLine={false}
              axisLine={{ stroke: "transparent" }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Bar dataKey='percentage' radius={[12, 12, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.stage)} />
              ))}
            </Bar>

            {data.map((entry, index) => (
              <text
                key={`label-${index}`}
                x={0}
                y={0}
                fill='white'
                fontSize={12}
                fontWeight='600'
                textAnchor='middle'
              >
                <tspan
                  x={`${(index + 0.5) * (100 / data.length)}%`}
                  y={350 - entry.percentage * 3.2 - 10}
                >
                  {entry.percentage}%
                </tspan>
                <tspan
                  x={`${(index + 0.5) * (100 / data.length)}%`}
                  y={350 - entry.percentage * 3.2 + 5}
                  fontSize={10}
                  fill='#8D8D86'
                >
                  {formatCompactNumber(entry.count)}
                </tspan>
              </text>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
