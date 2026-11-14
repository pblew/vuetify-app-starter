import type { Router } from "vue-router";
import {
  type UserPreferencesService,
  useUserPreferencesService,
} from "./user/UserPreferencesService";
import { vueRouter } from "./vueRouter";

export interface Services {
  userPreferencesService: UserPreferencesService;
  vueRouter: Router;
}

export const services: Services = {
  userPreferencesService: useUserPreferencesService(),
  vueRouter,
};
