"use client"

import { motion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: revealVariants.hidden,
        visible: {
          ...revealVariants.visible,
          transition: { duration: 0.5, ease: "easeOut", delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({
  stagger = 0.07,
  delay = 0,
  className,
  children,
}: {
  stagger?: number
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  )
}
