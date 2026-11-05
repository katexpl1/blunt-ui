import styled, { css } from "styled-components";
import type { SelectSize, SelectVariant } from "./Select.types";

export const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  position: relative;
  min-width: 0;
`;

/* Renders all option labels as invisible zero-height text so the wrapper
   stays as wide as the widest option regardless of which is selected. */
export const WidthSetter = styled.div`
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  flex-direction: column;
`;

export const Trigger = styled.button<{
  $size: SelectSize;
  $variant: SelectVariant;
  $error?: boolean;
  $disabled?: boolean;
  $open?: boolean;
}>`
  appearance: none;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  font: inherit;
  color: ${({ theme }) => theme.colors.neutral[900]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  text-align: left;
  background: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ $size, theme }) => {
    const sizes: Record<SelectSize, ReturnType<typeof css>> = {
      sm: css`
        padding: ${theme.spacing[1]} ${theme.spacing[2]};
        font-size: ${theme.fontSizes.sm};
      `,
      md: css`
        padding: ${theme.spacing[2]} ${theme.spacing[3]};
        font-size: ${theme.fontSizes.md};
      `,
      lg: css`
        padding: ${theme.spacing[3]} ${theme.spacing[4]};
        font-size: ${theme.fontSizes.lg};
      `,
    };
    return sizes[$size];
  }}

  ${({ $variant, theme }) => {
    if (theme.brutalism) {
      return css`
        border: ${theme.brutalism.borderWidth} solid
          ${theme.colors.neutral[900]};
        background-color: ${theme.colors.neutral[0]};
        box-shadow: 3px 3px 0 ${theme.colors.neutral[900]};
      `;
    }

    const variants: Record<SelectVariant, ReturnType<typeof css>> = {
      default: css`
        border: 1px solid ${theme.colors.neutral[400]};
        background-color: ${theme.colors.neutral[0]};
      `,
      outlined: css`
        border: 2px solid ${theme.colors.primary[500]};
        background-color: ${theme.colors.neutral[0]};
      `,
    };
    return variants[$variant];
  }}

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.error[500]};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
    `}

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const TriggerText = styled.span<{ $placeholder?: boolean }>`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ $placeholder, theme }) =>
    $placeholder ? theme.colors.neutral[400] : theme.colors.neutral[900]};
`;

export const TriggerIcons = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const ChevronIcon = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  transition: transform 0.15s;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

/* Position is set via inline style from portal (position: fixed + coords).
   This component only handles visual appearance. */
export const DropdownPanel = styled.ul`
  z-index: ${({ theme }) => theme.zIndex.modal};
  margin: 0;
  padding: ${({ theme }) => theme.spacing[1]} 0;
  list-style: none;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  max-height: 240px;
  overflow-y: auto;

  ${({ theme }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid
            ${theme.colors.neutral[900]};
          box-shadow: ${theme.brutalism.shadowOffset}
            ${theme.brutalism.shadowOffset} 0 ${theme.colors.neutral[900]};
        `
      : css`
          border: 1px solid ${theme.colors.neutral[300]};
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        `}
`;

export const SearchWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[900]};
  background: ${({ theme }) => theme.colors.neutral[0]};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  ${({ theme }) =>
    theme.brutalism &&
    css`
      border: ${theme.brutalism.borderWidth} solid ${theme.colors.neutral[900]};
      &:focus {
        box-shadow: ${theme.shadows.focusRing};
      }
    `}
`;

export const NoOptions = styled.li`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[400]};
  list-style: none;
`;

export const OptionItem = styled.li<{
  $selected?: boolean;
  $focused?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.neutral[400] : theme.colors.neutral[900]};

  background-color: ${({ $selected, $focused, theme }) => {
    if ($selected) {
      return theme.colors.primary[50];
    }
    if ($focused) {
      return theme.colors.neutral[100];
    }
    return "transparent";
  }};

  font-weight: ${({ $selected, theme }) =>
    $selected ? theme.fontWeights.semibold : theme.fontWeights.normal};

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-left: ${theme.spacing[1]} solid ${theme.colors.primary[500]};
      padding-left: ${theme.spacing[2]};
    `}

  &:hover {
    background-color: ${({ $disabled, $selected, theme }) => {
      if ($disabled) {
        return "transparent";
      }
      if ($selected) {
        return theme.colors.primary[50];
      }
      return theme.colors.neutral[100];
    }};
  }
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;

export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[500]};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
