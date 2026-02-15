"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card } from "@/components/molecules/card"
import type { ChartDataPoint } from "@/types"

const data: ChartDataPoint[] = [
  { name: "Ene", ingresos: 4200, gastos: 2800 },
  { name: "Feb", ingresos: 5100, gastos: 3200 },
  { name: "Mar", ingresos: 4800, gastos: 2900 },
  { name: "Abr", ingresos: 6200, gastos: 3600 },
  { name: "May", ingresos: 5800, gastos: 3400 },
  { name: "Jun", ingresos: 7100, gastos: 4100 },
  { name: "Jul", ingresos: 6800, gastos: 3900 },
]

export function RevenueChart() {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Ingresos vs Gastos
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--card-foreground)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem" }}
            />
            <Line
              type="monotone"
              dataKey="ingresos"
              name="Ingresos"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "var(--primary)" }}
            />
            <Line
              type="monotone"
              dataKey="gastos"
              name="Gastos"
              stroke="var(--muted-foreground)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              activeDot={{ r: 4, fill: "var(--muted-foreground)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
