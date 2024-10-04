import { nextTick } from "vue";
import { type Router, type RouteRecord } from "vue-router";
import { VCard } from "vuetify/components";
import { mount, type ComponentMountingOptions, VueWrapper } from "@vue/test-utils";

import AppHome from "@/home/AppHome.vue";
import { defineStore, StoreKey } from "@/Store";

import { defaultMockRouter, mockServices } from "../mocks";
import vuetify from "../vuetify";

describe("AppHome", () => {
    type Instance = InstanceType<typeof AppHome>;
    let mountFunction: (
        options?: ComponentMountingOptions<Instance>,
    ) => Promise<VueWrapper<Instance>>;

    const vueRouter: Router = {
        ...defaultMockRouter,
        getRoutes: () =>
            [
                {
                    name: "Home",
                    path: "/home",
                    meta: {},
                },
                {
                    name: "Visible 1",
                    path: "/vis1",
                    meta: {
                        menuItem: {
                            index: 0,
                            title: "Visible 1 title",
                            description: "Visible 1 description",
                        },
                    },
                },
                {
                    name: "No menuitem",
                    path: "/no_menuitem",
                    meta: {},
                },
                {
                    name: "Visible 2",
                    path: "/vis2",
                    meta: {
                        menuItem: {
                            index: 1,
                            title: "Visible 2 title",
                            description: "Visible 2 description",
                        },
                    },
                },
                {
                    name: "No description",
                    path: "/no_description",
                    meta: {
                        menuItem: {
                            index: 0,
                            title: "No description title",
                        },
                    },
                },
                {
                    name: "Visible 3",
                    path: "/vis3",
                    meta: {
                        menuItem: {
                            index: 2,
                            title: "Visible 3 title",
                            description: "Visible 3 description",
                        },
                    },
                },
            ] as RouteRecord[],
    };

    beforeEach(() => {
        mountFunction = async (options) => {
            const wrapper = mount(AppHome, {
                global: {
                    plugins: [vuetify],
                    provide: {
                        [StoreKey as symbol]: defineStore(mockServices({ vueRouter })),
                    },
                },
                shallow: true,
                ...options,
            });
            await nextTick();
            return wrapper;
        };
    });

    it("only displays routes with menu items and descriptions", async () => {
        const wrapper = await mountFunction();
        const displayedRoutes = wrapper.findAllComponents(VCard);
        expect(displayedRoutes).toHaveLength(3);
    });
});
