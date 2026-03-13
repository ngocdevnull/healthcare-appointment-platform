"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Checkbox,
  Input,
  InputPassword,
  PhoneInput,
} from "@ui";
import { signUpSchema } from "@lib/validation/sign-up.schema";
import { useSignUp } from "@hooks/useSignUp";

import type { SignUpFormValues } from "../types/sign-up-form.type";

export function SignUpForm() {
  const { signUp: submitSignUp, isSubmitting } = useSignUp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      agreeTerms: false,
      phone: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    submitSignUp(data);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <h1 className="text-xl font-bold text-black-10">Sign Up</h1>
        <p className="mt-1 text-sm text-gray-500">
          You have account already?{" "}
          <Link
            href="/sign-in"
            className="text-secondary font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Input
              id="firstName"
              placeholder="First Name"
              variant="borderless"
              isError={!!errors.firstName}
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-xs text-error">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              id="lastName"
              placeholder="Last Name"
              variant="borderless"
              isError={!!errors.lastName}
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-xs text-error">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            variant="borderless"
            isError={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-error">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputPassword
            id="password"
            placeholder="Create Password"
            variant="borderless"
            isError={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-error">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputPassword
            id="confirmPassword"
            placeholder="Confirm Password"
            variant="borderless"
            isError={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-[#FF5263]">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                defaultCountry="VN"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.phone && (
            <span className="text-xs text-error">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            id="address"
            placeholder="Enter your address"
            variant="borderless"
            isError={!!errors.address}
            {...register("address")}
          />
          {errors.address && (
            <span className="text-xs text-[#FF5263]">
              {errors.address.message}
            </span>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <Checkbox id="agreeTerms" {...register("agreeTerms")} />
          <span className="text-sm text-gray-600">
            By sign up I agree with{" "}
            <Link href="/terms" className="text-secondary hover:underline">
              Termes and condition
            </Link>
          </span>
        </label>
        {errors.agreeTerms && (
          <span className="text-xs text-[#FF5263]">
            {errors.agreeTerms.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="h-12 bg-primary hover:bg-primary-hover text-white w-full rounded-[5px] font-semibold"
      >
        Sign Up
      </Button>
    </form>
  );
}

