import { cn } from "@/lib/utils"

type Variant = "console" | "skills" | "experience" | "strip" | "bracket"

type Corner = "tl" | "tr" | "br" | "bl"
type Corners = Partial<Record<Corner, number>>

/**
 * Every silhouette on this page is built from fixed-px 45° corner cuts instead
 * of a normalized SVG path. An objectBoundingBox clipPath scales with the box,
 * so one geometry renders as a shallow smear on a wide grid card and a steep
 * wedge on a tall timeline entry; fixed px keeps the chamfer identical on every
 * panel, and identical to the buttons and chips, which is what makes the set
 * read as one instrument rather than five unrelated shapes.
 *
 * `shrink` pulls the polygon 1px tighter for the inner (surface) layer: a CSS
 * border is sliced away along a diagonal, so the hairline is drawn as an outer
 * layer filled edge-to-edge with the frame color plus a surface layer at
 * inset-px clipped 1px tighter, leaving exactly 1px of frame showing all round.
 */
function cutPolygon(corners: Corners, shrink = 0) {
  const cut = (corner: Corner) => {
    const size = corners[corner] ?? 0
    return size > 0 ? Math.max(size - shrink, 1) : 0
  }

  const tl = cut("tl")
  const tr = cut("tr")
  const br = cut("br")
  const bl = cut("bl")

  const points: string[] = []
  points.push(tl ? `0 ${tl}px` : "0 0")
  if (tl) points.push(`${tl}px 0`)
  points.push(tr ? `calc(100% - ${tr}px) 0` : "100% 0")
  if (tr) points.push(`100% ${tr}px`)
  points.push(br ? `100% calc(100% - ${br}px)` : "100% 100%")
  if (br) points.push(`calc(100% - ${br}px) 100%`)
  points.push(bl ? `${bl}px 100%` : "0 100%")
  if (bl) points.push(`0 calc(100% - ${bl}px)`)

  return `polygon(${points.join(", ")})`
}

/**
 * Cut corners run on one diagonal per variant so neighbouring panels don't
 * mirror each other: the skills grid leans top-left/bottom-right, the stacked
 * experience entries lean the other way, and the console gets the widest cuts
 * as the heaviest panel on the page.
 */
const CUTS: Record<Variant, Corners> = {
  console: { tl: 20, br: 20 },
  skills: { tl: 14, br: 14 },
  experience: { tr: 16, bl: 16 },
  strip: { br: 10 },
  bracket: {},
}

const ALL_CORNERS: Corner[] = ["tl", "tr", "br", "bl"]

/** Variants whose header/index render as a titlebar band, not inline text. */
const BANDED: Variant[] = ["console", "skills", "experience"]

const CONTENT_PADDING: Record<Variant, string> = {
  console: "px-5 pt-6 pb-8 sm:px-7",
  skills: "px-5 pt-4 pb-5 sm:px-6",
  experience: "px-5 pt-5 pb-6 sm:px-6",
  strip: "px-4 py-3",
  bracket: "p-5 sm:p-6",
}

/** L-brackets sit only on the square corners — a cut corner gets a tick. */
const BRACKET_EDGES: Record<Corner, string> = {
  tl: "top-0 left-0 border-t border-l",
  tr: "top-0 right-0 border-t border-r",
  br: "right-0 bottom-0 border-b border-r",
  bl: "bottom-0 left-0 border-b border-l",
}

/**
 * A hairline drawn parallel to a chamfer, sitting in the triangle the cut
 * removed — the registration mark that reads as "this edge was machined" rather
 * than "this corner is missing". Positioned from the top-left in both axes
 * (`calc(100% - …)` on the far edges) so one translate centers it whichever
 * corner it belongs to.
 */
function ChamferTick({ corner, size }: { corner: Corner; size: number }) {
  const offset = Math.max(size / 2 - 3, 2)
  const length = Math.max(Math.round(size * 0.6), 6)
  const angle = corner === "tl" || corner === "br" ? "-45deg" : "45deg"

  return (
    <span
      aria-hidden
      className="absolute h-px bg-foreground/30 transition-colors duration-300 group-hover/panel:bg-foreground/60"
      style={{
        width: length,
        left: corner.endsWith("l") ? offset : `calc(100% - ${offset}px)`,
        top: corner.startsWith("t") ? offset : `calc(100% - ${offset}px)`,
        transform: `translate(-50%, -50%) rotate(${angle})`,
      }}
    />
  )
}

