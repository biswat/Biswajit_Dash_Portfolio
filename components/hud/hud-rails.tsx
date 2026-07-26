"use client"

import { useClock } from "@/hooks/use-clock"
import { useDevice } from "@/hooks/use-device"
import { useNetwork } from "@/hooks/use-network"
import { useSessionTelemetry } from "@/hooks/use-session-telemetry"
import { coord, DASH, duration, nullish, offset } from "@/lib/format"
import { Separator } from "@/components/ui/separator"

import { useClientInfoContext } from "./client-info-provider"
import { ScrollProgressBars } from "./scroll-progress-bars"
import { Stat, StatGroup } from "./stat"

export function HudTopRail() {
  const clock = useClock()
  const { data, error } = useClientInfoContext()

  const place = [data?.city, data?.region, data?.country]
    .filter(Boolean)
    .join(" / ")

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-8 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center gap-3 overflow-x-auto px-3 lg:gap-4">
        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-foreground" />
        <Stat label="lat" value={coord(data?.latitude ?? null, "lat")} accent />
        <Stat
          label="lon"
          value={coord(data?.longitude ?? null, "lon")}
          accent
        />
        <Separator orientation="vertical" className="h-4" />
        <Stat label="utc" value={clock?.utc ?? DASH} accent />
        <Stat label="ms" value={clock ? clock.epochMs : DASH} />
        <Separator orientation="vertical" className="h-4" />
        <Stat
          label="tz"
          value={data?.timezone ?? clock?.timezone ?? DASH}
          className="hidden md:flex"
        />
        <Stat
          label="offset"
          value={clock ? offset(clock.offsetMinutes) : DASH}
          className="hidden md:flex"
        />
        <Separator orientation="vertical" className="h-4" />
        <Stat
          label="loc"
          value={error ? "unavailable" : place || DASH}
          className="hidden lg:flex"
        />
      </div>
    </header>
  )
}

export function HudLeftRail() {
  const { data, rttMs, error } = useClientInfoContext()
  const network = useNetwork()

  return (
    <aside className="fixed top-8 bottom-8 left-0 z-40 hidden w-44 border-r border-border/60 bg-background/80 px-3 py-4 backdrop-blur-md lg:block">
      <div className="flex flex-col gap-5">
        <StatGroup title="identity">
          <Stat
            label="ip"
            value={error ? "hidden" : (data?.ip ?? DASH)}
            accent
          />
          <Stat label="asn" value={data?.asn ?? DASH} />
        </StatGroup>

        <StatGroup title="network">
          <Stat
            label="rtt"
            value={nullish(network?.rttMs ?? rttMs, (v) => `${v} ms`)}
            accent
          />
          <Stat
            label="downlink"
            value={nullish(network?.downlinkMbps, (v) => `${v} Mb/s`)}
          />
          <Stat
            label="type"
            value={network?.effectiveType?.toUpperCase() ?? DASH}
          />
          <Stat
            label="saver"
            value={nullish(network?.saveData, (v) => (v ? "on" : "off"))}
          />
          <Stat
            label="online"
            value={network ? (network.online ? "true" : "false") : DASH}
            accent
          />
        </StatGroup>
      </div>
    </aside>
  )
}

export function HudRightRail() {
  const device = useDevice()

  return (
    <aside className="fixed top-8 right-0 bottom-8 z-40 hidden w-44 border-l border-border/60 bg-background/80 px-3 py-4 backdrop-blur-md lg:block">
      <div className="flex flex-col gap-5">
        <StatGroup title="system">
          <Stat label="os" value={device?.os ?? DASH} accent />
          <Stat label="browser" value={device?.browser ?? DASH} accent />
          <Stat label="lang" value={device?.language ?? DASH} />
        </StatGroup>

        <StatGroup title="display">
          <Stat label="screen" value={device?.resolution ?? DASH} />
          <Stat label="viewport" value={device?.viewport ?? DASH} accent />
          <Stat
            label="dpr"
            value={nullish(device?.pixelRatio, (v) => `${v}x`)}
          />
          <Stat
            label="depth"
            value={nullish(device?.colorDepth, (v) => `${v}-bit`)}
          />
        </StatGroup>

        <StatGroup title="hardware">
          <Stat label="cores" value={device?.cores ?? DASH} accent />
          <Stat
            label="ram"
            value={nullish(device?.ramGb, (v) => `${v} GB`)}
            accent
          />
          <Stat label="touch" value={device?.touchPoints ?? DASH} />
          <Stat
            label="load"
            value={nullish(device?.loadTimeMs, (v) => `${v} ms`)}
          />
        </StatGroup>
      </div>
    </aside>
  )
}

export function HudBottomRail() {
  const session = useSessionTelemetry()

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-8 border-t border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center gap-3 overflow-x-auto px-3 lg:gap-4">
        <Stat label="fps" value={session.fps} accent />
        <Separator orientation="vertical" className="h-4" />
        <Stat
          label="cursor"
          value={`${session.cursorX},${session.cursorY}`}
          accent
        />
        <Separator orientation="vertical" className="h-4" />
        <Stat
          label="scroll"
          value={`${session.scrollPercent.toFixed(1)}%`}
          accent
        />
        <Stat
          label="dir"
          value={session.scrollDirection}
          className="hidden md:flex"
        />
        <Separator orientation="vertical" className="h-4" />
        <Stat label="section" value={session.activeSection} accent />
        <Separator orientation="vertical" className="h-4" />
        <Stat label="uptime" value={duration(session.uptimeMs)} accent />
        <Stat
          label="idle"
          value={duration(session.idleMs)}
          className="hidden md:flex"
        />
        <Separator orientation="vertical" className="h-4" />
        <Stat
          label="clicks"
          value={session.clicks}
          className="hidden lg:flex"
        />
        <Stat label="keys" value={session.keys} className="hidden lg:flex" />
        <Stat
          label="focus"
          value={session.visible ? "active" : "blurred"}
          className="hidden lg:flex"
        />
        <ScrollProgressBars className="ml-auto pl-3" />
      </div>
    </footer>
  )
}
