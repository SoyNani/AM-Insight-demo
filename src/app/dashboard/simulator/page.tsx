"use client"

import { Header } from "@/components/organisms/header"
import { SimulatorForm } from "@/components/organisms/simulator-form"

export default function SimulatorPage() {
  return (
    <>
      <Header title="Simulador de Margen" />
      <div className="flex flex-col gap-6 p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Calcula tu margen de ganancia estimado antes de publicar un producto en MercadoLibre.
          </p>
        </div>
        <SimulatorForm />
      </div>
    </>
  )
}
