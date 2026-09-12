import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MxButtonComponent } from '../../ui/button';
import { MxIconComponent } from '../../ui/icon';
import { MxBreadcrumbsComponent } from '../../ui/breadcrumbs';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [MxButtonComponent, MxIconComponent, MxBreadcrumbsComponent],
  template: `
    <div class="mb-3 flex justify-between items-center">
      <div class="item-center">
        <h5 class="font-bold lg:text-3xl md:text-3xl pb-4">{{ header }}</h5>
        @if(showBreadcrumb) {
        <mx-breadcrumbs [data]="[]" />
        }
      </div>
      <div class="flex gap-3">
        <ng-content></ng-content>
        @if(showCancel) {
        <mx-button (handleClick)="handleCancel()">
          <span class="flex items-center">
            <p>Cancel</p>
          </span>
        </mx-button>
        }
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  constructor(private location: Location) {}

  @Input() header = '';
  @Input() showBreadcrumb = false;
  @Input() showCancel = true;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  handleCancel() {
    if (this.cancel.observed) {
      return this.cancel.emit();
    }
    this.location.back();
  }
}
