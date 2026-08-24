"use client"

import { useEffect, useState } from "react"

export type Clock = {
  epochMs: number
  utc: string
  local: string
  offsetMinutes: number
  timezone: string
}

function read(): Clock {
  const now = new Date()
  return {
    epochMs: now.getTime(),
    utc: now.toISOString().slice(11, 23),
    local: now.toTimeString().slice(0, 8),
    offsetMinutes: -now.getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

/** Ticks on every animation frame so the millisecond field actually moves. */
export function useClock(): Clock | null {
  const [clock, setClock] = useState<Clock | null>(null)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      setClock(read())
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return clock
}
