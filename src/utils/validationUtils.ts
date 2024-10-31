// src/utils/validationUtils.ts
import * as Yup from 'yup';

// Email validation schema
export const emailValidation = Yup.string()
  .email("Invalid email format")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter a valid email"
  )
  .required("Email is required");

// Password validation schema
export const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
  .required("Password is required");

// Signup validation schema using reusable email and password validations
export const signupValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

// Login validation schema (if needed)
export const loginValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
