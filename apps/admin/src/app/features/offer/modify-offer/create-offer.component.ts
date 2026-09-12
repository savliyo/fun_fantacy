import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { MxNotification } from '../../../shared/ui/notification/notification.service';
import { SubSink } from '../../../shared/utils/sub-sink';
import { OfferFormComponent } from './offer-form/offer-form.component';

@Component({
  selector: 'add-offer',
  template: `<page-header header="Add Offer">
      <mx-button (handleClick)="handleSubmit()">
        <span class="flex items-center">
          <p>Save</p>
        </span>
      </mx-button></page-header
    >
    <offer-form />`,
})
export class CreateOfferComponent implements OnDestroy {
  @ViewChild(OfferFormComponent) OfferFormComponent!: OfferFormComponent;

  api = inject(ApiService);
  notif = inject(MxNotification);

  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  handleSubmit() {
    if (this.OfferFormComponent.isInValid()) {
      this.OfferFormComponent.setShowErrors();
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding Offer',
      id: 'add-offer',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post('/offer/create', this.OfferFormComponent.getFormValue())
      .subscribe({
        next: () => {
          this.OfferFormComponent.reset();
          this.notif.updateToast({
            text: 'Offer added',
            id: 'add-offer',
            type: 'success',
          });
        },
      });
  }
}
