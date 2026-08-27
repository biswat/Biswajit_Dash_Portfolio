import { IconHeartFilled } from "@tabler/icons-react"
import Link from "next/link"

import { MotionProvider } from "@/components/motion/motion-provider"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"

export default function Page() {
  return (
    <MotionProvider>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-24 px-6 py-16">
        <Hero />
        <Skills />
        <Experience />
        <Contact />
        <p className="flex items-center justify-center gap-1.5 pb-6 text-center font-mono text-xs tracking-normal text-muted-foreground/50 uppercase">
          made with
          <IconHeartFilled
            className="size-3 text-red-500/70"
            aria-label="love"
          />
          by
          <Link
            href="https://ashutoshdash.in?utm_source=biswajit_dash_portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/70 underline underline-offset-4 transition-colors hover:text-foreground"
          >
            ashutoshdash.in
          </Link>
        </p>
      </div>
    </MotionProvider>
  )
}
