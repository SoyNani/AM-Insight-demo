"use client"

import { Header } from "@/components/organisms/header"
import { MetricCard } from "@/components/organisms/metric-card"
import { IncomeChart } from "@/components/organisms/income-chart"
import { SalesChart } from "@/components/organisms/sales-chart"
import { TopProducts } from "@/components/organisms/top-products"
import { ProductList } from "@/components/organisms/product-list"
import { useProducts } from "@/hooks/use-products"
import { Skeleton } from "@/components/atoms/skeleton"
import { Package, TrendingUp, DollarSign, Activity, ShoppingCart } from "lucide-react"

export default function DashboardPage() {
  const { products, isLoading } = useProducts()

  const productCount = products?.length ?? 0
  const avgPrice =
    products && products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length
      : 0

  return (
    <>
      <div className="flex flex-col gap-6 p-6 bg-background text-foreground transition-colors dark:bg-background dark:text-foreground min-h-screen">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Resumen de tu operación de dropshipping
              </p>
            </div>
          </div>

        {/* Metrics row */}
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[140px] rounded-xl card" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Productos Activos"
                value={String(productCount)}
                change={12.5}
                trend="up"
                icon={<Package className="h-6 w-6" />}
                delay={0}
                className="card"
              />
              <MetricCard
                label="Ventas del Mes"
                value="1,284"
                change={8.2}
                trend="up"
                icon={<ShoppingCart className="h-6 w-6" />}
                delay={100}
                className="card"
              />
              <MetricCard
                label="Margen Promedio"
                value="28.5%"
                change={-2.1}
                trend="down"
                icon={<TrendingUp className="h-6 w-6" />}
                delay={200}
                className="card"
              />
              <MetricCard
                label="Ingresos Estimados"
                value={`$${(avgPrice * productCount * 10).toFixed(0)}`} // Simulated calc
                change={15.3}
                trend="up"
                icon={<DollarSign className="h-6 w-6" />}
                delay={300}
                className="card"
              />
            </div>
          )}

        {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card"><IncomeChart /></div>
            <div className="card"><SalesChart /></div>
          </div>

        {/* Bottom Section: Top Products & Recent Products (Table placeholder) */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Products takes 1 col */}
            <div className="lg:col-span-1 card">
              <TopProducts />
            </div>

            {/* Recent Products Table takes 2 cols */}
            <div className="lg:col-span-2 card">
              <ProductList />
            </div>
          </div>
      </div>
    </>
  )
}

import { Button } from "@/components/atoms/button" // Importing Button for the 'See all' link

