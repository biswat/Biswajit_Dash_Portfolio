"use client"

import { useEffect, useState } from "react"

type NetworkInformation = {
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  type?: string
  addEventListener?: (type: string, listener: () => void) => void
  removeEventListener?: (type: string, listener: () => void) => void
}

export type NetworkState = {
  online: boolean
  effectiveType: string | null
  downlinkMbps: number | null
  rttMs: number | null
  saveData: boolean | null
  type: string | null
}

function connection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined
  const nav = navigator as Navigator & {
    connection?: NetworkInformation
    mozConnection?: NetworkInformation
    webkitConnection?: NetworkInformation
  }
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection
}

function read(): NetworkState {
  const conn = connection()
  return {
    online: typeof navigator === "undefined" ? true : navigator.onLine,
    effectiveType: conn?.effectiveType ?? null,
    downlinkMbps: conn?.downlink ?? null,
    rttMs: conn?.rtt ?? null,
    saveData: conn?.saveData ?? null,
    type: conn?.type ?? null,
  }
}

/**
 * Network Information API is Chromium-only; Safari/Firefox report nulls and we
 * fall back to the online flag plus the measured fetch RTT from useClientInfo.
 */
export function useNetwork(): NetworkState | null {
  const [state, setState] = useState<NetworkState | null>(null)

  useEffect(() => {
    const update = () => setState(read())
    update()

    const conn = connection()
    conn?.addEventListener?.("change", update)
    window.addEventListener("online", update)
    window.addEventListener("offline", update)

    return () => {
      conn?.removeEventListener?.("change", update)
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  return state
}
