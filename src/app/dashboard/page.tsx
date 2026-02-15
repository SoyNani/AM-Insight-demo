"use client"

import { Header } from "@/components/organisms/header"
import { MetricCard } from "@/components/organisms/metric-card"
import { RevenueChart } from "@/components/organisms/revenue-chart"
import { CategoryChart } from "@/components/organisms/category-chart"
import { useProducts } from "@/hooks/use-products"
import { Skeleton } from "@/components/atoms/skeleton"
import { Package, TrendingUp, DollarSign, Activity } from "lucide-react"

export default function DashboardPage() {
  const { products, isLoading } = useProducts()

  const productCount = products?.length ?? 0
  const avgPrice =
    products && products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length
      : 0

  return (
    <>
      <Header title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">
        {/* Metrics row */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[120px] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Productos Activos"
              value={String(productCount)}
              change={12.5}
              trend="up"
              icon={<Package className="h-4 w-4" />}
              delay={0}
            />
            <MetricCard
              label="Margen Promedio"
              value="24.8%"
              change={3.2}
              trend="up"
              icon={<TrendingUp className="h-4 w-4" />}
              delay={100}
            />
            <MetricCard
              label="Ingresos Estimados"
              value={`$${(avgPrice * productCount).toFixed(0)}`}
              change={8.1}
              trend="up"
              icon={<DollarSign className="h-4 w-4" />}
              delay={200}
            />
            <MetricCard
              label="Tasa de Conversion"
              value="3.2%"
              change={-1.4}
              trend="down"
              icon={<Activity className="h-4 w-4" />}
              delay={300}
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <CategoryChart />
        </div>
      </div>
    </>
  )
}
