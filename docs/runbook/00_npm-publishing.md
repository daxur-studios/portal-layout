---
type: Runbook
title: npm Publishing — Runbook
description: Package checks, authentication state, and publication evidence for Portal Layout.
timestamp: 2026-10-13T00:00:00Z
plans: [/docs/plans/00_npm-publishing.md]
tags: [npm, publishing, portal-layout]
---

# npm Publishing — Runbook

## 2026-10-13

- **[decision]** The user authorized publishing Portal Layout to npm, with terminal commands supplied when local login/2FA is needed.
- **[finding]** Public registry lookup returns E404 and `npm whoami` returns E401; publication needs a fresh local npm login.
- **[action]** Added public publish configuration and production build/pack/dry-run/publish scripts; replaced the package's generated Angular README with the actual exported portal APIs and release steps.
- **[verification]** `npm run publish:check` passed: Angular partial compilation, declarations, README, and public metadata are in the five-file `0.0.1` package. npm's dry-run reported public/latest successfully; this did not publish anything.
- **[action]** Prepared `dist/daxur-studios-portal-layout-0.0.1.tgz`. Authentication/publication remains pending; use `npm login --auth-type=web --registry=https://registry.npmjs.org/`, then `npm run publish:portal-layout` and verify the registry version.
- **[verification]** The user completed login/publish. Local npm logs show successful login and a non-dry-run publish ending with HTTP PUT 202 and exit 0; `npm whoami` now succeeds. Registry version/anonymous metadata lookups still return E404, so installability is not verified yet.
- **[finding]** npm now scans uploads before making versions installable; its documented delay is commonly around five minutes and can exceed fifteen. HTTP acceptance plus an initially missing version is consistent with that delay — [npm announcement](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/).
- **[verification]** The subsequent public `npm view @daxur-studios/portal-layout@0.0.1 version dist.shasum` succeeded. Version is `0.0.1`; SHA-1 `584deb65e699e09d9e2a44592f1960d5985dc6c9` matches the prepared tarball. Release complete.
