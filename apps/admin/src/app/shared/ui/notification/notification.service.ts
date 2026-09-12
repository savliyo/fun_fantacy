import { Injectable, Injector, Inject } from "@angular/core";
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  MX_NOTIFICATION_CONFIG_TOKEN,
  MxNotificationConfig,
  MxNotificationData,
} from "./notification-config";
import { MxNotificationComponent } from "./notification.component";
import { MxNotificationRef } from "./notification-ref";

@Injectable({
  providedIn: "root",
})
export class MxNotification {
  private currentlyRendered = new Map<
    string | number,
    { notificationRef: MxNotificationRef; position: any }
  >();

  constructor(
    private overlay: Overlay,
    @Inject(MX_NOTIFICATION_CONFIG_TOKEN)
    private notificationConfig: MxNotificationConfig
  ) {}

  show(data: MxNotificationData) {
    if (data.id && this.currentlyRendered.has(data.id)) {
      return;
    }
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });
    const notificationRef = new MxNotificationRef(overlayRef);
    if (data.id) {
      this.currentlyRendered.set(data.id, {
        notificationRef,
        position: positionStrategy,
      });
    }
    // this.lastNotification = notificationRef;

    const injector = this.getInjector(data, notificationRef);
    const notificationPortal = new ComponentPortal(
      MxNotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }

  closeAll() {
    for (const value of this.currentlyRendered.values()) {
      value.notificationRef.close();
    }
    this.currentlyRendered.clear();
  }

  removeID(id: any) {
    this.currentlyRendered.delete(id);
  }

  getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .bottom(`${(this.currentlyRendered.size || 1 - 1) * 60 + 20}px`)
      .right(this.notificationConfig.position?.right + "px");
  }

  getInjector(data: MxNotificationData, notificationRef: MxNotificationRef) {
    const tokens = new WeakMap();

    tokens.set(MxNotificationData, data);
    tokens.set(MxNotificationRef, notificationRef);

    return Injector.create({
      providers: [
        { provide: MxNotificationData, useValue: data },
        { provide: MxNotificationRef, useValue: notificationRef },
      ],
    });
  }

  updateToast(data: MxNotificationData) {
    if (!data.id) {
      return;
    }
    const toast = this.currentlyRendered.get(data.id);
    if (!toast) {
      return;
    }
    const positionStrategy = toast.position;

    toast.notificationRef.close();
    const overlayRef = this.overlay.create({ positionStrategy });

    const notificationRef = new MxNotificationRef(overlayRef);
    if (data.id) {
      this.currentlyRendered.set(data.id, {
        notificationRef,
        position: positionStrategy,
      });
    }
    // this.lastNotification = notificationRef;

    const injector = this.getInjector(data, notificationRef);
    const notificationPortal = new ComponentPortal(
      MxNotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }
}
