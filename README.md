# Biswajit Dash — Portfolio

A personal portfolio site built with Next.js, styled around a "HUD" (heads-up display) aesthetic — live clock, network/device readouts, a cursor-tracking globe, scroll progress rails, and section reveal animations.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- Tailwind CSS 4
- [shadcn/ui](https://ui.shadcn.com) components (`components/ui`)
- [Motion](https://motion.dev) for animations
- [cobe](https://github.com/shuding/cobe) for the WebGL globe
- TypeScript, ESLint, Prettier

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command           | Description                        |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start the dev server                |
| `npm run build`    | Build for production                |
| `npm run start`    | Run the production build            |
| `npm run lint`     | Lint the codebase                   |
| `npm run format`   | Format `.ts`/`.tsx` files with Prettier |
| `npm run typecheck`| Type-check with `tsc --noEmit`      |

## Project structure

```
app/                  Next.js App Router (layout, page, API routes)
components/
  hud/                HUD chrome: layout, backdrop, globe, rails, cursor map, stats
  motion/             Animation primitives (reveal, decode-text, motion provider)
  sections/           Page sections: hero, skills, experience, contact, social links
  ui/                 shadcn/ui primitives
hooks/                Client hooks: clock, device, network, pointer trail, session telemetry
lib/
  content.ts          All site content (name, role, skills, experience, links) — edit here
  format.ts, utils.ts Formatting and utility helpers
public/               Static assets (resume, images)
```

## Editing content

All copy — name, role, tagline, skills, experience, and social links — lives in [`lib/content.ts`](./lib/content.ts). Update that file to change what's shown on the site; no other files need to change for content edits.

## Adding shadcn/ui components

```bash
npx shadcn@latest add button
```

Components are placed in `components/ui` and can be imported as:

```tsx
import { Button } from "@/components/ui/button"
```
