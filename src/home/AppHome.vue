<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="route in routes" :key="route.name" cols="4">
                <v-card :to="route.path">
                    <v-icon size="128" :icon="route.meta.menuItem?.icon" class="float-start" />
                    <v-card-title>{{ route.meta.menuItem?.title }}</v-card-title>
                    <v-card-text>{{ route.meta.menuItem?.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { byIndex, hasMenuItemWithDescription } from "@/routes";
import { injectStore } from "@/Store";

const { router } = injectStore();
const { getRoutes } = router;
const routes = getRoutes().filter(hasMenuItemWithDescription).sort(byIndex);
</script>
