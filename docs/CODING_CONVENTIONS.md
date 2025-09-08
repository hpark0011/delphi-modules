# Delphi Modules - Coding Conventions & Design Patterns

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [TypeScript Conventions](#typescript-conventions)
3. [React Component Patterns](#react-component-patterns)
4. [State Management](#state-management)
5. [Styling Conventions](#styling-conventions)
6. [File Organization](#file-organization)
7. [Data Flow Patterns](#data-flow-patterns)
8. [Performance Patterns](#performance-patterns)
9. [Testing & Quality](#testing--quality)

---

## Architecture Overview

### Core Principles
- **KISS (Keep It Simple, Stupid)**: Prioritize simplicity over complexity
- **YAGNI (You Aren't Gonna Need It)**: Build only what's needed now
- **Component-Based Architecture**: Modular, reusable components
- **Type Safety First**: Leverage TypeScript for compile-time safety
- **Performance by Default**: Fast startup, responsive UI, optimistic updates

### Technology Stack
```typescript
// Core dependencies
- Next.js 15.4.7 (App Router)
- React 19 (with React Compiler)
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- shadcn/ui (New York style)
- TanStack Query 5.85
- React Hook Form 7.62 + Zod 4.0
```

---

## TypeScript Conventions

### Type Definitions

#### 1. Interface Naming
```typescript
// ✅ Good - Descriptive, domain-specific interfaces
export interface AnalyticsData {
  dateRange: DateRange;
  metrics: MetricsData;
  chartData: ChartDataPoint[];
}

export interface MetricValue {
  value: number;
  change: number;
  isPositive: boolean;
  formatted?: string; // Optional properties at the end
}

// ❌ Bad - Generic or prefixed names
interface IData { } // Avoid "I" prefix
interface Data { }  // Too generic
```

#### 2. Type Composition
```typescript
// ✅ Good - Extend base types for specialized cases
export interface QuestionMetric extends MetricValue {
  answered: number;
  total: number;
}

// Use union types for variants
export type PeriodType = "1d" | "7d" | "30d";
export type TabType = "engagement" | "audience" | "actions";
```

#### 3. Props Interfaces
```typescript
// ✅ Good - Clear prop interfaces with optional className
interface KPICardProps {
  label: string;
  metric: MetricValue | QuestionMetric | TimeMetric;
  className?: string; // Always include className for flexibility
}

// Component props extend HTML element props when needed
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
}
```

### Type Guards
```typescript
// ✅ Good - Use type guards for runtime type checking
function isQuestionMetric(
  metric: MetricValue | QuestionMetric | TimeMetric
): metric is QuestionMetric {
  return "answered" in metric && "total" in metric;
}

function isTimeMetric(
  metric: MetricValue | QuestionMetric | TimeMetric
): metric is TimeMetric {
  return "hours" in metric && "minutes" in metric;
}
```

---

## React Component Patterns

### Component Structure

#### 1. Function Components Only
```typescript
// ✅ Good - Function component with explicit types
export function AreaChartComponent({
  data,
  title,
  color = "#ea580c", // Default props inline
  className,
  yAxisDomain,
}: AreaChartProps) {
  // Hooks at the top
  const gradientId = React.useId();
  
  // Event handlers
  const handleClick = () => { };
  
  // Render logic
  return <Card>{/* content */}</Card>;
}

// ❌ Bad - Class components or React.FC
const Component: React.FC<Props> = () => { }; // Avoid React.FC
class Component extends React.Component { } // No class components
```

#### 2. Compound Components with data-slot
```typescript
// ✅ Good - Compound components with identifiable slots
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card" // Identify component parts
      className={cn("bg-card rounded-xl", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("px-6", className)}
      {...props}
    />
  );
}
```

#### 3. Client Components
```typescript
// ✅ Good - Mark client components explicitly
"use client";

import * as React from "react";

export function InteractiveComponent() {
  const [state, setState] = React.useState();
  // Client-side logic
}
```

### Hook Patterns

#### 1. Custom Hook Naming
```typescript
// ✅ Good - Descriptive hook names starting with "use"
export function useLocalStorage<T>(key: string, initialValue: T) { }
export function useThemeToggle() { }
export function useMobile() { }

// ❌ Bad
export function storage() { } // Missing "use" prefix
export function useLS() { }   // Too abbreviated
```

#### 2. Hook Return Values
```typescript
// ✅ Good - Return tuple for state-like hooks
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  return [storedValue, setValue, clearValue];
}

// Return object for complex state
export function useAnalytics() {
  return {
    data: analyticsData,
    isLoading,
    error,
    refetch,
  };
}
```

---

## State Management

### Local State Pattern
```typescript
// ✅ Good - Co-locate state with usage
export default function AnalyticsPage() {
  // Group related state
  const [analyticsData, setAnalyticsData] = 
    React.useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Effects after state declarations
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalyticsData(dateRange);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [dateRange]);
}
```

### Data Fetching Pattern
```typescript
// ✅ Good - Service layer abstraction
// lib/analytics-service.ts
export async function fetchAnalyticsData(
  dateRange: DateRange
): Promise<AnalyticsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    dateRange,
    metrics: generateMetrics(),
    chartData: generateChartData(dateRange),
    // ... other data
  };
}

// Component usage
const data = await fetchAnalyticsData(dateRange);
```

---

## Styling Conventions

### Tailwind CSS Usage

#### 1. Class Name Management
```typescript
// ✅ Good - Use cn() utility for conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDark && "dark-classes",
  className // Always allow className override
)} />

// The cn utility combines clsx + tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### 2. Component Styling
```typescript
// ✅ Good - Consistent styling patterns
<Card className={cn(
  // Base styles
  "rounded-[24px] border-none p-0",
  // Conditional styles
  isActive && "shadow-card-primary",
  // Custom className
  className
)}>

// Dark mode support
<div className="bg-white dark:bg-card">
<p className="text-[#21201C] dark:text-[#EEEEEC]">
```

#### 3. Design Tokens
```typescript
// ✅ Good - Use consistent spacing and sizing
const spacing = {
  // Use Tailwind's spacing scale
  "px-3": "12px padding",
  "px-4": "16px padding", 
  "px-6": "24px padding",
  "gap-1": "4px gap",
  "gap-2": "8px gap",
  "gap-4": "16px gap",
  "gap-6": "24px gap",
};

const borderRadius = {
  "rounded-lg": "8px",
  "rounded-xl": "12px", 
  "rounded-[24px]": "24px", // Custom radius for cards
  "rounded-full": "9999px", // Pills and buttons
};
```

### Class Variance Authority (CVA)
```typescript
// ✅ Good - Define variants with CVA
const buttonVariants = cva(
  // Base classes
  "inline-flex items-center justify-center rounded-md text-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border bg-transparent",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-9 px-4",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

---

## File Organization

### Directory Structure
```
/app                    # Next.js App Router
  /analytics           # Feature modules
    page.tsx          # Page component
    layout.tsx        # Layout wrapper
    types.ts          # Type definitions
    data.ts           # Static data

/components
  /analytics          # Feature-specific components
    area-chart.tsx
    kpi-card.tsx
  /ui                 # Reusable UI components (shadcn/ui)
    button.tsx
    card.tsx
  /providers          # Context providers
    root-provider.tsx
    theme-provider.tsx

/lib                   # Utilities and services
  utils.ts            # Common utilities
  analytics-service.ts # Service layer

/hooks                 # Custom React hooks
  use-local-storage.ts
  use-theme-toggle.tsx

/types                 # Global type definitions
  board.types.ts
```

### Import Order
```typescript
// ✅ Good - Consistent import order
// 1. "use client" directive (if needed)
"use client";

// 2. External dependencies
import * as React from "react";
import { format } from "date-fns";

// 3. Internal dependencies with aliases
import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 4. Relative imports (avoid when possible)
import { LocalComponent } from "./local-component";
```

### Naming Conventions

#### Files and Folders
```typescript
// ✅ Good - Kebab-case for files
analytics-service.ts
date-range-picker.tsx
use-local-storage.ts

// Component files match component name (kebab-case)
area-chart.tsx → AreaChartComponent
kpi-card.tsx → KPICard
```

#### Variables and Functions
```typescript
// ✅ Good - Descriptive names
const analyticsData = fetchData();
const isLoading = true;
const handleDateRangeChange = () => { };

function formatCompactNumber(value: number): string { }
function generateMetrics(): MetricsData { }

// ❌ Bad - Abbreviated or unclear
const data = fetchData(); // Too generic
const loading = true;     // Missing "is" prefix for boolean
const handle = () => { };  // Unclear purpose
```

---

## Data Flow Patterns

### Props Drilling Prevention
```typescript
// ✅ Good - Pass only necessary props
<KPICard
  label="Active Users"
  metric={analyticsData.metrics.activeUsers}
/>

// ❌ Bad - Passing entire objects unnecessarily
<KPICard data={analyticsData} type="activeUsers" />
```

### Event Handler Naming
```typescript
// ✅ Good - Consistent handler naming
interface DateRangePickerProps {
  onDateRangeChange: (range: DateRange) => void; // onXChange pattern
  onReset?: () => void;                          // Optional handlers
}

// In component
const handleDateRangeChange = (newRange: DateRange) => {
  setDateRange(newRange);
  // Additional logic
};

// Usage
<DateRangePicker
  dateRange={dateRange}
  onDateRangeChange={handleDateRangeChange}
/>
```

---

## Performance Patterns

### Component Optimization
```typescript
// ✅ Good - Use React.useId() for unique IDs
const gradientId = React.useId();

// ✅ Good - Memoize expensive computations
const formattedData = React.useMemo(
  () => processChartData(rawData),
  [rawData]
);

// ✅ Good - Lazy load heavy components
const HeavyChart = React.lazy(() => import("./heavy-chart"));
```

### Loading States
```typescript
// ✅ Good - Skeleton loading pattern
if (isLoading || !analyticsData) {
  return (
    <DashboardMainWrapper>
      <div className="animate-pulse">
        <div className="h-8 rounded w-32 mb-8" />
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded" />
          ))}
        </div>
      </div>
    </DashboardMainWrapper>
  );
}
```

---

## Testing & Quality

### Error Handling
```typescript
// ✅ Good - Comprehensive error handling
React.useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnalyticsData(dateRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      // Set error state for UI feedback
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  
  loadData();
}, [dateRange]);
```

### Type Safety
```typescript
// ✅ Good - Validate at runtime when needed
function formatValue(
  metric: MetricValue | QuestionMetric | TimeMetric
): string | React.ReactNode {
  // Use type guards for safety
  if (isQuestionMetric(metric)) {
    return `${metric.answered} / ${metric.total}`;
  }
  
  if (isTimeMetric(metric)) {
    return `${metric.hours}hr ${metric.minutes}min`;
  }
  
  // Default case
  return metric.value.toString();
}
```

---

## Implementation Guidelines

### When Adding New Features

1. **Define Types First**
   - Create interfaces in `types.ts`
   - Use strict typing throughout

2. **Create Service Layer**
   - Abstract data fetching to `/lib`
   - Keep components pure

3. **Build Components**
   - Start with shadcn/ui base components
   - Extend with feature-specific needs
   - Always include `className` prop

4. **Handle States**
   - Loading, error, and success states
   - Optimistic updates where appropriate

5. **Style Consistently**
   - Use Tailwind utilities
   - Follow existing patterns
   - Support dark mode

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components follow compound pattern with data-slot
- [ ] Styles use cn() utility for composition
- [ ] Error states are handled
- [ ] Loading states provide feedback
- [ ] Dark mode is supported
- [ ] Imports are properly ordered
- [ ] No unnecessary complexity (KISS/YAGNI)

---

## Domain-Specific Patterns

### Analytics Dashboard Patterns

#### Chart Components
```typescript
// Consistent chart component interface
interface ChartProps {
  data: Array<DataPoint>;
  title: string;
  color?: string;
  className?: string;
  yAxisDomain?: [number, number];
}

// Reusable tooltip pattern
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;
  
  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg">
      {/* Tooltip content */}
    </div>
  );
};
```

#### Metric Display
```typescript
// Flexible metric formatting
function formatCompactNumber(
  value: number,
  options: { maximumFractionDigits?: number } = {}
): string {
  // Consistent number formatting across the app
  const thresholds = [
    { limit: 1_000_000_000, suffix: "b" },
    { limit: 1_000_000, suffix: "m" },
    { limit: 1_000, suffix: "k" },
  ];
  // ... formatting logic
}
```

---

## Notes on Refinements

### Avoiding Over-Engineering

1. **No Redux/Zustand**: Local state and React Query suffice
2. **No Custom Design System**: shadcn/ui provides enough flexibility
3. **No Microservices**: Monolithic Next.js app is simpler
4. **No Complex Abstractions**: Direct, readable code preferred
5. **No Premature Optimization**: Profile first, optimize later

### Simplicity Trade-offs

- **Inline Styles vs. CSS Modules**: Tailwind inline styles win for maintainability
- **Service Layer vs. Direct Fetch**: Light service layer for testability
- **Type Safety vs. Flexibility**: Lean toward type safety
- **DRY vs. WET**: Some repetition acceptable for clarity

---

## Conclusion

These conventions prioritize:
- **Readability** over cleverness
- **Consistency** over personal preference
- **Type safety** over runtime checks
- **Performance** through good patterns, not premature optimization
- **Simplicity** through KISS and YAGNI principles

Follow these patterns to maintain a clean, performant, and maintainable codebase that scales with the analytics dashboard's needs while avoiding unnecessary complexity.