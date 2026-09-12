import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { FormControl } from '@angular/forms';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'mx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  ls = inject(LocalStorageService);
  router = inject(Router);
  sidebarService = inject(SidebarService);

  @Output() changeTheme = new EventEmitter();
  @Input() theme = 'light';

  archiveMenu: number[] = this.ls.get('archiveMenu') || [];
  searchMenu = new FormControl<string>('');
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.searchMenu.valueChanges.subscribe((value) =>
      this.sidebarService.updateSearchTerm(value || '')
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleArchiveMenu(id: number) {
    this.archiveMenu.push(id);
    this.ls.set('archiveMenu', this.archiveMenu);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
