import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TMatch } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { safeStringify } from '../../../shared/utils/safe-json';
import { SubSink } from '../../../shared/utils/sub-sink';
import { MatchFormComponent } from './match-form/match-form.component';

@Component({
  selector: 'edit-items',
  template: ` <page-header header="Edit Match" [showBreadcrumb]="false">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <match-form formType="update" />`,
})
export class UpdateMatchComponent implements OnInit, OnDestroy {
  @ViewChild(MatchFormComponent) formComponent!: MatchFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);
  route = inject(ActivatedRoute);
  router = inject(Router);

  matchID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.matchID = this.route.snapshot.params['id'];
    this.fetchMatchDetails(this.matchID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchMatchDetails(id: string) {
    this.api.get<TMatch>(`/match/detail/${id}`).subscribe(({ data }) => {
      this.formComponent.previousFilenames = {
        teamOneLogo: data.teamOneLogo,
        teamTwoLogo: data.teamTwoLogo,
        h2hTeamImage: data.h2hTeamImage,
        premiumTeamImage: data.premiumTeamImage,
      };
      this.formComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.formComponent.isInValid()) {
      this.formComponent.setShowErrors();
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Match',
      id: 'update-match',
      type: 'loading',
    });

    const formData = new FormData();
    const formValues = this.formComponent.getFormValue();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    formData.append(
      'previousFiles',
      safeStringify(this.formComponent.previousFilenames)
    );

    this.requests.sink = this.api
      .put(`/match/${this.matchID}`, formData)
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Match updated',
            id: 'update-match',
            type: 'success',
          });
          this.router.navigate(['/match/list']);
        },
      });
  }
}
