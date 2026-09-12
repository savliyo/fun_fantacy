import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mx-hint',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  template: `<div class="flex items-center">
    <div class="flex flex-col">
      <small class="italic text-md" [class]="styles.message">
        {{ message }}
      </small>
    </div>
  </div>`,
})
export class MxHintComponent {
  readonly hintStyle = {
    message: 'text-slate-500',
  } as const;

  readonly errorStyle = {
    message: 'text-red-500',
  } as const;

  @Input() message = '';
  @Input() type: 'error' | 'hint' = 'hint';
  get styles() {
    if (this.type === 'error') {
      return this.errorStyle;
    }
    return this.hintStyle;
  }
}
