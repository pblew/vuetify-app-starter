<template>
    <v-app :theme="theme">
        <v-app-bar color="primary">
            <template #prepend>
                <v-app-bar-nav-icon @click="toggleNavigationMenu" />
            </template>
            <template #image>
                <v-img :src="logo" rounded />
            </template>
            <v-app-bar-title>
                <h1 class="text-h5"><em>Application Name</em></h1>
            </v-app-bar-title>
            <template #append>
                <v-app-bar-nav-icon
                    icon="mdi-account"
                    variant="tonal"
                    @click="toggleUserMenu('loginId', () => {})"
                />
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="state.navigationMenu" location="start" temporary>
            <v-list>
                <v-list-item
                    v-for="route in routes"
                    :key="route.name"
                    :prepend-icon="route.meta.menuItem?.icon"
                    :to="route"
                    :value="route.name"
                    >{{ route.meta.menuItem?.title }}</v-list-item
                >
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer v-model="state.userMenu" location="end" temporary>
            <v-list>
                <v-list-item
                    lines="two"
                    prepend-icon="mdi-account"
                    subtitle="Signed In"
                    :title="name"
                />
                <v-divider />
                <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
            </v-list>
        </v-navigation-drawer>
        <v-main class="d-flex flex-column flex-1-1-100">
            <router-view v-slot="{ Component, route }" name="main">
                <component :is="Component" :key="route.name" />
            </router-view>
        </v-main>
        <v-footer app>
            <v-spacer />
            <small>&copy; 2024 <em>Your name here</em>. All rights reserved</small>
        </v-footer>
    </v-app>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { RouterView } from "vue-router";

import logo from "./logo.png";
import { byIndex, hasMenuItem } from "./routes";
import type { Services } from "./Services";
import { defineStore, StoreKey } from "./Store";
import useTheme from "./Theme";

const props = defineProps<{
    services: Services;
}>();

interface State {
    navigationMenu: boolean;
    userMenu: boolean;
    loginId?: string;
    signOut?: () => void;
}

const stores = defineStore(props.services);
provide(StoreKey, stores);

const { router } = stores;
const { getRoutes } = router;

const theme = useTheme();
const state = reactive<State>({
    navigationMenu: false,
    userMenu: false,
    loginId: undefined,
    signOut: undefined,
});
const routes = getRoutes()
    .filter((route) => hasMenuItem(route))
    .sort(byIndex);
const name = computed<string>(() => "User Name");

function toggleNavigationMenu() {
    state.navigationMenu = !state.navigationMenu;
    if (state.navigationMenu && state.userMenu) {
        state.userMenu = false;
    }
}

function toggleUserMenu(loginId: string, signOut: () => void) {
    state.userMenu = !state.userMenu;
    if (state.userMenu && state.navigationMenu) {
        state.navigationMenu = false;
    }
    state.loginId = loginId;
    state.signOut = signOut;
}

function signOut() {
    state.userMenu = false;
    state.signOut && state.signOut();
}
</script>

<style lang="scss">
@import "@fontsource/roboto/latin-400";

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
