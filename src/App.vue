<template>
    <v-app :theme="theme">
        <v-navigation-drawer location="start" permanent>
            <template #prepend>
                <div class="pa-7">
                    <v-img :src="logo" alt="" />
                </div>
                <v-divider />
            </template>
            <template #append>
                <v-footer>
                    <small>&copy; 2024 <em>Your name here</em></small>
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
        <v-app-bar color="primary">
            <template #title>
                <v-app-bar-title class="text-h5"><em>Application Name</em></v-app-bar-title>
            </template>
            <template #append>
                <v-menu>
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
                        <v-list-item
                            lines="two"
                            prepend-icon="mdi-account-settings-outline"
                            subtitle="Adjust preferences"
                            title="Settings"
                        />
                        <v-divider />
                        <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
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
import { byIndex, hasMenuItem } from "./routes";
import type { Services } from "./Services";
import { defineStore, StoreKey } from "./Store";
import useTheme from "./Theme";

const props = defineProps<{
    services: Services;
}>();

const stores = defineStore(props.services);
provide(StoreKey, stores);

const { router } = stores;
const { getRoutes } = router;

const theme = useTheme();
const routes = getRoutes()
    .filter((route) => hasMenuItem(route))
    .sort(byIndex);
const name = computed<string>(() => "User Name");
function signOut() {}
</script>

<style lang="scss">
@forward "@fontsource/roboto/latin-400";
@forward "vuetify/settings" with (
    $color-pack: false
);

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
