import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MxGridFilterComponent } from '../../shared/grid-shell/filters/components/grid-filter';
import { MxGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { PageHeaderComponent } from '../../shared/misc/page-header/page-header.component';
import { MxFormComponent } from '../../shared/ui/form/mx-form';
import { MxInputComponent } from '../../shared/ui/form/mx-input';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { MxActionComponent } from '../../shared/ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../../shared/ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../../shared/ui/mx-data-grid/components/toolbar/mx-toolbar';
import { CreateNotificationComponent } from './modify-notification/create-notification.component';
import { NotificationFormComponent } from './modify-notification/notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { MxButtonComponent } from '../../shared/ui/button';
import { MxFileUploadComponent } from '../../shared/ui/form/mx-file-upload';
import { MxImageComponent } from '../../shared/ui/display-image';

@NgModule({
  declarations: [
    NotificationListComponent,
    CreateNotificationComponent,
    NotificationFormComponent,
  ],
  imports: [
    MxImageComponent,
    CommonModule,
    NotificationRoutingModule,
    MxGridShellComponent,
    MxGridToolbarComponent,
    GridColumnsComponent,
    MxGridFilterComponent,
    MxActionComponent,
    PageHeaderComponent,
    MxFormComponent,
    MxInputComponent,
    MxTextareaComponent,
    MxButtonComponent,
    MxFileUploadComponent,
  ],
})
export class NotificationModule {}
