"use client"

import { Button } from "@/components/atoms/button"
import { X, Tag, DollarSign, AlignLeft } from "lucide-react"
import type { Product } from "@/types"

interface ViewProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function ViewProductModal({ product, isOpen, onClose }: ViewProductModalProps) {
    if (!isOpen || !product) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-card shadow-xl ring-1 ring-border animate-scale-in">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/80 p-4 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold">Detalles del Producto</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/30">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-contain p-4 mix-blend-multiply dark:mix-blend-normal"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold leading-tight">{product.title}</h3>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                    {product.category}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                                    Activo
                                </span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-foreground">${product.price}</span>
                            <span className="text-sm text-muted-foreground">USD</span>
                        </div>

                        <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                            <div className="flex items-start gap-3">
                                <AlignLeft className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border border-border p-3">
                                <p className="text-xs text-muted-foreground">ID del Producto</p>
                                <p className="font-mono text-sm font-medium mt-1">#{product.id}</p>
                            </div>
                            <div className="rounded-lg border border-border p-3">
                                <p className="text-xs text-muted-foreground">Inventario</p>
                                <p className="text-sm font-medium mt-1">Disponible</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border bg-muted/10 p-4 flex justify-end">
                    <Button onClick={onClose}>Cerrar</Button>
                </div>
            </div>
        </div>
    )
}
