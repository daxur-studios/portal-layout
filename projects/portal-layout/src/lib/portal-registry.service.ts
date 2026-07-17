import { Injectable, Signal, signal } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

export interface PortalEntry {
  id: string;
  area: string;
  lane: string;
  order: number;
  portal: TemplatePortal;
  width?: string;
}

/**
 * Registry service to keep track of active templates projected from anywhere in the app.
 * Outlets read this service to determine what to render.
 */
@Injectable({
  providedIn: 'root'
})
export class PortalRegistryService {
  private readonly registeredEntries = signal<readonly PortalEntry[]>([]);
  private nextSequence = 0;

  readonly entries: Signal<readonly PortalEntry[]> = this.registeredEntries.asReadonly();

  register(area: string, lane: string, order: number, portal: TemplatePortal, width?: string): string {
    const id = `portal-entry-${this.nextSequence++}`;
    this.registeredEntries.update((entries) => [
      ...entries,
      { id, area, lane, order, portal, width }
    ]);
    return id;
  }

  unregister(id: string): void {
    this.registeredEntries.update((entries) =>
      entries.filter((entry) => entry.id !== id)
    );
  }
}
