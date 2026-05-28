import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Wrapper,
  Label,
  HelperText,
  TextareaContainer,
  StyledTextarea,
} from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

export function Textarea({
  ref,
  size = "md",
  variant = "default",
  label,
  helperText,
  error,
  fullWidth,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const errorMessage = typeof error === "string" ? error : undefined;
  const hasHint = !!(helperText || error);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }

    onChange?.(e);
  };

  return (
    <Wrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={textareaId}>{label}</Label>}

      <TextareaContainer $size={size} $variant={variant} $error={!!error}>
        <StyledTextarea
          id={textareaId}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          {...props}
          aria-invalid={!!error}
          aria-describedby={hasHint ? hintId : undefined}
        />
      </TextareaContainer>

      {hasHint && (
        <HelperText id={hintId} $error={!!error}>
          {errorMessage ?? helperText}
        </HelperText>
      )}
    </Wrapper>
  );
}

Textarea.displayName = "Textarea";
