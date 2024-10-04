<template>
    <div class="grid-container my-4">
        <v-card
            v-for="route in routes"
            :key="route.name"
            class="d-flex flex-nowrap grid-item"
            width="400"
            :to="route.path"
        >
            <v-icon color="primary" size="128" :icon="route.meta.menuItem?.icon" />
            <div class="align-start">
                <v-card-title>{{ route.meta.menuItem?.title }}</v-card-title>
                <v-card-text>{{ route.meta.menuItem?.description }}</v-card-text>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { byIndex, hasMenuItemWithDescription } from "@/routes";
import { injectStore } from "@/Store";

const { router } = injectStore();
const { getRoutes } = router;
const routes = getRoutes().filter(hasMenuItemWithDescription).sort(byIndex);
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-template-rows: auto;
    place-items: center;
}
.grid-item {
    place-self: center;
}
</style>
