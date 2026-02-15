import { apiRequest } from "@/lib/api-client"
import type { User } from "@/types"

export async function getUsers(): Promise<User[]> {
  return apiRequest<User[]>("/users")
}

export async function getUser(id: number): Promise<User> {
  return apiRequest<User>(`/users/${id}`)
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  return apiRequest<User, Omit<User, "id">>("/users", {
    method: "POST",
    body: user,
  })
}

export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  return apiRequest<User, Partial<User>>(`/users/${id}`, {
    method: "PUT",
    body: user,
  })
}

export async function deleteUser(id: number): Promise<User> {
  return apiRequest<User>(`/users/${id}`, {
    method: "DELETE",
  })
}
