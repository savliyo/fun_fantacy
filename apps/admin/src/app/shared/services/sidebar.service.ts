import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, combineLatest, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TMenu } from '../../../../../../libs/mx-schema/src';
import { matchSorter } from 'match-sorter';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  ls = inject(LocalStorageService);
  private menu = new BehaviorSubject<TMenu[]>(this.ls.get('menu') || []);
  private archive = new BehaviorSubject<number[]>(
    this.ls.get('archiveMenu') || []
  );
  private sidebarOpen = new BehaviorSubject(true);
  private searchMenu = new BehaviorSubject('');

  mainMenu$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
    this.searchMenu.asObservable(),
  ]).pipe(
    map(([menu, archived, searchTerm]) => {
      const finalMenu = menu.filter((m) => !archived.includes(m.id));
      if (searchTerm) {
        return matchSorter(finalMenu, searchTerm, { keys: ['name'] });
      }
      return finalMenu;
    })
  );

  archived$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
  ]).pipe(
    map(([menu, archived]) => {
      return menu.filter((m) => archived.includes(m.id));
    })
  );

  sidebarOpen$ = this.sidebarOpen.asObservable().pipe(shareReplay());

  setMenu(menu: TMenu[]) {
    this.ls.set('menu', menu);
    this.menu.next(menu);
  }

  toggleSidebar() {
    const currentValue = this.sidebarOpen.value;
    this.sidebarOpen.next(!currentValue);
  }

  archiveMenu(id: number) {
    const archive = this.archive.value;
    archive.push(id);
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }

  unarchiveMenu(id: number) {
    const archive = this.archive.value;
    archive.splice(
      archive.findIndex((i) => i === id),
      1
    );
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }

  updateSearchTerm(term: string) {
    this.searchMenu.next(term);
  }
}
