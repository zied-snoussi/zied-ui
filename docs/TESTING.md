# Testing

Every story is a test. `@storybook/addon-vitest` turns each story into a Vitest test that runs in a real Chromium browser (Playwright), with the same decorators as Storybook (next-intl, next-themes, router, API mocks).

## What each story checks

| Check | How | Fails when |
|---|---|---|
| **Render** | the story mounts | the component throws or the story errors |
| **Interactions** | the story's `play` function (`storybook/test`) | an assertion fails (`expect`, `waitFor`) |
| **Accessibility** | axe after render and `play` (`parameters.a11y.test`) | a WCAG violation is found (`error` is the default) |

## Commands

```bash
pnpm test                 # all stories, headless Chromium
pnpm test:watch           # watch mode
pnpm test:coverage        # + V8 coverage report in coverage/
pnpm exec vitest run src/components/ui/dialog.stories.tsx   # one file
pnpm exec vitest run -t "Contact · submit"                  # one story by name
```

First run on a new machine: `pnpm exec playwright install chromium`.

In Storybook, the **Testing** widget (bottom of the sidebar) runs the same tests, and the **Interactions** panel replays `play` functions step by step.

## Interaction tests in the repo

| Story | What it verifies |
|---|---|
| UI/Button → Default, Disabled | click calls `onClick`; disabled does not |
| UI/Avatar → Fallback | initials shown when the image fails |
| UI/Tabs → Default | tab selection and panel switch |
| UI/Dialog → Default | open, content, close with Escape |
| UI/Sheet → Right | open, content, close with Escape |
| UI/DropdownMenu → Default | open, 3 items, close |
| UI/Carousel → Gallery | previous disabled at start, enabled after next |
| Layout → LanguageSwitcher | menu with the 3 locales |
| Layout → ThemeToggle | toggle button available |
| Features/AI Chatbot → Interactive | open launcher, send a message, mocked reply appears |
| Features/AI Chatbot → ChatInput | typing updates the value |
| Sections → Contact · validation | empty submit shows zod errors |
| Sections → Contact · submit | valid form reaches the success state (mocked API) |

## Accessibility gate

- Default: `a11y.test = 'error'` in `.storybook/preview.tsx`.
- Known issues carried over from the portfolio are marked `todo` on their stories and listed in [ACCESSIBILITY.md](ACCESSIBILITY.md). Fix one with the `fix-a11y` skill, then remove its `todo`.

## CI

The `tests` job in `.github/workflows/ci.yml` installs Chromium, runs `pnpm test:coverage` and uploads the coverage report.
