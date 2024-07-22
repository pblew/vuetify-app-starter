import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import AppHome from "./home/AppHome.vue";
import ReloadRoute from "./routing/ReloadRoute.vue";

interface RouteMenuItem {
    index: number;
    icon: string;
    title: string;
    description?: string;
}

declare module "vue-router" {
    interface RouteMeta {
        menuItem?: RouteMenuItem;
        guardName?: string;
    }
}

export function hasMenuItem(
    route: RouteRecordNormalized,
    menuItemCheck: (menuItem: RouteMenuItem) => boolean = () => true,
): boolean {
    const { menuItem } = route.meta;
    return menuItem !== undefined && menuItemCheck(menuItem);
}

export function hasMenuItemWithDescription(route: RouteRecordNormalized): boolean {
    return hasMenuItem(route, (menuItem) => (menuItem.description?.length ?? 0) > 0);
}

export function byIndex(
    { meta: meta1 }: RouteRecordNormalized,
    { meta: meta2 }: RouteRecordNormalized,
): number {
    const { index: index1 } = meta1.menuItem ?? {};
    const { index: index2 } = meta2.menuItem ?? {};
    return Math.sign((index1 ?? 0) - (index2 ?? 0));
}

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: { name: "Home" },
    },
    {
        name: "ReloadRoute",
        path: "/reloading",
        component: ReloadRoute,
    },
    {
        name: "Home",
        path: "/home",
        components: { main: AppHome },
        meta: {
            menuItem: {
                index: 0,
                icon: "mdi-home-outline",
                title: "Home",
            },
        },
    },
];

export default routes;
