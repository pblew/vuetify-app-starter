<template>
    <user-notification :theme="theme" />
    <v-app :theme="theme">
        <v-app-bar color="primary">
            <template #title>
                <v-app-bar-title class="text-h5"><em>Application Name</em></v-app-bar-title>
            </template>
            <template #image>
                <v-img :src="logo" alt="" />
            </template>
            <template #append>
                <v-menu :close-on-content-click="false">
                    <template #activator="{ props: buttonProps }">
                        <v-btn
                            v-bind="buttonProps"
                            prepend-icon="mdi-account"
                            rounded="pill"
                            size="x-large"
                            variant="tonal"
                            :text="name"
                        />
                    </template>
                    <v-list>
                        <v-list-item
                            lines="two"
                            prepend-icon="mdi-account"
                            subtitle="Signed In"
                            :title="name"
                        />
                        <v-list-item lines="two" prepend-icon="mdi-theme-light-dark" title="Theme">
                            <template #subtitle>
                                <theme-selector v-model="selectedTheme" />
                            </template>
                        </v-list-item>
                        <v-list-item
                            lines="two"
                            prepend-icon="mdi-account-cog-outline"
                            subtitle="Adjust preferences"
                            title="Settings"
                            @click="showSettings"
                        />
                        <v-divider />
                        <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-navigation-drawer location="start" permanent>
            <template #append>
                <v-footer>
                    <small>&copy; {{ year }} <em>Your name here</em></small>
                </v-footer>
            </template>
            <v-list>
                <v-list-item
                    v-for="route in routes"
                    :key="route.name"
                    color="primary"
                    :prepend-icon="route.meta.menuItem?.icon"
                    :to="route"
                    :value="route.name"
                    >{{ route.meta.menuItem?.title }}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
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

import logo from "./logo.png";
import UserNotification from "./notifications/UserNotification.vue";
import { byIndex, hasMenuItem } from "./routes";
import type { Services } from "./services.ts";
import { defineStores, StoresKey } from "./stores.ts";
import ThemeSelector from "./theme/ThemeSelector.vue";

const props = defineProps<{
    services: Services;
}>();

const stores = defineStores(props.services);
provide(StoresKey, stores);

const { themeStore, router } = stores;
const { getRoutes } = router;

const { selectedTheme, theme } = themeStore;
const year = new Date().getFullYear();
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
