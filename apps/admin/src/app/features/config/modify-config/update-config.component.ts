import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TConfig } from '../../../../../../../libs/mx-schema/src';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
  selector: 'edit-config',
  template: ` <page-header header="Edit Config">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <config-form />`,
})
export class UpdateConfigComponent implements OnInit, OnDestroy {
  @ViewChild(ConfigFormComponent) configFormComponent!: ConfigFormComponent;

  private api = inject(ApiService);
  private notif = inject(MxNotification);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  configID!: string;
  private requests = new SubSink();

  ngOnInit(): void {
    this.configID = this.route.snapshot.params['id'];
    this.fetchConfigDetails(this.configID);
  }

  ngOnDestroy(): void {
    this.requests.unsubscribe();
  }

  private fetchConfigDetails(id: string) {
    this.api.get<TConfig>(`/config/${id}`).subscribe(({ data }) => {
      this.configFormComponent.patchValue(data);
    });
  }

  handleSubmit() {
    if (this.configFormComponent.isInValid()) {
      this.configFormComponent.setShowErrors();
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating Config',
      id: 'update-config',
      type: 'loading',
    });

    this.requests.sink = this.api
      .put(
        `/config/update/${this.configID}`,
        this.configFormComponent.getFormValue()
      )
      .subscribe({
        next: () => {
          this.notif.updateToast({
            text: 'Config updated',
            id: 'update-config',
            type: 'success',
          });
          this.router.navigate(['/config/list']);
        },
      });
  }
}
