"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCompactNumber } from "@/lib/utils";
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
  ChartTooltipRootAlt,
  ChartTooltipLabel,
  ChartTooltipItem,
  ChartTooltipItems,
} from "./chart-tooltip";

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
    <ChartTooltipRootAlt>
      <ChartTooltipLabel label={label || ""} className="mb-2" />
      <ChartTooltipItems>
        <ChartTooltipItem
          color="#FF713B"
          label="Answered"
          value={answered}
        />
        <ChartTooltipItem
          color="rgb(254 215 170)"
          label="Unanswered"
          value={unanswered}
        />
      </ChartTooltipItems>
    </ChartTooltipRootAlt>
  );
};

const CustomLegend = () => {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-1.5'>
        <div className='w-3 h-3 rounded-[3px] bg-[#FF713B]' />
        <span className='text-sm'>Answered Questions</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <svg width='12' height='12' className='rounded-[3px]'>
          <defs>
            <pattern
              id='diagonalHatch'
              patternUnits='userSpaceOnUse'
              width='4'
              height='4'
            >
              <path
                d='M0,4 L4,0'
                stroke='#AE7830'
                strokeWidth='0.5'
                strokeLinecap='square'
              />
            </pattern>
          </defs>
          <rect width='12' height='12' fill='rgba(255, 113, 59, 0.7)' />
          {/* <rect width='12' height='12' fill='url(#diagonalHatch)' /> */}
        </svg>
        <span className='text-sm'>Unanswered Questions</span>
      </div>
    </div>
  );
};

const STACK_GAP_PX = 2;

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

const TopStackShape = (props: BarShapeProps) => {
  const { x, y, width, height, fill } = props;
  // Reduce height by the gap to create space at the bottom
  const adjustedHeight = Math.max(0, (height ?? 0) - STACK_GAP_PX);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={adjustedHeight}
        fill={fill}
        rx={8}
        ry={8}
      />
    </g>
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
  React.useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `
      <defs>
        <pattern
          id="diagonalHatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            d="M0,4 L4,0"
            stroke="#AE7830"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
    `;
    document.body.appendChild(svg);
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";

    return () => {
      if (svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
    };
  }, []);

  return (
    <Card
      className={cn(
        "rounded-[24px] border-none shadow-card-primary p-0 gap-6",
        className
      )}
    >
      <CardHeader className='py-3 px-4 [.border-b]:pb-3 gap-0 border-[#F1F0EF] dark:border-[#21201C] border-b'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          <CustomLegend />
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 relative pb-4'>
        <ResponsiveContainer width='100%' height={452}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              <pattern
                id='stripes'
                patternUnits='userSpaceOnUse'
                width='4'
                height='4'
              >
                <rect width='4' height='4' fill='rgba(255, 113, 59, 0.7)' />
                {/* <path
                  d='M0,4 L4,0'
                  stroke='#D6BA95'
                  strokeWidth='1'
                  fill='none'
                  strokeLinecap='square'
                /> */}
              </pattern>
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
              tickFormatter={(v) => formatCompactNumber(v as number)}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Bar
              dataKey='answered'
              stackId='a'
              fill='#FF713B'
              shape={BottomStackShape}
            />
            <Bar
              dataKey='unanswered'
              stackId='a'
              fill='url(#stripes)'
              shape={TopStackShape}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* <CustomLegend /> */}
      </CardContent>
    </Card>
  );
}
