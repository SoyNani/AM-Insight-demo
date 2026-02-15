"use client"

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"
import { Card } from "@/components/molecules/card"
import { cn } from "@/lib/utils"

const data = [
    { name: "Ene", ingresos: 4200 },
    { name: "Feb", ingresos: 5800 },
    { name: "Mar", ingresos: 4900 },
    { name: "Abr", ingresos: 7200 },
    { name: "May", ingresos: 6100 },
    { name: "Jun", ingresos: 8400 },
    { name: "Jul", ingresos: 7800 },
]

export function IncomeChart() {
    return (
        <Card className={cn(
            "border-none bg-white p-6 shadow-sm dark:bg-card/40 dark:backdrop-blur-xl dark:ring-1 dark:ring-white/10",
            "animate-fade-in"
        )}>
            <h3 className="mb-6 text-base font-semibold text-foreground">
                Ingresos Mensuales
            </h3>
            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            className="opacity-50"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                            tickFormatter={(v) => `$${v}`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                borderColor: "var(--border)",
                                borderRadius: "8px",
                                fontSize: "12px",
                                color: "var(--card-foreground)",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Ingresos"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="ingresos"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorIngresos)"
                            activeDot={{ r: 4, strokeWidth: 0, fill: "var(--primary)" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
