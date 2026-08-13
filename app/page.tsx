import { HudPanelDefs } from '@/components/hud'
import { MotionProvider } from '@/components/motion'
import { Contact, Experience, Hero, Skills } from '@/components/sections'

export default function Page() {
  return (
    <MotionProvider>
      <HudPanelDefs />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-24 px-6 py-16">
        <Hero />
        <Skills />
        <Experience />
        <Contact />
      </div>
    </MotionProvider>
  )
}
