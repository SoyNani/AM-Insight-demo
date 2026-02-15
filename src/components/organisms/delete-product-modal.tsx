"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { Loader2, AlertTriangle } from "lucide-react"
import type { Product } from "@/types"
import { deleteProduct } from "@/actions/products"
import { useProducts } from "@/hooks/use-products"

interface DeleteProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function DeleteProductModal({ product, isOpen, onClose }: DeleteProductModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useProducts()

    if (!isOpen || !product) return null

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await deleteProduct(product.id)

            // Update local cache
            mutate((currentProducts) => {
                return currentProducts?.filter(p => p.id !== product.id)
            }, false)

            onClose()
        } catch (error) {
            console.error("Failed to delete product:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-xl bg-card p-6 shadow-xl ring-1 ring-border animate-scale-in">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <AlertTriangle className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">¿Estás seguro?</h2>
                        <p className="text-sm text-muted-foreground">
                            Estás a punto de eliminar <span className="font-medium text-foreground">"{product.title}"</span>.
                            Esta acción no se puede deshacer.
                        </p>
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
