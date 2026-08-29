import { cn } from "@/src/lib/utils";

interface Datum {
  label: string;
  value: number;
}

/**
 * Dependency-free chart primitives sized for the Lyra aesthetic.
 * Trade-off: these cover the static summary view (hover titles only). If the
 * dashboard later needs interactive tooltips/brushing on real data, swap in
 * recharts via `npx shadcn@latest add chart` — the data shapes here map 1:1.
 */

export function BarChart({
  data,
  formatValue,
  className,
}: {
  data: Datum[];
  formatValue: (value: number) => string;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      className={cn("flex flex-col", className)}
      role="img"
      aria-label={data.map((d) => `${d.label}: ${formatValue(d.value)}`).join(", ")}
    >
      <div className="flex h-36 items-end gap-2 md:gap-3">
        {data.map((d) => (
          <div
            key={d.label}
            className="group flex h-full flex-1 items-end"
            title={`${d.label}: ${formatValue(d.value)}`}
          >
            <div
              className="bg-muted-foreground/25 group-hover:bg-primary/80 w-full rounded-md transition-colors"
              style={{ height: `${Math.max((d.value / max) * 100, 3)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="text-muted-foreground mt-2 flex gap-2 md:gap-3">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-xs">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface DonutSegment {
  label: string;
  percent: number;
  className?: string;
}

export function DonutChart({
  segments,
  centerLabel,
}: {
  segments: DonutSegment[];
  centerLabel: string;
}) {
  // Running offset for each segment so adjacent slices meet without gaps.
  const segmentsWithOffset = segments.reduce<Array<DonutSegment & { offset: number }>>(
    (acc, segment) => {
      const offset = acc.length === 0 ? 0 : acc[acc.length - 1]!.offset + acc[acc.length - 1]!.percent;
      acc.push({ ...segment, offset });
      return acc;
    },
    [],
  );

  return (
    <div className="relative size-36 md:size-40">
      <svg
        viewBox="0 0 42 42"
        className="size-full -rotate-90"
        role="img"
        aria-label={segments.map((s) => `${s.label}: ${s.percent}%`).join(", ")}
      >
        {segmentsWithOffset.map((segment) => (
          <circle
            key={segment.label}
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            strokeWidth="5.5"
            stroke="currentColor"
            strokeDasharray={`${segment.percent} ${100 - segment.percent}`}
            strokeDashoffset={-segment.offset}
            className={segment.className}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold tracking-tight tabular-nums">{centerLabel}</span>
      </div>
    </div>
  );
}

interface StackedBarSegment {
  label: string;
  percent: number;
  className?: string;
}

export function StackedBar({ segments }: { segments: StackedBarSegment[] }) {
  return (
    <div
      className="flex h-1.5 w-full gap-px overflow-hidden"
      role="img"
      aria-label={segments.map((s) => `${s.label}: ${Math.round(s.percent)}%`).join(", ")}
    >
      {segments.map((s) => (
        <div
          key={s.label}
          className={cn("h-full", s.className)}
          style={{ width: `${s.percent}%` }}
          title={`${s.label}: ${Math.round(s.percent)}%`}
        />
      ))}
    </div>
  );
}

export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values, 1);

  return (
    <div className={cn("flex h-8 items-end gap-0.5", className)} aria-hidden>
      {values.map((value, index) => (
        <div
          key={index}
          className="bg-muted-foreground/30 flex-1 rounded-[1px]"
          style={{ height: `${Math.max((value / max) * 100, 8)}%` }}
        />
      ))}
    </div>
  );
}
