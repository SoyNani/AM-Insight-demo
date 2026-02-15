"use client"

import { Button } from "@/components/atoms/button"
import { Eye, Trash2 } from "lucide-react"

interface ProductActionsProps {
    onView: () => void
    onDelete: () => void
}

export function ProductActions({ onView, onDelete }: ProductActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={onView}
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                title="Ver detalles"
            >
                <Eye className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                title="Eliminar producto"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
