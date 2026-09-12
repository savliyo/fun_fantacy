import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  OFFER_PERIOD,
  TOffer,
  Z_offer,
} from '../../../../../../../../libs/mx-schema/src';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';

@Component({
  selector: 'offer-form',
  templateUrl: './offer-form.component.html',
})
export class OfferFormComponent {
  showErrors = false;
  Z_offer = Z_offer;
  protected period = Array.from(OFFER_PERIOD);

  private fb = inject(FormBuilder);

  offerForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TOffer, 'id' | 'createdAt'>>
  >({
    name: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    amount: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    fakeAmount: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    period: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get formControls() {
    return this.offerForm.controls;
  }

  isInValid() {
    return this.offerForm.invalid;
  }

  setShowErrors(value = true) {
    this.showErrors = value;
  }

  getFormValue() {
    const values = this.offerForm.value;
    return { ...values };
  }

  reset() {
    this.offerForm.reset();
  }

  patchValue(value) {
    this.offerForm.patchValue(value);
  }
}
