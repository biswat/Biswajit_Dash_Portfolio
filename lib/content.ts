/**
 * All site content lives here — edit this file to update the portfolio.
 * Pure data, safe to import from server and client components.
 */

export type SocialIcon = "github" | "linkedin" | "x" | "mail"

export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: SocialIcon
}

export interface Skill {
  name: string
  level?: "core" | "familiar"
}

export interface SkillGroup {
  title: string
  skills: Skill[]
}

export interface Experience {
  company: string
  role: string
  start: string
  end: string | "present"
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Hero {
  name: string
  role: string
  tagline: string
  statusLine: string
  location: string
  /** [latitude, longitude], for the contact globe marker. */
  coordinates: [number, number]
  email: string
  /** Path or URL to the downloadable resume. */
  resume: string
}

export const hero: Hero = {
  name: "Biswajit Dash",
  role: "Backend Developer",
  tagline:
    "I build scalable, reliable backend systems and APIs — primarily in Node.js — from database schema to production infrastructure.",
  statusLine: "open to opportunities",
  location: "Bhubaneswar, IN",
  coordinates: [20.2961, 85.8245],
  email: "biswajit.18.dash@gmail.com",
  resume: "/resume.pdf",
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Runtime & Language",
    skills: [
      { name: "Node.js", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "Deno", level: "familiar" },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Express", level: "core" },
      { name: "NestJS", level: "core" },
      { name: "REST", level: "core" },
      { name: "GraphQL", level: "familiar" },
      { name: "WebSockets", level: "familiar" },
      { name: "gRPC", level: "familiar" },
    ],
  },
  {
    title: "Data & Messaging",
    skills: [
      { name: "PostgreSQL", level: "core" },
      { name: "MongoDB", level: "core" },
      { name: "Redis", level: "core" },
      { name: "Prisma", level: "core" },
      { name: "RabbitMQ", level: "familiar" },
      { name: "Kafka", level: "familiar" },
    ],
  },
  {
    title: "Infra & Tooling",
    skills: [
      { name: "Docker", level: "core" },
      { name: "AWS", level: "core" },
      { name: "CI/CD", level: "core" },
      { name: "Git", level: "core" },
      { name: "Terraform", level: "familiar" },
      { name: "Vitest", level: "familiar" },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: "Acme Corp",
    role: "Senior Backend Developer",
    start: "2023",
    end: "present",
    summary:
      "Leading backend development for a customer-facing analytics platform serving thousands of daily active users.",
    highlights: [
      "Designed a queue-based ingestion pipeline in Node.js handling 1M+ events per day",
      "Rebuilt core API services with NestJS, cutting p95 latency by 60%",
      "Mentored two junior developers through onboarding and code review",
    ],
    stack: ["Node.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
  },
  {
    company: "Beta Labs",
    role: "Backend Developer",
    start: "2021",
    end: "2023",
    summary:
      "Built and shipped backend services across a B2B SaaS product from database to API.",
    highlights: [
      "Implemented role-based access control across the API surface",
      "Introduced integration tests that caught regressions before release",
      "Migrated a legacy REST API to typed, versioned endpoints with zero downtime",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Docker"],
  },
  {
    company: "Gamma Studio",
    role: "Junior Backend Developer",
    start: "2019",
    end: "2021",
    summary:
      "Built and maintained backend services and internal tools for client projects.",
    highlights: [
      "Shipped REST APIs powering 10+ client web applications",
      "Built a reusable authentication module adopted across projects",
    ],
    stack: ["Node.js", "Express", "MySQL"],
  },
]

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/biswat",
    handle: "@ashutoshdash",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/biswajit-2000-dash/",
    handle: "in/biswajit-2000-dash/",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:biswajit.18.dash@gmail.com",
    handle: "biswajit.18.dash@gmail.com",
    icon: "mail",
  },
]
