import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { ApiService } from '../../../shared/services/api.service';
import { MxGridShellComponent } from '../../../shared/grid-shell/grid-shell';
import { GAME_SLUG } from '../../../../../../../libs/mx-schema/src';
import { SubSink } from '../../../shared/utils/sub-sink';
import { ConfirmModalComponent } from '../../../shared/misc/confirm-modal/confirm-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'mx-match-list',
  template: `<page-header header="Match" [showCancel]="false">
      <mx-button (handleClick)="create()">
        <span class="flex items-center">
          <p>Add Match</p>
        </span>
      </mx-button>
    </page-header>
    <mx-grid-shell
      gridTitle="Match List"
      apiURL="/match/list"
      fields="id,gameSlug,teamOne,teamTwo,league,format,venue,startTime,startDate,active"
    >
      <!-- columns -->
      <mx-column field="id" alignment="left" [visible]="false" />
      <mx-column field="gameSlug" title="Game" />
      <mx-column field="teamOne" />
      <mx-column field="teamTwo" />
      <mx-column field="league" />
      <mx-column field="format" />
      <mx-column field="venue" />
      <mx-column field="startDate" />
      <mx-column field="startTime" />
      <mx-column field="active">
        <ng-template #cell let-item>
          @if(item.active) {
          <mx-badge [text]="item.active" variant="success" class="capitalize" />
          } @else {
          <mx-badge [text]="item.active" variant="error" class="capitalize" />
          }
        </ng-template>
      </mx-column>

      <!-- columns -->

      <!-- Filters -->
      <mx-grid-filter
        field="gameSlug"
        label="Game Slug"
        type="select"
        [items]="games"
      />
      <mx-grid-filter field="active" label="Active" type="text" />
      <!-- Filters -->

      <!-- Action -->
      <mx-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
      <mx-action
        icon="delete"
        tooltip="Delete"
        (handleClick)="deleteItem($event)"
      />
      <!-- Action -->
    </mx-grid-shell>`,
  styleUrl: './match-list.component.scss',
})
export class MatchListComponent {
  @ViewChild(MxGridShellComponent) gridShell!: MxGridShellComponent;

  private router = inject(Router);
  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private dialog = inject(Dialog);

  games = Array.from(GAME_SLUG);

  private subs = new SubSink();

  create() {
    this.router.navigate(['/match/add']);
  }

  edit(e: any) {
    this.router.navigate(['/match/edit/' + e.cellData.id]);
  }

  deleteItem(e: any) {
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
      this.api.delete(`/match/${e.cellData.id}`).subscribe(() => {
        this.gridShell.refresh();
        this.notif.show({
          text: 'Match Deleted',
          type: 'success',
        });
      });
    });
  }
}
