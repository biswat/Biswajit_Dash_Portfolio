"use client"

import { useEffect, useState } from "react"
import { MotionConfig } from "motion/react"

import { PageSkeleton } from '@/components/hud'

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <PageSkeleton />

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
