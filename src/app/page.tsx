"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/molecules/login-form"
import { useAuth } from "@/components/providers/auth-provider"
import { Card } from "@/components/molecules/card"

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(79,70,229,0.12), transparent)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm animate-scale-in">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary p-2.5">
            <svg className="h-7 w-7 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight text-balance">
            Automeli Insight
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Inicia sesion para acceder a tu panel
          </p>
        </div>

        <Card className="shadow-lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}
