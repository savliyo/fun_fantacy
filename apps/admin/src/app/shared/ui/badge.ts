import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { mergetw } from '../utils/tw-merge';

const badgeVariants = cva(
  'inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-100 text-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-500',
        secondary:
          'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500',
        error: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
        success:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-500',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
        warning:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const clearButtonVariant = cva(
  'flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        default:
          'hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200 focus:text-neutral-500 dark:hover:bg-neutral-900',
        secondary:
          'hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-500 dark:hover:bg-gray-900',
        error:
          'hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:text-red-500 dark:hover:bg-red-900',
        success:
          'hover:bg-emerald-200 focus:outline-none focus:bg-emerald-200 focus:text-emerald-500 dark:hover:bg-emerald-900',
        info: 'hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900',
        warning:
          'hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900',
        outline:
          'hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900',
      },
    },
  }
);

@Component({
  selector: 'mx-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="finalClass"
    >{{ text }}
    @if(clearable) {
      <button
      type="button"
      [class]="clearButtonClass"
      (click)="handleClear.emit()"
    >
      <span class="sr-only">Remove badge</span>
      <svg
        class="flex-shrink-0 size-3"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
    }

  </span>`,
})
export class MxBadgeComponent {
  @Input({ required: true }) text = '';
  @Input() class = '';
  @Input() clearable = false;
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';
  get finalClass() {
    return mergetw(badgeVariants({ variant: this.variant }), this.class);
  }

  get clearButtonClass() {
    return mergetw(clearButtonVariant({ variant: this.variant }));
  }

  @Output() handleClear = new EventEmitter();
}
