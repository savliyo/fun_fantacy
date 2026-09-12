import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { AnimationEvent } from "@angular/animations";
import {
  MxNotificationData,
  MX_NOTIFICATION_CONFIG_TOKEN,
  MxNotificationConfig,
} from "./notification-config";
import { MxNotificationRef } from "./notification-ref";
import {
  MxNotificationAnimations,
  MxNotificationAnimationState,
} from "./notification.animation";
import { MxNotification } from "./notification.service";

@Component({
  selector: "Mx-notification",
  templateUrl: "./notification.component.html",
  animations: [MxNotificationAnimations.fadeNotification],
})
export class MxNotificationComponent implements OnInit, OnDestroy {
  animationState: MxNotificationAnimationState = "default";

  private intervalId!: number | any;

  constructor(
    readonly data: MxNotificationData,
    readonly ref: MxNotificationRef,
    @Inject(MX_NOTIFICATION_CONFIG_TOKEN)
    public notificationConfig: MxNotificationConfig,
    private notifService: MxNotification
  ) {
    //
    // Extend data with defalt notification config
    this.data = { ...this.notificationConfig, ...this.data };
  }

  ngOnInit() {
    //
    // Set autoclose
    if (this.data.autoClose === true)
      this.intervalId = setTimeout(
        () => (this.animationState = "closing"),
        this.data.autoCloseTimeout
      );
  }

  ngOnDestroy() {
    //
    // Clear autoclose
    if (this.data.autoClose === true) clearTimeout(this.intervalId);
  }

  close() {
    if (this.data.id) {
      this.notifService.removeID(this.data.id);
    }
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as MxNotificationAnimationState) === "closing";
    const itFinished = this.animationState === "closing";

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
