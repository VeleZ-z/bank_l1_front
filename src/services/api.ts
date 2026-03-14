const API_BASE = "http://localhost:8080/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE}${endpoint}`, {
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
