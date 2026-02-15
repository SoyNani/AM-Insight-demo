"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { ProductActions } from "@/components/molecules/product-actions"
import { DeleteProductModal } from "@/components/organisms/delete-product-modal"
import { ViewProductModal } from "@/components/organisms/view-product-modal"
import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/types"

export function ProductList() {
    const { products } = useProducts()
    const [viewProduct, setViewProduct] = useState<Product | null>(null)
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)

    // Slice to show recent 5, matching the original design
    const recentProducts = products?.slice(0, 5) || []

    return (
        <>
            <div className="card">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-foreground">Productos Recientes</h3>
                    <Button variant="ghost" size="sm" className="button-secondary text-xs">Ver todos</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground border-b border-border/50">
                            <tr>
                                <th className="pb-3 font-medium">Producto</th>
                                <th className="pb-3 font-medium">Estado</th>
                                <th className="pb-3 font-medium text-right">Margen</th>
                                <th className="pb-3 font-medium text-right">Ventas</th>
                                <th className="pb-3 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {recentProducts.map((product) => (
                                <tr key={product.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="py-3 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-muted/50 p-1 overflow-hidden shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                                />
                                            </div>
                                            <div className="flex flex-col max-w-[180px]">
                                                <span className="truncate font-semibold text-foreground">{product.title}</span>
                                                <span className="text-xs text-muted-foreground truncate">{product.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        {/* Estado visual: ejemplo, alternar según estado real si lo tienes */}
                                        <span className="badge badge-success">Activo</span>
                                    </td>
                                    <td className="py-3 text-right text-muted-foreground">32%</td>
                                    <td className="py-3 text-right font-medium">
                                        {/* Mock sales data since API doesn't provide it */}
                                        {Math.floor(Math.random() * 50) + 10}
                                    </td>
                                    <td className="py-3 text-right">
                                        <ProductActions
                                            onView={() => setViewProduct(product)}
                                            onDelete={() => setDeleteProduct(product)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {recentProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        No hay productos recientes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <ViewProductModal
                product={viewProduct}
                isOpen={!!viewProduct}
                onClose={() => setViewProduct(null)}
            />

            <DeleteProductModal
                product={deleteProduct}
                isOpen={!!deleteProduct}
                onClose={() => setDeleteProduct(null)}
            />
        </>
    )
}
