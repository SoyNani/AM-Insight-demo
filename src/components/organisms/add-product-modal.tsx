"use client"

import { useState } from "react"
import { Plus, X, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { createProduct } from "@/actions/products"
import { useProducts } from "@/hooks/use-products"

export function AddProductModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { mutate } = useProducts()

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "https://fakestoreapi.com/img/placeholder.png", // Default for now
    })

    const displayImage = formData.image !== "https://fakestoreapi.com/img/placeholder.png"
        ? formData.image
        : null

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const newProduct = await createProduct({
                title: formData.title,
                price: parseFloat(formData.price),
                category: formData.category,
                description: formData.description,
                image: formData.image || "https://fakestoreapi.com/img/placeholder.png",
            })

            mutate((currentProducts) => {
                return [newProduct, ...(currentProducts || [])]
            }, false)

            setIsOpen(false)
            setFormData({
                title: "",
                price: "",
                category: "",
                description: "",
                image: "https://fakestoreapi.com/img/placeholder.png",
            })
        } catch (error) {
            console.error("Failed to create product:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar Producto
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-xl ring-1 ring-border animate-scale-in">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Nuevo Producto</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nombre del Producto</label>
                        <Input
                            required
                            placeholder="Ej: Audífonos Bluetooth"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Precio ($)</label>
                            <Input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Categoría</label>
                            <Input
                                required
                                placeholder="Ej: Electrónica"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Descripción</label>
                        <Input
                            required
                            placeholder="Breve descripción..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Imagen del Producto</label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-muted-foreground/25 bg-muted/50">
                                {displayImage ? (
                                    <img
                                        src={displayImage}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Upload className="h-8 w-8 text-muted-foreground/50" />
                                )}
                            </div>
                            <div className="relative flex-1">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Sube una imagen desde tu equipo (JPG, PNG)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Guardar Producto
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
