import { useId } from "react";
import {
  Wrapper,
  RadioLabel,
  HiddenInput,
  RadioCircle,
  LabelText,
  HelperText,
} from "./Radio.styles";
import type { RadioProps } from "./Radio.types";

export function Radio({
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
  ...props
}: RadioProps) {
  const generatedId = useId();
  const radioId = id ?? generatedId;

  const hasHint = !!(helperText || error);

  return (
    <Wrapper>
      <RadioLabel htmlFor={radioId} $disabled={disabled}>
        <HiddenInput
          id={radioId}
          ref={ref}
          type="radio"
          checked={checked}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        <RadioCircle
          $checked={checked}
          $error={error}
          $disabled={disabled}
          $size={size}
          $color={color}
          $borderColor={borderColor}
        />
        {label && <LabelText $size={size}>{label}</LabelText>}
      </RadioLabel>

      {hasHint && <HelperText $error={error}>{helperText}</HelperText>}
    </Wrapper>
  );
}

Radio.displayName = "Radio";
