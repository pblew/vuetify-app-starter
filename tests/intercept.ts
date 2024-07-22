export type FunctionInterceptor = (
    objectName: string,
    functionName: string,
    ...args: unknown[]
) => void;

export default function intercept<T extends object>(
    target: T,
    functionInterceptor: FunctionInterceptor,
): T {
    return Object.defineProperties(
        { ...target },
        Object.fromEntries(
            Object.entries(Object.getOwnPropertyDescriptors<T>(target)).map(
                ([name, descriptor]) => [
                    name,
                    {
                        ...descriptor,
                        value: interceptFunctionCalls(descriptor.value, (functionName, ...args) =>
                            functionInterceptor(name, functionName, ...args),
                        ),
                    },
                ],
            ),
        ),
    );
}

function interceptFunctionCalls<T extends object>(
    obj: T,
    interceptor: (functionName: string, ...args: unknown[]) => unknown,
) {
    return new Proxy(obj, {
        get(target, prop) {
            const functionOrField = Reflect.get(target, prop);
            if (typeof functionOrField === "function") {
                return new Proxy(functionOrField, {
                    apply: (target, thisArg, argumentsList) => {
                        interceptor(String(prop), argumentsList);
                        return Reflect.apply(target, thisArg, argumentsList);
                    },
                });
            } else {
                return functionOrField;
            }
        },
    });
}
