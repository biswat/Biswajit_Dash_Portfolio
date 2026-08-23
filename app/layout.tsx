import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { HudLayout } from '@/components/hud'
import { ThemeProvider } from "@/components/theme-provider"
import { hero, skillGroups, socials } from "@/lib/content"
import { cn } from "@/lib/utils"

const SITE_URL = "https://biswajitdash.vercel.app"

const fontSans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const keywords = [
  hero.name,
  hero.role,
  "backend developer",
  "backend engineer portfolio",
  ...skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${hero.name} — ${hero.role}`,
    template: `%s — ${hero.name}`,
  },
  description: hero.tagline,
  keywords,
  authors: [{ name: hero.name, url: SITE_URL }],
  creator: hero.name,
  applicationName: `${hero.name} — Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${hero.name} — Portfolio`,
    title: `${hero.name} — ${hero.role}`,
    description: hero.tagline,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${hero.name} — ${hero.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${hero.name} — ${hero.role}`,
    description: hero.tagline,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.145 0 0)" },
    { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
  ],
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: hero.name,
  jobTitle: hero.role,
  description: hero.tagline,
  url: SITE_URL,
  email: hero.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: hero.location,
  },
  sameAs: socials
    .filter((social) => social.icon !== "mail")
    .map((social) => social.href),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <HudLayout>{children}</HudLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
