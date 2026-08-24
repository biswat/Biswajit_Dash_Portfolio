"use client"

import { useEffect, useState } from "react"

export type SessionTelemetry = {
  fps: number
  cursorX: number
  cursorY: number
  scrollPercent: number
  scrollDirection: "up" | "down" | "idle"
  activeSection: string
  uptimeMs: number
  idleMs: number
  clicks: number
  keys: number
  visible: boolean
  focusChanges: number
}

const initial: SessionTelemetry = {
  fps: 0,
  cursorX: 0,
  cursorY: 0,
  scrollPercent: 0,
  scrollDirection: "idle",
  activeSection: "—",
  uptimeMs: 0,
  idleMs: 0,
  clicks: 0,
  keys: 0,
  visible: true,
  focusChanges: 0,
}

/**
 * Mark a section for ACTIVE SECTION tracking with
 * `<section data-section="about">`. The most visible one wins.
 */
export const SECTION_ATTRIBUTE = "data-section"

/**
 * Everything here changes at animation-frame rate, so the mutable state lives in
 * a plain object and React is only notified `sampleHz` times per second.
 */
export function useSessionTelemetry(sampleHz = 10): SessionTelemetry {
  const [snapshot, setSnapshot] = useState<SessionTelemetry>(initial)

  useEffect(() => {
    const state: SessionTelemetry = { ...initial, visible: !document.hidden }
    const startedAt = performance.now()
    let lastInteractionAt = startedAt
    let lastScrollY = window.scrollY
    let lastPublishAt = 0
    let framesInWindow = 0
    let fpsWindowStart = startedAt
    let scrollResetTimer: ReturnType<typeof setTimeout>
    let frame = 0

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const name = entry.target.getAttribute(SECTION_ATTRIBUTE)
          if (name) state.activeSection = name
        }
      },
      { threshold: [0.5], rootMargin: "-20% 0px -40% 0px" }
    )
    document
      .querySelectorAll(`[${SECTION_ATTRIBUTE}]`)
      .forEach((node) => observer.observe(node))

    const onPointerMove = (event: PointerEvent) => {
      state.cursorX = Math.round(event.clientX)
      state.cursorY = Math.round(event.clientY)
      lastInteractionAt = performance.now()
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      state.scrollPercent = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
      state.scrollDirection = window.scrollY > lastScrollY ? "down" : "up"
      lastScrollY = window.scrollY
      lastInteractionAt = performance.now()

      clearTimeout(scrollResetTimer)
      scrollResetTimer = setTimeout(() => {
        state.scrollDirection = "idle"
      }, 200)
    }

    const onClick = () => {
      state.clicks += 1
      lastInteractionAt = performance.now()
    }

    const onKey = () => {
      state.keys += 1
      lastInteractionAt = performance.now()
    }

    const onVisibility = () => {
      state.visible = !document.hidden
      state.focusChanges += 1
    }

    const loop = (now: number) => {
      framesInWindow += 1
      if (now - fpsWindowStart >= 500) {
        state.fps = Math.round((framesInWindow * 1000) / (now - fpsWindowStart))
        framesInWindow = 0
        fpsWindowStart = now
      }

      state.uptimeMs = now - startedAt
      state.idleMs = now - lastInteractionAt

      if (now - lastPublishAt >= 1000 / sampleHz) {
        lastPublishAt = now
        setSnapshot({ ...state })
      }

      frame = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("click", onClick)
    window.addEventListener("keydown", onKey)
    document.addEventListener("visibilitychange", onVisibility)
    onScroll()
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(scrollResetTimer)
      observer.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [sampleHz])

  return snapshot
}
