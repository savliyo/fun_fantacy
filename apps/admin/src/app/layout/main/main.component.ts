import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
}
