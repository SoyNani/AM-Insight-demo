"use client"

import { Card, CardHeader, CardTitle, CardValue } from "@/components/molecules/card"
import { TrendIndicator } from "@/components/atoms/trend-indicator"
import type { MetricCard as MetricCardType } from "@/types"

interface MetricCardProps extends MetricCardType {
  icon: React.ReactNode
  delay?: number
}

export function MetricCard({ label, value, change, icon, delay = 0 }: MetricCardProps) {
  return (
    <Card
      className="animate-fade-in hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <div className="mt-3 flex items-end gap-2">
        <CardValue className="animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
          {value}
        </CardValue>
        <TrendIndicator value={change} className="mb-1" />
      </div>
    </Card>
  )
}
