import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NgSelectModule } from "./ng-select/ng-select.module";
import { ApiService } from "../../services/api.service";
import { FormBaseComponent } from "./base-form";
import { NgFor, NgIf } from "@angular/common";
import { MxHintComponent } from "../hint";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormControlPipe } from "../../pipe/form-control";
import { Subject } from "rxjs";

@Component({
  selector: "mx-select",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgSelectModule,
    NgIf,
    MxHintComponent,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
  ],
  template: `
    <div>
      @if(label) {
      <label
        [for]="_id"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ label }}
        @if(required) {
        <span class="text-red-600">*</span>
        }
      </label>
      }

      <ng-select
        [bindLabel]="bindLabel"
        [bindValue]="bindValue"
        [items]="items"
        [loading]="loading"
        [formControl]="control | formControl"
        [multiple]="multiple"
        [clearable]="clearable"
        [searchable]="searchable"
        [typeahead]="typeahead"
      ></ng-select>
      @if(showErrors && errors?.['required']) {
      <mx-hint
        message="This is a required field"
        type="error"
        heading="ERROR"
      />
      } @for(hint of hints; track hint) {
      <mx-hint [message]="hint" />
      }
    </div>
  `,
})
export class MxSelectComponent extends FormBaseComponent implements OnInit {
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    super();
  }

  @Input() apiURL = "";
  @Input() loadOnMount = true;
  @Input() bindValue = "";
  @Input() bindLabel = "";
  @Input() items: any[] = [];
  @Input() loading = false;
  @Input() multiple = false;
  @Input() clearable = false;
  @Input() searchable = true;
  @Input() typeahead!: Subject<string>;

  ngOnInit(): void {
    if (this.loadOnMount) {
      this.getItems();
    }
  }

  private setItems(items: any[]) {
    this.items = items;
  }

  private _detectChanges() {
    this.cdr.detectChanges();
  }

  private updateLoader(value: boolean) {
    this.loading = value;
    this._detectChanges();
  }

  getItems() {
    if (!this.apiURL) {
      return;
    }
    this.updateLoader(true);
    this.api.get<any[]>(this.apiURL).subscribe({
      next: (data) => {
        this.setItems(data.data);
        this.updateLoader(false);
      },
      error: () => {
        this.updateLoader(false);
        // handle error
      },
    });
  }
}
