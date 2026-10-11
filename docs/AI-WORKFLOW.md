# Building with AI agents and MCP

The repository is set up so an AI coding agent (Claude Code, Cursor, VS Code Copilot…) can read the components, write stories and run the tests through the **Model Context Protocol (MCP)** instead of guessing from files.

## What is configured

| File | For | Servers |
|---|---|---|
| `.mcp.json` | Claude Code | `storybook` (public HTTP), `storybook-dev` (local HTTP), `shadcn` (stdio) |
| `.cursor/mcp.json` | Cursor | same |
| `.vscode/mcp.json` | VS Code (Copilot agent mode) | same |
| `AGENTS.md` | every agent | project rules |
| `CLAUDE.md` | Claude Code | imports `AGENTS.md` + skills list |
| `.claude/skills/*` | Claude Code | `add-component`, `write-stories`, `fix-a11y`, `release` |

### Public Storybook MCP server

**https://zied-ui-mcp.vercel.app/mcp**: always on, no setup. It serves the docs toolset (`docs-list`, `docs-show`, `docs-show-story`) for the Storybook published on GitHub Pages (https://zied-snoussi.github.io/zied-ui/).

GitHub Pages only hosts static files, so the server runs as a small Vercel function (`mcp/`, Vercel project `zied-ui-mcp`, root directory `mcp`). It reads `manifests/components.json` and `manifests/docs.json` that every Storybook build publishes, so it updates itself each time Storybook is redeployed. Set `STORYBOOK_URL` on the Vercel project to point it at another Storybook.

Add it to any project that uses the library:

```bash
claude mcp add --transport http zied-ui https://zied-ui-mcp.vercel.app/mcp
```

Cursor / VS Code: add an HTTP server with that URL.

### Local Storybook MCP server (`storybook-dev`)

Provided by `@storybook/addon-mcp`, served by the Storybook dev server at **http://localhost:6006/mcp**. Use it when working on this repo: it sees your unreleased changes and adds tests and previews.

| Tool | Use it to |
|---|---|
| `docs-list` | List every documented component and docs page |
| `docs-show` | Read one component's props, stories and description |
| `docs-show-story` | Read a single story (args, code) |
| `get-storybook-story-instructions` | Get the rules for writing stories in this project (call before writing stories) |
| `stories-find-by-component` | Find stories for a component file |
| `stories-changed` | List stories affected by the current changes |
| `test-run` | Run story tests: render, `play` interactions, accessibility |
| `stories-preview` | Get preview URLs to review the result |

### shadcn MCP server

`npx shadcn@4.20.1 mcp` lets the agent browse the shadcn/ui registry and add primitives. `components.json` points it at `src/components/ui` and `src/styles/globals.css`.

## Setup

```bash
pnpm install
pnpm storybook          # keep it running: it hosts the storybook-dev MCP server
```

- **Claude Code:** open the repo, run `claude`, approve the two project MCP servers (`/mcp` shows their status).
- **Cursor:** Settings → MCP: the servers from `.cursor/mcp.json` appear; enable them.
- **VS Code:** open the Chat view in Agent mode; `.vscode/mcp.json` servers are listed under tools.

## Recommended loop

```
1. Understand  → docs-list / docs-show on similar components
2. Build       → write the component (rules in AGENTS.md)
3. Story       → get-storybook-story-instructions, then write stories + play tests
4. Test        → test-run (render + interactions + a11y)
5. Review      → stories-preview in light/dark and en/fr/ar
6. Ship        → export in src/entries/*, docs/COMPONENTS.md, pnpm changeset
```

## Prompts that work well

- "Use the add-component skill to add a `Tooltip` primitive from shadcn, with stories and play tests."
- "Read `Features/ProjectCard` with docs-show, then add a `compact` variant and a story for it. Run test-run and give me the preview URLs."
- "Use fix-a11y on the `Effects/Circuit → Heading` color-contrast issue."
- "Which stories changed on this branch? Run their tests." (`stories-changed` + `test-run`)
- "Prepare a release for the new Tooltip." (`release` skill)

## Guardrails for agents

- The a11y gate is `error`; agents must fix violations, not add `todo` flags.
- APIs are mocked in Storybook; agents must not call real endpoints.
- No portfolio content in the npm entries; no mention of the end-of-studies project.
- Releases only through Changesets and the Release workflow.
