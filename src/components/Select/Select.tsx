import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Wrapper,
  SelectWrapper,
  StyledSelect,
  Chevron,
  ClearButton,
  HelperText,
} from "./Select.styles";
import type { SelectProps } from "./Select.types";

export function Select({
  options,
  placeholder,
  size = "md",
  variant = "default",
  error,
  fullWidth,
  clearable,
  onClear,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorMessage = typeof error === "string" ? error : undefined;

  const [internalValue, setInternalValue] = useState(
    (defaultValue as string) ?? "",
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const showClear = clearable && !!currentValue;

  return (
    <Wrapper $fullWidth={fullWidth}>
      <SelectWrapper>
        <StyledSelect
          id={selectId}
          $size={size}
          $variant={variant}
          $error={!!error}
          aria-invalid={!!error}
          aria-describedby={errorMessage ? hintId : undefined}
          value={currentValue}
          onChange={handleChange}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
        {showClear ? (
          <ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <X size={14} />
          </ClearButton>
        ) : (
          <Chevron aria-hidden="true">
            <ChevronDown size={14} />
          </Chevron>
        )}
      </SelectWrapper>
      {errorMessage && (
        <HelperText id={hintId} $error>
          {errorMessage}
        </HelperText>
      )}
    </Wrapper>
  );
}

Select.displayName = "Select";
