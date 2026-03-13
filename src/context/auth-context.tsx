"use client"

import * as React from "react"

import { apiClient } from "@core/apis/api-client"
import { AUTH_SESSION_STORAGE_KEY } from "@core/constants/auth-storage"
import { DEFAULT_FALLBACK_ERROR_MESSAGE } from "@core/constants/http-error-messages"
import type {
  AuthContextValue,
  AuthProviderProps,
  AuthSession,
  AuthUser,
  UnknownRecord,
} from "@core/types/auth-context.type"
import type { SignInPayload, SignInResponseDto } from "@core/types/auth/sign-in.type"
import type { SignUpPayload } from "@core/types/auth/sign-up.type"
import type { HttpError } from "@core/types/http-error.type"
import { signIn as signInService, signUp as signUpService } from "@services/auth.service"

const AuthContext = React.createContext<Maybe<AuthContextValue>>(undefined)

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null
}

function toNullableString(value: unknown): Nullable<string> {
  return typeof value === "string" ? value : null
}

function toUser(value: unknown): Nullable<AuthUser> {
  if (!isRecord(value)) return null

  const email = toNullableString(value.email)
  const role = toNullableString(value.role)

  if (!email || !role) return null

  return {
    id: (value.id as Nullable<ID>) ?? null,
    email,
    role,
  }
}

function resolveAccessToken(response: SignInResponseDto): Nullable<string> {
  if (response.accessToken) return response.accessToken
  if (response.token) return response.token

  if (isRecord(response.data)) {
    const nested = response.data as UnknownRecord
    const token = toNullableString(nested.accessToken) ?? toNullableString(nested.token)
    if (token) return token
  }

  return null
}

function resolveUser(response: SignInResponseDto, payload: SignInPayload): AuthUser {
  const directUser = toUser(response.user)
  if (directUser) return directUser

  if (isRecord(response.data)) {
    const nested = response.data as UnknownRecord
    const nestedUser = toUser(nested.user)
    if (nestedUser) return nestedUser
  }

  return {
    id: null,
    email: payload.email,
    role: payload.role,
  }
}

function setAuthHeader(accessToken: Nullable<string>) {
  if (accessToken) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

function loadSessionFromStorage(): Nullable<AuthSession> {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as UnknownRecord
    const accessToken = toNullableString(parsed.accessToken)
    const user = toUser(parsed.user)

    if (!accessToken || !user) return null
    return { accessToken, user }
  } catch {
    return null
  }
}

function persistSession(session: Nullable<AuthSession>) {
  if (typeof window === "undefined") return

  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<Nullable<AuthUser>>(null)
  const [accessToken, setAccessToken] = React.useState<Nullable<string>>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isInitializing, setIsInitializing] = React.useState(true)
  const [error, setError] = React.useState<Nullable<string>>(null)

  React.useEffect(() => {
    const session = loadSessionFromStorage()
    if (session) {
      setUser(session.user)
      setAccessToken(session.accessToken)
      setAuthHeader(session.accessToken)
    } else {
      setAuthHeader(null)
    }

    setIsInitializing(false)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  const signOut = React.useCallback(() => {
    setUser(null)
    setAccessToken(null)
    setError(null)
    setAuthHeader(null)
    persistSession(null)
  }, [])

  const signIn = React.useCallback(async (payload: SignInPayload) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await signInService(payload)
      const token = resolveAccessToken(response)

      if (!token) {
        throw new Error(DEFAULT_FALLBACK_ERROR_MESSAGE)
      }

      const authUser = resolveUser(response, payload)
      const session: AuthSession = { accessToken: token, user: authUser }

      setUser(authUser)
      setAccessToken(token)
      setAuthHeader(token)
      persistSession(session)
    } catch (err) {
      const message = (err as HttpError)?.message ?? DEFAULT_FALLBACK_ERROR_MESSAGE
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signUp = React.useCallback(async (payload: SignUpPayload) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await signUpService(payload)
      const token = resolveAccessToken(response)

      if (token) {
        const authUser = resolveUser(response, { email: payload.email, role: 'patient' } as SignInPayload)
        const session: AuthSession = { accessToken: token, user: authUser }

        setUser(authUser)
        setAccessToken(token)
        setAuthHeader(token)
        persistSession(session)
      }
    } catch (err) {
      const message = (err as HttpError)?.message ?? DEFAULT_FALLBACK_ERROR_MESSAGE
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      isInitializing,
      error,
      signIn,
      signUp,
      signOut,
      clearError,
    }),
    [user, accessToken, isLoading, isInitializing, error, signIn, signUp, signOut, clearError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
