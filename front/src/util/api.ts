const API_BASE = "http://localhost:8080";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

export { API_BASE, apiFetch };
