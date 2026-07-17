import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalOutletComponent } from './portal-outlet.component';

/**
 * Standard pre-made layout shell.
 * Provides default slots for `topToolbar`, `leftSidebar`, `rightSidebar`, `bottomToolbar`, and maps them to flex layout areas.
 */
@Component({
  selector: 'standardShellLayout',
  standalone: true,
  imports: [CommonModule, PortalOutletComponent],
  template: `
    <div class="shell-layout-container">
      <!-- Header / Top Toolbar -->
      <header class="shell-header" *ngIf="hasTopToolbar">
        <portalOutlet area="topToolbar"></portalOutlet>
      </header>

      <div class="shell-middle-wrapper">
        <!-- Left Sidebar -->
        <aside class="shell-sidebar shell-sidebar--left" *ngIf="hasLeftSidebar">
          <portalOutlet area="leftSidebar"></portalOutlet>
        </aside>

        <!-- Main Workspace Area -->
        <main class="shell-main-content">
          <ng-content></ng-content>
        </main>

        <!-- Right Sidebar -->
        <aside class="shell-sidebar shell-sidebar--right" *ngIf="hasRightSidebar">
          <portalOutlet area="rightSidebar"></portalOutlet>
        </aside>
      </div>

      <!-- Footer / Bottom Toolbar -->
      <footer class="shell-footer" *ngIf="hasBottomToolbar">
        <portalOutlet area="bottomToolbar"></portalOutlet>
      </footer>
    </div>
  `,
  styles: [`
    .shell-layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      box-sizing: border-box;
    }

    .shell-header, .shell-footer {
      flex: 0 0 auto;
      z-index: 10;
    }

    .shell-middle-wrapper {
      display: flex;
      flex: 1;
      min-height: 0;
      width: 100%;
      position: relative;
    }

    .shell-sidebar {
      flex: 0 0 auto;
      overflow-y: auto;
      z-index: 5;
    }

    .shell-main-content {
      flex: 1;
      min-width: 0;
      overflow: auto;
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardShellLayoutComponent {
  readonly hasTopToolbar = true;
  readonly hasBottomToolbar = true;
  readonly hasLeftSidebar = true;
  readonly hasRightSidebar = true;
}
