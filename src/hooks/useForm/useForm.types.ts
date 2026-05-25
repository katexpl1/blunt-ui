import type { ChangeEvent, FocusEvent, FormEvent } from "react";

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface UseFormOptions<T extends Record<string, string>> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string | undefined>>;
  onSubmit?: (values: T) => void | Promise<void>;
  onError?: (errors: Partial<Record<keyof T, string>>) => void;
}

export interface UseFormReturn<T extends Record<string, string>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (e: ChangeEvent<FieldElement>) => void;
  handleBlur: (e: FocusEvent<FieldElement>) => void;
  handleSubmit: (e?: FormEvent) => void;
  setFieldValue: (field: keyof T, value: string) => void;
  reset: () => void;
  isSubmitting: boolean;
}
