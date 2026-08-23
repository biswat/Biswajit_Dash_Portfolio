import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react"

import { Button } from '@/components/ui'
import { socials, type SocialIcon } from "@/lib/content"
import { cn } from "@/lib/utils"

const ICONS: Record<SocialIcon, typeof IconBrandGithub> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  x: IconBrandX,
  mail: IconMail,
}

/** Compact icon-only row for the hero. */
export function SocialIconRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {socials.map((social) => {
        const Icon = ICONS[social.icon]
        return (
          <Button
            key={social.label}
            variant="ghost"
            size="icon-sm"
            aria-label={social.label}
            render={<a href={social.href} target="_blank" rel="noreferrer" />}
          >
            <Icon className="size-4" stroke={1.5} />
          </Button>
        )
      })}
    </div>
  )
}

/** Full rows with handles for the contact panel. */
export function SocialRows({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {socials.map((social, i) => {
        const Icon = ICONS[social.icon]
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group/social relative flex items-center gap-3 border-b border-border py-2.5 pl-3 transition-transform duration-200 last:border-b-0 hover:translate-x-1"
          >
            {/* channel cursor: a caret that lights up on the active row */}
            <span
              aria-hidden
              className="absolute left-0 font-mono text-[10px] text-muted-foreground/0 transition-colors duration-200 group-hover/social:text-foreground"
            >
              &gt;
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/40 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon
              className="size-4 text-muted-foreground transition-colors group-hover/social:text-foreground"
              stroke={1.5}
            />
            <span className="text-sm text-foreground/80 transition-colors group-hover/social:text-foreground">
              {social.label}
            </span>
            <span className="ml-auto truncate font-mono text-[11px] text-muted-foreground/60">
              {social.handle}
            </span>
          </a>
        )
      })}
    </div>
  )
}
