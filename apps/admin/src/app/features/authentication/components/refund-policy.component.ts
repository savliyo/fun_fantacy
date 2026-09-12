import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'privacy-policy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mx-dialog-content class="overflow-auto h-screen">
    <mx-dialog-header>
      <mx-dialog-title>Refund policy</mx-dialog-title>
    </mx-dialog-header>
    <div>
      <p class="text-sm">
        Refund policy (Please read carefully will you payment on this app) This
        app gives you service of prime team and that app takes money from prime.
        This app does not force you in any way to give this money. You read all
        the policies and take any kind of service in this app. If you download
        this app and we do not give permission to change it in any way. Payment
        is not refunded on taking any type of service in this app, so pay very
        carefully and check all the policies. We do not take the payment refund
        responsibility so the person taking the service should read everything
        and make the payment. You will not be refunded any kind of payment
        through this app. Since the Mobile Application offers non- tangible,
        irrevocable goods we do not provide refunds after the product is
        purchased, which you acknowledge prior to purchasing any product in the
        Mobile Application. Please make sure that you've carefully read service
        description before making a purchase. Contacting us If you have any
        questions, concerns, or complaints regarding this refund policy, we
        encourage you to contact us using the details below:
        fanofficialsports&#64;gmail.com This document was last updated on August
        3, 2024
      </p>
    </div>
  </mx-dialog-content>`,
})
export class RefundDialogComponent {}
