import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxIconComponent } from '../../shared/ui/icon';

import { ConfigListComponent } from './config-list/config-list.component';
import { ConfigFormComponent } from './modify-config/config-form/config-form.component';
import { CreateConfigComponent } from './modify-config/create-config.component';
import { UpdateConfigComponent } from './modify-config/update-config.component';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { ConfigRoutingModule } from './config-routing.module';
import { MxEditorComponent } from '../../shared/ui/form/editor';
import { MxCheckboxComponent } from '../../shared/ui/form/mx-checkbox';

@NgModule({
  declarations: [
    ConfigListComponent,
    ConfigFormComponent,
    CreateConfigComponent,
    UpdateConfigComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    MxGridShellComponent,
    GridColumnsComponent,
    MxGridToolbarComponent,
    MxInputComponent,
    MxButtonComponent,
    MxIconComponent,
    MxActionComponent,
    MxFormComponent,
    MxGridFilterComponent,
    ConfigRoutingModule,
    MxEditorComponent,
    MxCheckboxComponent,
  ],
})
export class ConfigModule {}
