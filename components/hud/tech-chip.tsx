import { cn } from "@/lib/utils"

/**
 * Chips are drawn with the two-layer clip-path trick: an outer layer filled
 * with the border color and an inner layer inset 1px, both clipped to the same
 * silhouette — a single cut on the bottom-right corner. Fixed-px cuts stay
 * crisp regardless of chip width.
 */
const CHIP_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)"
const CHIP_CLIP_INNER =
  "polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%)"

export function TechChip({
  name,
  level,
  className,
}: {
  name: string
  /** Omit for a quiet, indicator-less chip (e.g. experience stack lists). */
  level?: "core" | "familiar"
  className?: string
}) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        aria-hidden
        className="bg-border/80 absolute inset-0"
        style={{ clipPath: CHIP_CLIP }}
      />
      <span
        className={cn(
          "bg-background relative m-px inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em]",
          level === "core" ? "text-foreground" : "text-muted-foreground"
        )}
        style={{ clipPath: CHIP_CLIP_INNER }}
      >
        {level === "core" && (
          <span aria-hidden className="bg-foreground/70 size-1 shrink-0" />
        )}
        {level === "familiar" && (
          <span
            aria-hidden
            className="border-muted-foreground/50 size-1 shrink-0 border"
          />
        )}
        {name}
      </span>
    </span>
  )
}
