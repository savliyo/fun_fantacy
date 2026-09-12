import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
  selector: 'add-config',
  template: `<page-header header="Add Config">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button>
    </page-header>
    <config-form />`,
})
export class CreateConfigComponent implements OnDestroy {
  @ViewChild(ConfigFormComponent) ConfigFormComponent!: ConfigFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.ConfigFormComponent.isInValid()) {
      this.ConfigFormComponent.setShowErrors();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Config',
      id: 'add-config',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/config/create', this.ConfigFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.ConfigFormComponent.reset();
          this.notif.updateToast({
            text: 'Config added',
            id: 'add-config',
            type: 'success',
          });
        },
      });
  }
}
