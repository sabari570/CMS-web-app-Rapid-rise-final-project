import { z } from "zod";

const phoneNumberRegex = /^\+\d{1,3}\s\d{10}$/;

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
    address: z.string().optional(),
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

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Firstname is required" })
    .regex(/^[a-zA-Z_]+$/, { message: "Invalid firstname" }),
  lastName: z
    .string()
    .min(1, { message: "Lastname is required" })
    .regex(/^[a-zA-Z_]+$/, { message: "Invalid lastname" }),
  companyName: z
    .string()
    .min(1, { message: "Company name is required" })
    .regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, {
      message: "Company name is invalid",
    }),
  status: z.enum(["Employee", "Trainee"], {
    message: "Invalid status selected",
  }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(phoneNumberRegex, { message: "Invalid phone number" }),
  address: z.string().min(1, { message: "Address is requried" }),
});

export const userProfileSchema = z.object({
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
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),
  address: z.string().optional(),
});
