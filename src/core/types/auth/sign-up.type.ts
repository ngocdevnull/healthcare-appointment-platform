export type SignUpPayload = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  password?: string;
  agreeTerms?: boolean;
};

export type SignUpResponseDto = {
  accessToken?: string;
  token?: string;
  user?: {
    id: ID;
    email: string;
    role: string;
  };
  data?: unknown;
};
