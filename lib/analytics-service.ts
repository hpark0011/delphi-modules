import type { 
  AnalyticsData, 
  DateRange, 
  MetricsData, 
  ChartDataPoint 
} from "@/app/analytics/types"

function generateChartData(dateRange: DateRange): ChartDataPoint[] {
  const baseData = [
    { date: "July 26", answered: 14, unanswered: 2 },
    { date: "July 27", answered: 15, unanswered: 3 },
    { date: "July 28", answered: 17, unanswered: 3 },
    { date: "July 29", answered: 16, unanswered: 5 },
    { date: "July 30", answered: 19, unanswered: 21 },
  ]
  
  return baseData.map((item, index) => {
    const date = new Date(dateRange.start)
    date.setDate(date.getDate() + index)
    
    return {
      date: date.toISOString(),
      dateFormatted: item.date,
      answered: item.answered,
      unanswered: item.unanswered,
      total: item.answered + item.unanswered,
    }
  })
}

function generateActiveUsersChart(): Array<{ date: string; value: number }> {
  return [
    { date: "Jul 26", value: 450 },
    { date: "Jul 27", value: 520 },
    { date: "Jul 28", value: 480 },
    { date: "Jul 29", value: 550 },
    { date: "Jul 30", value: 582 },
  ];
}

function generateConversationsChart(): Array<{ date: string; value: number }> {
  return [
    { date: "Jul 26", value: 1850 },
    { date: "Jul 27", value: 1920 },
    { date: "Jul 28", value: 2000 },
    { date: "Jul 29", value: 2050 },
    { date: "Jul 30", value: 2100 },
  ];
}

function generateAnsweredQuestionsChart(): Array<{ date: string; value: number }> {
  return [
    { date: "Jul 26", value: 42 },
    { date: "Jul 27", value: 48 },
    { date: "Jul 28", value: 51 },
    { date: "Jul 29", value: 54 },
    { date: "Jul 30", value: 56 },
  ];
}

function generateTimeCreatedChart(): Array<{ date: string; value: number }> {
  return [
    { date: "Jul 26", value: 210 },
    { date: "Jul 27", value: 225 },
    { date: "Jul 28", value: 240 },
    { date: "Jul 29", value: 235 },
    { date: "Jul 30", value: 252 },
  ];
}

function generateMetrics(): MetricsData {
  return {
    activeUsers: {
      value: 582,
      change: 46.2,
      isPositive: true,
    },
    conversations: {
      value: 2100,
      change: 4.2,
      isPositive: false,
      formatted: "2.1K",
    },
    answeredQuestions: {
      value: 56,
      change: 12.2,
      isPositive: true,
      answered: 56,
      total: 180,
    },
    timeCreated: {
      value: 252,
      change: 20.2,
      isPositive: false,
      hours: 4,
      minutes: 12,
    },
  }
}

export async function fetchAnalyticsData(
  dateRange: DateRange
): Promise<AnalyticsData> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    dateRange,
    metrics: generateMetrics(),
    chartData: generateChartData(dateRange),
    activeUsersChart: generateActiveUsersChart(),
    conversationsChart: generateConversationsChart(),
    answeredQuestionsChart: generateAnsweredQuestionsChart(),
    timeCreatedChart: generateTimeCreatedChart(),
    isLoading: false,
    error: null,
  }
}

export function getInitialDateRange(): DateRange {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)
  
  return {
    start,
    end,
    period: '7d',
  }
}