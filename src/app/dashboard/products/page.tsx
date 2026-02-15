"use client"

import { Header } from "@/components/organisms/header"
import { ProductTable } from "@/components/organisms/product-table"
import { AddProductModal } from "@/components/organisms/add-product-modal"
import { useProducts } from "@/hooks/use-products"

export default function ProductsPage() {
  const { products } = useProducts()

  return (
    <>
      <Header title="Gestión de Productos" />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {products ? `${products.length} productos sincronizados` : "Cargando..."}
          </p>
          <AddProductModal />
        </div>
        <ProductTable />
      </div>
    </>
  )
}

