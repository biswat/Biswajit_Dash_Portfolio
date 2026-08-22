import { cn } from "@/lib/utils"

type Variant = "console" | "skills" | "experience" | "strip" | "bracket"

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

/**
 * Dog-bone silhouette (experience entries): a valley notch cut into the top
 * edge and a matching valley notch cut into the bottom edge, so stacked
 * timeline panels read as linked segments rather than independent cards.
 */
const EXPERIENCE_PATH =
  "M22.7,2.7 Q25.6,0 29.6,0 L72.8,0 Q76.8,0 79.7,2.7 L99.5,21.3 Q102.4,24 106.4,24 L162.4,24 Q166.4,24 169.3,21.3 L189.1,2.7 Q192,0 196,0 L277.6,0 Q281.6,0 285,2.1 L316.6,21.9 Q320,24 320,28 L320,168 Q320,172 317.1,174.8 L294.1,197.2 Q291.2,200 287.2,200 L247.2,200 Q243.2,200 240.3,197.3 L220.5,178.7 Q217.6,176 213.6,176 L157.6,176 Q153.6,176 150.7,178.7 L130.9,197.3 Q128,200 124,200 L42.4,200 Q38.4,200 35.3,197.4 L3.1,170.6 Q0,168 0,164 L0,28 Q0,24 2.9,21.3 L22.7,2.7 Z"

const EXPERIENCE_PATH_NORMALIZED =
  "M0.070938,0.0135 Q0.08,0 0.0925,0 L0.2275,0 Q0.24,0 0.249063,0.0135 L0.310937,0.1065 Q0.32,0.12 0.3325,0.12 L0.5075,0.12 Q0.52,0.12 0.529062,0.1065 L0.590938,0.0135 Q0.6,0 0.6125,0 L0.8675,0 Q0.88,0 0.890625,0.0105 L0.989375,0.1095 Q1,0.12 1,0.14 L1,0.84 Q1,0.86 0.990938,0.874 L0.919063,0.986 Q0.91,1 0.8975,1 L0.7725,1 Q0.76,1 0.750938,0.9865 L0.689063,0.8935 Q0.68,0.88 0.6675,0.88 L0.4925,0.88 Q0.48,0.88 0.470937,0.8935 L0.409062,0.9865 Q0.4,1 0.3875,1 L0.1325,1 Q0.12,1 0.110312,0.987 L0.009687,0.853 Q0,0.84 0,0.82 L0,0.14 Q0,0.12 0.009062,0.1065 L0.070938,0.0135 Z"

const EXPERIENCE_CLIP_ID = "hud-clip-experience"

/**
 * Skills card silhouette: a valley notch cut into the top-right (clears the
 * header tag) and a matching notch cut into the bottom-left, giving each
 * grid card an asymmetric HUD read.
 */
const SKILLS_PATH =
  "M23.1,5.6 Q28.8,0 36.8,0 L184,0 Q192,0 196.4,6.7 L203.6,17.3 Q208,24 216,24 L270.4,24 Q278.4,24 282.8,17.3 L290,6.7 Q294.4,0 302.4,0 L312,0 Q320,0 320,8 L320,164 Q320,172 314.3,177.6 L296.9,194.4 Q291.2,200 283.2,200 L136,200 Q128,200 123.6,193.3 L116.4,182.7 Q112,176 104,176 L49.6,176 Q41.6,176 37.2,182.7 L30,193.3 Q25.6,200 17.6,200 L8,200 Q0,200 0,192 L0,36 Q0,28 5.7,22.4 L23.1,5.6 Z"

const SKILLS_PATH_NORMALIZED =
  "M0.072188,0.028 Q0.09,0 0.115,0 L0.575,0 Q0.6,0 0.61375,0.0335 L0.63625,0.0865 Q0.65,0.12 0.675,0.12 L0.845,0.12 Q0.87,0.12 0.88375,0.0865 L0.90625,0.0335 Q0.92,0 0.945,0 L0.975,0 Q1,0 1,0.04 L1,0.82 Q1,0.86 0.982187,0.888 L0.927812,0.972 Q0.91,1 0.885,1 L0.425,1 Q0.4,1 0.38625,0.9665 L0.36375,0.9135 Q0.35,0.88 0.325,0.88 L0.155,0.88 Q0.13,0.88 0.11625,0.9135 L0.09375,0.9665 Q0.08,1 0.055,1 L0.025,1 Q0,1 0,0.96 L0,0.18 Q0,0.14 0.017813,0.112 L0.072188,0.028 Z"

