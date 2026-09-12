import { CircleNotch } from "@phosphor-icons/react"
import { cn } from "cn"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <CircleNotch
      className={cn("animate-spin text-muted-foreground", sizeClasses[size], className)}
      weight="bold"
    />
  )
}
