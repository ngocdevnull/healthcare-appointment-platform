"use client";

import { useAuth } from "@context/auth-context";

export function useSignIn() {
  const { signIn, isLoading, error, clearError } = useAuth();
  return { signIn, isSubmitting: isLoading, error, clearError };
}
