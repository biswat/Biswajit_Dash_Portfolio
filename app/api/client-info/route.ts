import { headers } from "next/headers"

export const dynamic = "force-dynamic"

export type ClientInfo = {
  ip: string | null
  city: string | null
  region: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  timezone: string | null
  asn: string | null
  serverTime: number
}

function firstIp(value: string | null) {
  if (!value) return null
  const ip = value.split(",")[0]?.trim()
  return ip || null
}

function num(value: string | null) {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export async function GET() {
  const h = await headers()

  // Vercel/Cloudflare/Fly edge geo headers, in rough order of preference.
  const info: ClientInfo = {
    ip:
      firstIp(h.get("x-forwarded-for")) ??
      h.get("x-real-ip") ??
      h.get("cf-connecting-ip") ??
      h.get("x-vercel-forwarded-for"),
    city: decodeHeader(h.get("x-vercel-ip-city") ?? h.get("cf-ipcity")),
    region: decodeHeader(
      h.get("x-vercel-ip-country-region") ?? h.get("cf-region-code")
    ),
    country: h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry"),
    latitude: num(h.get("x-vercel-ip-latitude") ?? h.get("cf-iplatitude")),
    longitude: num(h.get("x-vercel-ip-longitude") ?? h.get("cf-iplongitude")),
    timezone: h.get("x-vercel-ip-timezone") ?? h.get("cf-timezone"),
    asn: h.get("x-vercel-ip-as-number") ?? null,
    serverTime: Date.now(),
  }

  return Response.json(info, {
    headers: { "cache-control": "no-store" },
  })
}

function decodeHeader(value: string | null) {
  if (!value) return null
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
