import type { ComponentProps } from "react";
import { cn } from "@/src/lib/utils";

function Progress({
  value,
  className,
  ...props
}: ComponentProps<"div"> & { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("bg-muted h-1.5 w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="bg-primary h-full transition-[width] duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };
