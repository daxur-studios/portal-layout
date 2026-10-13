---
type: Plan
title: npm Publishing
description: Publish the production Angular package as public @daxur-studios/portal-layout 0.0.1.
timestamp: 2026-10-13T00:00:00Z
status: in-progress
runbook: /docs/runbook/00_npm-publishing.md
tags: [npm, publishing, portal-layout]
---

# npm Publishing

Publish the built library, retaining the private workspace root. The user authorized npm publication; the current session fails authentication with E401. [Evidence](/docs/runbook/00_npm-publishing.md#2026-10-13).

- [x] Add production build, pack, dry-run, and public publish commands; add package description/repository/publish configuration and a factual usage README.
- [x] Verify the production package and publish dry-run.
- [ ] Complete npm browser login/2FA with an account that can publish to the scope.
- [ ] Publish version `0.0.1` and verify registry availability with `npm view`.

From the repository root, `npm run publish:portal-layout` rebuilds and publishes `dist/portal-layout`. Follow npm's local authentication prompts. Later releases change the library package version before building; the private workspace version is not the release version.
