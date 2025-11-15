import type { Router } from "vue-router";
import useUserPreferencesService, {
  type UserPreferencesService,
} from "./user/UserPreferencesService";
import vueRouter from "./vueRouter";

export interface Services {
  userPreferencesService: UserPreferencesService;
  vueRouter: Router;
}

const services: Services = {
  userPreferencesService: useUserPreferencesService(),
  vueRouter,
};

export default services;
