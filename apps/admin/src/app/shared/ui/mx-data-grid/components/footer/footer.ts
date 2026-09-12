import { Component } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'table-footer',
  template: `<div
    class="rounded-0 flex flex-wrap p-4 md:p-6 lg:p-8 justify-between  border-t-2"
  >
    <ng-container>
      <div class="flex">
        <mx-grid-limit />
        <div class=" items-center pl-4 hidden lg:flex">
          Rows:
          <span class="font-bold pl-2">{{
            (pagination.collectionSize$ | async) || 0
          }}</span>
        </div>
      </div>

      <gb-pagination
        [collectionSize]="(pagination.collectionSize$ | async) || 0"
        [pageSize]="(pagination.selectedLimit$ | async) || 20"
        [page]="(pagination.page$ | async) || 1"
        [maxSize]="7"
        [boundaryLinks]="true"
        [rotate]="true"
        (pageChange)="pagination.updatePage($event)"
        class="ml-auto flex"
      />
    </ng-container>
  </div> `,
})
export class TableFooterComponent {
  constructor(public pagination: PaginationService) {}
}
