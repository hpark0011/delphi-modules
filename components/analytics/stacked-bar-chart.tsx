"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ChartDataPoint } from "@/app/analytics/types"

interface StackedBarChartProps {
  data: ChartDataPoint[]
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    payload: ChartDataPoint
  }>
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload) return null
  
  const answered = payload.find(p => p.dataKey === 'answered')?.value || 0
  const unanswered = payload.find(p => p.dataKey === 'unanswered')?.value || 0
  
  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-orange-500" />
          <span className="text-xs">Answered Question</span>
          <span className="text-xs font-semibold ml-auto">{answered}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-orange-200" />
          <span className="text-xs">Unanswered Question</span>
          <span className="text-xs font-semibold ml-auto">{unanswered}</span>
        </div>
      </div>
    </div>
  )
}

const CustomLegend = () => {
  return (
    <div className="flex items-center gap-6 justify-start mt-4 pl-12">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-orange-500" />
        <span className="text-sm text-gray-600">Answered Questions</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="12" height="12" className="rounded-sm">
          <defs>
            <pattern
              id="diagonalHatch"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <path
                d="M0,4 L4,0"
                stroke="#fed7aa"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="12" height="12" fill="#fed7aa" />
          <rect width="12" height="12" fill="url(#diagonalHatch)" />
        </svg>
        <span className="text-sm text-gray-600">Unanswered Questions</span>
      </div>
    </div>
  )
}

export function StackedBarChart({ data, className }: StackedBarChartProps) {
  React.useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
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
    `
    document.body.appendChild(svg)
    svg.style.position = 'absolute'
    svg.style.width = '0'
    svg.style.height = '0'
    
    return () => {
      if (svg.parentNode) {
        svg.parentNode.removeChild(svg)
      }
    }
  }, [])
  
  return (
    <Card className={cn("border-gray-200 shadow-sm", className)}>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <pattern
                id="stripes"
                patternUnits="userSpaceOnUse"
                width="4"
                height="4"
              >
                <path
                  d="M0,4 L4,0"
                  stroke="#c2846a"
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            
            <XAxis
              dataKey="dateFormatted"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            
            <Bar dataKey="answered" stackId="a" fill="#ea580c" radius={[0, 0, 0, 0]} />
            <Bar dataKey="unanswered" stackId="a" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#stripes)" style={{ fill: '#fed7aa' }} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <CustomLegend />
      </CardContent>
    </Card>
  )
}