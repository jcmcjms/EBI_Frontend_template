import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const dummyData = [
  { date: 'Mon', applications: 45, approvals: 38 },
  { date: 'Tue', applications: 52, approvals: 41 },
  { date: 'Wed', applications: 48, approvals: 44 },
  { date: 'Thu', applications: 61, approvals: 52 },
  { date: 'Fri', applications: 55, approvals: 48 },
  { date: 'Sat', applications: 32, approvals: 28 },
  { date: 'Sun', applications: 28, approvals: 24 },
]

export function WeeklyTrend() {
  const chartData = useMemo(() => dummyData, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-1))' }}
          />
          <Line
            type="monotone"
            dataKey="approvals"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-2))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
