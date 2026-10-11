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
- **No pending changesets** (the version PR was just merged, or a version is not on npm yet): it runs `pnpm release` (`pnpm build && changeset publish`). That publishes `@zied-snoussi/ui` to [npmjs.com](https://www.npmjs.com/package/@zied-snoussi/ui) with **provenance**, pushes the `v<version>` tag and creates the GitHub Release.

## One-time setup

1. **npm account and scope.** The scope `@zied-snoussi` must belong to you on npm: either your npm username is `zied-snoussi`, or you create a free organization named `zied-snoussi` (npmjs.com → Add Organization).
2. **Token.** npmjs.com → Access Tokens → Generate New Token → *Granular Access Token*: permission **Read and write**, packages: `@zied-snoussi/ui` (or the whole scope), enable *Bypass 2FA* for automation, expiry 1 year.
3. **Secret.** Save it in the repository as `NPM_TOKEN`:

   ```bash
   gh secret set NPM_TOKEN -R zied-snoussi/zied-ui
   ```

   (paste the token when prompted; it is never stored in the repo).
4. **Actions permissions.** Settings → Actions → General → *Workflow permissions*: allow GitHub Actions to create and approve pull requests (needed for the version PR).

Without `NPM_TOKEN`, the workflow still versions and opens PRs but skips publishing (a warning appears in the run).

## Manual release (fallback)

```bash
pnpm changeset version     # bump + changelog
git commit -am "chore: version packages"
npm login                  # once, as the owner of the @zied-snoussi scope
pnpm release
git push --follow-tags
```

## Pre-releases

```bash
pnpm changeset pre enter next   # versions like 1.2.0-next.0
# ... changesets and merges ...
pnpm changeset pre exit
```
