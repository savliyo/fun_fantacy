import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mx-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, NgClass],
  template: `<i
    class="material-symbols-rounded mt-1"
    [ngClass]="iconClass"
    [ngStyle]="{ 'font-size': sizes[size] }"
  >
    {{ icon }}
  </i>`,
})
export class MxIconComponent {
  protected sizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
  };

  @Input() icon = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() iconClass!: any;
}
