---
name: portal-layout-usage
description: Guidelines and code patterns for implementing template portals, custom layout areas, and collapsible sidebars using `@daxur-studios/portal-layout`.
---

# Portal Layout Usage Guide

Use this skill when implementing dynamic portal layouts or content projection using the `@daxur-studios/portal-layout` library.

## Core API

### 1. `PortalTargetDirective` (Selector: `[portalTarget]`)
Registers an `<ng-template>` as dynamic content for a target area and optional lane.

**Inputs:**
- `portalTarget` (string, required): The target area identifier (e.g., `'rightSidebar'`, `'topToolbar'`).
- `lane` (string, optional): Sub-lane sorting inside the area. Defaults to `'default'`.
- `order` (number, optional): Sort order within the lane (lowest first). Defaults to `0`.
- `portalTargetWidth` (string, optional): A custom CSS width override (e.g., `'30rem'`).

**Example:**
```html
<ng-template portalTarget="rightSidebar" lane="panel" [order]="1" portalTargetWidth="30rem">
  <div class="side-panel-card">
    <h3>Real-data Preview</h3>
    <!-- Panel Body -->
  </div>
</ng-template>
```

### 2. `PortalOutletComponent` (Selector: `portalOutlet`)
A component that dynamically renders templates registered under its area name.

**Inputs:**
- `area` (string, required): The target area identifier to pull templates from.
- `lanes` (readonly string[], optional): A filter array restricting which lanes render in this specific outlet.

**Example:**
```html
<portalOutlet area="rightSidebar"></portalOutlet>
```

### 3. `StandardShellLayoutComponent` (Selector: `standardShellLayout`)
A pre-made layout component establishing typical application grid lines:
- `<portalOutlet area="topToolbar">`
- `<portalOutlet area="leftSidebar">`
- `<portalOutlet area="rightSidebar">`
- `<portalOutlet area="bottomToolbar">`
- `<ng-content>` projection slot for main center views.

**Example:**
```html
<standardShellLayout>
  <router-outlet></router-outlet>
</standardShellLayout>
```

---

## Best Practices & Patterns

### 1. Clean Up Automatically
The library handles subscription teardown out of the box using Angular's `DestroyRef`. When a component or route containing a `[portalTarget]` is destroyed, the entry automatically unregisters and disappears from the outlet.

### 2. Nesting Layout Areas
For complex layout requirements, nest an outlet inside a projected portal target to subdivide zones dynamically:
```html
<!-- Register custom sub-areas inside the main topToolbar -->
<ng-template portalTarget="topToolbar">
  <div class="custom-toolbar">
    <portalOutlet area="toolbarActions"></portalOutlet>
    <portalOutlet area="toolbarFilters"></portalOutlet>
  </div>
</ng-template>
```
Any component can then target the nested `toolbarActions` or `toolbarFilters` areas.
