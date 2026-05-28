import { useCallback, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import type { UseFormOptions, UseFormReturn } from "./useForm.types";

export function useForm<T extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
  onError,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [allErrors, setAllErrors] = useState<Partial<Record<keyof T, string>>>(
    {},
  );
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valuesRef = useRef(values);

  // eslint-disable-next-line react-hooks/refs
  valuesRef.current = values;

  const runValidate = useCallback(
    (v: T) => {
      if (!validate) {
        return {};
      }

      const raw = validate(v);

      return Object.fromEntries(
        Object.entries(raw).filter(([, msg]) => msg !== undefined),
      ) as Partial<Record<keyof T, string>>;
    },
    [validate],
  );

  const touchedRef = useRef(touched);

  // eslint-disable-next-line react-hooks/refs
  touchedRef.current = touched;

  const handleChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;

      if (process.env.NODE_ENV !== "production" && !name) {
        console.warn(
          "[useForm] handleChange: field is missing a `name` attribute — value will not be tracked.",
        );
      }

      const newValues = { ...valuesRef.current, [name]: value };

      setValues(newValues);
      if (touchedRef.current[name as keyof T]) {
        setAllErrors(runValidate(newValues));
      }
    },
    [runValidate],
  );

  const handleBlur = useCallback(
    (
      e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const { name } = e.target;

      if (process.env.NODE_ENV !== "production" && !name) {
        console.warn(
          "[useForm] handleBlur: field is missing a `name` attribute — touched state will not be tracked.",
        );
      }

      setTouched((prev) => ({ ...prev, [name]: true }));
      setAllErrors(runValidate(valuesRef.current));
    },
    [runValidate],
  );

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();

      const allTouched = Object.keys(valuesRef.current).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>,
      );

      setTouched(allTouched);

      const errs = runValidate(valuesRef.current);

      setAllErrors(errs);

      if (Object.keys(errs).length > 0) {
        onError?.(errs);

        return;
      }

      const run = async () => {
        setIsSubmitting(true);
        try {
          await onSubmit?.(valuesRef.current);
        } finally {
          setIsSubmitting(false);
        }
      };

      run();
    },
    [runValidate, onSubmit, onError],
  );

  const setFieldValue = useCallback((field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(
    (newValues?: T) => {
      setValues(newValues ?? initialValues);
      setAllErrors({});
      setTouched({});
      setIsSubmitting(false);
    },
    [initialValues],
  );

  const errors = Object.fromEntries(
    Object.entries(allErrors).filter(([key]) => touched[key as keyof T]),
  ) as Partial<Record<keyof T, string>>;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    reset,
    isSubmitting,
  };
}
