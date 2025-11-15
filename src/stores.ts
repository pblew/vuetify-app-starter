import { inject, type InjectionKey } from "vue";

import type { Services } from "./services.ts";
import useNotificationsStore, { type NotificationsStore } from "./notifications/NotificationsStore";
import useRouterStore, { type RouterStore } from "./routing/RouterStore";
import useThemeStore, { type ThemeStore } from "./theme/ThemeStore";

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
