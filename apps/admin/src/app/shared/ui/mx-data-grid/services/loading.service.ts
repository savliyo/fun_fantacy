import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable()
export class LoadingService {
  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable().pipe(shareReplay());

  toggleLoader() {
    this._loading.next(!!this._loading.value);
  }

  updateLoader(value: boolean) {
    this._loading.next(value);
  }
}
