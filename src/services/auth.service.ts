import { signInApi, signUpApi } from "@core/apis/auth.api";
import type { SignInPayload, SignInResponseDto } from "@core/types/auth/sign-in.type";
import type { SignUpPayload, SignUpResponseDto } from "@core/types/auth/sign-up.type";

function toSignInResponse(dto: SignInResponseDto): SignInResponseDto {
  return {
    accessToken: dto.accessToken,
    token: dto.token,
    user: dto.user
      ? {
        id: dto.user.id,
        email: dto.user.email,
        role: dto.user.role,
      }
      : undefined,
    data: dto.data,
  };
}

export async function signIn(payload: SignInPayload): Promise<SignInResponseDto> {
  const responseDto = await signInApi(payload);
  return toSignInResponse(responseDto);
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponseDto> {
  const responseDto = await signUpApi(payload);
  return responseDto;
}
