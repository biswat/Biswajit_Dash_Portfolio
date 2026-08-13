import { HudPanel, SectionShell, TechChip } from '@/components/hud'
import { StaggerGroup, StaggerItem } from '@/components/motion'
import { skillGroups } from "@/lib/content"

export function Skills() {
  return (
    <SectionShell name="skills" index="01" title="Skills">
      <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.title}>
            <HudPanel
              variant="cut"
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
