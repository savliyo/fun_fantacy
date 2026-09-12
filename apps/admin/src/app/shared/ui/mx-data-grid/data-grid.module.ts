import { NgModule } from '@angular/core';
import { GridDataService } from './services/data.service';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MxDataGridComponent } from './data-grid.component';
import { GridColumnService } from './services/columns.service';
import { GridColumnsComponent } from './components/base-table/columns';
import { ActionService } from './services/actions.service';
import { LoadingService } from './services/loading.service';
import { ToolbarService } from './services/toolbar.service';
import { TableFooterComponent } from './components/footer/footer';
import { PaginationComponent } from './components/pagination/pagination';
import { GridLimitComponent } from './components/limit/limit';
import { PaginationService } from './services/pagination.service';
import { MetaDataService } from './services/meta-data.service';
import { MxActionComponent } from './components/base-table/action';
import { GridToolbarComponent } from './components/toolbar/toolbar';
import { MxBtnGroupModule } from '../button-group/btn-group.module';
import { MxDropdownModule } from '../dropdown/dropdown.module';
import { MxButtonComponent } from '../button';
import { MxIconComponent } from '../icon';
import { MxBadgeComponent } from '../badge';
import { BaseDataTableComponent } from './components/base-table/core/table';
import { MxTooltipDirective } from '../tooltip/tooltip.directive';
import { MxOverlayComponent } from '../overlay';
import { MxCheckboxComponent } from '../form/mx-checkbox';

@NgModule({
  declarations: [
    MxDataGridComponent,
    BaseDataTableComponent,
    TableFooterComponent,
    PaginationComponent,
    GridLimitComponent,
    GridToolbarComponent,
  ],
  imports: [
    CdkTableModule,
    CommonModule,
    GridColumnsComponent,
    MxActionComponent,
    MxBtnGroupModule,
    MxDropdownModule,
    MxButtonComponent,
    MxIconComponent,
    MxBadgeComponent,
    MxTooltipDirective,
    MxOverlayComponent,
    MxCheckboxComponent,
  ],
  providers: [
    GridDataService,
    GridColumnService,
    ActionService,
    LoadingService,
    ToolbarService,
    MetaDataService,
    PaginationService,
  ],
  exports: [MxDataGridComponent, GridColumnsComponent],
})
export class MxDataGridModule {}
