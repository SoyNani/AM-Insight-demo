"use client"

import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { useAuth } from "@/components/providers/auth-provider"

export function LoginForm() {
  const { login, isLoading, error } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Usuario"
        placeholder="johnd"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <Input
        label="Contrasena"
        type="password"
        placeholder="m38rmF$"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}
      <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
        Iniciar sesion
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        {"Demo: usuario "}
        <code className="rounded bg-muted px-1 py-0.5 text-foreground font-mono">johnd</code>
        {" / contrasena "}
        <code className="rounded bg-muted px-1 py-0.5 text-foreground font-mono">{"m38rmF$"}</code>
      </p>
    </form>
  )
}
