import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

type Theme = 'light' | 'dark';
const DEFAULT_THEME = 'light';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private ls: LocalStorageService) {
    this.changeTheme(this.ls.get('mode') || DEFAULT_THEME);
  }

  private theme = new BehaviorSubject<Theme>(DEFAULT_THEME);
  theme$ = this.theme.asObservable().pipe(shareReplay());

  changeTheme(theme: Theme) {
    document.body.classList.remove(this.theme.value);
    document.body.classList.add(theme);
    this.theme.next(theme);
    this.ls.set('mode', theme);
  }
}
