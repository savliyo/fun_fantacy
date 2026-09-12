import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-list',
  template: ` <page-header header="Manage Config" [showCancel]="false">
    </page-header>
    <mx-grid-shell gridTitle="Configs" apiURL="/config/list">
      <!-- <mx-toolbar icon="add" name="Add" (handleClick)="add()" /> -->

      <!-- columns -->
      <mx-column field="id" alignment="left" [visible]="false" />
      <mx-column field="adBannerID" alignment="left" />
      <mx-column field="adRewardID" alignment="left" />
      <mx-column field="telegramLink" alignment="left" />
      <!-- columns -->

      <!-- filters -->
      <mx-grid-filter label="Id" field="id" />
      <mx-grid-filter label="AdBannerId" field="adBannerID" />
      <mx-grid-filter label="AdRewardId" field="adRewardID" />
      <mx-grid-filter label="TelegramLink" field="telegramLink" />
      <!-- filters -->

      <!-- actions -->
      <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
      <!-- actions -->
    </mx-grid-shell>`,
})
export class ConfigListComponent {
  private router = inject(Router);

  add() {
    this.router.navigate(['/config/create']);
  }

  edit(e: any) {
    this.router.navigate(['/config/update/' + e.cellData.id]);
  }
}
