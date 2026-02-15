import { Card } from "@/components/molecules/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  delay?: number
  className?: string
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
  delay = 0,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden card p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        "bg-card text-card-foreground border border-border dark:bg-card dark:text-card-foreground dark:border-border animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:ring-primary/40">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
            trend === "up"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : trend === "down"
                ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
          )}
        >
          {change > 0 && "+"}
          {change}%
        </span>
        <span className="text-xs text-muted-foreground">vs mes anterior</span>
      </div>
    </Card>
  )
}
