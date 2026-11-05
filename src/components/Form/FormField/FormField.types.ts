import type { ReactNode } from "react";

export interface FormFieldProps {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}
