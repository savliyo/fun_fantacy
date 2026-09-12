import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_ROWS } from '../../types';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'mx-grid-limit',
  template: `
    <mx-dropdown>
      <mx-button variant="secondary" trigger
        >Limit: {{ paginationService.selectedLimit$ | async }}</mx-button
      >
      @for(limit of limits; track limit) {
      <mx-dropdown-item
        [text]="limit.toString()"
        (handleClick)="paginationService.updateSelectedLimit(limit)"
      />
      }
    </mx-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLimitComponent {
  constructor(public paginationService: PaginationService) {}
  limits = DEFAULT_ROWS;
}
