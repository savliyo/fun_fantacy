import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { CreateNotificationComponent } from './modify-notification/create-notification.component';

const routes: Routes = [
  { path: 'list', component: NotificationListComponent },
  { path: 'add', component: CreateNotificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
