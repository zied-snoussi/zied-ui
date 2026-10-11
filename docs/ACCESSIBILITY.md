# Accessibility

All stories are checked with axe (WCAG 2.x A/AA) by the Storybook a11y addon, in Storybook and in `pnpm test`. The gate is **`error`**: any new violation fails the tests.

## Known issues

These come from the portfolio components as they run in production. Their stories use `parameters: { a11y: { test: 'todo' } }` so they are reported but do not fail the build. Fix them with the `fix-a11y` skill and remove the `todo`.

| Story | Rule | Cause | Suggested fix |
|---|---|---|---|
| Effects/Circuit → Heading, HeadingCentered | `color-contrast` | Section label in `text-brand-cyan` (#0891b2) on the light background: 3.47:1 at 12px | Darker cyan token for light mode (≈ #0e7490) |
| Sections → Contact · validation, Contact · submit | `color-contrast` | Same cyan section label ("CONTACT") | Same token fix |
| Features/AI Chatbot → ChatWindow, ChatInput, Interactive | `color-contrast` | Keyboard hint (`<kbd>`) gray-500 text on gray-200 at 10px: 3.9:1 | `text-gray-700` / `dark:text-gray-300`, or 12px |
| Features/ProjectCard → ProjectDetail (page) | `color-contrast`, `heading-order` | Muted text on glass panels; `h2` → `h4` jumps | Stronger muted token on panels; use sequential headings |
| Layout → Footer | `heading-order` | Footer column titles are `h4` without `h2`/`h3` before | Use `h2` with the same styles, or `p` |
| Sections → Hero, Skills | `svg-img-alt` (+ `aria-label`) | react-icons SVGs have `role="img"` without a name | `aria-hidden="true"` on icons inside labelled links/buttons |
| Sections → About | `list`, `listitem` | `<ul>` contains `<div>` wrappers | Put the wrappers inside `<li>` |
| UI/ScrollArea → Default | `scrollable-region-focusable`, `region` | Radix viewport is scrollable but not focusable | `tabIndex={0}` + `aria-label` on the viewport |

## Checklist for new components

- Semantic HTML first (`button`, `a`, `nav`, `ul/li`, headings in order).
- Every control has an accessible name; icon-only buttons use `aria-label`.
- Decorative SVGs: `aria-hidden="true"`.
- Text contrast ≥ 4.5:1 (≥ 3:1 for 18px+ or bold 14px+) in light **and** dark themes.
- Keyboard: everything reachable with Tab, visible focus ring (`focus-visible:ring-*`), Escape closes overlays.
- RTL: check the Arabic locale.
