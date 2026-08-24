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
      </div>
    </MotionProvider>
  )
}
