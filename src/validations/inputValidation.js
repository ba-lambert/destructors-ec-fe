import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup.string().min(3).trim().required(),
  lastname: yup.string().min(3).trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  phone: yup.string().matches(/^\+?[1-9][0-9]{7,14}$/),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[0-9]/, "Password must contain at least one numeric character")
    .required("Password is required")
    .trim(),
});
