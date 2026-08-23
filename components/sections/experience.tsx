"use client"

import { motion } from "motion/react"

import { HudPanel } from "@/components/hud/hud-panel"
import { SectionShell } from "@/components/hud/section-shell"
import { TechChip } from "@/components/hud/tech-chip"
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal"
import { experiences } from "@/lib/content"

export function Experience() {
  return (
    <SectionShell name="experience" index="02" title="Experience">
      <div className="relative pl-6">
        {/* timeline rail, drawn top-to-bottom on reveal */}
        <motion.div
          aria-hidden
          className="absolute top-1 bottom-1 left-0.75 w-px origin-top bg-foreground/20"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <StaggerGroup className="flex flex-col gap-10" stagger={0.12}>
          {experiences.map((exp) => (
            <StaggerItem
              key={`${exp.company}-${exp.start}`}
              className="relative"
            >
              {/* node marker on the rail, aligned with the panel's titlebar band */}
              <span
                aria-hidden
                className="absolute top-3 -left-6 size-2 border border-foreground/60 bg-background"
              />
              {/* stub connecting the rail node to the panel edge */}
              <span
                aria-hidden
                className="absolute top-4 -left-4 h-px w-4 bg-foreground/20"
              />
              <HudPanel
                variant="experience"
                header={exp.company}
                index={`${exp.start} — ${exp.end}`.toUpperCase()}
              >
                <div className="flex flex-col gap-3">
                  <p className="text-base font-medium tracking-tight text-foreground">
                    {exp.role}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp.summary}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="shrink-0 font-mono text-muted-foreground/50">
                          &gt;
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.stack.map((tech) => (
                      <TechChip key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              </HudPanel>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionShell>
  )
}
