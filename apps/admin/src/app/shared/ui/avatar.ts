import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "mx-avatar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div
    class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
  >
    <img class="aspect-square h-full w-full" [src]="src" />
  </div>`,
})
export class MxAvatarComponent {
  @Input() src = "";
}
