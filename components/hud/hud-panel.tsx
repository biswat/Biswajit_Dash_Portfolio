import { cn } from "@/lib/utils"

type Variant = "console" | "cut" | "ledger" | "strip" | "bracket"

/**
 * The console silhouette (contact panel): a recessed titlebar band across the
 * top-right, a two-step staircase notch into the bottom-right corner, and
 * asymmetric chamfers on the left corners. Drawn in a 320×200 design space.
 * The same geometry is used twice — normalized to 0–1 for the
 * objectBoundingBox clipPath (so the clipped background scales with the
 * panel) and raw for the stroke overlay (preserveAspectRatio="none" +
 * non-scaling-stroke keeps the outline crisp). SVG silhouettes distort on
 * tall or variable-aspect panels — reserve them for reliably landscape
 * panels and use the fixed-px CSS variants everywhere else.
 */
const CONSOLE_PATH =
  "M8,0 L88,0 L100,14 L310,14 L320,24 L320,170 L308,170 L308,185 L293,185 L293,200 L20,200 L0,180 L0,8 Z"

const CONSOLE_PATH_NORMALIZED =
  "M0.025,0 L0.275,0 L0.3125,0.07 L0.96875,0.07 L1,0.12 L1,0.85 L0.9625,0.85 L0.9625,0.925 L0.915625,0.925 L0.915625,1 L0.0625,1 L0,0.9 L0,0.04 Z"

const CONSOLE_CLIP_ID = "hud-clip-console"

const SVG_GEOMETRIES = [
  { clipId: CONSOLE_CLIP_ID, normalizedPath: CONSOLE_PATH_NORMALIZED },
]

/**
 * CSS variants draw their frame with two stacked clip-path layers: an outer
 * layer filled with the border color and an inner layer inset 1px filled with
 * the page background (so the frame fill never tints the panel surface), with
 * the translucent card wash layered inside it. Fixed-px cuts stay crisp at
 * any aspect ratio.
 */
const CUT_CLIP =
  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))"
const CUT_CLIP_INNER =
  "polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))"

const STRIP_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
const STRIP_CLIP_INNER =
  "polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)"

const CONTENT_PADDING: Record<Variant, string> = {
  console: "px-5 pt-7 pb-10 sm:px-6",
  cut: "p-5 sm:p-6",
  ledger: "px-5 pt-8 pb-5 sm:px-6",
  strip: "px-4 py-3",
  bracket: "p-5 sm:p-6",
}

/**
 * Render once per page (page.tsx) so every SVG-silhouette HudPanel can
 * reference its shared objectBoundingBox clipPath.
 */
export function HudPanelDefs() {
  return (
    <svg aria-hidden className="absolute size-0">
      <defs>
        {SVG_GEOMETRIES.map((geometry) => (
          <clipPath
            key={geometry.clipId}
            id={geometry.clipId}
            clipPathUnits="objectBoundingBox"
          >
            <path d={geometry.normalizedPath} />
          </clipPath>
        ))}
      </defs>
    </svg>
  )
}

function CornerBrackets() {
  return (
    <>
      <span className="border-foreground/40 absolute top-0 left-0 size-2.5 border-t border-l" />
      <span className="border-foreground/40 absolute top-0 right-0 size-2.5 border-t border-r" />
      <span className="border-foreground/40 absolute bottom-0 left-0 size-2.5 border-b border-l" />
      <span className="border-foreground/40 absolute right-0 bottom-0 size-2.5 border-b border-r" />
    </>
  )
}

/** Card wash nested inside a CSS-variant inner layer. */
function CardWash() {
  return <div className="bg-card/40 absolute inset-0 backdrop-blur-sm" />
}

