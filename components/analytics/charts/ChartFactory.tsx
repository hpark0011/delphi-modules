import * as React from "react";
import { AreaChartComponent } from "@/components/analytics/area-chart";
import { StackedQuestionsChart } from "@/components/analytics/stacked-questions-chart";
import type { ChartType } from "@/lib/analytics/metric-configs";

interface ChartFactoryProps {
  type: ChartType;
  data: any[];
  title: string;
  color: string;
  dataKey?: string;
}

export function ChartFactory({
  type,
  data,
  title,
  color,
  dataKey = "value",
}: ChartFactoryProps) {
  switch (type) {
    case "area":
      return (
        <AreaChartComponent
          data={data}
          title={title}
          color={color}
        />
      );
    case "stacked":
      return (
        <StackedQuestionsChart
          data={data}
          title={title}
        />
      );
    case "bar":
      // Future implementation
      return (
        <AreaChartComponent
          data={data}
          title={title}
          color={color}
        />
      );
    case "line":
      // Future implementation
      return (
        <AreaChartComponent
          data={data}
          title={title}
          color={color}
        />
      );
    default:
      return (
        <AreaChartComponent
          data={data}
          title={title}
          color={color}
        />
      );
  }
}