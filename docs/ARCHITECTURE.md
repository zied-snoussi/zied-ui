# Architecture

## Goals

1. Keep the components **identical** to the ones running on zied-snoussi.vercel.app: they were copied from the portfolio repository, not rewritten.
2. Document every component in Storybook, with the real providers (next-intl, next-themes, Next.js router).
3. Publish the reusable part as a private, versioned npm package.

## Layers

```
┌──────────────────────────────────────────────────────────────┐
│ Pages        stories/pages/Portfolio.stories.tsx              │  Storybook only
├──────────────────────────────────────────────────────────────┤
│ Sections     src/components/sections/*                        │  Storybook only
│              (use src/data + src/messages)                    │
├──────────────────────────────────────────────────────────────┤
│ Features     ProjectCard, AIChatbot (+ parts)                 │  @zied-snoussi/ui/next
│ Layout       Navbar, Footer, LanguageSwitcher, ThemeToggle    │
│ Shared       SectionHeader, ScrollToTop                       │
├──────────────────────────────────────────────────────────────┤
│ Effects      Circuit, Particles, DomeGallery, Fade            │  @zied-snoussi/ui/effects
├──────────────────────────────────────────────────────────────┤
│ UI           shadcn/ui primitives on Radix                    │  @zied-snoussi/ui
├──────────────────────────────────────────────────────────────┤
│ Tokens       src/styles/globals.css → dist/theme.css          │  @zied-snoussi/ui/theme.css
└──────────────────────────────────────────────────────────────┘
```

A layer only imports from the layers below it. The UI and Effects layers have no Next.js dependency, so they work in any React 19 app (Vite, Remix, Astro islands…).

## Entry points

| Entry | Source | Depends on |
|---|---|---|
| `@zied-snoussi/ui` | `src/entries/index.ts` | react, Radix, cva, tailwind-merge, embla |
| `@zied-snoussi/ui/effects` | `src/entries/effects.ts` | react, ogl, @use-gesture/react |
| `@zied-snoussi/ui/next` | `src/entries/next.ts` | next, next-intl, next-themes (peers) |

Sections and the data they read are excluded from the build (`tsconfig.build.json`), so portfolio content never ships in the package.

## Build (tsup)

- ESM only, `target: es2020`, code splitting between entries, source maps, `.d.ts` per entry.
- A `"use client"` banner at the top of every output file, so Server Components can import the package directly. Rollup tree-shaking is disabled because it strips that directive; esbuild still drops dead code.
- `onSuccess` writes `dist/theme.css` (the tokens from `globals.css` without `@import "tailwindcss"`, plus `@source "./"`) and copies the translation files to `dist/messages/`.
- `next`, `next-intl`, `next-themes`, `react` and `react-dom` stay external.

## Styling

- Tailwind CSS v4 with CSS-first configuration (`@theme inline`). Colors are full CSS colors so opacity modifiers work (`bg-primary/80`).
- Dark mode is class based (`@variant dark (.dark &)`), driven by next-themes in apps and by the **Theme** toolbar in Storybook.
- Consumers import Tailwind themselves, then `theme.css`. The `@source "./"` inside `theme.css` makes Tailwind scan `dist/*.js` for class names, so no `content` configuration is needed.

## Internationalization

- next-intl with three locales: `en`, `fr`, `ar`. Arabic sets `dir="rtl"`.
- Components read their labels with `useTranslations('<Namespace>')`. The namespaces are in `src/messages/*.json` and shipped in `dist/messages/`.
- Storybook wraps every story in `NextIntlClientProvider`; the **Locale** toolbar switches language and direction.

## Storybook

- Framework: `@storybook/nextjs-vite` (Next.js APIs such as `next/image` and `next/navigation` work inside stories).
- Tailwind runs through `@tailwindcss/vite`; the `@` alias points to `src/`.
- Decorators: next-intl provider, next-themes provider (forced to the toolbar theme), Sonner toaster, `<html lang/dir>` sync.
- `.storybook/mocks/api.ts` intercepts `fetch('/api/chat')` and `fetch('/api/contact')`.
- Addons: docs (MDX with GitHub-flavored Markdown), a11y (axe), themes.

## Decisions

| Decision | Why |
|---|---|
| Copy, don't rewrite | The library documents the real production components; drift is avoided by keeping the same code. |
| Storybook for Next.js | Most components use next-intl, next/image and the Next router; a plain React Storybook would need rewrites. |
| Sections not published | They are portfolio content. Publishing them would ship personal data in a package. |
| ESM only | CommonJS output cannot carry `"use client"`; Next.js and Vite both consume ESM. |
| GitHub Packages, restricted | The repository is private; the package stays private to the account. |
| Changesets | Release notes are written with the change, versioning and publishing are automated. |
