import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  map,
  shareReplay,
} from 'rxjs';
import { DEFAULT_ROWS } from '../types';

@Injectable()
export class PaginationService {
  private _selectedLimit = new BehaviorSubject(DEFAULT_ROWS[0]);
  private _currentPage = new Subject<number>();
  private _collectionSize = new BehaviorSubject(0);

  selectedLimit$ = this._selectedLimit.asObservable().pipe(shareReplay());
  page$ = this._currentPage.asObservable().pipe(shareReplay());
  collectionSize$ = this._collectionSize.asObservable().pipe(shareReplay());
  //combining pagination data to single observable that emits an object
  pagination$ = combineLatest([
    this.page$,
    this.collectionSize$,
    this.selectedLimit$,
  ]).pipe(
    map(([page, collectionSize, limit]) => ({ page, collectionSize, limit }))
  );

  updateSelectedLimit(limit: number) {
    this._selectedLimit.next(limit);
  }

  updatePage(page: number) {
    this._currentPage.next(page);
  }

  updateCollectionSize(size: number) {
    this._collectionSize.next(size);
  }
}
