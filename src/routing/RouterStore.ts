import { unref } from "vue";
import type { Router } from "vue-router";

import type { Services } from "@/Services";
import type { Store } from "@/Store";

import useRouteGuards from "./RouteGuards";

export interface RouterStore extends Router {
    reloadRoute(delay: number): Promise<void>;
}

export default function useRouterStore(services: Services, store: Store): RouterStore {
    const { vueRouter } = services;
    const guards = useRouteGuards(store);

    vueRouter.beforeEach(async (to, from, next) => {
        const guard = guards.get(to);
        if (guard) {
            await guard(to, from, next);
        } else {
            next();
        }
    });

    async function reloadRoute(delay = 100) {
        const { currentRoute } = vueRouter;
        const route = unref(currentRoute);
        await vueRouter
            .replace({ name: "ReloadRoute" })
            .then(() => setTimeout(() => vueRouter.replace(route), delay));
    }

    return {
        ...vueRouter,
        reloadRoute,
    };
}
