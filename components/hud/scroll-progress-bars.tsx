"use client"

import { useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

import { useSectionProgress } from "@/hooks/use-section-progress"
import { cn } from "@/lib/utils"

function ProgressBar({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  // Bar N fills 0 → 1 as progress crosses N → N+1.
  const scaleX = useTransform(progress, (v) =>
    Math.min(1, Math.max(0, v - index))
  )

  return (
    <div className="border-border/60 bg-background/40 relative h-1.5 w-6 border">
      <motion.div
        aria-hidden
        className="bg-foreground absolute inset-0 origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}

/**
 * Scroll gauge: one bar per section, filling left to right. Sits inline at the
 * right end of the bottom rail, so it lives inside HudBottomRail rather than
 * the page — the page is swapped for a skeleton until MotionProvider mounts.
 */
export function ScrollProgressBars({ className }: { className?: string }) {
  const { progress, count } = useSectionProgress()
  const reduced = useReducedMotion()
  // High damping on purpose: overshoot on a progress bar reads as a bug.
  const smooth = useSpring(
    progress,
    reduced ? { duration: 0 } : { stiffness: 220, damping: 34, mass: 0.6 }
  )

  // Only re-renders when the integer changes, so at most `count` times.
  const [reached, setReached] = useState(0)
  useMotionValueEvent(smooth, "change", (v) => {
    const next = Math.min(count, Math.max(0, Math.ceil(v - 0.001)))
    setReached((prev) => (prev === next ? prev : next))
  })

  if (count === 0) return null

  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={reached}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <div className="flex -skew-x-12 transform-gpu gap-1">
        {Array.from({ length: count }, (_, i) => (
          <ProgressBar key={i} index={i} progress={smooth} />
        ))}
      </div>
      <span className="text-muted-foreground/50 font-mono text-[9px] tracking-[0.22em] tabular-nums">
        {String(reached).padStart(2, "0")}/{String(count).padStart(2, "0")}
      </span>
    </div>
  )
}
