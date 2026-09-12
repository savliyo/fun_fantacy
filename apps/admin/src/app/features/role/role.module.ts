import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxIconComponent } from '../../shared/ui/icon';

import { RoleListComponent } from './role-list/role-list.component';
import { RoleFormComponent } from './modify-role/role-form/role-form.component';
import { CreateRoleComponent } from './modify-role/create-role.component';
import { UpdateRoleComponent } from './modify-role/update-role.component';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { RoleRoutingModule } from './role-routing.module';

@NgModule({
  declarations: [
    RoleListComponent,
    RoleFormComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    RoleRoutingModule,
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
  ],
})
export class RoleModule {}
