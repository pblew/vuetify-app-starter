<template>
  <modal-dialog v-model="showDialog" title="Settings">
    <v-container>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <coming-soon>
            <template #navigation><v-spacer /></template>
          </coming-soon>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-container>
  </modal-dialog>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import ModalDialog from "@/dialog/ModalDialog.vue";
import ComingSoon from "./ComingSoon.vue";

const showDialog = shallowRef(false);
</script>
