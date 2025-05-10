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

export default function useNotificationsStore(
    _services: Services,
    _stores: Stores,
): NotificationsStore {
    const notifications = ref<Notification[]>([]);

    const currentNotification = computed(() => unref(notifications).at(0));

    function addNotification(notification: Omit<Notification, "onDismiss">): Promise<void> {
        let onDismiss = () => {};
        const promise = new Promise<void>((resolve) => (onDismiss = resolve));
        notifications.value.push({ ...notification, onDismiss });
        return promise;
    }

    async function dismissCurrentNotification() {
        notifications.value.shift()?.onDismiss();
    }

    async function notifyInfo(message: string): Promise<void> {
        return addNotification({ type: NotificationType.INFO, message });
    }

    async function notifySuccess(message: string): Promise<void> {
        return addNotification({ type: NotificationType.SUCCESS, message });
    }

    async function notifyWarning(message: string): Promise<void> {
        return addNotification({ type: NotificationType.WARNING, message });
    }

    async function notifyError(message: string): Promise<void> {
        return addNotification({ type: NotificationType.ERROR, message });
    }

    return {
        currentNotification,
        dismissCurrentNotification,
        notifyInfo,
        notifySuccess,
        notifyWarning,
        notifyError,
    };
}
