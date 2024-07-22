import { Router } from "vue-router";
import services, { type Services } from "@/Services";
import intercept, { FunctionInterceptor } from "./intercept";

// for ANSI escape sequences, see: https://stackoverflow.com/a/33206814/3365601
const warning: string = "\x1b[1;3;30;43mUn-mocked service call\x1b[0m";

const serviceCallInterceptor: FunctionInterceptor = (serviceName, functionName, ...args) =>
    console.warn(`${warning} - ${serviceName}::${functionName}(${args})`);

export function mockServices(mocks: Partial<Services> = {}): Services {
    return {
        ...intercept(services, serviceCallInterceptor),
        vueRouter: defaultMockRouter,
        ...mocks,
    };
}

export const defaultMockRouter = {
    beforeEach: (_guard) => () => undefined,
    getRoutes: () => [],
} as Router;
