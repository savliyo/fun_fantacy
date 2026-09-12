import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { MxIconComponent } from '../../../icon';
import { GridColumnsComponent } from './columns';
import { MxTooltipDirective } from '../../../tooltip/tooltip.directive';

@Component({
  selector: 'mx-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MxIconComponent, MxTooltipDirective],
  template: ` @if(action) {
    <ng-container
      *ngTemplateOutlet="action; context: { $implicit: icon, column, cellData }"
    ></ng-container>
    } @else {
    <mx-icon
      (click)="handleClick.emit({cellData, column})"
      [icon]="icon"
      [mxTooltip]="tooltip"
      class="cursor-pointer"
      size="lg"
    />
    }`,
})
export class MxActionComponent {
  @Input() icon!: string;
  @Input() tooltip = '';
  @Input() cellData?: any;
  @Input() column?: GridColumnsComponent;
  @Input() action: TemplateRef<MxActionComponent> | null = null;

  @Output() handleClick = new EventEmitter();

  @ContentChild('template') _action: TemplateRef<MxActionComponent> | null =
    null;
}
