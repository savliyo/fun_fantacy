import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { MxActionComponent } from '../components/base-table/action';

@Injectable()
export class ActionService {
  private _actions = new BehaviorSubject<QueryList<MxActionComponent> | null>(
    null
  );

  actions$ = this._actions.asObservable().pipe(shareReplay());
  hasActions$ = this.actions$.pipe(
    map((data) => !!data?.length),
    shareReplay()
  );

  updateActions(actions: QueryList<MxActionComponent>) {
    const _actions = actions.toArray();
    const result: MxActionComponent[] = [];
    for (const action of _actions) {
      action.action = action._action || action.action;
      action._action = null;
      result.push(action);
    }
    actions.reset(result);
    this._actions.next(actions);
  }
}
