import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigListComponent } from './config-list/config-list.component';
import { CreateConfigComponent } from './modify-config/create-config.component';
import { UpdateConfigComponent } from './modify-config/update-config.component';

const routes: Routes = [
{
  path: 'list',
  component: ConfigListComponent
},
{
  path:'create',
  component: CreateConfigComponent
},
{
  path: 'update/:id',
  component: UpdateConfigComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
