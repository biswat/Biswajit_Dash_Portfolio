"use client"

import { useEffect, useState } from "react"

export type DeviceState = {
  os: string
  browser: string
  resolution: string
  viewport: string
  pixelRatio: number
  colorDepth: number
  cores: number | null
  ramGb: number | null
  touchPoints: number
  language: string
  reducedMotion: boolean
  loadTimeMs: number | null
}

function detectOs(ua: string, platform: string) {
  if (/Windows NT 10/.test(ua)) return "Windows"
  if (/Windows/.test(ua)) return "Windows"
  if (/Android/.test(ua)) return "Android"
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS"
  if (/Mac OS X/.test(ua)) return "macOS"
  if (/CrOS/.test(ua)) return "ChromeOS"
  if (/Linux/.test(ua)) return "Linux"
  return platform || "Unknown"
}

function detectBrowser(ua: string) {
  const match =
    /(Edg|OPR|Firefox|Chrome|Safari)\/(\d+)/.exec(
      // Chrome's UA also contains Safari; strip it so the earlier alternatives win.
      ua
    ) ?? null
  if (!match) return "Unknown"
  const names: Record<string, string> = {
    Edg: "Edge",
    OPR: "Opera",
    Firefox: "Firefox",
    Chrome: "Chrome",
    Safari: "Safari",
  }
  // Prefer the most specific vendor token present.
  for (const token of ["Edg", "OPR", "Firefox", "Chrome", "Safari"]) {
    const specific = new RegExp(`${token}/(\\d+)`).exec(ua)
    if (specific) return `${names[token]} ${specific[1]}`
  }
  return `${names[match[1]] ?? match[1]} ${match[2]}`
}

function navigationTiming(): number | null {
  const entry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined
  if (!entry || !entry.loadEventEnd) return null
  return Math.round(entry.loadEventEnd - entry.startTime)
}

function read(): DeviceState {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const ua = nav.userAgent

  return {
    os: detectOs(ua, nav.platform),
    browser: detectBrowser(ua),
    resolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: Number(window.devicePixelRatio.toFixed(2)),
    colorDepth: screen.colorDepth,
    cores: nav.hardwareConcurrency ?? null,
    ramGb: nav.deviceMemory ?? null,
    touchPoints: nav.maxTouchPoints ?? 0,
    language: nav.language,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    loadTimeMs: navigationTiming(),
  }
}

export function useDevice(): DeviceState | null {
  const [state, setState] = useState<DeviceState | null>(null)

  useEffect(() => {
    const update = () => setState(read())
    update()

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    window.addEventListener("resize", update)
    motion.addEventListener("change", update)

    return () => {
      window.removeEventListener("resize", update)
      motion.removeEventListener("change", update)
    }
  }, [])

  return state
}
