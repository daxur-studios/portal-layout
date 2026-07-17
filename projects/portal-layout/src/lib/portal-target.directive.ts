import { Directive, DestroyRef, TemplateRef, ViewContainerRef, afterNextRender, inject, input } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { PortalRegistryService } from './portal-registry.service';

/**
 * Registers an `<ng-template>` as dynamic content for a target layout area and lane.
 *
 * Usage:
 * ```html
 * <ng-template appPortalTarget="rightSidebar" lane="panel">
 *   <p>Projected Content</p>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[portalTarget]',
  standalone: true,
})
export class PortalTargetDirective {
  readonly area = input.required<string>({ alias: 'portalTarget' });
  readonly lane = input<string>('default');
  readonly order = input<number>(0);
  readonly width = input<string | undefined>(undefined, { alias: 'portalTargetWidth' });

  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly registry = inject(PortalRegistryService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const portal = new TemplatePortal(this.templateRef, this.viewContainerRef);
      const entryId = this.registry.register(
        this.area(),
        this.lane(),
        this.order(),
        portal,
        this.width()
      );
      this.destroyRef.onDestroy(() => this.registry.unregister(entryId));
    });
  }
}
