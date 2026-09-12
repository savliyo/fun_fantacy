import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormBaseComponent } from './base-form';

@Component({
  selector: 'mx-label',
  standalone: true,
  template: ` @if(label()) {
    <label
      [for]="for()"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
    >
      {{ label() }}
    </label>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MxLabelComponent {
  label = input.required();
  for = input();
}
