---
name: write-stories
description: Write or improve Storybook stories and play-function interaction tests for Zied UI components. Use when the user asks for stories, tests, coverage, interaction tests or "test in Storybook".
---

# Write stories and interaction tests

## Before writing
1. Make sure `pnpm storybook` is running (MCP at http://localhost:6006/mcp).
2. Call `get-storybook-story-instructions` (storybook MCP) and follow it.
3. `stories-find-by-component` for the component file, then `docs-show` to see existing stories and props.

## Story file conventions
```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Thing } from './thing';

const meta = {
  title: 'UI/Thing',
  component: Thing,
  parameters: { docs: { description: { component: 'One sentence: what it is and where it is used.' } } },
  args: { onAction: fn() },
} satisfies Meta<typeof Thing>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Do it' }));
    await expect(args.onAction).toHaveBeenCalledOnce();
  },
};
```

## What to test
| Component kind | `play` should check |
|---|---|
| Button-like | click calls the handler; disabled does not |
| Dialog / Sheet | opens on trigger (`screen.findByRole('dialog')`), content visible, closes on Escape |
| Menu | opens, item count/names, then Escape (Radix hides the page while open; axe flags it if left open) |
| Tabs | selecting a tab sets `aria-selected` and shows its panel |
| Forms | validation messages on empty submit; success state with valid input (`/api/*` is mocked) |
| Carousel | next/previous enable and disable correctly |

## Rules
- Query by role and accessible name first, then label, then text. Avoid CSS selectors except for inputs without labels.
- Elements inside `Fade` start at opacity 0: assert `toBeInTheDocument()` instead of `toBeVisible()` there.
- Use the toolbar globals in stories when needed: `globals: { locale: 'ar', theme: 'dark' }`.
- The a11y gate is `error`. Only documented issues in `docs/ACCESSIBILITY.md` may use `a11y: { test: 'todo' }`.

## Run
- MCP `test-run` for the file, or `pnpm exec vitest run <path>`; then `pnpm test` for everything.
- Share `stories-preview` URLs for new or changed stories.
