import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mx-btn-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [mxTooltip]="text"
      (click)="handleClick.emit($event)"
      type="button"
      class="border-e px-2 py-0.5 text-sm font-medium focus:relative bg-background transition-colors"
      [ngClass]="{
        'bg-muted/95': active,
        'hover:bg-muted/100': !active
      }"
      [ngClass]="btnClass"
    >
      @if (icon) {
      <mx-icon [icon]="icon" />
      } @else if (text && !icon) {
      {{ text }}
      }
    </button>
  `,
})
export class MxBtnGroupComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() active = false;
  @Input() btnClass = '';

  @Output() handleClick = new EventEmitter();
}
