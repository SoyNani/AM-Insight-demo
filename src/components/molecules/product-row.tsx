"use client"

import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { formatCurrency } from "@/lib/utils"
import { Trash2, ExternalLink } from "lucide-react"
import type { Product, ProductStatus } from "@/types"

interface ProductRowProps {
  product: Product
  status: ProductStatus
  onDelete: (id: number) => void
  isDeleting: boolean
}

const statusConfig: Record<ProductStatus, { label: string; variant: "success" | "warning" | "default" }> = {
  active: { label: "Activo", variant: "success" },
  alert: { label: "Alerta", variant: "warning" },
  synced: { label: "Sincronizado", variant: "default" },
}

function getProductStatus(id: number): ProductStatus {
  if (id % 3 === 0) return "alert"
  if (id % 2 === 0) return "synced"
  return "active"
}

export function ProductRow({ product, onDelete, isDeleting }: ProductRowProps) {
  const status = getProductStatus(product.id)
  const config = statusConfig[status]

  return (
    <tr className="border-b border-border transition-colors hover:bg-muted/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain p-1"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground max-w-[200px] lg:max-w-[300px]">
              {product.title}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {product.category}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {formatCurrency(product.price)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {formatCurrency(product.price * 1.45)}
      </td>
      <td className="px-4 py-3">
        <Badge variant={config.variant}>{config.label}</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Ver producto"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            isLoading={isDeleting}
            aria-label="Eliminar producto"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </td>
    </tr>
  )
}

export { getProductStatus }
