"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { ModuleCard, ModuleCardContent, ModuleCardHeader } from "../module-ui";
export const description = "A bar chart with a custom label";
const chartData = [
  { country: "🇺🇸 US", desktop: 186, mobile: 80 },
  { country: "🇧🇷 Brazil", desktop: 305, mobile: 200 },
  { country: "🇰🇷 Korea", desktop: 237, mobile: 120 },
  { country: "🇻🇳 Vietnam", desktop: 73, mobile: 190 },
  { country: "🇫🇷 France", desktop: 209, mobile: 130 },
  { country: "🇨🇦 Canada", desktop: 214, mobile: 140 },
];
// sizes you want
const BAR_SIZE = 18;
const CATEGORY_GAP = 12; // 0 for tight packing
const VERTICAL_PADDING = 8;

const CHART_HEIGHT =
  chartData.length * BAR_SIZE +
  (chartData.length - 1) * CATEGORY_GAP +
  VERTICAL_PADDING;

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;
export function ChartBarLabelCustom() {
  return (
    <ModuleCard className='w-full rounded-[24px]'>
      <ModuleCardHeader className='p-4'>Languages</ModuleCardHeader>
      <ModuleCardContent className='p-4 h-[268px]'>
        <ChartContainer config={chartConfig} style={{ height: CHART_HEIGHT }}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              right: 8,
            }}
            barGap={2}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey='month'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey='desktop' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Bar
              dataKey='desktop'
              layout='vertical'
              fill='#F0EEE4'
              radius={6}
              barSize={28}
            >
              <LabelList
                dataKey='country'
                position='insideLeft'
                offset={0}
                className='#63635E'
                fontSize={12}
              />
              <LabelList
                dataKey='country'
                position='insideLeft'
                offset={0}
                className='#63635E'
                fontSize={12}
              />
              <LabelList
                dataKey='desktop'
                position='right'
                offset={8}
                className='fill-foreground'
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </ModuleCardContent>
    </ModuleCard>
  );
}