function ConsoleFrame() {
  return (
    <>
      <div
        className="bg-card/40 absolute inset-0 backdrop-blur-sm"
        style={{ clipPath: `url(#${CONSOLE_CLIP_ID})` }}
      >
        {/* scanline texture inside the recessed titlebar band */}
        <div
          aria-hidden
          className="scanlines text-foreground absolute top-0 right-0 left-[31.25%] h-[7%] opacity-[0.05]"
        />
      </div>
      <svg
        aria-hidden
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="text-border pointer-events-none absolute inset-0 h-full w-full transition-colors duration-300 group-hover/panel:text-foreground/30"
      >
        <path
          d={CONSOLE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  )
}

function CutFrame() {
  return (
    <>
      <div
        className="bg-border/80 group-hover/panel:bg-foreground/30 absolute inset-0 transition-colors duration-300"
        style={{ clipPath: CUT_CLIP }}
      />
      <div
        className="bg-background absolute inset-px"
        style={{ clipPath: CUT_CLIP_INNER }}
      >
        <CardWash />
      </div>
      <span aria-hidden className="bg-foreground/25 absolute top-0 left-5 h-0.5 w-8" />
    </>
  )
}

function LedgerFrame() {
  return (
    <>
      <div className="border-border/60 bg-card/40 group-hover/panel:border-foreground/25 absolute inset-0 border backdrop-blur-sm transition-colors duration-300" />
      {/* inner spine doubling the timeline rail */}
      <span
        aria-hidden
        className="bg-foreground/15 group-hover/panel:bg-foreground/30 absolute inset-y-1 left-1 w-0.5 transition-colors duration-300"
      />
      {/* tick marks protruding from the right edge */}
      <span aria-hidden className="bg-border absolute top-1/3 -right-2 h-px w-2" />
      <span aria-hidden className="bg-border absolute top-2/3 -right-2 h-px w-2" />
    </>
  )
}

function StripFrame() {
  return (
    <>
      <div
        className="bg-border/80 group-hover/panel:bg-foreground/25 absolute inset-0 transition-colors duration-300"
        style={{ clipPath: STRIP_CLIP }}
      />
      <div
        className="bg-background absolute inset-px"
        style={{ clipPath: STRIP_CLIP_INNER }}
      >
        <CardWash />
      </div>
      {/* solid end-cap and detached endpoint tick */}
      <span aria-hidden className="bg-foreground/40 absolute inset-y-0 left-0 w-0.5" />
      <span
        aria-hidden
        className="bg-foreground/40 absolute top-1/2 -right-2 size-1 -translate-y-1/2"
      />
    </>
  )
}

function BracketFrame() {
  return (
    <>
      <div className="border-border/60 bg-card/40 group-hover/panel:border-foreground/25 absolute inset-0 border backdrop-blur-sm transition-colors duration-300" />
      <CornerBrackets />
    </>
  )
}

const FRAMES: Record<Variant, () => React.ReactNode> = {
  console: ConsoleFrame,
  cut: CutFrame,
  ledger: LedgerFrame,
  strip: StripFrame,
  bracket: BracketFrame,
}

export function HudPanel({
  variant = "bracket",
  header,
  index,
  className,
  contentClassName,
  children,
}: {
  /**
   * Every section gets its own frame:
   * - "console" — SVG silhouette with titlebar band + staircase notch; only
   *   for reliably landscape panels (contact).
   * - "cut" — opposite-corner 14px chamfers, CSS, safe at any aspect (skills
   *   cards).
   * - "ledger" — hairline rect with inner spine and an attached header tab
   *   (experience entries; header/index render in the tab, not inline).
   * - "strip" — capped readout bar with chamfered right end (hero stats).
   * - "bracket" — plain rect with corner brackets, the generic fallback.
   */
  variant?: Variant
  header?: string
  index?: string
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) {
  const Frame = FRAMES[variant]
  const headerInTab = variant === "ledger"

  return (
    <div
      className={cn(
        "group/panel shadow-foreground/10 relative transition-shadow duration-300 hover:shadow-[0_0_32px_-10px]",
        className
      )}
    >
      <Frame />

      {headerInTab && (header || index) && (
        <div className="border-border/60 bg-card absolute -top-3 left-6 flex items-baseline gap-3 border px-3 py-1">
          {header && (
            <span className="text-muted-foreground/80 font-mono text-[10px] tracking-[0.22em] uppercase">
              {header}
            </span>
          )}
          {index && (
            <span className="text-muted-foreground/50 font-mono text-[10px] tracking-[0.14em] tabular-nums">
              {index}
            </span>
          )}
        </div>
      )}

      <div
        className={cn("relative", CONTENT_PADDING[variant], contentClassName)}
      >
        {!headerInTab && (header || index) && (
          <div className="mb-4 flex items-baseline justify-between gap-4">
            {header && (
              <span className="text-muted-foreground/60 font-mono text-[10px] tracking-[0.22em] uppercase">
                {header}
              </span>
            )}
            {index && (
              <span className="text-muted-foreground/40 font-mono text-[10px] tracking-[0.14em] tabular-nums">
                {index}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
