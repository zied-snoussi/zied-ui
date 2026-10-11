---
name: add-component
description: Add a new component to the Zied UI library with its story, play tests, a11y check, npm export and docs. Use when the user asks to create, add or port a component (button variant, card, section, effect…).
---

# Add a component

Follow every step; do not skip the story or the tests.

## 1. Understand the request
- Pick the layer from `docs/ARCHITECTURE.md`: `ui/` (framework-agnostic primitive), effects (visual), `shared/`, `layout/` or `features/` (Next.js, next-intl).
- With the **storybook** MCP server: `docs-list`, then `docs-show` on the closest existing components, to reuse their API style and tokens.
- If it is a standard primitive (accordion, tooltip, select, toggle…), use the **shadcn** MCP server (or `npx shadcn@4.20.1 add <name>`) to add it to `src/components/ui/`, then adapt it to the tokens.

## 2. Write the component
`src/components/<layer>/<kebab-name>.tsx`
- `"use client"` if it has state, effects, refs, handlers or browser APIs.
- Props interface exported, `className` forwarded, `...props` spread, variants with `cva`, classes merged with `cn()`.
- Tokens only (`bg-primary`, `text-muted-foreground`, `border-border`); logical utilities for RTL.
- Next.js layer: labels from `useTranslations('<Namespace>')`, keys added to `src/messages/{en,fr,ar}.json`.
- Accessible names on controls, `aria-hidden` on decorative SVGs.

## 3. Write the story and tests
- Call the MCP tool `get-storybook-story-instructions` first.
- `src/components/<layer>/<kebab-name>.stories.tsx`: `title: '<Group>/<Name>'`, `component`, `docs.description.component`, `args` + `argTypes`, one story per state.
- Add a `play` function for any interaction (`storybook/test`: `within`, `userEvent`, `expect`, `waitFor`, `fn`, `screen` for portals). Close overlays at the end.
- Run the MCP `test-run` tool (or `pnpm exec vitest run <file>`). The a11y gate is `error`: fix violations, do not add `todo`.

## 4. Export and document
- Export from `src/entries/index.ts`, `effects.ts` or `next.ts` (sections and data are never exported).
- Add a row to `docs/COMPONENTS.md`.
- `pnpm changeset` → `minor`, one sentence for users.

## 5. Verify
- `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
- MCP `stories-preview` for the new stories in light/dark and en/fr/ar; include the URLs in your answer.
