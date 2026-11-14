import { createRouter, createWebHashHistory } from "vue-router";

import { services, type Services } from "@/services.ts";
import { useUserPreferencesService } from "@/user/UserPreferencesService.ts";

import { type FunctionInterceptor, intercept } from "@tests/intercept";

// for ANSI escape sequences, see: https://stackoverflow.com/a/33206814/3365601
const warning: string = "\x1b[1;3;30;43mUn-mocked service call\x1b[0m";

const serviceCallInterceptor: FunctionInterceptor = (serviceName, functionName, ...args) =>
  console.warn(`${warning} - ${serviceName}::${functionName}(${args})`);

export function mockServices(mocks: Partial<Services> = {}): Services {
  return {
    ...intercept(services, serviceCallInterceptor),
    vueRouter: defaultMockRouter,
    userPreferencesService: defaultMockUserPreferencesService,
    ...mocks,
  };
}

export const defaultMockRouter = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

export function useMockStorage(): Storage {
  const data = new Map<string, string>();
  return {
    length: data.size,
    clear: data.clear,
    getItem: key => data.get(key) ?? null,
    key: index => Array.from(data.keys()).at(index) ?? null,
    removeItem: key => {
      data.delete(key);
    },
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

export const defaultMockUserPreferencesService = useUserPreferencesService(useMockStorage());
