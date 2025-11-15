<template>
  <v-card
    class="d-flex flex-nowrap justify-space-between"
    :color="color"
    height="100"
    location="center"
    width="300"
  >
    <div>
      <v-card-title class="text-h5">{{ message }}</v-card-title>
      <v-card-actions>
        <slot name="navigation">
          <v-btn prepend-icon="mdi-home-outline" text="Return home" :to="{ name: 'Home' }" />
        </slot>
      </v-card-actions>
    </div>
    <v-avatar :color="color" size="96">
      <v-icon icon="mdi-hammer-wrench" size="96" />
    </v-avatar>
  </v-card>
</template>

<script setup lang="ts">
const { message = "coming soon", color = "secondary" } = defineProps<{
  message?: string;
  color?: string;
}>();
</script>
