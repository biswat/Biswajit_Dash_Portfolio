import { IconDownload } from "@tabler/icons-react"

import { HudPanel, Stat } from '@/components/hud'
import { DecodeText, Reveal } from '@/components/motion'
import { Button, EncryptedText } from '@/components/ui'
import { hero } from "@/lib/content"

import { SocialIconRow } from "./social-links"

export function Hero() {
  return (
    <section
      id="intro"
      data-section="intro"
      className="flex min-h-[85svh] scroll-mt-10 flex-col justify-center gap-8"
    >
      <div className="flex flex-col gap-3">
        <DecodeText
          as="h1"
          text={hero.name}
          delay={400}
          durationMs={1100}
          className="text-5xl font-semibold tracking-tight sm:text-6xl"
        />
        <Reveal delay={0.6}>
          <p className="text-muted-foreground font-mono text-sm tracking-[0.14em] uppercase">
            {hero.role}
          </p>
        </Reveal>
        <Reveal delay={0.75}>
          <p className="text-muted-foreground max-w-prose text-base leading-relaxed">
            <EncryptedText
              text={hero.tagline}
              encryptedClassName="text-muted-foreground/50"
              revealedClassName="text-muted-foreground"
              revealDelayMs={12}
            />
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.9}>
        <div className="flex flex-wrap items-center gap-3">
          <Button render={<a href={hero.resume} download />}>
            <IconDownload data-icon="inline-start" />
            Resume
          </Button>
          <Button variant="outline" render={<a href="#contact" />}>
            Contact →
          </Button>
        </div>
      </Reveal>

      <Reveal delay={1.05}>
        <HudPanel variant="strip">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
            <Stat label="status" value={hero.statusLine} accent />
            <Stat label="role" value={hero.role.toLowerCase()} />
            <Stat label="loc" value={hero.location} />
          </div>
        </HudPanel>
      </Reveal>

      <Reveal delay={1.2}>
        <SocialIconRow />
      </Reveal>
    </section>
  )
}
