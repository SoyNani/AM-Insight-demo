import { apiRequest } from "@/lib/api-client"
import type { Product } from "@/types"

export async function getProducts(): Promise<Product[]> {
  const apiProducts = await apiRequest<Product[]>("/products")

  if (typeof window !== "undefined") {
    const localProducts = JSON.parse(localStorage.getItem("local_products") || "[]")
    const deletedIds = JSON.parse(localStorage.getItem("deleted_product_ids") || "[]")

    // Filter out deleted products from API results
    const filteredApiProducts = apiProducts.filter(p => !deletedIds.includes(p.id))

    // Return combined list (local products first or last, depending on preference. Usually new ones first)
    // Let's put local products at the beginning to show them as "newest"
    return [...localProducts, ...filteredApiProducts]
  }

  return apiProducts
}

export async function getProduct(id: number): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`)
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  // Check if image is a base64 string (too large for some APIs)
  const isBase64 = product.image.startsWith("data:")

  // Create a payload for the API with a placeholder if it's base64
  const apiPayload = {
    ...product,
    image: isBase64 ? "https://fakestoreapi.com/img/placeholder.png" : product.image
  }

  // We still call the API to get a "success" response/structure, but we ignore its non-persistence
  const apiResponse = await apiRequest<Product, Omit<Product, "id">>("/products", {
    method: "POST",
    body: apiPayload,
  })

  // Start with a base ID that won't collide easily with existing low IDs, or use Date.now()
  const newProduct = {
    ...apiResponse,
    ...product, // Ensure our local data (like base64 image) is preserved
    id: Date.now() // Override ID to ensure uniqueness for local items
  }

  if (typeof window !== "undefined") {
    const localProducts = JSON.parse(localStorage.getItem("local_products") || "[]")
    localProducts.unshift(newProduct)
    localStorage.setItem("local_products", JSON.stringify(localProducts))
  }

  return newProduct
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  return apiRequest<Product, Partial<Product>>(`/products/${id}`, {
    method: "PUT",
    body: product,
  })
}

export async function deleteProduct(id: number): Promise<Product> {
  // Call API for completeness (though it might just return the deleted object id)
  const response = await apiRequest<Product>(`/products/${id}`, {
    method: "DELETE",
  })

  if (typeof window !== "undefined") {
    // 1. Check if it's a local product and remove it entirely
    const localProducts: Product[] = JSON.parse(localStorage.getItem("local_products") || "[]")
    const updatedLocalProducts = localProducts.filter(p => p.id !== id)

    if (localProducts.length !== updatedLocalProducts.length) {
      // It was a local product
      localStorage.setItem("local_products", JSON.stringify(updatedLocalProducts))
    } else {
      // 2. It's an API product, add to deleted_ids
      const deletedIds = JSON.parse(localStorage.getItem("deleted_product_ids") || "[]")
      if (!deletedIds.includes(id)) {
        deletedIds.push(id)
        localStorage.setItem("deleted_product_ids", JSON.stringify(deletedIds))
      }
    }
  }

  return response
}
