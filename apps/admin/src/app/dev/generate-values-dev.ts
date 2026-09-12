import { AbstractControl, FormControl } from '@angular/forms';

export const generateAndPatchValues = (controls: {
  [k: string]: FormControl | AbstractControl;
}) => {
  const keys = Object.keys(controls);

  for (const i of keys) {
    if (!controls[i].value) {
      patchValue(controls[i]);
    }
  }
};

function patchValue(control: FormControl | AbstractControl) {
  if (!isRequired(control)) {
    if (Math.random() < 0.5) {
      control.reset();
      return;
    }
  }

  const value = control.value;
  if (typeof value === 'string') {
    control.patchValue(randomString(randomNumber(1)));
  }

  if (typeof value === 'number' || value === null) {
    control.patchValue(randomNumber(randomNumber(1)));
  }

  if (typeof value === 'boolean') {
    control.patchValue(Math.random() < 0.5);
  }
}

function isRequired(control: FormControl | AbstractControl) {
  if (control?.validator) {
    const validator = control.validator({} as AbstractControl);
    if (validator?.['required']) {
      return validator['required'];
    }
    return control.validator({} as AbstractControl);
  }
  return false;
}

function randomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return random(length, characters);
}

function randomNumber(length: number): number {
  return +random(length, '123456789');
}

function random(length: number, characters: string) {
  let result = '';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
