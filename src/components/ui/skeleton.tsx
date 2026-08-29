import type { ComponentProps } from "react";
import { cn } from "@/src/lib/utils";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("bg-muted animate-pulse", className)} aria-hidden {...props} />;
}

export { Skeleton };
