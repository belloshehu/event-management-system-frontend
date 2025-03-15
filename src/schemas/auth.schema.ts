import { z } from "zod";

// schema for signup validation
export const signupFormValidationSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
      "Password must contain atleat: 1 lower case, 1 upper case, 1 special character "
    )

    .min(8)
    .max(16),
  passwordRepeat: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
      "Password must contain atleat: 1 lower case, 1 upper case, 1 special character "
    )
    .min(8)
    .max(16),
  role: z.enum(["user", "admin"]),
});

export type IUserSignupDataType = z.infer<typeof signupFormValidationSchema>;

// schema for login validation
export const loginFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type LoginFormValidationSchemaType = z.infer<typeof loginFormValidationSchema>;
export type SignupFormValidationSchemaType = z.infer<typeof signupFormValidationSchema>;
