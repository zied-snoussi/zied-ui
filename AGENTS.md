# AGENTS.md: rules for AI coding agents

This file is the source of truth for any agent working in this repository (Claude Code, Cursor, Copilot, Codex…). `CLAUDE.md` imports it.

## What this repo is

`@zied-snoussi/ui`: the component system of zied-snoussi.vercel.app, published on npm. React 19, Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui on Radix, Storybook 10 (`@storybook/nextjs-vite`), Vitest story tests, Changesets releases. Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Commands

| Task | Command |
|---|---|
| Install | `pnpm install` (pnpm 10, Node 22) |
| Storybook + MCP server | `pnpm storybook` → http://localhost:6006, MCP at http://localhost:6006/mcp |
| Public Storybook / MCP | https://zied-snoussi.github.io/zied-ui/ · https://zied-ui-mcp.vercel.app/mcp |
| All story tests (render, interactions, a11y) | `pnpm test` |
| One file | `pnpm exec vitest run src/components/ui/button.stories.tsx` |
| Types / lint | `pnpm typecheck` · `pnpm lint` |
| Library build | `pnpm build` |
| Everything CI runs | `pnpm check` |
| Release note | `pnpm changeset` |

## MCP servers (use them before reading files by hand)

- **storybook** (public, https://zied-ui-mcp.vercel.app/mcp): docs tools only (`docs-list`, `docs-show`, `docs-show-story`) for the released Storybook. Always available.
- **storybook-dev** (`.mcp.json`, needs `pnpm storybook` running), for work on this repo:
  - `docs-list` / `docs-show` / `docs-show-story`: read a component's props, stories and usage before changing or using it.
  - `get-storybook-story-instructions`: call it **before writing or editing any story**.
  - `stories-find-by-component`: find the stories for a component file.
  - `test-run`: run story tests (render, `play` interactions, a11y) after every change.
  - `stories-preview`: get preview URLs after any visual change and include them in your answer.
  - `stories-changed`: list stories affected by your diff.
- **shadcn**: browse and add registry components. Add new primitives with the shadcn MCP/CLI into `src/components/ui/`, then adapt them to the tokens.

Workflow details: [docs/AI-WORKFLOW.md](docs/AI-WORKFLOW.md).

## Rules

### Components
1. Keep the layer order: `ui` → `effects` → `shared`/`layout`/`features` → `sections` → `pages`. A layer never imports from a layer above it.
2. `ui/` and effects stay framework-agnostic: **no** `next/*`, `next-intl` or `next-themes` imports there.
3. Add `"use client"` to components that use state, effects, refs, event handlers or browser APIs.
4. Style with Tailwind utilities and the design tokens only (`bg-primary`, `text-muted-foreground`, `border-border`, `text-brand-cyan`…). No raw hex colors in new code; if a color is missing, add a token in `src/styles/globals.css` for both `:root` and `.dark`.
5. Merge classes with `cn()`; variants with `cva`; always forward `className` and `...props`; use `React.forwardRef` or the React 19 `ref` prop for focusable elements.
6. RTL-safe: logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`). Mirror directional icons with `rtl:-scale-x-100`.
7. User-facing text in the Next.js layer comes from next-intl. Add every new key to **all three** files: `src/messages/en.json`, `fr.json`, `ar.json`.
8. Accessibility: semantic elements, labelled controls (`aria-label` or visible label), icon-only buttons need an accessible name, decorative SVGs get `aria-hidden="true"`, text contrast ≥ 4.5:1.
9. Never put portfolio content (personal data, project texts) in `ui/`, `effects/` or the npm entries. Content lives in `src/data` and `src/messages`, which are not published.
10. Do not mention the end-of-studies project (PFE) anywhere; describe Bysur work as normal professional work.

### Stories and tests
11. Every component has a co-located `*.stories.tsx` with `title: '<Group>/<Name>'` (groups: UI, Effects, Shared, Layout, Features, Sections, Pages), a `docs.description.component`, `args` for its props and one story per meaningful state.
12. Interactive components get a `play` function using `storybook/test` (`within`, `userEvent`, `expect`, `waitFor`, `fn`, `screen` for portals). Close menus and dialogs at the end of a `play` function.
13. The a11y gate is `error` for every story. Only an existing, documented issue may use `parameters: { a11y: { test: 'todo' } }`, and it must be listed in [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md). Fixing an issue means removing its `todo`.
14. Network calls are mocked in `.storybook/mocks/api.ts`; never call real APIs from stories or tests.

### Package and releases
15. Anything meant for consumers is exported from `src/entries/index.ts` (ui), `effects.ts` or `next.ts`. Update [docs/COMPONENTS.md](docs/COMPONENTS.md) when the public API changes.
16. User-facing changes need a changeset (`pnpm changeset`): `patch` fix, `minor` new component/prop, `major` breaking change.
17. Do not bump versions, edit `CHANGELOG.md` or publish by hand; the Release workflow does it.
18. Pin new dependencies to versions released more than two weeks ago.

### Before you say "done"
- `pnpm typecheck && pnpm lint && pnpm test` pass (or run the MCP `test-run` tool).
- Visual changes: share `stories-preview` URLs, checked in light/dark and EN/FR/AR.
- Docs and changeset updated.
