import { HudPanel } from "@/components/hud/hud-panel"
import { SectionShell } from "@/components/hud/section-shell"
import { TechChip } from "@/components/hud/tech-chip"
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal"
import { skillGroups } from "@/lib/content"

export function Skills() {
  return (
    <SectionShell name="skills" index="01" title="Skills">
      <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.title}>
            <HudPanel
              variant="skills"
              header={group.title}
              index={`SYS.${String(i + 1).padStart(2, "0")}`}
              className="h-full"
            >
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <TechChip
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </HudPanel>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  )
}
