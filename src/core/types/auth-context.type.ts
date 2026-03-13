import type * as React from "react"
import type { SignInPayload } from "@core/types/auth/sign-in.type"
import type { SignUpPayload } from "@core/types/auth/sign-up.type"

export type UnknownRecord = Record<string, unknown>

export type AuthUser = {
  id: Nullable<ID>
  email: string
  role: string
}

export type AuthSession = {
  accessToken: string
  user: AuthUser
}

export type AuthContextValue = {
  user: Nullable<AuthUser>
  accessToken: Nullable<string>
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean
  error: Nullable<string>
  signIn: (payload: SignInPayload) => Promise<void>
  signUp: (payload: SignUpPayload) => Promise<void>
  signOut: () => void
  clearError: () => void
}

export type AuthProviderProps = {
  children: React.ReactNode
}
