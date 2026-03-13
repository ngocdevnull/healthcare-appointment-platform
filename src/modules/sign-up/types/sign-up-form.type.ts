import { z } from "zod";
import { signUpSchema } from "@lib/validation/sign-up.schema";

export type SignUpFormValues = z.infer<typeof signUpSchema>;

