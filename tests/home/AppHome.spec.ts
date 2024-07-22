/// <reference types="vitest/globals" />
import { nextTick } from "vue";
import { RouteRecordNormalized } from "vue-router";
import { mount, MountingOptions, VueWrapper } from "@vue/test-utils";

import AppHome from "@/home/AppHome.vue";
import services from "@/Services";
import { defineStore, StoreKey } from "@/Store";

import { defaultMockRouter, mockServices } from "../mocks";
import vuetify from "../vuetify";

describe("AppHome", () => {
    type Instance = InstanceType<typeof AppHome>;
    let mountFunction: (options?: MountingOptions<Instance>) => Promise<VueWrapper<Instance>>;

    const vueRouter = {
        ...defaultMockRouter,
        getRoutes: services.vueRouter.getRoutes,
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
        console.log(wrapper.vm.routes);
        expect(
            wrapper.vm.routes.find(
                (route: RouteRecordNormalized) => !route.meta?.menuItem?.description,
            ),
        ).toBe(undefined);
    });
});
