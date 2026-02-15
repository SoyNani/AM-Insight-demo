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
import { cn } from "@/lib/utils"

const data = [
    { name: "Lun", ventas: 12 },
    { name: "Mar", ventas: 19 },
    { name: "Mié", ventas: 15 },
    { name: "Jue", ventas: 22 },
    { name: "Vie", ventas: 28 },
    { name: "Sáb", ventas: 35 },
    { name: "Dom", ventas: 24 },
]

export function SalesChart() {
    return (
        <Card className={cn(
            "card p-6 shadow-sm animate-fade-in",
            "bg-card text-card-foreground border border-border dark:bg-card dark:text-card-foreground dark:border-border"
        )}
            style={{ animationDelay: "100ms" }}
        >
            <h3 className="mb-6 text-base font-semibold text-foreground">
                Ventas Semanales
            </h3>
            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
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
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                borderColor: "var(--border)",
                                borderRadius: "8px",
                                fontSize: "12px",
                                color: "var(--card-foreground)",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                        />
                        <Bar
                            dataKey="ventas"
                            fill="var(--color-primary)"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
