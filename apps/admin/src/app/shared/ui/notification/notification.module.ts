import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgClass, NgIf, NgTemplateOutlet } from "@angular/common";
import { MxNotificationComponent } from "./notification.component";
import { OverlayModule } from "@angular/cdk/overlay";
import {
  defaultMxNotificationConfig,
  MX_NOTIFICATION_CONFIG_TOKEN,
} from "./notification-config";

@NgModule({
  declarations: [MxNotificationComponent],
  imports: [NgIf, OverlayModule, NgClass, NgTemplateOutlet],
  exports: [MxNotificationComponent],
})
export class GbNotificationModule {
  public static forRoot(
    config = defaultMxNotificationConfig
  ): ModuleWithProviders<GbNotificationModule> {
    return {
      ngModule: GbNotificationModule,
      providers: [
        {
          provide: MX_NOTIFICATION_CONFIG_TOKEN,
          useValue: { ...defaultMxNotificationConfig, ...config },
        },
      ],
    };
  }
}
