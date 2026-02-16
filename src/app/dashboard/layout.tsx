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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={cn("min-h-screen bg-background", mobileOpen && "no-scroll")}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "flex flex-col transition-all duration-300 min-h-screen ml-0",
          collapsed ? "sm:ml-16" : "sm:ml-60"
        )}
      >
        <Header title="Dashboard" onMobileToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
