export const DASH = "—"

export function nullish<T>(
  value: T | null | undefined,
  render: (value: T) => string
) {
  return value === null || value === undefined ? DASH : render(value)
}

export function coord(value: number | null, axis: "lat" | "lon") {
  if (value === null) return DASH
  const hemisphere =
    axis === "lat" ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W"
  return `${Math.abs(value).toFixed(4)}°${hemisphere}`
}

export function duration(ms: number) {
  const total = Math.floor(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

/** Coarse relative time, sized to fit a rail: "just now", "14m ago", "3d ago". */
export function ago(timestamp: number, now = Date.now()) {
  const seconds = Math.max(0, Math.round((now - timestamp) / 1000))
  if (seconds < 45) return "just now"
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.round(months / 12)}y ago`
}

export function meters(value: number) {
  if (value < 1) return `${Math.round(value * 100)} cm`
  if (value < 1000) return `${value.toFixed(1)} m`
  return `${(value / 1000).toFixed(2)} km`
}

export function offset(minutes: number) {
  const sign = minutes >= 0 ? "+" : "-"
  const abs = Math.abs(minutes)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `UTC${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}
