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
  Cell,
  Rectangle,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StackedQuestionsChartProps {
  data: Array<{
    date: string;
    answered: number;
    unanswered: number;
  }>;
  title: string;
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
    <div className='bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700'>
      <p className='text-sm font-medium mb-2'>{label}</p>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-sm bg-orange-500' />
          <span className='text-xs'>Answered</span>
          <span className='text-xs font-semibold ml-auto'>{answered}</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-sm bg-orange-200' />
          <span className='text-xs'>Unanswered</span>
          <span className='text-xs font-semibold ml-auto'>{unanswered}</span>
        </div>
      </div>
    </div>
  );
};

const CustomLegend = () => {
  return (
    <div className='flex items-center gap-6 justify-center mt-4'>
      <div className='flex items-center gap-2'>
        <div className='w-3 h-3 rounded-sm bg-orange-500' />
        <span className='text-sm'>Answered Questions</span>
      </div>
      <div className='flex items-center gap-2'>
        <svg width='12' height='12' className='rounded-sm'>
          <defs>
            <pattern
              id='diagonalHatch'
              patternUnits='userSpaceOnUse'
              width='4'
              height='4'
            >
              <path d='M0,4 L4,0' stroke='#fed7aa' strokeWidth='0.5' />
            </pattern>
          </defs>
          <rect width='12' height='12' fill='#fed7aa' />
          <rect width='12' height='12' fill='url(#diagonalHatch)' />
        </svg>
        <span className='text-sm'>Unanswered Questions</span>
      </div>
    </div>
  );
};

const STACK_GAP_PX = 2;

const TopStackShape = (props: any) => {
  const { height } = props;
  const adjustedHeight = Math.max(0, (height ?? 0) - STACK_GAP_PX / 2);
  return <Rectangle {...props} height={adjustedHeight} />;
};

const BottomStackShape = (props: any) => {
  const { y, height } = props;
  const adjustedY = (y ?? 0) + STACK_GAP_PX / 2;
  const adjustedHeight = Math.max(0, (height ?? 0) - STACK_GAP_PX / 2);
  return <Rectangle {...props} y={adjustedY} height={adjustedHeight} />;
};

export function StackedQuestionsChart({
  data,
  title,
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
            stroke="#c2846a"
            strokeWidth="0.5"
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
        "rounded-[24px] border-none shadow-card-primary",
        className
      )}
    >
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <ResponsiveContainer width='100%' height={376}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <pattern
                id='stripes'
                patternUnits='userSpaceOnUse'
                width='4'
                height='4'
              >
                <path
                  d='M0,4 L4,0'
                  stroke='#E7D6C1'
                  strokeWidth='0.5'
                  fill='none'
                />
              </pattern>
            </defs>

            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#f0f0f0'
            />

            <XAxis
              dataKey='date'
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Bar
              dataKey='answered'
              stackId='a'
              fill='#ea580c'
              radius={[8, 8, 8, 8]}
              shape={TopStackShape}
            />
            <Bar
              dataKey='unanswered'
              stackId='a'
              radius={[8, 8, 8, 8]}
              shape={BottomStackShape}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill='url(#stripes)'
                  style={{
                    fill: "#E7D6C1",
                    borderRadius: "8px",
                    marginTop: "4px",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <CustomLegend />
      </CardContent>
    </Card>
  );
}
