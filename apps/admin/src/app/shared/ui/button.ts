import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { MxIconComponent } from './icon';

const buttonVariants = cva(
  'inline-flex cursor:pointer items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 w-full',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground w-full',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-8  px-4',
        sm: 'h-7 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
        'small-icon': 'h-8 w-8',
      },
      rounded: {
        none: 'rounded-0',
        md: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'sm',
    },
  }
);

@Component({
  selector: 'mx-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MxIconComponent],
  template: `<button
    [type]="type"
    [disabled]="disabled"
    (click)="handleClick.emit($event)"
    [class]="defaultClass"
  >
    <ng-content></ng-content>
  </button>`,
})
export class MxButtonComponent implements OnChanges {
  @Output() handleClick = new EventEmitter();
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() disabled = false;
  @Input() variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
  @Input() size: VariantProps<typeof buttonVariants>['size'] = 'default';
  @Input() rounded: VariantProps<typeof buttonVariants>['rounded'] = 'md';
  @Input() loading = false;

  get defaultClass() {
    return buttonVariants({
      variant: this.variant,
      size: this.size,
      rounded: this.rounded,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['loading']?.currentValue ||
      changes['loading']?.currentValue === false
    ) {
      this.disabled = changes['loading']?.currentValue;
    }
  }
}
