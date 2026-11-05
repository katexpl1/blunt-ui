import { useId } from "react";
import {
  Wrapper,
  CheckboxLabel,
  HiddenInput,
  CheckboxBox,
  LabelText,
  HelperText,
} from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";

export function Checkbox({
  ref,
  label,
  size = "md",
  error,
  helperText,
  disabled,
  checked,
  id,
  color,
  borderColor,
  checkColor,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const errorMessage = typeof error === "string" ? error : undefined;
  const hasHint = !!(helperText || error);

  return (
    <Wrapper>
      <CheckboxLabel htmlFor={checkboxId} $disabled={disabled}>
        <HiddenInput
          id={checkboxId}
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        <CheckboxBox
          $checked={checked}
          $error={!!error}
          $disabled={disabled}
          $size={size}
          $color={color}
          $borderColor={borderColor}
          $checkColor={checkColor}
        />
        {label && <LabelText $size={size}>{label}</LabelText>}
      </CheckboxLabel>

      {hasHint && (
        <HelperText $error={!!error}>{errorMessage ?? helperText}</HelperText>
      )}
    </Wrapper>
  );
}

Checkbox.displayName = "Checkbox";
