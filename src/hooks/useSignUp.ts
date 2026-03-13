"use client";

import { useAuth } from "@context/auth-context";

export function useSignUp() {
  const { signUp, isLoading, error, clearError } = useAuth();
  return { signUp, isSubmitting: isLoading, error, clearError };
}
