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
            "card p-6 shadow-sm animate-fade-in",
            "bg-card text-card-foreground border border-border dark:bg-card dark:text-card-foreground dark:border-border"
        )}
            style={{ animationDelay: "200ms" }}
        >
            <h3 className="mb-6 text-base font-semibold text-foreground">
                Top Productos
            </h3>
            <div className="space-y-6">
                {products.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary dark:bg-primary/20">
                                {index + 1}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.sales} uds</p>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
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
