import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  inject,
} from '@angular/core';
import { GridDataService } from './services/data.service';
import { GridColumnService } from './services/columns.service';
import { GridColumnsComponent } from './components/base-table/columns';
import {
  HideFeatures,
  STATIC_ACTION_HEADER,
  STATIC_SELECTABLE_HEADER,
} from './types';
import { ActionService } from './services/actions.service';
import { LoadingService } from './services/loading.service';
import { ToolbarService } from './services/toolbar.service';
import { PaginationService } from './services/pagination.service';
import { MetaDataService } from './services/meta-data.service';
import { MxActionComponent } from './components/base-table/action';
import { MxGridToolbarComponent } from './components/toolbar/mx-toolbar';
import { SubSink } from '../../utils/sub-sink';

@Component({
  selector: 'mx-data-grid',
  templateUrl: './data-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MxDataGridComponent
  implements OnChanges, AfterContentInit, OnInit, OnDestroy
{
  private gridData = inject(GridDataService);
  private columnService = inject(GridColumnService);
  private actionService = inject(ActionService);
  private loader = inject(LoadingService);
  private toolbarService = inject(ToolbarService);
  private paginationService = inject(PaginationService);
  private metaService = inject(MetaDataService);

  @Input({ required: true }) data: any[] = [];
  @Input() loading = false;
  @Input() collectionSize = 0;
  @Input() gridTitle = '';
  @Input() hideFeatures: HideFeatures = [];
  @Input() selectable = false;
  @Input({ required: true }) maxHeight!: string;
  @Input({ required: true }) minHeight!: string;

  @Output() emitEvents = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() limitChange = new EventEmitter();

  private subs = new SubSink();

  @ContentChildren(GridColumnsComponent)
  columns!: QueryList<GridColumnsComponent>;

  @ContentChildren(MxActionComponent) actions?: QueryList<MxActionComponent>;

  @ContentChildren(MxGridToolbarComponent)
  toolbar?: QueryList<MxGridToolbarComponent>;

  ngAfterContentInit(): void {
    this.updateColumns(this.columns);
    if (this.actions) {
      this.actionService.updateActions(this.actions);
    }
    if (this.toolbar) {
      this.toolbarService.updateToolbar(this.toolbar);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.gridData.updateData(changes['data'].currentValue);
    }

    if (
      changes['loading']?.currentValue ||
      changes['loading']?.currentValue === false
    ) {
      this.loader.updateLoader(changes['loading'].currentValue);
    }

    if (changes['collectionSize']?.currentValue) {
      this.paginationService.updateCollectionSize(
        changes['collectionSize']?.currentValue
      );
    }

    if (changes['gridTitle']?.currentValue) {
      this.metaService.updateGridTitle(changes['gridTitle'].currentValue);
    }
  }

  ngOnInit(): void {
    this.subs.sink = this.paginationService.page$.subscribe((page) =>
      this.pageChange.emit(page)
    );
    this.subs.sink = this.paginationService.selectedLimit$.subscribe((limit) =>
      this.limitChange.emit(limit)
    );
    this.subs.sink = this.columnService.sort$.subscribe((sort) =>
      this.sortChange.emit(sort)
    );
    this.subs.sink = this.gridData.selectionInfo$.subscribe((selection) =>
      this.selectionChange.emit(selection)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private updateColumns(col: QueryList<GridColumnsComponent>) {
    const _columns = col.toArray();

    if (this.actions?.length) {
      _columns.push(STATIC_ACTION_HEADER);
    }

    if (this.selectable) {
      _columns.unshift(STATIC_SELECTABLE_HEADER);
    }

    col.reset(_columns);
    this.columnService.updateColumns(col);
  }
}