/** Frame hairline, surface, corner marks — shared by every variant. */
function PanelFrame({ variant }: { variant: Variant }) {
  const corners = CUTS[variant]
  // The hero strip is only ~45px tall — corner marks on a bar that short read
  // as noise, so it keeps its end-cap language instead.
  const marked = variant !== "strip"
  const cutCorners = marked ? ALL_CORNERS.filter((c) => corners[c]) : []
  const squareCorners = marked ? ALL_CORNERS.filter((c) => !corners[c]) : []

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-foreground/25 transition-colors duration-300 group-hover/panel:bg-foreground/50"
        style={{ clipPath: cutPolygon(corners) }}
      />
      <div
        aria-hidden
        className="absolute inset-px overflow-hidden bg-background"
        style={{ clipPath: cutPolygon(corners, 1) }}
      >
        <div className="absolute inset-0 bg-card/40 backdrop-blur-sm" />
        {/* light falls from the top edge, the way a lit panel would */}
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-foreground/6 to-transparent" />
        {variant === "skills" && (
          <div className="absolute inset-x-0 bottom-0 h-1.5 hud-ruler text-foreground/25" />
        )}
      </div>

      {squareCorners.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={cn(
            "absolute size-2.5 border-foreground/45 transition-colors duration-300 group-hover/panel:border-foreground/70",
            BRACKET_EDGES[corner]
          )}
        />
      ))}
      {cutCorners.map((corner) => (
        <ChamferTick key={corner} corner={corner} size={corners[corner]!} />
      ))}

      {variant === "experience" && (
        <>
          {/* registration ticks on the open edge, echoing the timeline rail */}
          <span
            aria-hidden
            className="absolute top-1/3 -right-2 h-px w-2 bg-foreground/30"
          />
          <span
            aria-hidden
            className="absolute top-2/3 -right-2 h-px w-2 bg-foreground/30"
          />
        </>
      )}

      {variant === "console" && (
        <>
          {/* detached reticle brackets — the console is the page's focal panel */}
          <span
            aria-hidden
            className="absolute -top-2 -right-2 size-3 border-t border-r border-foreground/30"
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -left-2 size-3 border-b border-l border-foreground/30"
          />
        </>
      )}

      {variant === "strip" && (
        <>
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0.5 bg-foreground/45"
          />
          <span
            aria-hidden
            className="absolute top-1/2 -right-2 size-1 -translate-y-1/2 bg-foreground/40"
          />
        </>
      )}
    </>
  )
}

/** Three-segment signal readout, filled left-to-right. Console only. */
function SignalBlips() {
  return (
    <span aria-hidden className="flex items-center gap-0.5">
      <span className="h-2 w-0.5 bg-foreground/70" />
      <span className="h-2 w-0.5 bg-foreground/45" />
      <span className="h-2 w-0.5 bg-foreground/20" />
    </span>
  )
}

/**
 * Titlebar band: a scanlined strip across the top of the panel carrying the
 * label and ID code, closed by a hairline. The band paints edge-to-edge, so it
 * carries the top corner cuts itself — it sits above the clipped frame layers,
 * not inside them.
 */
function PanelBand({
  variant,
  header,
  index,
}: {
  variant: Variant
  header?: string
  index?: string
}) {
  const { tl, tr } = CUTS[variant]

  return (
    <div className="relative flex h-8 items-center gap-2.5 border-b border-foreground/15 px-5 sm:px-6">
      <span
        aria-hidden
        className="absolute inset-0 scanlines text-foreground opacity-[0.07]"
        style={{ clipPath: cutPolygon({ tl, tr }) }}
      />
      <span
        aria-hidden
        className="relative size-1.5 shrink-0 bg-foreground/60 transition-colors duration-300 group-hover/panel:bg-foreground"
      />
      {header && (
        <span className="relative truncate font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
          {header}
        </span>
      )}
      <span className="relative ml-auto flex shrink-0 items-center gap-2.5">
        {variant === "console" && <SignalBlips />}
        {index && (
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60 tabular-nums">
            {index}
          </span>
        )}
      </span>
    </div>
  )
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
   * Every section gets its own cut diagonal and its own set of marks:
   * - "console" — widest cuts, signal readout in the band, detached reticle
   *   brackets (contact).
   * - "skills" — top-left/bottom-right cuts and a tick ruler along the bottom
   *   edge, sized for the grid cards.
   * - "experience" — the opposite diagonal plus registration ticks on the open
   *   right edge, so stacked timeline entries don't mirror the skills grid.
   * - "strip" — capped readout bar with a chamfered right end (hero stats).
   * - "bracket" — plain rect with corner brackets, the generic fallback.
   */
  variant?: Variant
  header?: string
  index?: string
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) {
  const banded = BANDED.includes(variant) && Boolean(header || index)

  return (
    <div
      className={cn(
        "group/panel relative shadow-foreground/10 transition-shadow duration-300 hover:shadow-[0_0_32px_-10px]",
        className
      )}
    >
      <PanelFrame variant={variant} />

      {banded && <PanelBand variant={variant} header={header} index={index} />}

      <div
        className={cn("relative", CONTENT_PADDING[variant], contentClassName)}
      >
        {!banded && (header || index) && (
          <div className="mb-4 flex items-baseline justify-between gap-4">
            {header && (
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/60 uppercase">
                {header}
              </span>
            )}
            {index && (
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground/40 tabular-nums">
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
