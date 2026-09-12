import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBaseComponent } from './base-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '../../pipe/form-control';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MxHintComponent } from '../hint';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'mx-textarea',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    NgClass,
    NgIf,
    MxHintComponent,
    NgFor,
    TextFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <label
        *ngIf="label"
        [for]="_id"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ label }}
        <span class="text-red-600" *ngIf="required">*</span>
      </label>
      <textarea
        cdkTextareaAutosize
        cdkAutosizeMinRows="1"
        cdkAutosizeMaxRows="10"
        [formControl]="control | formControl"
        [placeholder]="placeholder"
        class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
      </textarea>
      <mx-hint
        message="This is a required field"
        type="error"
        heading="ERROR"
        *ngIf="showErrors && errors?.['required']"
      />
      <mx-hint *ngFor="let hint of hints" [message]="hint" />
    </div>
  `,
})
export class MxTextareaComponent extends FormBaseComponent {}
