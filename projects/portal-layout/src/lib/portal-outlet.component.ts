import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { PortalRegistryService } from './portal-registry.service';

/**
 * Outlet component that renders dynamic templates registered via `PortalTargetDirective`.
 * Filters registry entries by area and optional lanes, ordering them by `order`.
 */
@Component({
  selector: 'portalOutlet',
  standalone: true,
  imports: [CommonModule, PortalModule],
  template: `
    @for (entry of activeEntries(); track entry.id) {
      <div class="portal-entry-item-wrapper">
        <ng-template [cdkPortalOutlet]="entry.portal"></ng-template>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
    .portal-entry-item-wrapper {
      pointer-events: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalOutletComponent {
  readonly area = input.required<string>();
  readonly lanes = input<readonly string[] | undefined>(undefined);

  private readonly registry = inject(PortalRegistryService);

  readonly activeEntries = computed(() => {
    const all = this.registry.entries();
    const targetArea = this.area();
    const targetLanes = this.lanes();

    let filtered = all.filter((e) => e.area === targetArea);

    if (targetLanes) {
      const laneSet = new Set(targetLanes);
      filtered = filtered.filter((e) => laneSet.has(e.lane));
    }

    return [...filtered].sort((a, b) => a.order - b.order);
  });
}
