# Releasing

Versions follow [Semantic Versioning](https://semver.org/):

| Bump | When |
|---|---|
| `patch` | Bug fix, style fix, docs in the package, no API change |
| `minor` | New component, new prop, new export (backward compatible) |
| `major` | Removed or renamed export/prop, changed behavior, new required peer dependency |

## Day-to-day

1. Create a branch, make the change, add or update the story.
2. Run `pnpm changeset`, choose the bump and write one or two sentences for users. Commit `.changeset/*.md`.
3. Open a pull request. CI runs typecheck, lint, build, package check and the Storybook build.
4. Merge into `main`.

## What the Release workflow does

`.github/workflows/release.yml` runs on every push to `main` with [changesets/action](https://github.com/changesets/action):

- **Pending changesets:** it opens or updates a pull request named **"chore: version packages"**. That PR bumps `package.json` and writes `CHANGELOG.md`.
- **No pending changesets** (the version PR was just merged): it runs `pnpm release` (`pnpm build && changeset publish`), which publishes to GitHub Packages, pushes the `v<version>` tag and creates the GitHub Release with the changelog entry.

## Tokens and permissions

- Publishing uses the workflow's `GITHUB_TOKEN` with `packages: write`, `contents: write` and `pull-requests: write`. No extra secret is needed.
- In **Settings → Actions → General**, allow GitHub Actions to create and approve pull requests (needed for the version PR).

## Manual release (fallback)

```bash
pnpm changeset version     # bump + changelog
git commit -am "chore: version packages"
export NODE_AUTH_TOKEN=ghp_xxx   # token with write:packages
pnpm release
git push --follow-tags
```

## Pre-releases

```bash
pnpm changeset pre enter next   # versions like 1.2.0-next.0
# ... changesets and merges ...
pnpm changeset pre exit
```
