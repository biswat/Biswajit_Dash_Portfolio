"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react"

import { SECTION_ATTRIBUTE } from "@/hooks/use-session-telemetry"

/**
 * Scroll position expressed in sections traversed: 1.0 means the first section
 * has been fully read, 4.0 means the last one has. Measured from real section
 * offsets because section heights are uneven (hero 85svh, rest 70svh, and
 * experience overflows its minimum) — uniform quartiles of document height
 * would drift away from the actual section boundaries.
 *
 * The progress is a MotionValue, not state: it updates at scroll rate without
 * re-rendering. `count` is state and settles after the first measure.
 */
export function useSectionProgress() {
  const { scrollY } = useScroll()
  const progress = useMotionValue(0)
  const boundsRef = useRef<number[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const measure = () => {
      // Dedupe by section name: guards against transient duplicate nodes
      // (e.g. skeleton/real-content overlap) inflating the count.
      const seen = new Set<string>()
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(`[${SECTION_ATTRIBUTE}]`)
      ).filter((node) => {
        const name = node.getAttribute(SECTION_ATTRIBUTE)
        if (!name || seen.has(name)) return false
        seen.add(name)
        return true
      })
      // A section counts as done once its bottom half clears the viewport
      // midpoint — when you have finished reading it, not when its top touches
      // the top of the screen.
      boundsRef.current = nodes.map(
        (node) => node.offsetTop + node.offsetHeight - window.innerHeight * 0.5
      )
      setCount((prev) => (prev === nodes.length ? prev : nodes.length))
    }

    measure()
    // Catches viewport resize, font load, and MotionProvider swapping the
    // skeleton for real content.
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  useMotionValueEvent(scrollY, "change", (y) => {
    const bounds = boundsRef.current
    if (bounds.length === 0) return

    let value = 0
    let prev = 0
    for (let i = 0; i < bounds.length; i++) {
      const end = bounds[i]
      if (y >= end) {
        value = i + 1
        prev = end
        continue
      }
      const span = end - prev
      value = i + (span > 0 ? Math.min(1, Math.max(0, (y - prev) / span)) : 0)
      break
    }
    progress.set(value)
  })

  return { progress, count }
}
