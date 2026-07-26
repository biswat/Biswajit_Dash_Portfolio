import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
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
      {socials.map((social) => {
        const Icon = ICONS[social.icon]
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group/social border-border/40 flex items-center gap-3 border-b py-2.5 transition-transform duration-200 last:border-b-0 hover:translate-x-1"
          >
            <Icon
              className="text-muted-foreground group-hover/social:text-foreground size-4 transition-colors"
              stroke={1.5}
            />
            <span className="text-foreground/80 group-hover/social:text-foreground text-sm transition-colors">
              {social.label}
            </span>
            <span className="text-muted-foreground/60 ml-auto truncate font-mono text-[11px]">
              {social.handle}
            </span>
          </a>
        )
      })}
    </div>
  )
}
