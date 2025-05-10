<template>
    <v-btn-toggle
        v-model="model"
        color="primary"
        density="comfortable"
        mandatory="force"
        rounded="xl"
    >
        <v-btn
            v-tooltip:bottom="'Light theme'"
            icon="mdi-white-balance-sunny"
            :value="Theme.LIGHT"
        />
        <v-btn
            v-tooltip:bottom="'Match browser theme'"
            icon="mdi-circle-half-full"
            :value="Theme.SYSTEM"
        />
        <v-btn v-tooltip:bottom="'Dark theme'" icon="mdi-weather-night" :value="Theme.DARK" />
    </v-btn-toggle>
</template>

<script setup lang="ts">
import { Theme } from "@/theme/ThemeStore";

const model = defineModel<Theme>();
</script>
