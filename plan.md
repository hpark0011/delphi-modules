# Analytics UI Implementation Plan

## Design Specification

### Overview
A comprehensive Analytics dashboard featuring:
- Persistent dark sidebar navigation
- KPI metrics with trend indicators
- Stacked bar chart visualization (Answered vs Unanswered Questions)
- Date range selector with period toggles
- Tab-based content organization

### Visual Design Requirements

#### 1. Sidebar Navigation (Left Panel)
**Dimensions:** 256px width, full height
**Background:** Dark theme (#1a1a1a)
**Structure:**
- Logo/Brand section with "Delphi" text
- User avatar (circular, 32px)
- Navigation sections:
  - IDENTITY: Profile, Mind, Voice, Video, Playground
  - INTERACTIONS: People, Conversations, Groups  
  - ADVANCED: Integrations, Broadcasts, Actions, Products, Memberships
- Bottom section: Usage/Credits display (e.g., "100")
- Icons: Custom SVG icons from `/icons` directory
- Active state: Highlighted background with left border accent

#### 2. Main Content Area
**Layout:** Flexible width, padding: 32px
**Components:**

##### Header Section
- Title: "Analytics" (24px, font-weight: 600)
- Tabs: Insights (active), Audience, Actions (with lock icon)
- Date controls:
  - Date range display: "Sep 03 - Sep 09"
  - Navigation arrows (previous/next)
  - Period toggles: 1d, 7d, 30d (button group)

##### KPI Cards Grid
**Layout:** 4-column grid, gap: 16px
**Cards:**
1. Active Users: 582 (+46.2% trend)
2. Conversations: 2.1K (-4.2% trend)
3. Answered Questions: 56/180 (+12.2% trend)
4. Time Created: 4hr 12min (-20.2% trend)

**Card Design:**
- Background: White with subtle border
- Padding: 20px
- Label: Gray text, 12px
- Value: Black text, 24px, font-weight: 600
- Trend: Color-coded (green for positive, red for negative)

##### Stacked Bar Chart
**Dimensions:** Full width, height: 300px
**Data Visualization:**
- X-axis: Dates (July 26 - July 30)
- Y-axis: Count (0 - 40)
- Bars: Stacked with two segments
  - Answered Questions: Orange (#FF6B35)
  - Unanswered Questions: Beige with diagonal stripes
- Tooltip: Shows detailed counts on hover
- Legend: Color indicators for Answered/Unanswered

### Component Architecture

#### Data Models (`/app/analytics/types.ts`)
```typescript
interface AnalyticsData {
  dateRange: DateRange;
  metrics: MetricsData;
  chartData: ChartDataPoint[];
}

interface DateRange {
  start: Date;
  end: Date;
  period: '1d' | '7d' | '30d';
}

interface MetricsData {
  activeUsers: MetricValue;
  conversations: MetricValue;
  answeredQuestions: QuestionMetric;
  timeCreated: TimeMetric;
}

interface MetricValue {
  value: number;
  change: number;
  isPositive: boolean;
  formatted?: string;
}

interface QuestionMetric extends MetricValue {
  answered: number;
  total: number;
}

interface TimeMetric extends MetricValue {
  hours: number;
  minutes: number;
}

interface ChartDataPoint {
  date: string;
  answered: number;
  unanswered: number;
}
```

#### Component Hierarchy
```
<AnalyticsLayout>
  <AppSidebar>
    <SidebarHeader />
    <SidebarNav>
      <NavSection title="IDENTITY" />
      <NavSection title="INTERACTIONS" />
      <NavSection title="ADVANCED" />
    </SidebarNav>
    <SidebarFooter />
  </AppSidebar>
  
  <AnalyticsPage>
    <AnalyticsHeader>
      <PageTitle />
      <TabNavigation />
      <DateControls>
        <DateRangePicker />
        <PeriodToggle />
      </DateControls>
    </AnalyticsHeader>
    
    <MetricsGrid>
      <KPICard metric="activeUsers" />
      <KPICard metric="conversations" />
      <KPICard metric="answeredQuestions" />
      <KPICard metric="timeCreated" />
    </MetricsGrid>
    
    <ChartSection>
      <StackedBarChart data={chartData} />
    </ChartSection>
  </AnalyticsPage>
</AnalyticsLayout>
```

### Implementation Strategy

#### Phase 1: Foundation Components
1. **AppSidebar Component** (`/components/app-sidebar.tsx`)
   - Use shadcn Sidebar as base
   - Custom styling for dark theme
   - Navigation item components
   - Active state management

2. **Analytics Layout** (`/app/analytics/layout.tsx`)
   - Sidebar provider integration
   - Content area wrapper
   - Responsive behavior

#### Phase 2: Data & State Management
1. **Type Definitions** (`/app/analytics/types.ts`)
   - Complete TypeScript interfaces
   - Validation schemas with Zod

2. **Analytics Service** (`/lib/analytics-service.ts`)
   - Mock data generation
   - API integration structure
   - TanStack Query hooks

#### Phase 3: UI Components
1. **KPI Cards** (`/components/analytics/kpi-card.tsx`)
   - Reusable card component
   - Trend indicator logic
   - Value formatting

2. **Date Controls** (`/components/analytics/date-range-picker.tsx`)
   - Date range selection
   - Period toggle buttons
   - Navigation arrows

3. **Stacked Bar Chart** (`/components/analytics/stacked-bar-chart.tsx`)
   - Recharts integration
   - Custom tooltip
   - Responsive sizing
   - Pattern fills for unanswered questions

#### Phase 4: Integration & Polish
1. **Main Analytics Page** (`/app/analytics/page.tsx`)
   - Component composition
   - Data fetching
   - Loading states
   - Error handling

2. **Responsive Design**
   - Mobile sidebar behavior
   - Grid breakpoints
   - Touch interactions

3. **Animations**
   - Page transitions
   - Chart animations
   - Hover effects

### Technical Specifications

#### Dependencies
- **UI Components:** shadcn/ui (Sidebar, Tabs, Card, Button, Tooltip)
- **Charts:** Recharts 2.15.4 (already installed)
- **Date Handling:** date-fns
- **Data Fetching:** TanStack Query 5.85 (already installed)
- **Icons:** Custom SVG icons from `/icons` directory

#### Performance Considerations
- Lazy load chart component
- Memoize expensive calculations
- Virtualize large data sets
- Optimize re-renders with React.memo

#### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader announcements
- Color contrast compliance

### Risk Mitigation

#### Common Issues & Solutions

1. **Sidebar State Persistence**
   - Problem: Sidebar state lost on page refresh
   - Solution: Use localStorage with shadcn's built-in persistence

2. **Chart Responsiveness**
   - Problem: Chart overflow on small screens
   - Solution: ResponsiveContainer with aspect ratio

3. **Date Range Sync**
   - Problem: Components out of sync with date selection
   - Solution: Centralized date state with Context API

4. **Type Safety**
   - Problem: Runtime errors from API responses
   - Solution: Zod validation at service boundaries

### Testing Strategy
- Unit tests for utility functions
- Component tests for interactions
- Integration tests for data flow
- Visual regression tests for charts

### Deployment Checklist
- [ ] All TypeScript errors resolved
- [ ] Responsive design verified
- [ ] Accessibility audit passed
- [ ] Performance metrics met
- [ ] Error boundaries implemented
- [ ] Loading states added
- [ ] Documentation complete