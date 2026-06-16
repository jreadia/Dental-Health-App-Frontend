export const API_BASE_URL = "https://dental-health-backend-x7b5.onrender.com/api/v1";

/**
 * A wrapper around native fetch that automatically includes credentials (cookies)
 * and handles parsing JSON responses.
 */
export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  
  // If not sending FormData, default to application/json
  if (!(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // CRITICAL: This allows HTTP-only cookies to be sent and received
  });

  // Handle No Content
  if (response.status === 204) {
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    // Try to extract a useful error message
    const errorMessage = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  // Unwrap the "data" property if the backend wraps responses in { success: true, data: ... }
  if (data && data.data !== undefined) {
    return data.data;
  }

  return data;
}
