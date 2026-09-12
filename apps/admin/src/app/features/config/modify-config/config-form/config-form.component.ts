import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  TConfigForm,
  Z_config,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'config-form',
  templateUrl: './config-form.component.html',
})
export class ConfigFormComponent {
  showErrors = false;
  Z_config = Z_config;

  private fb = inject(FormBuilder);

  configForm = this.fb.nonNullable.group<ControlsOf<TConfigForm>>({
    adBannerID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    adRewardID: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    privacyPolicy: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    telegramLink: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    whatsappLink: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    youtubeLink: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    facebookLink: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    aboutUs: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    ads: new FormControl(false),
  });

  get formControls() {
    return this.configForm.controls;
  }

  isInValid() {
    return this.configForm.invalid;
  }

  setShowErrors(value = true) {
    this.showErrors = value;
  }

  getFormValue() {
    return this.configForm.value;
  }

  reset() {
    this.configForm.reset();
  }

  patchValue(value) {
    this.configForm.patchValue(value);
  }
}
