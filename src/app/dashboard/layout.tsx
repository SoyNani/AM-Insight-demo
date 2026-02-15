"use client"

import { useState } from "react"

import { Sidebar } from "@/components/organisms/sidebar"
import { Header } from "@/components/organisms/header"
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
      <div className={cn(
        "flex flex-col transition-all duration-300 min-h-screen",
        collapsed ? "ml-16" : "ml-60"
      )}>
        <Header title="Dashboard" />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
