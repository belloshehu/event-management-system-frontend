import { z } from "zod";

// schema for signup validation
export const signupFormValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be atleast 2 characters" })
    .max(20, {
      message: "First name must be between 2 and 20 characters",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name must only contain letters",
    }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be atleast 2 characters" })
    .max(20, {
      message: "Last name must be between 2 and 20 characters",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name must only contain letters",
    }),
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
});

export type IUserSignupDataType = z.infer<typeof signupFormValidationSchema>;

// schema for login validation
export const loginFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type LoginFormValidationSchemaType = z.infer<typeof loginFormValidationSchema>;
export type SignupFormValidationSchemaType = z.infer<typeof signupFormValidationSchema>;

// schema for user fetch filter
export const userFetchFilterSchema = z.object({
  verified: z.boolean().optional(),
  role: z.enum(["user", "admin", "partner"]).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
});

export type UserFetchFilterType = z.infer<typeof userFetchFilterSchema>;
