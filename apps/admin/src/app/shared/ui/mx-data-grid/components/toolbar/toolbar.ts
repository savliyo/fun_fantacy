import { Component, ContentChild, inject, TemplateRef } from '@angular/core';
import { combineLatest, map, of } from 'rxjs';
import { GridColumnService } from '../../services/columns.service';
import { MetaDataService } from '../../services/meta-data.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'toolbar',
  styleUrls: ['./toolbar.scss'],
  template: `
    <div
      *ngIf="renderToolbar$ | async"
      class="flex flex-row justify-between px-3 pt-3"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <p class="font-semibold lg:text-2xl md:text-sm pb-4">
        {{ meta.gridTitle$ | async }}
      </p>
      <div class="flex">
        <mx-btn-group-container>
          @for (tool of toolbarService.options$ | async; track tool.name) {
          <mx-btn-group
            (handleClick)="tool.handleClick.emit(tool)"
            [icon]="tool.icon"
            [text]="tool.name || ''"
          />
          }
        </mx-btn-group-container>
        <mx-overlay class="ml-2">
          <mx-button trigger variant="outline">
            <span class="flex items-center">
              <mx-icon icon="view_column" class="mr-2" />
              <p>Columns</p>
            </span>
          </mx-button>

          <p class="text-sm">Show Columns</p>
          <div class=" my-1 h-px border w-full"></div>
          @for (column of columnService.columns$ |async; track column.field; let
          index = $index ) {
          <div
            class="w-full flex gap-2 cursor-pointer items-center hover:bg-accent py-0.5"
            (click)="columnService.handleColumnVisibility(index)"
          >
            @if(column.visible) {
            <span
              class="size-2 inline-block rounded-full bg-emerald-800 dark:bg-emerald-500 ml-2"
            ></span>
            } @else {
            <span
              class="size-2 inline-block rounded-full bg-red-800 dark:bg-red-500 ml-2"
            ></span>
            }
            {{ column.title || column.field }}
          </div>
          }
        </mx-overlay>
      </div>
    </div>
  `,
})
export class GridToolbarComponent {
  constructor(
    public toolbarService: ToolbarService,
    public meta: MetaDataService
  ) {
    this.renderToolbar$ = combineLatest([
      this.meta.gridTitle$,
      this.toolbarService.options$,
    ]).pipe(map(([title, options]) => !!title || !!options?.length));
  }

  protected columnService = inject(GridColumnService);

  @ContentChild('toolbarFooter') toolbarFooter!: TemplateRef<any>;

  renderToolbar$ = of(false);
}
