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
            <div class="flex-1-1 my-auto text-body-1 font-weight-bold">
                {{ currentNotification?.message }}
            </div>
        </div>
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, unref, watch } from "vue";
import { injectStore } from "@/stores.ts";

const colours = ["info", "success", "warning", "error"];

const icons = [
    "mdi-information-variant-circle",
    "mdi-check-circle",
    "mdi-alert-circle",
    "mdi-close-circle",
];

defineProps<{
    theme: string;
}>();

const { notificationsStore } = injectStore();
const { currentNotification, dismissCurrentNotification } = notificationsStore;

const show = ref(false);
watch(currentNotification, value => {
    show.value = value !== undefined;
});
watch(show, value => {
    if (value === false) {
        nextTick().then(() => dismissCurrentNotification());
    }
});
const typeIndex = computed<number>(oldValue => unref(currentNotification)?.type ?? oldValue ?? 0);
const colour = computed<string | undefined>(oldValue => colours[unref(typeIndex)] ?? oldValue);
const icon = computed<string | undefined>(oldValue => icons[unref(typeIndex)] ?? oldValue);
const timerColour = computed(() => `on-${unref(colour)}`);
</script>
