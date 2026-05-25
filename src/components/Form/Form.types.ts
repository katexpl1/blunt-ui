import type { ComponentPropsWithRef, FormEvent, ReactNode } from "react";

export interface FormProps extends Omit<
  ComponentPropsWithRef<"form">,
  "onSubmit"
> {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export interface FormFieldProps {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}
