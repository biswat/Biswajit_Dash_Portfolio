"use client"

import createGlobe, { type Arc, type Marker } from "cobe"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type { Arc as GlobeArc, Marker as GlobeMarker }

/**
 * Monochrome palettes modeled on the "CDN" showcase preset from
 * cobe.vercel.app (black markers/arcs on a white globe) — flipped for dark
 * mode. Colors are re-created (not updated per frame) since cobe only reads
 * base/marker/glow/arc colors at init.
 */
const LIGHT_PALETTE = {
  dark: 0,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0, 0, 0] as [number, number, number],
  glowColor: [0.86, 0.86, 0.86] as [number, number, number],
  arcColor: [0, 0, 0] as [number, number, number],
  mapBrightness: 10,
}

const DARK_PALETTE = {
  dark: 1,
  baseColor: [0.32, 0.32, 0.32] as [number, number, number],
  markerColor: [1, 1, 1] as [number, number, number],
  glowColor: [0.4, 0.4, 0.4] as [number, number, number],
  arcColor: [0.92, 0.92, 0.92] as [number, number, number],
  mapBrightness: 15,
}

/** Lat/lng (degrees) -> unit vector on the sphere. */
function toVector([lat, lng]: [number, number]): [number, number, number] {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  const cosLat = Math.cos(latRad)
  return [
    cosLat * Math.cos(lngRad),
    cosLat * Math.sin(lngRad),
    Math.sin(latRad),
  ]
}

function toLatLng([x, y, z]: [number, number, number]): [number, number] {
  return [(Math.asin(z) * 180) / Math.PI, (Math.atan2(y, x) * 180) / Math.PI]
}

/** Great-circle interpolation between two points, t in [0, 1]. */
function slerp(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const theta = Math.acos(dot) * t
  const relX = b[0] - a[0] * dot
  const relY = b[1] - a[1] * dot
  const relZ = b[2] - a[2] * dot
  const relLen = Math.sqrt(relX * relX + relY * relY + relZ * relZ) || 1
  const rx = relX / relLen
  const ry = relY / relLen
  const rz = relZ / relLen
  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  return [
    a[0] * cosT + rx * sinT,
    a[1] * cosT + ry * sinT,
    a[2] * cosT + rz * sinT,
  ]
}

/** Smoothstep-eased ping-pong: 0 -> 1 -> 0 over `periodMs`, never teleports. */
function pulsePhase(elapsedMs: number, periodMs: number) {
  const raw = (elapsedMs % (periodMs * 2)) / periodMs
  const t = raw <= 1 ? raw : 2 - raw
  return t * t * (3 - 2 * t)
}

const TRAVEL_PERIOD_MS = 2600

/**
 * Monochrome cobe globe. Auto-rotates, accepts pointer drag, and — when
 * `arcs` is passed — animates a small pulse marker traveling back and forth
 * along each arc's great-circle path.
 */
export function Globe({
  markers,
  arcs = [],
  className,
}: {
  markers: Marker[]
  arcs?: Arc[]
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(4.9)
  const dragPhiRef = useRef(0)
  const pointerStartXRef = useRef<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!mounted || !canvas || !container) return

    const palette = resolvedTheme === "light" ? LIGHT_PALETTE : DARK_PALETTE
    const travelers = arcs.map((arc) => ({
      from: toVector(arc.from),
      to: toVector(arc.to),
    }))

    let width = container.offsetWidth
    let frameId = 0
    const start = performance.now()

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.2,
      mapSamples: 16000,
      markerElevation: 0.02,
      diffuse: 1.2,
      scale: 1,
      opacity: 0.96,
      markers,
      arcs,
      arcWidth: 0.6,
      arcHeight: 0.22,
      ...palette,
    })

    const onResize = () => {
      width = container.offsetWidth
      globe.update({ width: width * 2, height: width * 2 })
    }
    window.addEventListener("resize", onResize)

    const animate = (now: number) => {
      if (pointerStartXRef.current === null) {
        phiRef.current += 0.0032
      }

      const pulseMarkers: Marker[] = travelers.map((traveler, index) => {
        // Stagger each arc's pulse so a multi-arc globe doesn't move in lockstep.
        const phaseOffset = (index * TRAVEL_PERIOD_MS) / (travelers.length * 2)
        const t = pulsePhase(now - start + phaseOffset, TRAVEL_PERIOD_MS)
        const [lat, lng] = toLatLng(slerp(traveler.from, traveler.to, t))
        return { location: [lat, lng], size: 0.045 }
      })

      globe.update({
        phi: phiRef.current + dragPhiRef.current,
        markers: [...markers, ...pulseMarkers],
      })
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [mounted, resolvedTheme, markers, arcs])

  if (!mounted) {
    return <div className={cn("aspect-square", className)} />
  }

  return (
    <div ref={containerRef} className={cn("relative aspect-square", className)}>
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(event) => {
          pointerStartXRef.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (pointerStartXRef.current === null) return
          const delta = event.clientX - pointerStartXRef.current
          dragPhiRef.current = delta / 200
        }}
        onPointerUp={() => {
          if (pointerStartXRef.current === null) return
          phiRef.current += dragPhiRef.current
          dragPhiRef.current = 0
          pointerStartXRef.current = null
        }}
        onPointerCancel={() => {
          phiRef.current += dragPhiRef.current
          dragPhiRef.current = 0
          pointerStartXRef.current = null
        }}
      />
    </div>
  )
}
