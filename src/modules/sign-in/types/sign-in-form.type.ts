import { z } from "zod";
import { signInSchema } from "@lib/validation/sign-in.schema";

export type SignInFormValues = z.infer<typeof signInSchema>;
