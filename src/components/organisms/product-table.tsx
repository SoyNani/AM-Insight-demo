"use client"

import { useState } from "react"
import { Card } from "@/components/molecules/card"
import { ProductRow, getProductStatus } from "@/components/molecules/product-row"
import { Skeleton } from "@/components/atoms/skeleton"
import { Input } from "@/components/atoms/input"
import { deleteProduct } from "@/actions/products"
import { useProducts } from "@/hooks/use-products"
import { Search } from "lucide-react"

export function ProductTable() {
  const { products, isLoading, mutate } = useProducts()
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete(id: number) {
    setDeletingId(id)
    try {
      await deleteProduct(id)
      mutate(
        (prev) => prev?.filter((p) => p.id !== id),
        false
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card padding="none" className="animate-fade-in overflow-hidden">
      {/* Search bar */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          aria-label="Buscar productos"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Producto
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Precio Amazon
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Precio ML
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Estado
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 py-3" colSpan={5}>
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ))
              : filtered?.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    status={getProductStatus(product.id)}
                    onDelete={handleDelete}
                    isDeleting={deletingId === product.id}
                  />
                ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {!isLoading && filtered?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No se encontraron productos
          </p>
        </div>
      )}
    </Card>
  )
}
