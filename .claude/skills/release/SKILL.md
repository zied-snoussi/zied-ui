---
name: release
description: Prepare a release of @zied-snoussi/ui with Changesets and check the Release workflow. Use when the user asks to release, publish, version, or ship to npm.
---

# Release @zied-snoussi/ui

Never edit the version, `CHANGELOG.md` or publish by hand. The Release workflow does it.

1. Make sure the branch is green: `pnpm check` (typecheck, lint, tests, build, Storybook build).
2. Run `pnpm changeset`:
   - `patch`: fixes, styling, docs inside the package
   - `minor`: new component, prop or export
   - `major`: removed/renamed export or prop, behavior change, new required peer
   Write the summary for library users (what changed and how to migrate if major).
3. Commit the `.changeset/*.md` file with the change, open a PR, wait for CI.
4. After merge, the **Release** workflow opens "chore: version packages". Review the bump and changelog, then merge it.
5. The workflow publishes to npm with provenance, tags `v<version>` and creates the GitHub Release. Check:
   - `gh run list --workflow release.yml --limit 1`
   - `npm view @zied-snoussi/ui version`
   - https://www.npmjs.com/package/@zied-snoussi/ui
6. If publishing was skipped, the `NPM_TOKEN` secret is missing: see `docs/RELEASING.md` (one-time setup). Never ask the user to paste a token in chat; they set it with `gh secret set NPM_TOKEN`.
