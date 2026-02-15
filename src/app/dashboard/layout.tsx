"use client"

import { useState } from "react"
import { Sidebar } from "@/components/organisms/sidebar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        {children}
      </main>
    </div>
  )
}
