import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'mx-match-list',
  template: ` <page-header header="Notification" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add New</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Notifications" apiURL="/notification/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="title" />
      <mx-column field="body" />
      <!-- columns -->

      <mx-action
        icon="delete"
        (handleClick)="delete($event)"
        tooltip="Delete"
      />
    </mx-grid-shell>`,
})
export class NotificationListComponent {
  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private dialog = inject(Dialog);

  private subs = new SubSink();

  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  create() {
    this.router.navigate(['/notification/add']);
  }

  delete(e) {
    const ref = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      maxHeight: '500px',
      data: {
        title: `Are you sure you want to delete?`,
        description: 'This action will not be reverted once done.',
      },
    });
    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (!result.success) {
        return;
      }
      this.api.delete(`/notification/delete/${e.cellData.id}`).subscribe(() => {
        this.gridShell.refresh();
        this.notif.show({
          text: 'Notification Deleted',
          type: 'success',
        });
      });
    });
  }
}
