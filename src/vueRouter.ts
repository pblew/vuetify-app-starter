import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./routes";

export const vueRouter = createRouter({
  history: createWebHistory(),
  routes,
});
