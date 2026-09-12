import { CdkMenuModule } from '@angular/cdk/menu';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { MxIconComponent } from '../icon';
import { MxDropdownComponent, MxDropdownItemComponent } from './dropdown';
import { MxCheckboxComponent } from '../form/mx-checkbox';

@NgModule({
  declarations: [MxDropdownComponent, MxDropdownItemComponent],
  imports: [
    CdkMenuModule,
    MxIconComponent,
    NgTemplateOutlet,
    NgClass,
    MxCheckboxComponent,
  ],
  exports: [MxDropdownComponent, MxDropdownItemComponent],
})
export class MxDropdownModule {}
