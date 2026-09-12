import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

@Component({
  selector: 'mx-alert-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="styles">
    <h5 class="mb-1 font-medium leading-none tracking-tight">
      {{ header }}
      <ng-content select="header"></ng-content>
    </h5>
    <div class="text-sm [&_p]:leading-relaxed">
      {{ description }}
      <ng-content select="description"></ng-content>
    </div>
  </div>`,
})
export class MxAlertBannerComponent implements OnChanges {
  @Input() header = '';
  @Input() description = '';
  @Input() variant: VariantProps<typeof alertVariants>['variant'] = 'default';

  protected styles = alertVariants({ variant: this.variant });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['variant']?.currentValue) {
      this.styles = alertVariants({
        variant: changes['variant'].currentValue,
      });
    }
  }
}
