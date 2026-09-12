import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { NotificationFormComponent } from './notification-form/notification-form.component';

@Component({
  selector: 'create-notification',
  template: `<page-header header="Add Notification">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button></page-header
    >
    <notification-form />`,
})
export class CreateNotificationComponent implements OnDestroy {
  @ViewChild(NotificationFormComponent)
  NotificationFormComponent!: NotificationFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  router = inject(Router);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.NotificationFormComponent.isInvalid()) {
      this.NotificationFormComponent.setShowErrors();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding notification',
      id: 'add-notification',
      type: 'loading',
    });

    const formData = new FormData();
    const formValue = this.NotificationFormComponent.getFormValue();

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    this.addRequests.sink = this.api
      .post('/notification/create', formData)
      .subscribe({
        next: () => {
          this.NotificationFormComponent.reset();
          this.router.navigate(['/notification/list']);
          this.notif.updateToast({
            text: 'notification added',
            id: 'add-notification',
            type: 'success',
          });
        },
      });
  }
}
