import type { SignInPayload, SignInResponseDto } from "@core/types/auth/sign-in.type";
import type { SignUpPayload, SignUpResponseDto } from "@core/types/auth/sign-up.type";

import { apiClient } from "./api-client";

export async function signInApi(payload: SignInPayload): Promise<SignInResponseDto> {
  const response = await apiClient.post<SignInResponseDto>("/auth/sign-in", payload);
  return response.data;
}

export async function signUpApi(payload: SignUpPayload): Promise<SignUpResponseDto> {
  const response = await apiClient.post<SignUpResponseDto>("/auth/sign-up", payload);
  return response.data;
}
