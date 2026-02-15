"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/atoms/input"
import { Card, CardHeader, CardTitle, CardValue } from "@/components/molecules/card"
import { Badge } from "@/components/atoms/badge"
import { formatCurrency } from "@/lib/utils"
import type { MarginSimulation } from "@/types"
import { DollarSign, Truck, Percent, TrendingUp } from "lucide-react"

export function SimulatorForm() {
  const [amazonPrice, setAmazonPrice] = useState(29.99)
  const [shippingCost, setShippingCost] = useState(8.5)
  const [mlCommission, setMlCommission] = useState(13)
  const [mlPrice, setMlPrice] = useState(59.99)

  const simulation = useMemo<MarginSimulation>(() => {
    const totalCost = amazonPrice + shippingCost
    const commissionAmount = (mlPrice * mlCommission) / 100
    const profit = mlPrice - totalCost - commissionAmount
    const marginPercent = mlPrice > 0 ? (profit / mlPrice) * 100 : 0

    return {
      amazonPrice,
      shippingCost,
      mlCommission,
      mlPrice,
      margin: commissionAmount,
      marginPercent,
      profit,
    }
  }, [amazonPrice, shippingCost, mlCommission, mlPrice])

  const profitStatus =
    simulation.profit > 0 ? "positive" : simulation.profit < 0 ? "negative" : "neutral"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Form */}
      <Card className="animate-fade-in">
        <h3 className="mb-6 text-base font-semibold text-foreground">
          Parametros del Producto
        </h3>
        <div className="flex flex-col gap-5">
          <Input
            label="Precio en Amazon (USD)"
            type="number"
            step="0.01"
            min="0"
            value={amazonPrice}
            onChange={(e) => setAmazonPrice(Number(e.target.value))}
            hint="Costo del producto en Amazon"
          />
          <Input
            label="Costo de Envio (USD)"
            type="number"
            step="0.01"
            min="0"
            value={shippingCost}
            onChange={(e) => setShippingCost(Number(e.target.value))}
            hint="Costo estimado de envio y forwarding"
          />
          <Input
            label="Comision MercadoLibre (%)"
            type="number"
            step="0.5"
            min="0"
            max="100"
            value={mlCommission}
            onChange={(e) => setMlCommission(Number(e.target.value))}
            hint="Porcentaje de comision de la plataforma"
          />
          <Input
            label="Precio de Venta en ML (USD)"
            type="number"
            step="0.01"
            min="0"
            value={mlPrice}
            onChange={(e) => setMlPrice(Number(e.target.value))}
            hint="Precio al que publicaras en MercadoLibre"
          />
        </div>
      </Card>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <Card
          className="animate-fade-in border-2"
          style={{
            animationDelay: "100ms",
            borderColor:
              profitStatus === "positive"
                ? "var(--success)"
                : profitStatus === "negative"
                  ? "var(--destructive)"
                  : "var(--border)",
          }}
        >
          <CardHeader>
            <CardTitle>Ganancia Neta</CardTitle>
            <Badge
              variant={
                profitStatus === "positive"
                  ? "success"
                  : profitStatus === "negative"
                    ? "destructive"
                    : "outline"
              }
            >
              {profitStatus === "positive"
                ? "Rentable"
                : profitStatus === "negative"
                  ? "Perdida"
                  : "Neutral"}
            </Badge>
          </CardHeader>
          <CardValue
            className="mt-3"
            style={{
              color:
                profitStatus === "positive"
                  ? "var(--success)"
                  : profitStatus === "negative"
                    ? "var(--destructive)"
                    : "var(--foreground)",
            }}
          >
            {formatCurrency(simulation.profit)}
          </CardValue>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard
            icon={<Percent className="h-4 w-4" />}
            label="Margen de Ganancia"
            value={`${simulation.marginPercent.toFixed(1)}%`}
            delay={200}
          />
          <ResultCard
            icon={<DollarSign className="h-4 w-4" />}
            label="Comision ML"
            value={formatCurrency(simulation.margin)}
            delay={300}
          />
          <ResultCard
            icon={<Truck className="h-4 w-4" />}
            label="Costo Total"
            value={formatCurrency(amazonPrice + shippingCost)}
            delay={400}
          />
          <ResultCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Precio de Venta"
            value={formatCurrency(mlPrice)}
            delay={500}
          />
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  value: string
  delay?: number
}) {
  return (
    <Card
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-card-foreground">{value}</p>
    </Card>
  )
}
