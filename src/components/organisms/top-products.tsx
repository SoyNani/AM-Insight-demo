"use client"

import { Card } from "@/components/molecules/card"
import { cn } from "@/lib/utils"
import { ShoppingBag } from "lucide-react"

// Mock data based on the image
const products = [
    {
        id: 1,
        name: "Cargador USB-C 65W",
        sales: 124,
        revenue: 3581,
    },
    {
        id: 2,
        name: "Funda iPhone 15 Pro",
        sales: 89,
        revenue: 1771,
    },
    {
        id: 3,
        name: "Mouse Ergonómico",
        sales: 67,
        revenue: 3678,
    },
    {
        id: 4,
        name: "Audífonos Bluetooth Pro",
        sales: 48,
        revenue: 2040,
    },
]

export function TopProducts() {
    return (
        <Card className={cn(
            "border-none bg-white p-6 shadow-sm dark:bg-card/40 dark:backdrop-blur-xl dark:ring-1 dark:ring-white/10",
            "animate-fade-in"
        )}
            style={{ animationDelay: "200ms" }}
        >
            <h3 className="mb-6 text-base font-semibold text-foreground">
                Top Productos
            </h3>
            <div className="space-y-6">
                {products.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary dark:bg-primary/20">
                                {index + 1}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.sales} uds</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-foreground">
                                ${product.revenue.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
