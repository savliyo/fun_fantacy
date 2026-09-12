import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  template: '',
})
export class FormBaseComponent {
  /**
   * Unique identifier for the form element
   */
  _id!: string;

  /**
   * FormControl or Abstract Control for the component
   */
  @Input({ required: true }) control!: FormControl | AbstractControl;

  /**
   * Array of hints to display beneath form element, *not errors*
   */
  @Input() hints: string[] = [];

  /**
   * Key used for further uniqueness. Useful for large dynamic forms
   */
  @Input() key = '';

  /**
   * Label for the form element
   */
  @Input() label = '';

  /**
   * Placeholder text for the element
   */
  @Input() placeholder = '';

  @Input() showErrors = false;

  get errors() {
    return this.control?.errors;
  }
  /**
   * @Determines if the field is required or not
   */
  get required() {
    if (this.control?.validator) {
      const validator = this.control.validator({} as AbstractControl);
      if (validator?.['required']) {
        return validator['required'];
      }
      return this.control.validator({} as AbstractControl);
    }
    return false;
  }
}
