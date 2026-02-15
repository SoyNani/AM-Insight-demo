import useSWR from "swr"
import { getProducts } from "@/actions/products"
import type { Product } from "@/types"

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    "products",
    getProducts
  )

  return {
    products: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
