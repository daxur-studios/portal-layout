# @daxur-studios/portal-layout

Angular template portals for named layout areas. Register a template anywhere in an application's component tree and render it in a matching outlet, with optional lane filtering and ordering.

## Install

```bash
npm install @daxur-studios/portal-layout @angular/cdk
```

Required peers are Angular Common/Core `^20.3.0` and Angular CDK `^20.0.0`. Angular Material is not required.

## Use

Import `PortalOutletComponent` and `PortalTargetDirective` in the standalone components using them:

```ts
import {
  PortalOutletComponent,
  PortalTargetDirective,
} from '@daxur-studios/portal-layout';

// @Component({ imports: [PortalOutletComponent, PortalTargetDirective], ... })
```

Place the outlet in the shell and register content from a page/component sharing its registry:

```html
<portalOutlet area="rightSidebar" [lanes]="['panel']" />

<ng-template portalTarget="rightSidebar" lane="panel" [order]="10">
  <p>Page-specific sidebar content</p>
</ng-template>
```

Registration happens after the next render. Destroying the directive unregisters its portal automatically. Area names are application-defined; outlets without a `lanes` filter render every lane in the requested area, sorted by ascending `order`.

The package also exports `PortalRegistryService`, `PortalEntry`, and `StandardShellLayoutComponent`. The optional `standardShellLayout` component provides `topToolbar`, `bottomToolbar`, `leftSidebar`, and `rightSidebar` outlets around projected main content. Its default layout fills the viewport; applications can compose their own outlets when they need a different shell. Pane resizing, collapse controls, and persistence belong to the consuming application.

## Maintainers

From the repository root:

```powershell
npm run publish:check
npm login --auth-type=web --registry=https://registry.npmjs.org/
npm run publish:portal-layout
```

The publish script builds the production Angular package and publishes `dist/portal-layout`, using the version from `projects/portal-layout/package.json`. Complete npm's browser/2FA prompts locally. The logged-in account must have publish permission for the `@daxur-studios` scope.
