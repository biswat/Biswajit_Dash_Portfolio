"use client"

import { usePointerTrail } from "@/hooks/use-pointer-trail"
import { DASH, meters } from "@/lib/format"
import { cn } from "@/lib/utils"

import { Stat } from "./stat"

/** Map units across. Height follows the viewport's aspect ratio. */
const WIDTH = 100

/**
 * A scaled-down mirror of the visitor's own viewport: their pointer, its recent
 * trail, and how far it has travelled this visit. The left-rail counterpart to
 * the globe on the right.
 */
export function CursorMap({ className }: { className?: string }) {
  const { points, aspect, travelMeters, speed, active } = usePointerTrail()
  const height = WIDTH / aspect
  const head = points.at(-1)

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        aria-hidden
        className="relative w-full border border-border/60 bg-background/40"
        style={{ aspectRatio: String(aspect) }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="block h-full w-full text-foreground"
        >
          {/* Thirds, so the pointer reads as being somewhere rather than adrift. */}
          <g className="text-border" stroke="currentColor" strokeWidth={0.4}>
            <line x1={WIDTH / 3} y1={0} x2={WIDTH / 3} y2={height} />
            <line
              x1={(WIDTH * 2) / 3}
              y1={0}
              x2={(WIDTH * 2) / 3}
              y2={height}
            />
            <line x1={0} y1={height / 3} x2={WIDTH} y2={height / 3} />
            <line
              x1={0}
              y1={(height * 2) / 3}
              x2={WIDTH}
              y2={(height * 2) / 3}
            />
          </g>

          {/* One line per segment: SVG can't fade a single polyline along itself. */}
          <g stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
            {points.slice(1).map((point, index) => {
              const previous = points[index]
              return (
                <line
                  key={index}
                  x1={previous.x * WIDTH}
                  y1={previous.y * height}
                  x2={point.x * WIDTH}
                  y2={point.y * height}
                  opacity={((index + 1) / points.length) * 0.85}
                />
              )
            })}
          </g>

          {head && (
            <g stroke="currentColor" strokeWidth={0.4} opacity={0.35}>
              <line
                x1={head.x * WIDTH}
                y1={0}
                x2={head.x * WIDTH}
                y2={height}
              />
              <line
                x1={0}
                y1={head.y * height}
                x2={WIDTH}
                y2={head.y * height}
              />
            </g>
          )}
          {head && (
            <circle
              cx={head.x * WIDTH}
              cy={head.y * height}
              r={1.6}
              fill="currentColor"
            />
          )}
        </svg>
      </div>

      <Stat
        label="travel"
        value={active ? meters(travelMeters) : DASH}
        accent
      />
      <Stat label="speed" value={active ? `${speed} px/s` : DASH} />
    </div>
  )
}
