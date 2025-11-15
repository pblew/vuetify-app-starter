function onResponseData<T>(
  resolve: (value: PromiseLike<T> | T) => void,
  reject: (reason?: unknown) => void,
  response: Response,
  data: T | Error,
) {
  if (response.ok) {
    resolve(data as T);
  } else {
    reject({
      code: response.status,
      name: response.statusText ?? `http-${response.status}`,
      message: (data as Error)?.message ?? data,
    });
  }
}

function onResponse<T>(
  resolve: (value: PromiseLike<T> | T) => void,
  reject: (reason?: unknown) => void,
  response: Response,
) {
  return response.json().then(
    data => onResponseData(resolve, reject, response, data),
    parseError => reject(parseError),
  );
}

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

export interface HttpClientOptions extends RequestInit {
  fetchJwt: () => Promise<string | undefined>;
}

const defaultHttpClientOptions: HttpClientOptions = {
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "same-origin",
  fetchJwt: async () => undefined,
};

export function useHttpClient(baseUrl: string, options?: Partial<HttpClientOptions>): HttpClient {
  const defaults = {
    ...defaultHttpClientOptions,
    ...(options ?? {}),
  };
  const { fetchJwt, headers } = defaults;

  function resolveUrl(url: string): string {
    return `${baseUrl}/${url}`;
  }

  function getHeaders(jwt?: string): Headers {
    const requestHeaders = new Headers(headers);
    if (jwt !== undefined) {
      requestHeaders.set("Authorization", `Bearer ${jwt}`);
    }
    return requestHeaders;
  }

  async function request<T, U>(method: HttpMethod, url: string, data?: U): Promise<T> {
    const jwt = await fetchJwt();
    const headers = getHeaders(jwt);
    const body = JSON.stringify(data);
    return new Promise<T>((resolve, reject) => {
      fetch(resolveUrl(url), {
        ...defaults,
        method,
        headers,
        body,
      }).then(
        response => onResponse(resolve, reject, response),
        reason => reject(reason),
      );
    });
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
