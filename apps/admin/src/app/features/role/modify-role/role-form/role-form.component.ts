import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TRole, Z_role } from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

type RoleForm = Pick<TRole, 'name'>;

@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent {
  showErrors = false;
  Z_role = Z_role;

  private fb = inject(FormBuilder);

  roleForm = this.fb.nonNullable.group<ControlsOf<RoleForm>>({
    name: new FormControl(null, {
      validators: [],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.roleForm.controls;
  }
}
