import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBaseComponent } from './base-form';
import { FormControlPipe } from '../../pipe/form-control';
import { MxLabelComponent } from './mx-label';
import { MxHintComponent } from '../hint';

@Component({
  selector: 'mx-editor',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    MxLabelComponent,
    MxHintComponent,
  ],
  template: `
    <mx-label [label]="label" />
    <ckeditor
      [editor]="Editor"
      [config]="config"
      [formControl]="control | formControl"
    ></ckeditor>
    @if(showErrors && errors?.['required']) {
    <mx-hint message="This is a required field" type="error" heading="ERROR" />
    }
    <!-- comment to restrict prettier -->
    @for(hint of hints; track hint) {
    <mx-hint [message]="hint" />
    }
  `,
})
export class MxEditorComponent extends FormBaseComponent {
  public Editor = ClassicEditor;
  config = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
    ],
  };
}
