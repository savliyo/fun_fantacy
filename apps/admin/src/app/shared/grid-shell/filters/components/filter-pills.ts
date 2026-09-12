import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FilterService } from '../filter.service';
import { MxBadgeComponent } from '../../../ui/badge';

@Component({
  selector: 'mx-filter-pills',
  standalone: true,
  imports: [MxBadgeComponent, NgFor, NgIf, AsyncPipe],
  template: `
    @if (filterService.filterData$ | async; as filterData) {
    <div class="flex gap-2 mb-2">
      @for (filter of filterData; track filter.field) {
      <div class="flex  p-1 rounded-md items-center justify-center">
        <mx-badge
          [text]="
            filter.field +
            ' ' +
            filter.condition +
            ' ' +
            filter.value.toString()
          "
          class="rounded-md"
          variant="info"
          (handleClear)="filterService.removeSingleFilter(filter.field)"
        />
      </div>
      }
    </div>
    }
  `,
})
export class MxFilterPillsComponent {
  filterService = inject(FilterService);
}
