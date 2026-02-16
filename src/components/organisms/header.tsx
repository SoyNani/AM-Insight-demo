"use client"

import { Sun, Moon, User } from "lucide-react"
import { Menu } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"

interface HeaderProps {
  title: string
  onMobileToggle?: () => void
}

export function Header({ title, onMobileToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onMobileToggle?.()}
          className="sm:hidden mr-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu className="h-4 w-4" />
        </button>

        <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Demo</span>
        </div>
      </div>
    </header>
  )
}
