import { cn } from "@/lib/utils"

interface IconProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

export function Icon({ children, className, size = "md" }: IconProps) {
  return (
    <span className={cn("inline-flex items-center justify-center shrink-0", sizeMap[size], className)}>
      {children}
    </span>
  )
}
