import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T extends Record<any, any>> = {
  [K in keyof T]-?: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<any, any> ? FormGroup<TypedForm<R>> : FormControl<R>
      >
    : T[K] extends Record<any, any>
    ? FormGroup<TypedForm<T[K]>>
    : FormControl<T[K] | null | undefined>;
};
