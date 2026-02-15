import { apiRequest } from "@/lib/api-client"
import type { AuthResponse, LoginCredentials } from "@/types"

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiRequest<AuthResponse, LoginCredentials>("/auth/login", {
    method: "POST",
    body: credentials,
  })
}
