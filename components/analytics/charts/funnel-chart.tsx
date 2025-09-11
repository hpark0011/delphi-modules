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
      remainder?: number;
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

  // Transform data to include remainder for stacking
  const transformedData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      remainder: 100 - item.percentage,
    }));
  }, [data]);

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
      <CardContent className='p-0 relative'>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
            barCategoryGap='8%'
          >
            <defs>
              {/* Gradient definitions for each bar */}
              <linearGradient
                id='gradientBroadcast'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor='#FF713B' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#FF713B' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='gradientOpen' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#FF713B' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#FF713B' stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id='gradientEngagement'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor='#FF713B' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#FF713B' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='gradientClick' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#FF713B' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#FF713B' stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id='gradientUnsubscribe'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor='#671E0F' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#671E0F' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='4 4'
              vertical={false}
              stroke={isDark ? "#21201C" : "#F1F0EF"}
            />

            <XAxis
              dataKey='stage'
              tick={{ fontSize: 12, fill: "#8D8D86" }}
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

            {/* Bottom bar - actual percentage */}
            <Bar dataKey='percentage' stackId='a' radius={[12, 12, 0, 0]}>
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.stage)} />
              ))}
            </Bar>

            {/* Top bar - remainder with gradient */}
            <Bar dataKey='remainder' stackId='a' radius={[12, 12, 0, 0]}>
              {transformedData.map((entry, index) => {
                const gradientId =
                  entry.stage === "Unsubscribe Rate"
                    ? "gradientUnsubscribe"
                    : entry.stage === "Broadcast Sent"
                      ? "gradientBroadcast"
                      : entry.stage === "Open Rate"
                        ? "gradientOpen"
                        : entry.stage === "Engagement Rate"
                          ? "gradientEngagement"
                          : "gradientClick";
                return (
                  <Cell
                    key={`cell-remainder-${index}`}
                    fill={`url(#${gradientId})`}
                  />
                );
              })}
            </Bar>

            {/* Floating badge labels */}
            {transformedData.map((entry, index) => {
              const xPos = (index + 0.5) * (100 / transformedData.length);
              const yPos =
                entry.stage === "Broadcast Sent"
                  ? 35 // Position at top for 100% bar
                  : 350 - entry.percentage * 3.3 - 15; // Position above each bar

              const badgeWidth = 60;
              const badgeHeight = 40;
              const badgeX = `${xPos}%`;

              return (
                <g key={`badge-${index}`}>
                  {/* White background badge */}
                  <rect
                    x={badgeX}
                    y={yPos}
                    width={badgeWidth}
                    height={badgeHeight}
                    rx={12}
                    ry={12}
                    stroke='#E2E1DE'
                    fill='white'
                    transform={`translate(-${badgeWidth / 2}, -${badgeHeight / 2})`}
                    filter='drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
                  />

                  {/* Percentage text */}
                  <text
                    x={badgeX}
                    y={yPos - 2}
                    fill='#FF713B'
                    fontSize={12}
                    fontWeight='600'
                    textAnchor='middle'
                  >
                    {entry.percentage}%
                  </text>

                  {/* Count text */}
                  <text
                    x={badgeX}
                    y={yPos + 12}
                    fill='#8D8D86'
                    fontSize={12}
                    textAnchor='middle'
                  >
                    {formatCompactNumber(entry.count)}
                  </text>
                </g>
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
