// ── API Types (FakeStore API) ──

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface Cart {
  id: number
  userId: number
  products: CartProduct[]
}

export interface CartProduct {
  productId: number
  quantity: number
}

export interface User {
  id: number
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
}

export interface LoginCredentials {
  username: string
  password: string
}

// ── App Domain Types ──

export type ProductStatus = "active" | "alert" | "synced"

export interface DashboardProduct extends Product {
  status: ProductStatus
  margin: number
  amazonPrice: number
  mlPrice: number
}

export interface MetricCard {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
}

export interface ChartDataPoint {
  name: string
  ingresos: number
  gastos: number
}

export interface MarginSimulation {
  amazonPrice: number
  shippingCost: number
  mlCommission: number
  mlPrice: number
  margin: number
  marginPercent: number
  profit: number
}

// ── API Client Types ──

export interface ApiError {
  message: string
  status: number
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
