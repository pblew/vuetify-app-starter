import { computed, type Ref, ref, unref } from "vue";
import type { Services } from "@/services.ts";
import type { Stores } from "@/stores.ts";

export const enum NotificationType {
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

export interface Notification {
  type: NotificationType;
  message: string;
  onDismiss: () => void;
}

export interface NotificationsStore {
  currentNotification: Ref<Notification | undefined>;
  dismissCurrentNotification(): Promise<void>;
  notifyInfo(message: string): Promise<void>;
  notifySuccess(message: string): Promise<void>;
  notifyWarning(message: string): Promise<void>;
  notifyError(message: string): Promise<void>;
}

export function useNotificationsStore(_services: Services, _stores: Stores): NotificationsStore {
  const notifications = ref<Notification[]>([]);

  function addNotification(notification: Omit<Notification, "onDismiss">): Promise<void> {
    let onDismiss = () => {};
    const promise = new Promise<void>(resolve => (onDismiss = resolve));
    notifications.value.push({ ...notification, onDismiss });
    return promise;
  }

  return {
    currentNotification: computed(() => unref(notifications).at(0)),
    async dismissCurrentNotification() {
      notifications.value.shift()?.onDismiss();
    },
    async notifyInfo(message: string): Promise<void> {
      return addNotification({ type: NotificationType.INFO, message });
    },
    async notifySuccess(message: string): Promise<void> {
      return addNotification({ type: NotificationType.SUCCESS, message });
    },
    async notifyWarning(message: string): Promise<void> {
      return addNotification({ type: NotificationType.WARNING, message });
    },
    async notifyError(message: string): Promise<void> {
      return addNotification({ type: NotificationType.ERROR, message });
    },
  };
}
