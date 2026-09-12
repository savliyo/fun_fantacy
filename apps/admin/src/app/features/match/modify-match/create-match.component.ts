import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MatchFormComponent } from './match-form/match-form.component';

@Component({
  selector: 'add-items',
  template: `<page-header header="Add Match" [showBreadcrumb]="false">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <match-form formType="add" />`,
})
export class CreateMatchComponent implements OnDestroy {
  @ViewChild(MatchFormComponent) MatchFormComponent!: MatchFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  router = inject(Router);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.MatchFormComponent.isInValid()) {
      this.MatchFormComponent.setShowErrors();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Match',
      id: 'add-match',
      type: 'loading',
    });

    const formData = new FormData();
    const formValue = this.MatchFormComponent.getFormValue();

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    this.addRequests.sink = this.api.post('/match/create', formData).subscribe({
      next: () => {
        this.MatchFormComponent.reset();
        this.router.navigate(['/match/list']);
        this.notif.updateToast({
          text: 'Match added',
          id: 'add-match',
          type: 'success',
        });
      },
    });
  }
}
