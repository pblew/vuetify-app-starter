<template>
  <v-dialog v-model="dialog" max-height="90%" persistent scrollable :width="width">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <v-card :color="color" style="border-width: 3px" variant="flat">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="bg-background">
        <slot name="default" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="bg-surface">
        <slot name="left-buttons" />
        <v-spacer />
        <slot name="right-buttons" />
        <v-btn
          color="error"
          prepend-icon="mdi-cancel"
          text="Close"
          @click.prevent="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { VCard, VDialog } from "vuetify/components";

const {
  color = "primary",
  title,
  width = "auto",
} = defineProps<{
  color?: VCard["color"];
  title: string;
  width?: VDialog["width"];
}>();

const dialog = defineModel<boolean>();
</script>

<style scoped lang="scss">
.v-card {
  --v-border-opacity: 0;
}
</style>
