import { type HttpClientOptions, useHttpClient } from "./HttpClient";
import type { Identifiable } from "./Identifiable.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EndpointFormatter = (...args: any[]) => string;

export interface RestClient<T extends Identifiable> {
  findItems<S extends Identifiable = T>(endpointFormatter?: EndpointFormatter): Promise<S[]>;
  createItem<A = T>(itemOrArgs: A, endpointFormatter?: EndpointFormatter): Promise<T>;
  readItem(id: Identifiable["id"], endpointFormatter?: EndpointFormatter): Promise<T>;
  updateItem(item: T, endpointFormatter?: EndpointFormatter): Promise<T>;
  deleteItem(id: Identifiable["id"], endpointFormatter?: EndpointFormatter): Promise<void>;
}

const defaultNoIdEndpointFormatter = () => "";
const defaultIdEndpointFormatter = (id: Identifiable["id"]) => `${id}`;
const defaultItemEndpointFormatter = (item: Identifiable) => `${item.id}`;

export function useRestClient<T extends Identifiable>(
  baseUrl: string,
  options?: Partial<HttpClientOptions>,
): RestClient<T> {
  const { httpGet, httpPost, httpPut, httpDelete } = useHttpClient(baseUrl, options);

  return {
    findItems: (endpointFormatter = defaultNoIdEndpointFormatter) => httpGet(endpointFormatter()),
    createItem: (itemOrArgs, endpointFormatter = defaultNoIdEndpointFormatter) =>
      httpPost(endpointFormatter(itemOrArgs), itemOrArgs),
    readItem: (id, endpointFormatter = defaultIdEndpointFormatter) =>
      httpGet(endpointFormatter(id)),
    updateItem: (item, endpointFormatter = defaultItemEndpointFormatter) =>
      httpPut(endpointFormatter(item), item),
    deleteItem: (id, endpointFormatter = defaultIdEndpointFormatter) =>
      httpDelete(endpointFormatter(id)),
  };
}
