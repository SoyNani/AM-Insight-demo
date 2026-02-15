"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Card } from "@/components/molecules/card"

interface CategoryData {
  category: string
  productos: number
}

const data: CategoryData[] = [
  { category: "Electronica", productos: 42 },
  { category: "Ropa", productos: 28 },
  { category: "Joyeria", productos: 15 },
  { category: "Hogar", productos: 23 },
]

export function CategoryChart() {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Productos por Categoria
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--card-foreground)",
              }}
            />
            <Bar
              dataKey="productos"
              name="Productos"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
