"use client"

import { useEffect, useState } from "react"

import type { ClientInfo } from "@/app/api/client-info/route"

export type ClientInfoState = {
  data: ClientInfo | null
  /** Round trip to our own origin, in ms. Doubles as a latency probe. */
  rttMs: number | null
  error: boolean
}

export function useClientInfo(pollMs = 30_000): ClientInfoState {
  const [state, setState] = useState<ClientInfoState>({
    data: null,
    rttMs: null,
    error: false,
  })

  useEffect(() => {
    const controller = new AbortController()
    let timer: ReturnType<typeof setTimeout>

    const load = async () => {
      const started = performance.now()
      try {
        const res = await fetch("/api/client-info", {
          cache: "no-store",
          signal: controller.signal,
        })
        const data = (await res.json()) as ClientInfo
        setState({
          data,
          rttMs: Math.round(performance.now() - started),
          error: false,
        })
      } catch {
        if (!controller.signal.aborted) {
          setState((prev) => ({ ...prev, error: true }))
        }
      }
      if (!controller.signal.aborted) {
        timer = setTimeout(load, pollMs)
      }
    }

    load()
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [pollMs])

  return state
}
