<template>
    <v-snackbar
        v-model="show"
        class="cursor-pointer"
        close-on-content-click
        location="top"
        multi-line
        position="fixed"
        width="500"
        :color="colour"
        :theme="theme"
        :timer="timerColour"
    >
        <div class="d-flex flex-row">
            <v-icon size="48" class="flex-0-0 my-auto mr-4" :icon="icon" />
            <div class="flex-1-1 my-auto text-body-1">{{ currentNotification?.message }}</div>
        </div>
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, unref, watchEffect } from "vue";
import { injectStore } from "@/stores.ts";
import { NotificationType } from "@/notifications/NotificationsStore";

const colours: ReadonlyMap<NotificationType, string> = new Map([
    [NotificationType.INFO, "info"],
    [NotificationType.SUCCESS, "success"],
    [NotificationType.WARNING, "warning"],
    [NotificationType.ERROR, "error"],
]);

const icons: ReadonlyMap<NotificationType, string> = new Map([
    [NotificationType.INFO, "mdi-information-variant-circle"],
    [NotificationType.SUCCESS, "mdi-check-circle"],
    [NotificationType.WARNING, "mdi-alert-circle"],
    [NotificationType.ERROR, "mdi-close-circle"],
]);

defineProps<{
    theme: string;
}>();

const { notificationsStore } = injectStore();
const { currentNotification, dismissCurrentNotification } = notificationsStore;

const show = ref(false);
watchEffect(() => (show.value = unref(currentNotification) !== undefined));
watchEffect(() => {
    if (unref(show) === false) {
        nextTick().then(() => dismissCurrentNotification());
    }
});
const colour = computed<string | undefined>(existingColour => {
    const type = unref(currentNotification)?.type;
    return type !== undefined && colours.has(type) ? colours.get(type) : existingColour;
});
const icon = computed<string | undefined>(existingIcon => {
    const type = unref(currentNotification)?.type;
    return type !== undefined && icons.has(type) ? icons.get(type) : existingIcon;
});
const timerColour = computed<string | undefined>(() => `on-${unref(colour)}`);
</script>
