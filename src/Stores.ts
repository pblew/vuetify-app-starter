import { inject, type InjectionKey } from "vue";

import type { Services } from "./Services";
import useRouterStore, { type RouterStore } from "./routing/RouterStore";

export interface Stores {
    router: RouterStore;
}

export function defineStores(services: Services): Readonly<Stores> {
    const stores = {} as Stores;

    stores.router = useRouterStore(services, stores);

    return stores;
}

export const StoresKey = Symbol("Stores") as InjectionKey<Stores>;
export const injectStore = (): Stores => inject(StoresKey) as Stores;
