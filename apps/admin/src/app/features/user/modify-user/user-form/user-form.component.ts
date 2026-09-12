import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TUser, Z_user } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

type UserForm = Omit<TUser, 'id' | 'createdAt' | 'updatedAt'>;

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  showErrors = false;
  Z_user = Z_user;

  private fb = inject(FormBuilder);

  userForm = this.fb.nonNullable.group<ControlsOf<UserForm>>({
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    email: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
    active: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.userForm.controls;
  }
}
