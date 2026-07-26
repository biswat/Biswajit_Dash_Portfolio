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

export function offset(minutes: number) {
  const sign = minutes >= 0 ? "+" : "-"
  const abs = Math.abs(minutes)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `UTC${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}
