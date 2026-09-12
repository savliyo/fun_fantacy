import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { MxIconComponent } from '../../shared/ui/icon';
import { MxDropdownModule } from '../../shared/ui/dropdown/dropdown.module';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxSelectComponent } from '../../shared/ui/form/mx-select';
import { MxDataGridModule } from '../../shared/ui/mx-data-grid/data-grid.module';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MxCardModule,
    MxIconComponent,
    MxDataGridModule,
    MxActionComponent,
    MxDropdownModule,
    MxButtonComponent,
    MxSelectComponent,
  ],
})
export class AnalyticsModule {}
