import { cn } from "@/lib/utils"
import { formatPercent } from "@/lib/utils"

interface TrendIndicatorProps {
  value: number
  className?: string
}

export function TrendIndicator({ value, className }: TrendIndicatorProps) {
  const isPositive = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        isPositive ? "text-success" : "text-destructive",
        className
      )}
    >
      <svg
        className={cn("h-3 w-3", !isPositive && "rotate-180")}
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M6 2.5L9.5 6.5H2.5L6 2.5Z" fill="currentColor" />
      </svg>
      {formatPercent(value)}
    </span>
  )
}
