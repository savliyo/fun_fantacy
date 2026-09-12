import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';

@Injectable()
export class MetaDataService {
  private _gridTitle = new BehaviorSubject('');

  gridTitle$ = this._gridTitle.asObservable().pipe(shareReplay());

  meta$ = combineLatest([this.gridTitle$]).pipe(map(([gridTitle]) => ({ gridTitle })));

  updateGridTitle(gridTitle: string) {
    this._gridTitle.next(gridTitle);
  }
}
