# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- MCP servers are declared in `.mcp.json`: `storybook` (public, https://zied-ui-mcp.vercel.app/mcp, docs of the released Storybook), `storybook-dev` (http://localhost:6006/mcp, start `pnpm storybook` first; adds tests and previews) and `shadcn`. Approve the project servers when Claude Code asks.
- Project skills live in `.claude/skills/`:
  - `add-component`: create a component with its story, tests, export and docs.
  - `write-stories`: write or improve stories and `play` interaction tests.
  - `fix-a11y`: fix an accessibility violation and remove its `todo`.
  - `release`: prepare a changeset and check the release.
- Prefer the Storybook MCP tools (`docs-show`, `test-run`, `stories-preview`) over reading many files.
