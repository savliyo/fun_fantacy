import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { CreateRoleComponent } from './modify-role/create-role.component';
import { UpdateRoleComponent } from './modify-role/update-role.component';

const routes: Routes = [
  {
    path: 'list',
    component: RoleListComponent,
  },
  {
    path: 'create',
    component: CreateRoleComponent,
  },
  {
    path: 'update/:id',
    component: UpdateRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
