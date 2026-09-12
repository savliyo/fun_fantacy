import {
  Component,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "mx-toolbar",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "",
})
export class MxGridToolbarComponent {
  @Input() icon = "";
  @Input() name?: string = "";
  @Input() _tool?: TemplateRef<MxGridToolbarComponent>;

  @Output() handleClick = new EventEmitter();

  @ContentChild("tool") tool?: TemplateRef<MxGridToolbarComponent>;
}
