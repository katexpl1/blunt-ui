import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Wrapper,
  Label,
  HelperText,
  InputContainer,
  StyledInput,
  Slot,
  SlotButton,
} from "./Input.styles";
import type { InputProps } from "./Input.types";

export function Input({
  ref,
  type = "text",
  size = "md",
  variant = "default",
  label,
  helperText,
  error,
  leftElement,
  rightElement,
  clearable,
  onClear,
  fullWidth,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const errorMessage = typeof error === "string" ? error : undefined;
  const hasHint = !!(helperText || error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }

    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }

    onClear?.();
  };

  return (
    <Wrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <InputContainer $size={size} $variant={variant} $error={!!error}>
        {leftElement && <Slot>{leftElement}</Slot>}

        <StyledInput
          id={inputId}
          ref={ref}
          type={type}
          value={currentValue}
          onChange={handleChange}
          {...props}
          aria-invalid={!!error}
          aria-describedby={hasHint ? hintId : undefined}
        />

        {clearable && currentValue && (
          <SlotButton
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
          >
            ✕
          </SlotButton>
        )}

        {rightElement && <Slot>{rightElement}</Slot>}
      </InputContainer>

      {hasHint && (
        <HelperText id={hintId} $error={!!error}>
          {errorMessage ?? helperText}
        </HelperText>
      )}
    </Wrapper>
  );
}

Input.displayName = "Input";
