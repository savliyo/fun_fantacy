import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { CreateMatchComponent } from './modify-match/create-match.component';
import { UpdateMatchComponent } from './modify-match/update-match.component';

const routes: Routes = [
  {
    path: 'list',
    component: MatchListComponent,
  },
  {
    path: 'add',
    component: CreateMatchComponent,
  },
  {
    path: 'edit/:id',
    component: UpdateMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
