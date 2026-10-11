# Zied UI · `@zied-snoussi/ui`

[![CI](https://github.com/zied-snoussi/zied-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/zied-snoussi/zied-ui/actions/workflows/ci.yml)
[![Release](https://github.com/zied-snoussi/zied-ui/actions/workflows/release.yml/badge.svg)](https://github.com/zied-snoussi/zied-ui/actions/workflows/release.yml)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Storybook 10](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)

The component system behind **[zied-snoussi.vercel.app](https://zied-snoussi.vercel.app)**: UI primitives, visual effects, layout, features and page sections, extracted from the portfolio into a typed, documented and versioned library with a full Storybook.

- **Package:** `@zied-snoussi/ui`, published privately on GitHub Packages (ESM, TypeScript declarations, `"use client"` on every module).
- **Storybook:** every component with controls, docs, accessibility checks, light/dark themes and EN / FR / AR (RTL).
- **Releases:** automated with Changesets (semantic versioning, changelog, GitHub Releases).

---

## Contents

- [What is inside](#what-is-inside)
- [Install in a project](#install-in-a-project)
- [Usage](#usage)
- [Develop locally](#develop-locally)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Release process](#release-process)
- [CI/CD](#cicd)
- [Documentation](#documentation)

## What is inside

| Group | Components | Import from |
|---|---|---|
| UI primitives | `Avatar`, `Badge`, `Button`, `Card`, `Carousel`, `Dialog`, `DropdownMenu`, `ScrollArea`, `Separator`, `Sheet`, `Tabs`, plus `cn()`, format helpers and hooks (`useMediaQuery`, `useIsMobile`, `useScrollToTop`…) | `@zied-snoussi/ui` |
| Effects | `SectionHeading`, `NodeCluster`, `Trace`, `CircuitDefs`, `elbowPath` (circuit design language), `Particles` (WebGL, OGL), `DomeGallery` (3D draggable gallery), `Fade` | `@zied-snoussi/ui/effects` |
| Next.js | `ThemeProvider`, `Navbar`, `Footer`, `LanguageSwitcher`, `ThemeToggle`, `SectionHeader`, `ScrollToTop`, `ProjectCard`, `AIChatbot` and its parts (`ChatWindow`, `ChatMessage`, `ChatInput`, `ChatHeader`, `ChatMarkdown`, `RobotSvg`, `RobotLauncher`), `askChatbot()` | `@zied-snoussi/ui/next` |
| Styles | Design tokens (light and dark), radius scale, brand colors | `@zied-snoussi/ui/theme.css` |
| Translations | Labels used by the Next.js components | `@zied-snoussi/ui/messages/{en,fr,ar}.json` |
| Sections & pages | Home, About, Work, Education, Skills, Projects, GitHub stats, Ask the bot, Contact, full portfolio page | Storybook only (they depend on the portfolio content) |

## Install in a project

The package is private and hosted on GitHub Packages.

1. Create a GitHub token (classic) with the `read:packages` scope.
2. Add an `.npmrc` to your project:

   ```ini
   @zied-snoussi:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. Install:

   ```bash
   pnpm add @zied-snoussi/ui
   pnpm add next next-intl next-themes   # only if you use @zied-snoussi/ui/next
   ```

Peer dependencies: `react` and `react-dom` 19; `next` 16, `next-intl` 4 and `next-themes` 0.4 for the Next.js entry point.

## Usage

**Styles** (Tailwind CSS v4), in your global CSS:

```css
@import "tailwindcss";
@import "@zied-snoussi/ui/theme.css";
```

`theme.css` holds the tokens and an `@source` directive so Tailwind generates the classes used inside the package. The tokens expect two font variables: `--font-inter` and `--font-jetbrains-mono` (set them with `next/font/google`).

**Components:**

```tsx
import { Button, Badge, Card, CardContent } from '@zied-snoussi/ui';
import { SectionHeading, Fade } from '@zied-snoussi/ui/effects';

export function Intro() {
  return (
    <Fade bottom>
      <SectionHeading index="01" label="About" title="Full-Stack AI Engineer" />
      <Card>
        <CardContent className="flex gap-2 pt-6">
          <Badge variant="secondary">RAG</Badge>
          <Button>Contact me</Button>
        </CardContent>
      </Card>
    </Fade>
  );
}
```

**Next.js layout** (App Router, next-intl with locales `en`, `fr`, `ar`):

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider, Navbar, Footer, AIChatbot } from '@zied-snoussi/ui/next';

<NextIntlClientProvider locale={locale} messages={messages}>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Navbar />
    {children}
    <Footer />
    <AIChatbot /> {/* POST /api/chat → { message: string } */}
  </ThemeProvider>
</NextIntlClientProvider>
```

Merge `@zied-snoussi/ui/messages/<locale>.json` into your app messages so the components find their labels. Full guide: [docs/USAGE.md](docs/USAGE.md).

## Develop locally

Requirements: Node.js 22+ (see `.nvmrc`), pnpm 10.

```bash
pnpm install
pnpm storybook        # http://localhost:6006
pnpm build            # library → dist/
```

In Storybook, the toolbar switches the **locale** (EN / FR / AR, RTL) and the **theme** (light / dark). `/api/chat` and `/api/contact` are mocked in `.storybook/mocks/api.ts`.

## Project structure

```
.
├── .changeset/              # pending release notes (Changesets)
├── .github/workflows/       # ci.yml, release.yml, storybook.yml
├── .storybook/              # Storybook config, providers, API mocks
├── docs/                    # architecture, usage, contributing, release guides
├── public/assets/           # images used by the stories
├── src/
│   ├── components/
│   │   ├── ui/              # primitives + effects (each with *.stories.tsx)
│   │   ├── shared/          # SectionHeader, Fade, ScrollToTop
│   │   ├── layout/          # Navbar, Footer, LanguageSwitcher, ThemeToggle
│   │   ├── features/        # ProjectCard, ProjectDetail, AI chatbot
│   │   ├── sections/        # page sections (Storybook reference)
│   │   └── providers/       # ThemeProvider
│   ├── entries/             # npm entry points: index.ts, effects.ts, next.ts
│   ├── data/ messages/      # portfolio content and translations
│   ├── i18n/ lib/ types/    # routing, utils, hooks, types
│   └── styles/globals.css   # design tokens (source of theme.css)
├── stories/                 # MDX docs (Introduction, Getting Started, Foundations) and full page
├── tsup.config.ts           # library build
└── eslint.config.js
```

## Scripts

| Script | What it does |
|---|---|
| `pnpm storybook` | Storybook dev server on port 6006 |
| `pnpm build-storybook` | Static Storybook in `storybook-static/` |
| `pnpm build` | Library build with tsup (ESM + `.d.ts` + `theme.css` + messages) |
| `pnpm dev` | Library build in watch mode |
| `pnpm typecheck` | TypeScript, no emit |
| `pnpm lint` | ESLint (TypeScript, React hooks, Storybook rules) |
| `pnpm check` | typecheck + lint + build + build-storybook (what CI runs) |
| `pnpm changeset` | Describe a change for the next release |

## Release process

Versioning follows [Semantic Versioning](https://semver.org/) and is automated with [Changesets](https://github.com/changesets/changesets):

1. In your branch, run `pnpm changeset`, pick `patch` / `minor` / `major` and describe the change. Commit the generated file in `.changeset/`.
2. Open a pull request. CI must pass.
3. After merge to `main`, the **Release** workflow opens (or updates) a "Version packages" pull request that bumps the version and writes `CHANGELOG.md`.
4. Merging that pull request publishes `@zied-snoussi/ui` to GitHub Packages and creates a tagged GitHub Release with the changelog.

Details: [docs/RELEASING.md](docs/RELEASING.md).

## CI/CD

| Workflow | Trigger | Jobs |
|---|---|---|
| `ci.yml` | Pull requests, pushes to `main` | Install (frozen lockfile) → typecheck → lint → library build → package check (`pnpm pack`) → Storybook build → upload artifacts |
| `release.yml` | Pushes to `main` | Changesets: version PR, or publish to GitHub Packages + GitHub Release |
| `storybook.yml` | Manual / releases | Builds Storybook and deploys it to GitHub Pages (enable Pages first) |

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): layers, entry points, build, styling and i18n decisions
- [docs/USAGE.md](docs/USAGE.md): consuming the package in Next.js and plain React apps
- [docs/COMPONENTS.md](docs/COMPONENTS.md): catalog with props and examples
- [docs/RELEASING.md](docs/RELEASING.md): versioning, publishing and tokens
- [CONTRIBUTING.md](CONTRIBUTING.md): adding a component, story and docs checklist
- [CHANGELOG.md](CHANGELOG.md)

## License

Proprietary. © 2026 Zied Snoussi. All rights reserved. See [LICENSE](LICENSE).
