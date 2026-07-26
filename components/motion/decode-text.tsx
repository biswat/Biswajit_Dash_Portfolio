"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const CHARSET = "█▓▒░<>/\\|0123456789ABCDEF"

function scrambleChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

/**
 * Jarvis-style decode effect: characters scramble through a glyph set and
 * resolve left-to-right. SSR and the first client render show the final text
 * so hydration stays deterministic; the scramble starts in an effect. Layout
 * is reserved by an invisible copy of the final text, so proportional fonts
 * don't jitter while glyphs cycle.
 */
export function DecodeText({
  text,
  className,
  delay = 0,
  durationMs = 900,
  startOnView = false,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  durationMs?: number
  startOnView?: boolean
  as?: "span" | "h1" | "h2" | "h3" | "p"
}) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(text)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const shouldStart = startOnView ? inView : true

  useEffect(() => {
    if (reducedMotion || !shouldStart) return

    let frame: number
    let start: number | null = null
    let cancelled = false

    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        if (cancelled) return
        if (start === null) start = now
        const progress = Math.min((now - start) / durationMs, 1)
        const resolved = Math.floor(progress * text.length)
        let next = text.slice(0, resolved)
        for (let i = resolved; i < text.length; i++) {
          next += text[i] === " " ? " " : scrambleChar()
        }
        setDisplay(next)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [text, delay, durationMs, reducedMotion, shouldStart])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("relative inline-block", className)}
      aria-label={text}
    >
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        {display}
      </span>
    </Tag>
  )
}
