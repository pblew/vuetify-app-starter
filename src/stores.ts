import { inject, type InjectionKey } from "vue";

import type { Services } from "./services.ts";
import { type NotificationsStore, useNotificationsStore } from "./notifications/NotificationsStore";
import { type RouterStore, useRouterStore } from "./routing/RouterStore";
import { type ThemeStore, useThemeStore } from "./theme/ThemeStore";

export interface Stores {
  notificationsStore: NotificationsStore;
  themeStore: ThemeStore;
  router: RouterStore;
}

export function defineStores(services: Services): Readonly<Stores> {
  const stores = {} as Stores;

  stores.notificationsStore = useNotificationsStore(services, stores);
  stores.themeStore = useThemeStore(services, stores);
  stores.router = useRouterStore(services, stores);

  return stores;
}

export const StoresKey = Symbol("Stores") as InjectionKey<Stores>;
export const injectStore = (): Stores => inject(StoresKey) as Stores;
