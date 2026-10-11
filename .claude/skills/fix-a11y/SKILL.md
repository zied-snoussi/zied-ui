---
name: fix-a11y
description: Fix an accessibility violation reported by the Storybook a11y addon (axe) in Zied UI, then remove the story's todo flag. Use when the user asks to fix accessibility, contrast, headings, labels or a known issue from docs/ACCESSIBILITY.md.
---

# Fix an accessibility issue

1. Pick the issue from `docs/ACCESSIBILITY.md` (story, rule, cause).
2. Reproduce: in the story file set `parameters: { a11y: { test: 'error' } }` (or remove the `todo` line) and run `test-run` (storybook MCP) or `pnpm exec vitest run <story file>`. Read the axe message: rule id, element, expected value.
3. Fix in the **component**, not the story:
   - `color-contrast`: use a token with enough contrast (`text-foreground`, `text-muted-foreground`); if a brand color is too light at small sizes, add a darker token for `:root` in `src/styles/globals.css` and keep the dark value.
   - `heading-order`: use the next heading level, or style a `<p>`/`<span>` instead of skipping levels.
   - `svg-img-alt`: decorative icon → `aria-hidden="true"`; meaningful icon → `role="img"` + `aria-label`.
   - `list` / `listitem`: `<ul>` may only contain `<li>`; move wrappers inside the `li`.
   - `scrollable-region-focusable`: give the scroll viewport `tabIndex={0}` and an accessible name.
   - `aria-hidden-focus`: do not hide focusable content; close overlays at the end of `play` functions.
4. Check light **and** dark theme, and Arabic (RTL), with the a11y panel in Storybook.
5. Remove the `todo` from the story, delete the row from `docs/ACCESSIBILITY.md`.
6. `pnpm test`, then `pnpm changeset` → `patch` ("Fix color contrast of SectionHeading labels").
