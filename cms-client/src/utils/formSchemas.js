import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Firstname is required" })
      .regex(/^[a-zA-Z_]+$/, { message: "Invalid firstname" }),
    lastName: z
      .string()
      .min(1, { message: "Lastname is required" })
      .regex(/^[a-zA-Z_]+$/, { message: "Invalid lastname" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Please enter a valid email",
    }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    password2: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    gender: z.enum(["male", "female"], {
      message: "Gender is required",
    }),
    address: z.string().min(1, { message: "Address is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["password2"],
      });
    }
  });
