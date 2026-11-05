import { useId } from "react";
import {
  Wrapper,
  SwitchLabel,
  HiddenInput,
  SwitchTrack,
  LabelText,
} from "./Switch.styles";
import type { SwitchProps } from "./Switch.types";

export function Switch({
  ref,
  label,
  size = "md",
  disabled,
  checked,
  id,
  color,
  borderColor,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <Wrapper>
      <SwitchLabel htmlFor={switchId} $disabled={disabled}>
        <HiddenInput
          id={switchId}
          ref={ref}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <SwitchTrack
          $checked={checked}
          $size={size}
          $color={color}
          $borderColor={borderColor}
        />
        {label && <LabelText $size={size}>{label}</LabelText>}
      </SwitchLabel>
    </Wrapper>
  );
}

Switch.displayName = "Switch";
