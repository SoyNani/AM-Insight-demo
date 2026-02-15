"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Calculator,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Productos", icon: Package },
  { href: "/dashboard/simulator", label: "Simulador", icon: Calculator },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "sidebar fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <BarChart3 className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-primary whitespace-nowrap animate-fade-in">
            <span style={{ color: 'var(--color-primary)' }}>Autome</span><span style={{ color: 'var(--color-accent)' }}>li Insight</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="flex flex-col gap-1" role="navigation" aria-label="Menu principal">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "active"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <span className="animate-fade-in">{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground cursor-pointer"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
