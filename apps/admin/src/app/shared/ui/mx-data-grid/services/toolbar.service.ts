import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { MxGridToolbarComponent } from '../components/toolbar/mx-toolbar';

@Injectable()
export class ToolbarService {
  private _options =
    new BehaviorSubject<QueryList<MxGridToolbarComponent> | null>(null);

  options$ = this._options.asObservable().pipe(shareReplay());

  updateToolbar(incoming: QueryList<MxGridToolbarComponent>) {
    this._options.next(incoming);
  }
}
