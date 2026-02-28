import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import type { Stores } from "@/stores.ts";

export interface RouteGuard {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
  ): Promise<NavigationGuardReturn>;
}

export interface RouteGuards {
  get(route: RouteLocationNormalized): RouteGuard | undefined;
}

export default function useRouteGuards(_store: Stores): RouteGuards {
  //const { storeName } = store;

  const guards: ReadonlyMap<string, RouteGuard> = new Map<string, RouteGuard>([
    // NOTE: dont try anything fancy here like:
    //       [loadSummaries, create, loadById].map(guard => [guard.name, guard])
    //       function names are obfuscated in the built version, so no guards are found!
    // EXAMPLE:
    //   ["guardName", guardFunction],
  ]);

  function get(route: RouteLocationNormalized): RouteGuard | undefined {
    const { guardName } = route.meta;
    return guardName !== undefined ? guards.get(guardName) : undefined;
  }

  return {
    get,
  };
}
