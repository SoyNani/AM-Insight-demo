import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

export function Card({ children, className, padding = "md", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-200",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}


export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-between", className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-sm font-medium text-muted-foreground", className)}>{children}</h3>
}

export function CardValue({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-2xl font-semibold text-card-foreground tracking-tight", className)}>{children}</p>
}
