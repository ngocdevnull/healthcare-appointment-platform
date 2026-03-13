export type SignInPayload = {
  email: string
  password: string
  role: string
  rememberMe?: boolean
}

export type SignInResponseDto = {
  accessToken?: string
  token?: string
  user?: {
    id?: ID
    email?: string
    role?: string
  }
  data?: unknown
}
