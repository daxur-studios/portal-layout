# @daxur-studios/portal-layout

A decoupled layout portal engine for Angular applications, built with a CDK-like approach to give consuming applications maximum freedom over how layout areas, collapsible panels, and content projection behave.

This workspace was generated using Angular CLI `v20.3.4` and uses `@angular/cdk` for template-to-outlet projection.

---

## Key Core Concepts

### 1. Flexible Portal Projection
Any component in any page can dynamically register and project content into predefined areas of the page shell using:
* `[portalTarget]`: Directive to declare a template to be projected.
* `<portalOutlet>`: Component that queries the registry and renders the active templates.

### 2. Collapsible & Resizable Panes
* Separates the state of collapsing/resizing from the actual handle styling.
* Supports persisting collapse and custom dimensions across navigation/sessions.

### 3. Responsive "Fit-to-Area" Auto-Scale (Conceptual)
* Supports scaling components dynamically when their default dimensions exceed the available width/height of the layout slot.
* By applying `transform: scale()` via ResizeObserver and container queries, components can gracefully shrink-to-fit without breaking overall page flow.

### 4. Premade Layouts
* Provides `<standardShellLayout>` representing a typical application grid layout containing `topToolbar`, `leftSidebar`, `rightSidebar`, `bottomToolbar`, and a main content slot.

### 5. Nested Custom Areas
* Outlets can be nested inside projected templates, allowing pages to register custom nested layouts (e.g. adding a custom "actions area" nested inside a standard "top header" layout).

---

## Getting Started

### 1. Define the Shell Layout (App Level)
```html
<standardShellLayout>
  <!-- Main content goes here -->
  <router-outlet></router-outlet>
</standardShellLayout>
```

### 2. Project Content (Page/Component Level)
Project custom panels, actions, or views from anywhere in your page's template tree:
```html
<!-- Inside any page or subcomponent -->
<ng-template portalTarget="rightSidebar" lane="panel">
  <div class="production-preview-panel">
    <h3>Preview with real data</h3>
    <p>Context-aware tools rendered automatically in the sidebar.</p>
  </div>
</ng-template>

<ng-template portalTarget="topToolbar">
  <button (click)="save()">Save Action</button>
</ng-template>
```

---

## CLI Commands

### Build the Library
To compile the library in partial compilation mode (ready to publish or consume locally):
```bash
npm run build
```
Build output is saved to `dist/portal-layout/`.

### Run Unit Tests
```bash
ng test
```
