import { Component, Input } from '@angular/core';
import { AllowedFilterTypes } from '../types';
import { Subject } from 'rxjs';

@Component({
  selector: 'mx-grid-filter',
  standalone: true,
  template: '',
})
export class MxGridFilterComponent {
  @Input() type: AllowedFilterTypes = 'text';
  @Input() label = '';
  @Input() field!: string;
  @Input() hints: string[] = [];
  @Input() placeholder = '';

  @Input() maxlength = 524288;
  @Input() minlength = 0;

  // select filter inputs
  @Input() items: any[] = [];
  @Input() typeahead!: Subject<string>;
  @Input() multiple = false;
  @Input() bindLabel!: string;
  @Input() bindValue!: string;
  @Input() searchable = false;
}
