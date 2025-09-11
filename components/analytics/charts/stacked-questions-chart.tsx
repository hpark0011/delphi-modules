"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCompactNumber } from "@/lib/utils";
import { useTheme } from "next-themes";
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
import {
  ChartTooltipItem,
  ChartTooltipItems,
  ChartTooltipLabel,
  ChartTooltipRoot,
} from "./chart-tooltip";

// Centralized chart colors
const CHART_COLORS = {
  answered: "#FF713B",
  // Primary fill used for unanswered legend tile and pattern background
  unanswered: "#FF713B",
  // Stroke used in hatch pattern where applicable
  unansweredPatternStroke: "#FFB89D",
} as const;

const STACK_GAP_PX = 0;

interface StackedQuestionsChartProps {
  data: Array<{
    date: string;
    answered: number;
    unanswered: number;
  }>;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;

  const answered = payload.find((p) => p.dataKey === "answered")?.value || 0;
  const unanswered =
    payload.find((p) => p.dataKey === "unanswered")?.value || 0;

  return (
    <ChartTooltipRoot>
      <ChartTooltipLabel label={label || ""} className='mb-2' />
      <ChartTooltipItems>
        <ChartTooltipItem
          color={CHART_COLORS.answered}
          label='Answered'
          value={answered}
        />
        <ChartTooltipItem
          color={CHART_COLORS.unanswered}
          label='Unanswered'
          value={unanswered}
        />
      </ChartTooltipItems>
    </ChartTooltipRoot>
  );
};

const CustomLegend = () => {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-1.5'>
        <div
          className='w-3 h-3 rounded-[3px]'
          style={{ backgroundColor: CHART_COLORS.answered }}
        />
        <span className='text-sm'>Answered Questions</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <svg width='12' height='12' className='rounded-[3px]'>
          <defs>
            <pattern
              id='legendStripes'
              patternUnits='userSpaceOnUse'
              width='4'
              height='4'
            >
              <rect width='4' height='4' fill={CHART_COLORS.unanswered} />
              <path
                d='M0,4 L4,0'
                stroke={CHART_COLORS.unansweredPatternStroke}
                strokeWidth='1'
                fill='none'
                strokeLinecap='square'
              />
            </pattern>
          </defs>
          <rect width='12' height='12' fill='url(#legendStripes)' />
        </svg>
        <span className='text-sm'>Unanswered Questions</span>
      </div>
    </div>
  );
};

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

const TopStackShape = (props: BarShapeProps) => {
  const { x, y, width, height } = props;
  // Reduce height by the gap to create space at the bottom
  const adjustedHeight = Math.max(0, (height ?? 0) - STACK_GAP_PX);

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={adjustedHeight}
      // Force the top stack to use the diagonal stripe pattern
      fill={"url(#stripes)"}
      rx={8}
      ry={8}
    />
  );
};

const BottomStackShape = (props: BarShapeProps) => {
  const { x, y, width, height, fill } = props;
  // No adjustment needed for bottom bar
  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx={8} ry={8} />
  );
};

export function StackedQuestionsChart({
  data,
  className,
}: StackedQuestionsChartProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <Card
      className={cn(
        "rounded-[24px] border-none shadow-card-primary p-0 gap-6",
        className
      )}
    >
      <CardHeader className='py-3 px-4 [.border-b]:pb-3 gap-0'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          <CustomLegend />
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 relative pb-4'>
        <ResponsiveContainer width='100%' height={452}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            barCategoryGap={"15%"}
          >
            <defs>
              <pattern
                id='stripes'
                patternUnits='userSpaceOnUse'
                width='4'
                height='4'
              >
                <rect width='4' height='4' fill={CHART_COLORS.unanswered} />
                <path
                  d='M0,4 L4,0'
                  stroke={CHART_COLORS.unansweredPatternStroke}
                  strokeWidth='1'
                  fill='none'
                  strokeLinecap='square'
                />
              </pattern>
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
              tickFormatter={(v) => formatCompactNumber(v as number)}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Bar
              dataKey='answered'
              stackId='a'
              fill={CHART_COLORS.answered}
              // shape={BottomStackShape}
              // maxBarSize={48}
              radius={[0, 0, 8, 8]}
            />
            <Bar
              dataKey='unanswered'
              stackId='a'
              fill='url(#stripes)'
              // shape={TopStackShape}
              // maxBarSize={48}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* <CustomLegend /> */}
      </CardContent>
    </Card>
  );
}
