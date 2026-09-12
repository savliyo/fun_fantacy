import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBaseComponent } from './base-form';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MxHintComponent } from '../hint';
import { ReactiveFormsModule } from '@angular/forms';
import { mergetw } from '../../utils/tw-merge';
import { FormControlPipe } from '../../pipe/form-control';
import { MxIconComponent } from '../icon';
import { SubSink } from '../../utils/sub-sink';

@Component({
  selector: 'mx-checkbox',
  standalone: true,
  imports: [
    NgClass,
    MxHintComponent,
    ReactiveFormsModule,
    FormControlPipe,
    NgIf,
    MxIconComponent,
    NgForOf,
  ],
  template: `<div class="flex items-center space-x-2">
    @if (labelPlacement === 'left') {
    <label
      [for]="label"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      (click)="$event.stopPropagation()"
      >{{ label }}</label
    >
    }
    <button
      type="button"
      role="checkbox"
      class="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      [id]="label"
      (click)="handleClick($event)"
    >
      @if(control.value) {
      <mx-icon icon="check_box" size="lg" />
      } @else {
      <mx-icon icon="check_box_outline_blank" size="lg" />
      }
    </button>
    @if(labelPlacement === 'right') {
    <label
      [for]="label"
      (click)="$event.stopPropagation()"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >{{ label }}</label
    >
    } @if(showErrors && errors?.['required']) {
    <mx-hint message="This is a required field" type="error" heading="ERROR" />
    } @for (hint of hints; track hint) {
    <mx-hint [message]="hint" />
    }
  </div>`,
})
export class MxCheckboxComponent extends FormBaseComponent {
  @Input() labelPlacement: 'right' | 'left' = 'right';
  @Input() inputClass = '';

  @Output() handleValueChange = new EventEmitter();

  get baseClass() {
    return mergetw(
      'flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      this.inputClass
    );
  }

  handleClick(event: Event) {
    event.stopPropagation();
    this.control.patchValue(Boolean(!this.control.value));
  }
}
