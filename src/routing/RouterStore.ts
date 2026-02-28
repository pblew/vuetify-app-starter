import { unref } from "vue";
import type { Router } from "vue-router";

import type { Services } from "@/services.ts";
import type { Stores } from "@/stores.ts";

import useRouteGuards from "./RouteGuards";

export interface RouterStore extends Router {
  reloadRoute(delay: number): Promise<void>;
}

export default function useRouterStore(services: Services, store: Stores): RouterStore {
  const { vueRouter } = services;
  const guards = useRouteGuards(store);

  vueRouter.beforeEach(async (to, from) => {
    const guard = guards.get(to);
    return guard ? guard(to, from) : true;
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
