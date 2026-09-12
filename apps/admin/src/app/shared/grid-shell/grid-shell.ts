import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  expandFilters,
  truncateFilters,
} from '../../../../../../libs/helpers/src';
import { ApiService } from '../services/api.service';
import { MxActionComponent } from '../ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxDataGridComponent } from '../ui/mx-data-grid/data-grid.component';
import { MxDataGridModule } from '../ui/mx-data-grid/data-grid.module';
import { safeStringify } from '../utils/safe-json';
import { SubSink } from '../utils/sub-sink';
import { MxFilterPillsComponent } from './filters/components/filter-pills';
import { MxGridFilterComponent } from './filters/components/grid-filter';
import { FilterService } from './filters/filter.service';

@Component({
  selector: 'mx-grid-shell',
  standalone: true,
  imports: [
    MxDataGridModule,
    CommonModule,
    GridColumnsComponent,
    MxActionComponent,
    MxGridToolbarComponent,
    MxFilterPillsComponent,
  ],
  template: ` <mx-data-grid
    [data]="data"
    [loading]="loading"
    [collectionSize]="collectionSize"
    [gridTitle]="gridTitle"
    [minHeight]="minHeight"
    [maxHeight]="maxHeight"
    (sortChange)="handleSort($event)"
    (limitChange)="handleLimitChange($event)"
  >
    @for (tool of toolbar; track tool.name) {
    <mx-toolbar
      [icon]="tool.icon"
      [name]="tool.name"
      (handleClick)="tool.handleClick.emit($event)"
    />
    } @if (filters?.length) {
    <mx-toolbar icon="filter_alt" name="Filter" (handleClick)="openFilters()" />
    <!-- TODO : add a way to reset all grid options. -->
    <mx-toolbar
      icon="restart_alt"
      name="Reset grid"
      (handleClick)="filterService.clearFilterData()"
    />
    }
    <!-- Toolbar -->

    <!-- Action -->
    @for (action of actions; track action.icon) {
    <mx-action
      [icon]="action.icon"
      [tooltip]="action.tooltip"
      (handleClick)="action.handleClick && action.handleClick.emit($event)"
      [action]="action._action"
    />
    }
    <!-- Action -->

    <!-- Columns -->
    @for (column of columns; track column.field) {
    <mx-column
      [title]="column.title"
      [field]="column.field"
      [sortable]="column.sortable"
      [visible]="column.visible"
      [alignment]="column.alignment"
      [innerHtml]="column.innerHtml"
    >
      @if (column.head) {
      <ng-container>
        <ng-template #head let-item>
          <ng-container
            *ngTemplateOutlet="column.head; context: { $implicit: item }"
          ></ng-container>
        </ng-template>
      </ng-container>
      } @if (column.cell) {
      <ng-container>
        <ng-template #cell let-item>
          <ng-container
            *ngTemplateOutlet="
              column.cell;
              context: { $implicit: item, column }
            "
          ></ng-container>
        </ng-template>
      </ng-container>
      }
    </mx-column>
    }
    <!-- Columns -->

    <mx-filter-pills toolbarFooter />
  </mx-data-grid>`,
})
export class MxGridShellComponent implements OnDestroy, OnInit, AfterViewInit {
  filterService = inject(FilterService);
  api = inject(ApiService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input({ required: true }) apiURL!: string;
  @Input() gridTitle = '';
  @Input() loadOnMount = true;
  @Input() fields = '';
  @Input() minHeight = '300px';
  @Input() maxHeight = '';
  @Input() dynamicHeight = true;

  @Output() protected actionEvents = new EventEmitter<any>();

  @ViewChild(MxDataGridComponent, { read: ElementRef })
  mxDataGrid!: ElementRef;

  @ContentChildren(GridColumnsComponent)
  protected columns!: QueryList<GridColumnsComponent>;

  @ContentChildren(MxActionComponent) actions?: QueryList<MxActionComponent>;

  @ContentChildren(MxGridToolbarComponent)
  toolbar?: QueryList<MxGridToolbarComponent>;

  @ContentChildren(MxGridFilterComponent)
  filters?: QueryList<MxGridFilterComponent>;

  filterValues: Record<string, string> = {};

  protected loading = false;
  protected collectionSize!: number;
  protected data: any[] = [];
  private subs = new SubSink();
  private requests = new SubSink();
  private gridEvents = { limit: 20, sort: null, page: 1 };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.requests.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.filterService.filterData$.subscribe((filterData) => {
      const shortFilters = truncateFilters(filterData);
      this.filterValues = shortFilters;
      this.setFilterInRoute(shortFilters);
      this._getData();
    });
    this.getFilterFromRoute();
  }

  ngAfterViewInit(): void {
    this.configureDynamicHeight();
    this.dynamicTableHeight();
  }

  protected handleSort(sort: any) {
    this.gridEvents = { ...this.gridEvents, sort };
    this._getData();
  }

  protected handleLimitChange(limit) {
    this.gridEvents = { ...this.gridEvents, limit };
    this._getData();
  }

  openFilters() {
    if (!this.filters) {
      return;
    }
    this.filterService.updateFilters(this.filters);
    this.filterService.openFilterPanel();
  }

  refresh() {
    this._getData();
  }

  private _getData() {
    if (!this.apiURL) {
      return console.error('Please provide a api url');
    }
    this.requests.unsubscribe();
    this.loading = true;
    this.requests.sink = this.api
      .getList<any>(this.apiURL, this.buildFilters())
      .subscribe({
        next: ({ data }) => {
          this.loading = false;
          this.collectionSize = data.count;
          this.data = data.rows;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  private buildFilters() {
    const { page, limit, sort } = this.gridEvents;
    return {
      page,
      limit,
      sort: safeStringify(sort || { Desc: 'id' }),
      filters: safeStringify(this.filterValues),
      fields: this.fields,
    };
  }

  private setFilterInRoute(filterData) {
    this.router.navigate([], {
      queryParams: filterData,
      replaceUrl: true,
    });
  }

  private getFilterFromRoute() {
    this.filterService.updateFilterData(
      expandFilters(this.route.snapshot.queryParams)
    );
  }

  private dynamicTableHeight() {
    if (!this.dynamicHeight) {
      return;
    }
    window.onresize = this.configureDynamicHeight.bind(this);
  }

  private configureDynamicHeight(): void {
    // Wait for digest cycle to complete
    // height of the users viewable screen
    const viewableHeight: number = window.innerHeight;

    // height from table content top to top of page
    const mxTablePixelsFromTop: number = this.mxDataGrid.nativeElement
      .querySelector('#mx-table')
      .getBoundingClientRect().top;

    // 68 = pagination height; 34 = footer height
    const otherElements: number = 68 + 34;

    // 5% room for error to account for edge cases
    const marginForError: number = viewableHeight * 0.05;

    this.maxHeight =
      viewableHeight -
      (mxTablePixelsFromTop + marginForError + otherElements) +
      'px';
  }
}
