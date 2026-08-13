"use client"

import { motion } from "motion/react"

import { DecodeText } from '@/components/motion'
import { cn } from "@/lib/utils"

/**
 * Section wrapper honoring the telemetry contract: `data-section` + enough
 * height for the IntersectionObserver in use-session-telemetry.ts
 * (threshold 0.5, rootMargin -20%/-40%) to register the active section.
 */
export function SectionShell({
  name,
  index,
  title,
  className,
  children,
}: {
  name: string
  index: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={name}
      data-section={name}
      className={cn(
        "flex min-h-[70svh] scroll-mt-10 flex-col justify-center gap-8",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground/40 font-mono text-[10px] tracking-[0.14em] tabular-nums">
          {index} /
        </span>
        <DecodeText
          text={title}
          startOnView
          className="text-muted-foreground/60 font-mono text-[10px] tracking-[0.22em] uppercase"
        />
        <motion.div
          aria-hidden
          className="bg-border/60 h-px flex-1 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {children}
    </section>
  )
}
