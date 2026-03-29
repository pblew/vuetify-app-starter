export interface HttpClient {
  httpGet<T>(url: string): Promise<T>;
  httpPost<T, U>(url: string, data: U): Promise<T>;
  httpPut<T, U>(url: string, data: U): Promise<T>;
  httpDelete(url: string): Promise<void>;
}

const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RequestDataPreprocessor = (rawRequestData?: unknown) => RequestInit["body"];

export const jsonify: RequestDataPreprocessor = rawRequestData => JSON.stringify(rawRequestData);
export const passthru: RequestDataPreprocessor = rawRequestData =>
  rawRequestData as RequestInit["body"];

export type ResponseDataType = "arrayBuffer" | "blob" | "json" | "text";

export interface HttpClientOptions extends RequestInit {
  fetchJwt: () => Promise<string | undefined>;
  requestDataPreprocess: RequestDataPreprocessor;
  responseDataType: ResponseDataType;
}

const defaultHttpClientOptions: HttpClientOptions = {
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "same-origin",
  fetchJwt: async () => undefined,
  requestDataPreprocess: jsonify,
  responseDataType: "json",
};

export function useHttpClient(baseUrl: string, options?: Partial<HttpClientOptions>): HttpClient {
  const defaults = {
    ...defaultHttpClientOptions,
    ...(options ?? {}),
  };
  const { fetchJwt, headers, requestDataPreprocess, responseDataType } = defaults;

  function resolveUrl(url: string): string {
    return url ? `${baseUrl}/${url}` : baseUrl;
  }

  function getHeaders(jwt?: string): Headers {
    const requestHeaders = new Headers(headers);
    if (jwt !== undefined) {
      requestHeaders.set("Authorization", `Bearer ${jwt}`);
    }
    return requestHeaders;
  }

  async function request<T, U>(method: HttpMethod, url: string, requestData?: U): Promise<T> {
    const jwt = await fetchJwt();
    const headers = getHeaders(jwt);
    const body = requestDataPreprocess(requestData);
    const response = await fetch(resolveUrl(url), {
      ...defaults,
      method,
      headers,
      body,
    });
    const responseData: T = await response[responseDataType]();
    if (!response.ok) {
      throw {
        code: response.status,
        name: response.statusText ?? `http-${response.status}`,
        message: (responseData as Error)?.message ?? responseData,
      };
    }
    return responseData;
  }

  return {
    async httpGet<T>(url: string): Promise<T> {
      return request(HttpMethod.GET, url);
    },
    async httpPost<T, U>(url: string, data: U): Promise<T> {
      return request(HttpMethod.POST, url, data);
    },
    async httpPut<T, U>(url: string, data: U): Promise<T> {
      return request(HttpMethod.PUT, url, data);
    },
    async httpDelete(url: string): Promise<void> {
      return request(HttpMethod.DELETE, url);
    },
  };
}
