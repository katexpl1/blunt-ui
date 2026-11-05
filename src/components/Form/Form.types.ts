import type {
  ChangeEvent,
  ComponentPropsWithRef,
  FocusEvent,
  FormEvent,
} from "react";

export interface FormProps extends Omit<
  ComponentPropsWithRef<"form">,
  "onSubmit"
> {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

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
  reset: (newValues?: T) => void;
  isSubmitting: boolean;
}
