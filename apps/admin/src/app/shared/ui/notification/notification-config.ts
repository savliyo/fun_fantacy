import { InjectionToken, TemplateRef } from "@angular/core";

export class MxNotificationData {
  id?: string;
  type?: MxNotificationType;
  title?: string;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: object;
  autoClose?: boolean;
  autoCloseTimeout?: number;
  position?: {
    bottom: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
  classes?: {
    [key in MxNotificationClasses]: string;
  } = defaultMxNotificationConfig.classes;
}

export type MxNotificationType =
  | "warning"
  | "info"
  | "success"
  | "error"
  | "loading";
export type MxNotificationClasses =
  | "container"
  | "card"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "svg"
  | "button";

export interface MxNotificationConfig {
  type?: MxNotificationType;
  position?: {
    bottom: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
  autoClose?: boolean;
  autoCloseTimeout?: number;
  classes: {
    [key in MxNotificationClasses]: string;
  };
}

export const defaultMxNotificationConfig: MxNotificationConfig = {
  type: "success",
  position: {
    bottom: 20,
    right: 20,
  },
  animation: {
    fadeOut: 800,
    fadeIn: 300,
  },
  autoClose: true,
  autoCloseTimeout: 2500,
  classes: {
    container: "relative fkex justify-around mb-5 w-[382px] max-w-full",
    card: "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
    success: "text-green-400",
    info: "text-primary-400",
    warning: "text-yellow-400",
    danger: "text-danger-400",
    svg: "w-6 h-6",
    button:
      "bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  },
};

export const MX_NOTIFICATION_CONFIG_TOKEN = new InjectionToken(
  "Mx-notification-config"
);
