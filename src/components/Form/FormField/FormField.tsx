import React, { useId } from "react";
import {
  FieldWrapper,
  FieldLabel,
  Required,
  HelperText,
} from "./FormField.styles";
import type { FormFieldProps } from "./FormField.types";

export function FormField({
  label,
  error,
  helperText,
  required,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const hintId = `${generatedId}-hint`;
  const hasHint = !!(error || helperText);
  const errorMessage = typeof error === "string" ? error : undefined;

  const child = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<Record<string, unknown>>,
        {
          id: generatedId,
          ...(hasHint && { "aria-describedby": hintId }),
          ...(error && { "aria-invalid": true }),
        },
      )
    : children;

  return (
    <FieldWrapper>
      {label && (
        <FieldLabel htmlFor={generatedId}>
          {label}
          {required && <Required aria-hidden="true"> *</Required>}
        </FieldLabel>
      )}
      {child}
      {hasHint && (
        <HelperText id={hintId} $error={!!error}>
          {errorMessage ?? helperText}
        </HelperText>
      )}
    </FieldWrapper>
  );
}

FormField.displayName = "FormField";
