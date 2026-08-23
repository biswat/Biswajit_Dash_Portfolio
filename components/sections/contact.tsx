import { IconDownload } from "@tabler/icons-react"

import { HudPanel } from "@/components/hud/hud-panel"
import { DecodeText } from "@/components/motion/decode-text"
import { Reveal } from "@/components/motion/reveal"
import { SectionShell } from "@/components/hud/section-shell"
import { Button } from "@/components/ui/button"
import { hero, socials } from "@/lib/content"

import { SocialRows } from "./social-links"

export function Contact() {
  return (
    <SectionShell name="contact" index="03" title="Contact">
      <Reveal>
        <HudPanel variant="console" header="Open Channel" index="COMM.01">
          <div className="flex flex-col gap-6">
            <DecodeText
              as="h2"
              text="Let's build something."
              startOnView
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            />
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              No forms here — pick a channel. Fastest response is email; the
              rest work too.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="normal-case"
                render={<a href={`mailto:${hero.email}`} />}
              >
                {hero.email}
              </Button>
              <Button
                variant="outline"
                render={<a href={hero.resume} download />}
              >
                <IconDownload data-icon="inline-start" />
                Resume
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/60 uppercase">
                  Channels
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground/40 tabular-nums">
                  {String(socials.length).padStart(2, "0")}
                </span>
              </div>
              <SocialRows />
            </div>
          </div>
        </HudPanel>
      </Reveal>
    </SectionShell>
  )
}
