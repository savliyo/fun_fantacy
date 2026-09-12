import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ZodSchema } from 'zod';
import { environment } from '../../../../environments/environment';
import { MxCardModule } from '../card/card.module';

@Component({
  selector: 'mx-form',
  standalone: true,
  imports: [ReactiveFormsModule, MxCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!environment.production) {
    <a
      (click)="patchRandomValues()"
      class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >Fill random values</a
    >
    }
    <div mxCard>
      <div mxCardContent class="py-7 px-5">
        <form [formGroup]="form">
          <ng-content></ng-content>
        </form>
      </div>
    </div>
  `,
})
export class MxFormComponent {
  @Input() form!: FormGroup;
  @Input() zodSchema!: ZodSchema;

  environment = environment;

  patchRandomValues() {
    if (!environment.production) {
      if (this.zodSchema) {
        import('@anatine/zod-mock').then(({ generateMock }) => {
          this.form.patchValue(generateMock(this.zodSchema));
        });
      } else {
        import('../../../dev/generate-values-dev').then(
          ({ generateAndPatchValues }) => {
            generateAndPatchValues(this.form.controls);
          }
        );
      }
    }
  }
}
