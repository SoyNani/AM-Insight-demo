import { apiRequest } from "@/lib/api-client"
import type { Cart } from "@/types"

export async function getCarts(): Promise<Cart[]> {
  return apiRequest<Cart[]>("/carts")
}

export async function getCart(id: number): Promise<Cart> {
  return apiRequest<Cart>(`/carts/${id}`)
}

export async function createCart(cart: Omit<Cart, "id">): Promise<Cart> {
  return apiRequest<Cart, Omit<Cart, "id">>("/carts", {
    method: "POST",
    body: cart,
  })
}

export async function updateCart(id: number, cart: Partial<Cart>): Promise<Cart> {
  return apiRequest<Cart, Partial<Cart>>(`/carts/${id}`, {
    method: "PUT",
    body: cart,
  })
}

export async function deleteCart(id: number): Promise<Cart> {
  return apiRequest<Cart>(`/carts/${id}`, {
    method: "DELETE",
  })
}
