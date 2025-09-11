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

type BadgeDatum = {
  stage: string;
  percentage: number;
  count: number;
};

const CHART_HEIGHT = 368; // match <ResponsiveContainer height>

function FunnelBadgesOverlay({
  transformedData,
}: {
  transformedData: BadgeDatum[];
}) {
  return (
    <div className='absolute inset-0 pointer-events-none z-10'>
      {transformedData.map((entry, index) => {
        const xPercent = ((index + 0.5) / transformedData.length) * 100;
        const yPx =
          entry.stage === "Broadcast Sent"
            ? 35
            : 350 - entry.percentage * 3.3 - 15;
        const yPercent = (yPx / CHART_HEIGHT) * 100;

        return (
          <div
            key={`badge-${index}`}
            className='absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#f5f5f4] bg-white shadow-md px-3 py-2 text-center'
            style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
          >
            <div className='text-xs font-semibold text-[#FF713B]'>
              {entry.percentage}%
            </div>
            <div className='text-xs text-[#8D8D86]'>
              {formatCompactNumber(entry.count)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          Broadcast Funnel Rates
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 relative'>
        <ResponsiveContainer width='100%' height={368}>
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

            {/* Floating badges are rendered as HTML overlay */}
          </BarChart>
        </ResponsiveContainer>
        <FunnelBadgesOverlay transformedData={transformedData} />
      </CardContent>
    </Card>
  );
}
