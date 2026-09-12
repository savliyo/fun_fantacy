import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'notification-form',
  templateUrl: './notification-form.component.html',
})
export class NotificationFormComponent {
  private fb = inject(FormBuilder);

  protected notificationForm = this.fb.nonNullable.group({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    body: new FormControl('', {
      validators: [Validators.required],
    }),
    notificationImage: new FormControl<null | File>(null),
  });
  protected showErrors = false;

  get notificationFormControls() {
    return this.notificationForm.controls;
  }

  getFormValue() {
    return this.notificationForm.getRawValue();
  }

  isInvalid() {
    return this.notificationForm.invalid;
  }

  setShowErrors() {
    this.showErrors = true;
  }

  reset() {
    this.notificationForm.reset();
  }

  handleFileChange(file: File) {
    this.notificationForm.patchValue({ notificationImage: file });
  }
}
