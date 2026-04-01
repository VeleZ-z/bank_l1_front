const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL. Add it to your environment variables.");
}

const normalizedApiBaseUrl = API_BASE_URL.replace(/\/+$/, "");

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${normalizedApiBaseUrl}${normalizedEndpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    // Keep backend error message when available for clearer UI feedback.
    const errorText = await response.text();
    throw new Error(errorText || "An unexpected error occurred.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  if (!isJson) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
