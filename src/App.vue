<template>
    <user-notification :theme="theme" />
    <v-app :theme="theme">
        <top-bar
            v-model:theme="selectedTheme"
            :name="name"
            @show-settings="showSettings"
            @sign-out="signOut"
        />
        <side-bar :routes="routes" :current-route="currentRoute" />
        <v-main class="d-flex flex-column flex-1-1-100">
            <router-view v-slot="{ Component, route }" name="main">
                <component :is="Component" :key="route.name" />
            </router-view>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { RouterView } from "vue-router";

import SideBar from "./home/SideBar.vue";
import TopBar from "./home/TopBar.vue";
import UserNotification from "./notifications/UserNotification.vue";
import { byIndex, hasMenuItem } from "./routes";
import type { Services } from "./services.ts";
import { defineStores, StoresKey } from "./stores.ts";

const props = defineProps<{
    services: Services;
}>();

const stores = defineStores(props.services);
provide(StoresKey, stores);

const { themeStore, router } = stores;
const { currentRoute, getRoutes } = router;

const { selectedTheme, theme } = themeStore;
const routes = getRoutes()
    .filter(route => hasMenuItem(route))
    .sort(byIndex);
const name = computed<string>(() => "User Name");
function showSettings() {
    stores.notificationsStore.notifyWarning("Settings not yet implemented");
}
function signOut() {
    stores.notificationsStore.notifyWarning("Sign out not yet implemented");
}
</script>

<style lang="scss">
body {
    font-family: "Roboto", sans-serif;
}

a {
    text-decoration: none;
}

a[target="_blank"]::after {
    content: " \0f0327";
    font-family: "Material Design Icons", fantasy;
    font-variant-position: super;
    text-decoration: none;
}
</style>
