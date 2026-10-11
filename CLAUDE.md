# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- MCP servers are declared in `.mcp.json` (storybook, shadcn). Start `pnpm storybook` first so the Storybook MCP server is reachable at http://localhost:6006/mcp. Approve the project servers when Claude Code asks.
- Project skills live in `.claude/skills/`:
  - `add-component`: create a component with its story, tests, export and docs.
  - `write-stories`: write or improve stories and `play` interaction tests.
  - `fix-a11y`: fix an accessibility violation and remove its `todo`.
  - `release`: prepare a changeset and check the release.
- Prefer the Storybook MCP tools (`docs-show`, `test-run`, `stories-preview`) over reading many files.
