import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';

@Component({
  selector: 'app-offer-list',
  template: `<page-header header="Manage Offers" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Offer</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell gridTitle="Offers List" apiURL="/offer/list">
      <!-- columns -->
      <mx-column field="id" alignment="left" />
      <mx-column field="name" alignment="left" />
      <mx-column field="amount" alignment="left" />
      <mx-column field="period" alignment="left" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="Name" field="name" />
      <mx-grid-filter label="Amount" field="amount" />
      <mx-grid-filter label="Period" field="period" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
      <mx-action
        icon="delete"
        (handleClick)="delete($event)"
        tooltip="Delete"
      />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class OfferListComponent {
  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);

  create() {
    this.router.navigate(['/offer/create']);
  }

  edit(e: any) {
    this.router.navigate(['/offer/update/' + e.cellData.id]);
  }

  delete(e) {
    this.api.delete(`/offer/delete/${e.cellData.id}`).subscribe(() => {
      this.gridShell.refresh();
      this.notif.show({
        text: 'Offer Deleted',
        type: 'success',
      });
    });
  }
}
