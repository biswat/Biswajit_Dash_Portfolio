import { IconDownload } from "@tabler/icons-react"

import { HudPanel } from "@/components/hud/hud-panel"
import { DecodeText } from "@/components/motion/decode-text"
import { Reveal } from "@/components/motion/reveal"
import { SectionShell } from "@/components/hud/section-shell"
import { Button } from "@/components/ui/button"
import { hero } from "@/lib/content"

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
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              No forms here — pick a channel. Fastest response is email; the
              rest work too.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                render={<a href={`mailto:${hero.email}`} />}
              >
                {hero.email}
              </Button>
              <Button variant="outline" render={<a href={hero.resume} download />}>
                <IconDownload data-icon="inline-start" />
                Resume
              </Button>
            </div>
            <SocialRows />
          </div>
        </HudPanel>
      </Reveal>
    </SectionShell>
  )
}
