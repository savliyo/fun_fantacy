import { CdkMenuModule } from '@angular/cdk/menu';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mx-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkMenuModule, NgClass],
  template: `<span [cdkMenuTriggerFor]="overlayPanel">
      <ng-content select="[trigger]"></ng-content>
    </span>

    <ng-template #overlayPanel>
      <div
        class="flex flex-col items-start z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        [ngClass]="spacingClass"
        cdkMenu
      >
        <ng-content></ng-content>
      </div>
    </ng-template>`,
})
export class MxOverlayComponent {
  @Input() spacingClass = '';
}
