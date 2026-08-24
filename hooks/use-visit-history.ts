"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "hud:visits:v1"

type StoredVisits = {
  count: number
  firstAt: number
  lastAt: number
  totalMs: number
}

export type VisitHistory = {
  /** 1 on a first visit, incremented once per page load after that. */
  visit: number
  /** When this browser first loaded the site. */
  firstAt: number
  /** End of the previous visit, null the first time round. */
  previousAt: number | null
  /** Time on site across every visit including this one, ticking live. */
  totalMs: number
}

function read(): StoredVisits | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredVisits>
    if (typeof parsed.count !== "number") return null
    const now = Date.now()
    return {
      count: parsed.count,
      firstAt: parsed.firstAt ?? now,
      lastAt: parsed.lastAt ?? now,
      totalMs: parsed.totalMs ?? 0,
    }
  } catch {
    // Private mode, disabled storage, or corrupt JSON — treat as a first visit.
    return null
  }
}

function write(value: StoredVisits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Nothing to do: the counter just won't survive this visit.
  }
}

/**
 * Claimed once per page load, not once per mount, so React's development
 * double-effect (and any second consumer of the hook) can't inflate the count.
 */
let claimed: VisitHistory | null = null

function claim(): VisitHistory {
  if (claimed) return claimed
  const stored = read()
  const now = Date.now()
  claimed = {
    visit: (stored?.count ?? 0) + 1,
    firstAt: stored?.firstAt ?? now,
    previousAt: stored?.lastAt ?? null,
    totalMs: stored?.totalMs ?? 0,
  }
  return claimed
}

/**
 * Return-visit memory, kept in localStorage. Null until mounted, since the
 * server has no way to know any of this.
 */
export function useVisitHistory(tickMs = 1000, persistMs = 5000) {
  const [state, setState] = useState<VisitHistory | null>(null)

  useEffect(() => {
    const base = claim()
    const startedAt = performance.now()
    // Wall clock, so time with the tab in the background still counts as time
    // on site — same as the uptime readout in the bottom rail.
    const elapsed = () => performance.now() - startedAt

    const persist = () => {
      write({
        count: base.visit,
        firstAt: base.firstAt,
        lastAt: Date.now(),
        totalMs: base.totalMs + elapsed(),
      })
    }

    const publish = () =>
      setState({ ...base, totalMs: base.totalMs + elapsed() })

    publish()
    // Claim the visit up front so a visitor who bounces still gets counted.
    persist()

    const tick = setInterval(publish, tickMs)
    const save = setInterval(persist, persistMs)
    window.addEventListener("pagehide", persist)

    return () => {
      clearInterval(tick)
      clearInterval(save)
      window.removeEventListener("pagehide", persist)
      persist()
    }
  }, [tickMs, persistMs])

  return state
}
