import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { MxIconComponent } from '../icon';
import { MxBtnGroupComponent } from './btn-group';
import { MxBtnGroupContainerComponent } from './btn-group-container';
import { MxTooltipDirective } from '../tooltip/tooltip.directive';
@NgModule({
  declarations: [MxBtnGroupComponent, MxBtnGroupContainerComponent],
  imports: [MxIconComponent, NgClass, MxTooltipDirective],
  exports: [MxBtnGroupContainerComponent, MxBtnGroupComponent],
})
export class MxBtnGroupModule {}
