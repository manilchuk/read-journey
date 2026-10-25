// src/utils/validationSchemas.ts
import * as Yup from 'yup';

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Enter a valid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Enter a valid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});
