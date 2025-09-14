"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

const languageData = [
  { country: "US", flag: "🇺🇸", percentage: 44 },
  { country: "Brazil", flag: "🇧🇷", percentage: 23 },
  { country: "Vietnam", flag: "🇻🇳", percentage: 16 },
  { country: "France", flag: "🇫🇷", percentage: 16 },
  { country: "Canada", flag: "🇨🇦", percentage: 12 },
  { country: "Korea", flag: "🇰🇷", percentage: 9 },
];

// Configuration context for styling
interface ChartConfig {
  barColor?: string;
  labelColor?: string;
  barLabelColor?: string;
  barValueColor?: string;
}

interface ChartContextValue extends ChartConfig {
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ChartContext = React.createContext<ChartContextValue>({
  barColor: "#F0EEE4",
  labelColor: "#63635E",
  barLabelColor: "#63635E",
  barValueColor: "#8D8D86",
  itemRefs: { current: [] },
});

// Main Chart component
interface ChartProps extends React.ComponentProps<"div"> {
  config?: ChartConfig;
}

function Chart({ className, config, children, ...props }: ChartProps) {
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const defaultConfig: ChartConfig = {
    barColor: "#F0EEE4",
    labelColor: "#63635E",
    barLabelColor: "#63635E",
    barValueColor: "#8D8D86",
  };

  const mergedConfig = { ...defaultConfig, ...config };

  const contextValue: ChartContextValue = {
    ...mergedConfig,
    itemRefs,
  };

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        data-slot='chart'
        className={cn("flex flex-col space-y-1 w-full relative", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// Chart Item component
interface ChartItemProps extends React.ComponentProps<"div"> {
  data?: {
    flag?: string;
    country?: string;
    percentage?: number;
  };
  index?: number;
}

function ChartItem({
  className,
  data,
  children,
  index = 0,
  ...props
}: ChartItemProps) {
  const context = React.useContext(ChartContext);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (itemRef.current && context.itemRefs) {
      context.itemRefs.current[index] = itemRef.current;
    }
  }, [index, context.itemRefs]);

  return (
    <div
      ref={itemRef}
      data-slot='chart-item'
      className={cn("flex items-center justify-between px-0", className)}
      {...props}
    >
      {children || (
        <div className='hover:bg-gradient-to-r from-[#F6F6F5] via-[#f6f6f5] to-transparent w-full flex items-center justify-between px-4 py-1'>
          <ChartItemContent>
            <ChartItemLabel flag={data?.flag} country={data?.country} />
            <ChartItemBar value={data?.percentage} delay={index * 0.05} />
          </ChartItemContent>
          <ChartItemValue value={data?.percentage} />
        </div>
      )}
    </div>
  );
}

// Content wrapper for the chart item
function ChartItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='chart-item-content'
      className={cn("flex items-center gap-3 flex-1 relative", className)}
      {...props}
    />
  );
}

// Label component for country and flag
interface ChartItemLabelProps extends React.ComponentProps<"div"> {
  flag?: string;
  country?: string;
}

function ChartItemLabel({
  className,
  flag,
  country,
  ...props
}: ChartItemLabelProps) {
  const config = React.useContext(ChartContext);

  return (
    <div
      data-slot='chart-item-label'
      className={cn(
        "flex items-center gap-2 min-w-[120px] absolute left-2 z-[1]",
        className
      )}
      {...props}
    >
      {flag && <span className='text-lg'>{flag}</span>}
      {country && (
        <span
          className='text-sm font-medium'
          style={{ color: config.barLabelColor }}
        >
          {country}
        </span>
      )}
    </div>
  );
}

// Bar component
interface ChartItemBarProps extends React.ComponentProps<"div"> {
  value?: number;
  maxValue?: number;
  delay?: number;
}

function ChartItemBar({
  className,
  value = 0,
  maxValue = 100,
  delay = 0,
  ...props
}: ChartItemBarProps) {
  const config = React.useContext(ChartContext);
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div
      data-slot='chart-item-bar'
      className={cn("flex-1 w-full", className)}
      {...props}
    >
      <div className='w-full bg-transparent rounded-full h-6'>
        <motion.div
          className='h-full rounded-full relative'
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 13,
            delay: delay,
          }}
        >
          <div
            className='absolute inset-0 rounded-sm'
            style={{ backgroundColor: config.barColor }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Value component for percentage display
interface ChartItemValueProps extends React.ComponentProps<"span"> {
  value?: number;
  suffix?: string;
}

function ChartItemValue({
  className,
  value,
  suffix = "%",
  ...props
}: ChartItemValueProps) {
  const config = React.useContext(ChartContext);

  return (
    <span
      data-slot='chart-item-value'
      className={cn(
        "text-sm ml-3 min-w-[40px] text-right font-normal",
        className
      )}
      style={{ color: config.barValueColor }}
      {...props}
    >
      {value !== undefined ? `${value}${suffix}` : null}
    </span>
  );
}

// Main exported component with default implementation
export function LanguageChart() {
  return (
    <Chart>
      {languageData.map((item, index) => (
        <ChartItem key={index} data={item} index={index} />
      ))}
    </Chart>
  );
}

// Export all components for flexible usage
export {
  Chart,
  ChartItem,
  ChartItemBar,
  ChartItemContent,
  ChartItemLabel,
  ChartItemValue,
};
