import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The chamfered frame lives on two pseudo-elements, kept separate from the real
 * interactive box so focus-visible:ring (a box-shadow) never gets cropped by
 * the clip-path — clip-path clips everything painted by the element it's
 * applied to, shadows included.
 *
 * Two layers rather than one because a CSS border gets sliced off along the
 * diagonals: `before` is the frame, filled edge-to-edge with the frame color,
 * and `after` is the surface, inset 1px and clipped 1px tighter, so the 1px of
 * frame left showing all the way around reads as a hairline that survives the
 * cuts. Same trick as TechChip and HudPanel's StripFrame.
 *
 * `after` also carries `hud-face` (corner ticks + scanlines) because it's the
 * topmost layer under the label — detail painted on the button element itself
 * would sit below both pseudo-elements and never be seen.
 *
 * Cut size comes from --hud-cut, set per size variant, so the chamfer is the
 * same number of px on a 24px icon button and a 300px email button.
 */
const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 items-center justify-center font-mono text-[11px] tracking-[0.16em] whitespace-nowrap uppercase transition-all outline-none select-none [--hud-cut:8px] active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:[--hud-tick:var(--color-foreground)] hover:[--hud-scan:color-mix(in_oklch,var(--foreground)_7%,transparent)] before:absolute before:inset-0 before:-z-20 before:hud-cut before:transition-colors before:duration-200 before:content-[''] after:absolute after:inset-px after:-z-10 after:hud-cut-inner after:hud-face after:transition-colors after:duration-200 after:content-[''] focus-visible:before:bg-ring aria-invalid:before:bg-destructive dark:aria-invalid:before:bg-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground shadow-foreground/25 before:bg-primary after:bg-primary hover:shadow-[0_0_24px_-8px] hover:after:bg-primary/85 hover:[--hud-tick:var(--color-primary-foreground)] hover:[--hud-scan:color-mix(in_oklch,var(--primary-foreground)_10%,transparent)]",
        outline:
          "text-foreground/80 shadow-foreground/25 before:bg-foreground/25 after:bg-input/30 hover:text-foreground hover:shadow-[0_0_24px_-8px] hover:before:bg-foreground/60 hover:after:bg-input/50 aria-expanded:text-foreground aria-expanded:before:bg-foreground/60 aria-expanded:after:bg-muted",
        secondary:
          "text-secondary-foreground shadow-foreground/25 before:bg-foreground/20 after:bg-secondary hover:shadow-[0_0_24px_-8px] hover:before:bg-foreground/45 hover:after:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:before:bg-foreground/45 aria-expanded:after:bg-secondary",
        ghost:
          "text-muted-foreground before:bg-transparent after:bg-transparent hover:text-foreground hover:before:bg-foreground/30 hover:after:bg-muted/50 aria-expanded:text-foreground aria-expanded:before:bg-foreground/30 aria-expanded:after:bg-muted dark:hover:after:bg-muted/50",
        destructive:
          "text-destructive before:bg-destructive/40 after:bg-destructive/10 hover:before:bg-destructive/70 hover:after:bg-destructive/20 hover:[--hud-tick:var(--color-destructive)] hover:[--hud-scan:color-mix(in_oklch,var(--destructive)_10%,transparent)] focus-visible:before:bg-destructive/60 focus-visible:ring-destructive/20 dark:after:bg-destructive/20 dark:hover:after:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        // The one variant with no HUD frame: plain inline text.
        link: "font-sans text-sm tracking-normal text-primary normal-case underline-offset-4 before:hidden after:hidden hover:underline hover:[--hud-tick:transparent] hover:[--hud-scan:transparent]",
      },
      size: {
        default:
          "h-9 gap-2 px-4 [--hud-cut:10px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-6 gap-1.5 px-2.5 text-[10px] [--hud-cut:6px] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 [--hud-cut:8px] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        lg: "h-10 gap-2 px-5 [--hud-cut:10px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9 [--hud-cut:8px]",
        "icon-xs": "size-6 [--hud-cut:6px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [--hud-cut:8px]",
        "icon-lg": "size-10 [--hud-cut:10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
