<template>
    <v-navigation-drawer location="start" permanent>
        <template #append>
            <v-footer>
                <small>&copy; {{ year }} <em>Your name here</em></small>
            </v-footer>
        </template>
        <v-list nav>
            <v-list-item
                v-for="route in routes"
                :key="route.name"
                :active="isCurrentRoute(route)"
                :color="route.meta.menuItem?.color ?? 'primary'"
                :prepend-icon="route.meta.menuItem?.icon"
                :to="route"
                :value="route.name"
                variant="flat"
                >{{ route.meta.menuItem?.title }}
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import type { RouteLocationNormalizedLoadedGeneric, RouteRecordNormalized } from "vue-router";

const props = defineProps<{
    routes: RouteRecordNormalized[];
    currentRoute: RouteLocationNormalizedLoadedGeneric;
}>();

const year = new Date().getFullYear();

function isCurrentRoute(route: RouteRecordNormalized): boolean {
    return props.currentRoute.path === route.path;
}
</script>
