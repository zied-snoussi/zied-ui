# Contributing

## Setup

```bash
pnpm install
pnpm storybook
```

Node.js 22+ and pnpm 10 are required (see `.nvmrc` and `packageManager`).

## Branches and commits

- Branch from `main`: `feat/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(button): add loading state`.
- Every user-facing change needs a changeset (`pnpm changeset`).

## Adding a component

1. **Pick the layer** (see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)): `ui/` for primitives, `shared/`, `layout/` or `features/` for Next.js components.
2. **Write the component** in `src/components/<layer>/<name>.tsx`:
   - `"use client"` at the top when it uses state, effects or browser APIs.
   - Styles with Tailwind utilities and the tokens (`bg-primary`, `text-muted-foreground`), merged with `cn()`.
   - Variants with `cva`; forward `className` and `...props`.
   - Use logical properties (`ms-*`, `ps-*`, `text-start`) so RTL works.
   - Labels through next-intl (`useTranslations`) in the Next.js layer; add the keys to `src/messages/{en,fr,ar}.json`.
3. **Write the story** next to it: `src/components/<layer>/<name>.stories.tsx`:
   - `title: '<Group>/<Name>'`, a `docs.description.component`, `args` for every prop, one story per meaningful state.
   - Check light and dark, EN / FR / AR, and the Accessibility panel.
4. **Export it** from the right entry in `src/entries/` (index, effects or next).
5. **Document it** in [docs/COMPONENTS.md](docs/COMPONENTS.md).
6. Run `pnpm check` and add a changeset (`minor` for a new component).

## Pull request checklist

- [ ] Story added or updated, renders in light/dark and EN/FR/AR
- [ ] No new accessibility violations in the a11y panel
- [ ] Exported from `src/entries/*` if it is part of the package
- [ ] `docs/COMPONENTS.md` updated
- [ ] `pnpm check` passes
- [ ] Changeset added
