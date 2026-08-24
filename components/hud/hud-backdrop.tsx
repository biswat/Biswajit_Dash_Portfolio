import { cn } from "@/lib/utils"

/**
 * The reading column is `max-w-3xl` and centered, so both mask stops are
 * expressed relative to its edge (24rem from center) rather than as fixed
 * offsets from the viewport: the surface stays at full strength through the
 * gutters and is already gone by the time it reaches the text, at every width.
 * The `max()` floors take over below `lg`, where the column fills the viewport
 * and the gutters don't exist — there the same stops degrade into a narrow
 * edge treatment instead of laying grid behind the whole page.
 */
const COLUMN_FALLOFF = `linear-gradient(
  to right,
  black 0,
  black max(4rem, calc(50% - 28rem)),
  transparent max(9rem, calc(50% - 23rem)),
  transparent calc(100% - max(9rem, calc(50% - 23rem))),
  black calc(100% - max(4rem, calc(50% - 28rem))),
  black 100%
)`

/** Pulls the surface away from the fixed rails at the top and bottom. */
const RAIL_FALLOFF = `linear-gradient(
  to bottom,
  transparent 0,
  black 8rem,
  black calc(100% - 8rem),
  transparent 100%
)`

const SURFACE_MASK = {
  maskImage: `${COLUMN_FALLOFF}, ${RAIL_FALLOFF}`,
  maskComposite: "intersect",
} as const

/** Major lattice pitch, matching `hud-grid-major` in globals.css. */
const CELL = 96

type BlockVariant = "fill" | "outline" | "hatch" | "scan"

/**
 * A block is placed in major-grid cells measured from the center of the
 * viewport, not from an edge — which is also why both grid utilities are
 * centered. Anchoring everything to the middle is what keeps a block's edges
 * sitting exactly on lattice lines: the grid can only be phase-locked to one
 * origin, and a centered one is shared by both gutters, so the left and right
 * fields stay aligned at any viewport width.
 */
type Block = {
  col: number
  row: number
  w: number
  h: number
  variant: BlockVariant
}

/**
 * Hand-placed rather than generated: with this few blocks the arrangement is
 * the whole effect, and a seeded scatter reliably clumps or leaves a dead
 * column. Cols ±4 are the column's own edge (24rem = 4 cells), so everything
 * from 4 outward lands in the gutter, with the far cells falling under the
 * translucent rails.
 */
const BLOCKS: Block[] = [
  { col: -7, row: -4, w: 2, h: 1, variant: "fill" },
  { col: -5, row: -3, w: 1, h: 1, variant: "outline" },
  { col: -7, row: -1, w: 1, h: 2, variant: "hatch" },
  { col: -6, row: 1, w: 2, h: 1, variant: "fill" },
  { col: -5, row: 2, w: 1, h: 1, variant: "scan" },
  { col: -7, row: 3, w: 1, h: 1, variant: "outline" },

  { col: 5, row: -4, w: 1, h: 1, variant: "outline" },
  { col: 4, row: -2, w: 1, h: 2, variant: "scan" },
  { col: 6, row: -1, w: 1, h: 1, variant: "fill" },
  { col: 4, row: 2, w: 2, h: 1, variant: "hatch" },
  { col: 6, row: 3, w: 1, h: 1, variant: "outline" },
]

/**
 * Fills reuse the panel vocabulary — hatch for a dead wedge, scanlines for a
 * lit face — so the backdrop reads as more of the same instrument rather than
 * as separate wallpaper.
 */
const BLOCK_VARIANT: Record<BlockVariant, string> = {
  fill: "bg-foreground/[0.045]",
  outline: "border border-foreground/15",
  hatch: "hud-hatch text-foreground opacity-[0.07]",
  scan: "scanlines text-foreground opacity-[0.08]",
}

/**
 * Instrument surface the rails are bolted to: a two-tier survey lattice with
 * blocks pinned to the major cells in each side gutter, masked away from the
 * reading column and closed by a vignette.
 *
 * Fixed and at a negative z-index, so it sits above the body background but
 * under every child of the layout — including the rails, whose translucent
 * `bg-background/80` and backdrop blur then read as glass over the surface
 * rather than as bars on nothing.
 */
export function HudBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={SURFACE_MASK}>
        <div className="hud-grid text-foreground absolute inset-0 opacity-[0.05]" />
        <div className="hud-grid-major text-foreground absolute inset-0 opacity-[0.1]" />

        {BLOCKS.map(({ col, row, w, h, variant }) => (
          <div
            key={`${col}:${row}`}
            className={cn("absolute", BLOCK_VARIANT[variant])}
            style={{
              left: `calc(50% + ${col * CELL}px)`,
              top: `calc(50% + ${row * CELL}px)`,
              width: w * CELL,
              height: h * CELL,
            }}
          />
        ))}
      </div>

      <div className="hud-vignette absolute inset-0 opacity-[0.05] dark:opacity-[0.09]" />
    </div>
  )
}
