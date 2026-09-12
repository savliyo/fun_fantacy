import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { SubSink } from '../../../shared/utils/sub-sink';

@Component({
  selector: 'app-user-list',
  template: `<page-header header="Manage Users" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add User</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Users" apiURL="/user/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="email" alignment="left" />
      <mx-column field="active" alignment="left" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="Email" field="email" />
      <!-- filters -->

      <!-- actions -->
      <mx-action
        icon="delete"
        (handleClick)="delete($event)"
        tooltip="Delete"
      />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class UserListComponent implements OnDestroy {
  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private dialog = inject(Dialog);

  private subs = new SubSink();

  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  create() {
    this.router.navigate(['/user/create']);
  }

  delete(e) {
    const ref = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      maxHeight: '500px',
      data: {
        title: `Are you sure you want to delete user ${e.cellData.email}?`,
        description: 'This action will not be reverted once done.',
      },
    });
    this.subs.sink = ref.closed.subscribe((result: any) => {
      if (!result.success) {
        return;
      }
      this.api.delete(`/user/delete/${e.cellData.id}`).subscribe(() => {
        this.gridShell.refresh();
        this.notif.show({
          text: 'User Deleted',
          type: 'success',
        });
      });
    });
  }
}
