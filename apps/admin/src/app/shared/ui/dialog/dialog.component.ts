import { Component, Input } from '@angular/core';
import { mergetw } from '../../utils/tw-merge';

@Component({
  selector: 'mx-dialog-container',
  template: `<div class="inset-0 z-50 bg-background/80 backdrop-blur-sm">
    <ng-content> </ng-content>
  </div>`,
})
export class MxDialogContainerComponent {}

@Component({
  selector: 'mx-dialog-header',
  template: `<div class="flex flex-col space-y-1.5 text-center sm:text-left">
    <ng-content> </ng-content>
  </div>`,
})
export class MxDialogHeaderComponent {}

@Component({
  selector: 'mx-dialog-footer',
  template: `<div
    class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
  >
    <ng-content> </ng-content>
  </div>`,
})
export class MxDialogFooterComponent {}

@Component({
  selector: 'mx-dialog-title',
  template: `<h3 class="text-lg font-semibold leading-none tracking-tight">
    <ng-content> </ng-content>
  </h3>`,
})
export class MxDialogTitleComponent {}

@Component({
  selector: 'mx-dialog-description',
  template: `<p class="text-sm text-muted-foreground">
    <ng-content> </ng-content>
  </p>`,
})
export class MxDialogDescriptionComponent {}

@Component({
  selector: 'mx-dialog-content',
  template: `<div
    [class]="
      mergetw(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        class
      )
    "
  >
    <ng-content> </ng-content>
  </div>`,
})
export class MxDialogContentComponent {
  @Input() class = '';
  mergetw = mergetw;
}