const SKILLS_CLIP_ID = "hud-clip-skills"

/**
 * Chamfered pill silhouette shared by every Button (see
 * components/ui/button.tsx): rounded cuts on the top-left and bottom-right
 * corners, tight rounded corners on the other two. Button applies this clip
 * path by hardcoding the `hud-clip-buttons` id (Tailwind's class scanner
 * needs a literal string) rather than importing it from here — keep that
 * id in sync with BUTTON_CLIP_ID below if it ever changes.
 */
const BUTTON_PATH_NORMALIZED =
  "M0.086875,0.021 Q0.1,0 0.11875,0 L0.98125,0 Q1,0 1,0.03 L1,0.81 Q1,0.84 0.986875,0.861 L0.913125,0.979 Q0.9,1 0.88125,1 L0.01875,1 Q0,1 0,0.97 L0,0.19 Q0,0.16 0.013125,0.139 L0.086875,0.021 Z"

const BUTTON_CLIP_ID = "hud-clip-buttons"

const SVG_GEOMETRIES = [
  { clipId: CONSOLE_CLIP_ID, normalizedPath: CONSOLE_PATH_NORMALIZED },
  { clipId: EXPERIENCE_CLIP_ID, normalizedPath: EXPERIENCE_PATH_NORMALIZED },
  { clipId: SKILLS_CLIP_ID, normalizedPath: SKILLS_PATH_NORMALIZED },
  { clipId: BUTTON_CLIP_ID, normalizedPath: BUTTON_PATH_NORMALIZED },
]

/**
 * CSS variants draw their frame with two stacked clip-path layers: an outer
 * layer filled with the border color and an inner layer inset 1px filled with
 * the page background (so the frame fill never tints the panel surface), with
 * the translucent card wash layered inside it. Fixed-px cuts stay crisp at
 * any aspect ratio.
 */
const STRIP_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
const STRIP_CLIP_INNER =
  "polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)"

const CONTENT_PADDING: Record<Variant, string> = {
  console: "px-5 pt-7 pb-10 sm:px-6",
  skills: "px-5 pt-7 pb-6 sm:px-6",
  experience: "px-5 pt-7 pb-7 sm:px-6",
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

function SkillsFrame() {
  return (
    <>
      <div
        className="bg-card/40 absolute inset-0 backdrop-blur-sm"
        style={{ clipPath: `url(#${SKILLS_CLIP_ID})` }}
      />
      <svg
        aria-hidden
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="text-border pointer-events-none absolute inset-0 h-full w-full transition-colors duration-300 group-hover/panel:text-foreground/30"
      >
        <path
          d={SKILLS_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  )
}

function ExperienceFrame() {
  return (
    <>
      <div
        className="bg-card/40 absolute inset-0 backdrop-blur-sm"
        style={{ clipPath: `url(#${EXPERIENCE_CLIP_ID})` }}
      />
      <svg
        aria-hidden
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="text-border pointer-events-none absolute inset-0 h-full w-full transition-colors duration-300 group-hover/panel:text-foreground/30"
      >
        <path
          d={EXPERIENCE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* tick marks protruding from the right edge, echoing the old ledger rail */}
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
  skills: SkillsFrame,
  experience: ExperienceFrame,
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
   * - "skills" — SVG silhouette with valley notches top-right and
   *   bottom-left, sized for the skills grid cards.
   * - "experience" — SVG silhouette with matching top/bottom valley notches
   *   so stacked timeline entries read as linked segments; header/index
   *   render in an attached tab, not inline.
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
  const headerInTab = variant === "experience"

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
