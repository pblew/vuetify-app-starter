<template>
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
</template>
<script setup lang="ts">
import logo from "@/logo.png";
import ThemeSelector from "@/theme/ThemeSelector.vue";
import type { Theme } from "@/theme/ThemeStore.ts";

defineProps<{
    name: string;
}>();

const selectedTheme = defineModel<Theme>("theme");

const emit = defineEmits<{
    showSettings: [];
    signOut: [];
}>();

function showSettings() {
    emit("showSettings");
}

function signOut() {
    emit("signOut");
}
</script>
