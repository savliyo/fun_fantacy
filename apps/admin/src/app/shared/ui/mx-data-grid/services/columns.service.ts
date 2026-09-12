import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Subject, map, shareReplay } from 'rxjs';
import { GridColumnsComponent } from '../components/base-table/columns';

@Injectable()
export class GridColumnService {
  private _columns = new BehaviorSubject<GridColumnsComponent[]>([]);
  private sort = new Subject<Partial<{
    Asc: string;
    Desc: string;
  }> | null>();

  columns$ = this._columns.asObservable().pipe(shareReplay());
  totalColumns$ = this.columns$.pipe(map((columns) => columns?.length));
  sort$ = this.sort.asObservable();
  columnsToRender$ = this.columns$.pipe(
    map((columns) => {
      return columns.filter((column) => column.visible);
    })
  );
  fields$ = this.columnsToRender$.pipe(
    map((columns) => columns?.map((item) => item.field))
  );

  updateColumns(columns: QueryList<GridColumnsComponent>) {
    this._columns.next(columns.toArray());
  }

  moveRight(index: number) {
    const rawColumns = this.filterVisibleColumns(this._columns.getValue());

    if (index === rawColumns.length - 1) {
      return;
    }
    const actions = rawColumns.pop();
    [rawColumns[index], rawColumns[index + 1]] = [
      rawColumns[index + 1],
      rawColumns[index],
    ];
    if (actions) {
      rawColumns.push(actions);
    }
    this._columns.next(rawColumns);
  }

  moveLeft(index: number) {
    const rawColumns = this.filterVisibleColumns(this._columns.getValue());
    if (index === 0) {
      return;
    }
    const actions = rawColumns.pop();

    [rawColumns[index], rawColumns[index - 1]] = [
      rawColumns[index - 1],
      rawColumns[index],
    ];
    if (actions) {
      rawColumns.push(actions);
    }
    this._columns.next(rawColumns);
  }

  sortAsc(field: string) {
    this.sort.next({ Asc: field });
  }

  sortDesc(field: string) {
    this.sort.next({ Desc: field });
  }

  unsort() {
    this.sort.next(null);
  }

  sortIcon$(field: string) {
    return this.sort$.pipe(
      map((value) => {
        if (value?.Asc === field) {
          return 'arrow_upward';
        }
        if (value?.Desc === field) {
          return 'arrow_downward';
        }
        return 'unfold_more';
      })
    );
  }

  handleColumnVisibility(index: number) {
    const columns = this._columns.getValue();
    columns[index].visible = !columns[index].visible;
    this._columns.next(columns);
  }

  private filterVisibleColumns(columns: GridColumnsComponent[]) {
    return columns.filter((column) => column.visible);
  }
}
