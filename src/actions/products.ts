import { apiRequest } from "@/lib/api-client"
import type { Product } from "@/types"

export async function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/products")
}

export async function getProduct(id: number): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`)
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  return apiRequest<Product, Omit<Product, "id">>("/products", {
    method: "POST",
    body: product,
  })
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  return apiRequest<Product, Partial<Product>>(`/products/${id}`, {
    method: "PUT",
    body: product,
  })
}

export async function deleteProduct(id: number): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, {
    method: "DELETE",
  })
}
