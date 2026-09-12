import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay, skip } from 'rxjs';

@Injectable()
export class GridDataService {
  private _data = new BehaviorSubject<any[]>([]);
  private _totalCount = new BehaviorSubject<number>(0);
  private allSelected = new BehaviorSubject(false);
  private included = new BehaviorSubject<number[]>([]);
  private excluded = new BehaviorSubject<number[]>([]);

  data$ = this._data.asObservable().pipe(shareReplay());
  totalCount$ = this._totalCount.asObservable().pipe(shareReplay(1));
  hasData$ = this.data$.pipe(map((data) => !!data.length));
  allSelected$ = this.allSelected.asObservable().pipe(shareReplay(1));

  included$ = this.included.asObservable().pipe(shareReplay(1));
  excluded$ = this.excluded.asObservable().pipe(shareReplay(1));
  headerChecked$ = combineLatest([this.allSelected$, this.excluded$]).pipe(
    map(([allSelection, ex]) => {
      return allSelection && !ex.length;
    })
  );
  pageDataSelected$ = combineLatest([this.data$, this.included$]).pipe(
    map(([d, i]) => {
      return d.length === i.length;
    })
  );
  selectionInfo$ = combineLatest([
    this.allSelected$,
    this.excluded$,
    this.included$,
  ]).pipe(
    skip(2),
    map(([selectAll, excluded, included]) => {
      return {
        selectAll,
        excluded,
        included,
      };
    })
  );

  dataChecked(id: number) {
    return combineLatest([
      this.allSelected$,
      this.excluded$,
      this.included$,
    ]).pipe(
      map(([allSelection, ex, inc]) => {
        if (allSelection && !ex.includes(id)) {
          return true;
        }
        if (!allSelection && inc.includes(id)) {
          return true;
        }
        return false;
      }),
      shareReplay(1)
    );
  }

  updateData(data: any[]) {
    this._data.next(data);
  }

  updateTotalCount(count: number) {
    this._totalCount.next(count);
  }

  selectAll() {
    this.excluded.next([]);
    this.included.next([]);
    this.allSelected.next(!this.allSelected.value);
  }

  selectCurrentPage() {
    const ids = this._data.value.map((item) => item.id);
    if (this.included.value.length === this._data.value.length) {
      this.included.next([]);
    } else {
      this.included.next(ids);
    }
  }

  selectOne(id: number) {
    if (this.allSelected.value) {
      this._updateExcluded(id);
      return;
    }
    this._updateIncluded(id);
  }

  private _updateExcluded(id: number) {
    // const arr = toggleInArray(this.excluded.value, id);
    // this.excluded.next([...arr]);
  }

  private _updateIncluded(id: number) {
    // const arr = toggleInArray(this.included.value, id);
    // this.included.next([...arr]);
  }
}
