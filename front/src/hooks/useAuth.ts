export interface UsuarioLogado {
  id: number;
  conta: string;
  role: string;
}

export function getUsuario(): UsuarioLogado | null {
  try {
    const json = localStorage.getItem("usuario");
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAdmin(): boolean {
  return getUsuario()?.role === "ADMIN";
}

export function isLogado(): boolean {
  return getToken() !== null;
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}
