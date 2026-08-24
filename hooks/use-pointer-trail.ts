"use client"

import { useEffect, useState } from "react"

/** Pointer position normalised to 0–1 within the viewport. */
export type TrailPoint = { x: number; y: number }

export type PointerTrail = {
  /** Oldest first, so the tail can be drawn faintest. */
  points: TrailPoint[]
  /** Viewport width / height, for sizing the map to match the real screen. */
  aspect: number
  /** Cumulative pointer travel this visit, in metres of reference CSS pixels. */
  travelMeters: number
  /** Pointer speed over the last publish window, in CSS px/s. */
  speed: number
  /** False until the pointer moves at all — keyboard and touch-only visitors. */
  active: boolean
}

const MAX_POINTS = 28

/** A reference CSS pixel is 1/96 inch, so this converts px of travel to metres. */
const PX_TO_METERS = 0.0254 / 96

const initial: PointerTrail = {
  points: [],
  aspect: 16 / 10,
  travelMeters: 0,
  speed: 0,
  active: false,
}

/**
 * Follows the visitor's pointer for the HUD mini-map. Like `useSessionTelemetry`
 * the hot state is a plain object mutated on every event, and React is only
 * notified `sampleHz` times a second — and only when something actually moved.
 */
export function usePointerTrail(sampleHz = 20): PointerTrail {
  const [snapshot, setSnapshot] = useState<PointerTrail>(initial)

  useEffect(() => {
    const points: TrailPoint[] = []
    const interval = 1000 / sampleHz
    let aspect = window.innerWidth / window.innerHeight
    let travelPx = 0
    let movedSincePublish = 0
    let lastX: number | null = null
    let lastY: number | null = null
    let lastPublishAt = performance.now()
    let active = false
    let dirty = false
    let frame = 0

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX
      const y = event.clientY

      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(x - lastX, y - lastY)
        travelPx += distance
        movedSincePublish += distance
      }
      lastX = x
      lastY = y
      active = true

      points.push({ x: x / window.innerWidth, y: y / window.innerHeight })
      if (points.length > MAX_POINTS) points.shift()
      dirty = true
    }

    const onResize = () => {
      aspect = window.innerWidth / window.innerHeight
      dirty = true
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)

      const elapsed = now - lastPublishAt
      if (elapsed < interval) return
      lastPublishAt = now

      // Idle: retire the oldest point each tick so the trail drains away
      // instead of freezing wherever the pointer stopped.
      if (!dirty && points.length > 0) {
        points.shift()
        dirty = true
      }
      if (!dirty) {
        movedSincePublish = 0
        return
      }

      const speed = Math.round((movedSincePublish * 1000) / elapsed)
      movedSincePublish = 0
      dirty = false

      setSnapshot({
        points: [...points],
        aspect,
        travelMeters: travelPx * PX_TO_METERS,
        speed,
        active,
      })
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("resize", onResize)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
    }
  }, [sampleHz])

  return snapshot
}
