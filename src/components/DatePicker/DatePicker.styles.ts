import styled, { css } from "styled-components";
import type { DatePickerSizes } from "./DatePicker.types";

export const DatePickerWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const TriggerContainer = styled.div<{
  $size: DatePickerSizes;
  $error?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  user-select: none;
  min-width: 200px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  ${({ $size, theme }) => {
    const styles: Record<DatePickerSizes, ReturnType<typeof css>> = {
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

    return styles[$size];
  }}

  ${({ theme }) => {
    if (theme.brutalism) {
      return css`
        border: ${theme.brutalism.borderWidth} solid
          ${theme.colors.neutral[900]};
        background-color: ${theme.colors.neutral[0]};
        box-shadow: 3px 3px 0 ${theme.colors.neutral[900]};
      `;
    }

    return css`
      border: 1px solid ${theme.colors.neutral[400]};
      background-color: ${theme.colors.neutral[0]};
    `;
  }}

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.error[500]};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const TriggerText = styled.span<{ $hasValue: boolean }>`
  flex: 1;
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.neutral[900] : theme.colors.neutral[400]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.neutral[500]};
  flex-shrink: 0;
`;

export const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]};
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[500]};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;

export const CalendarPopover = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing[3]};
  min-width: 280px;

  ${({ theme }) => {
    if (theme.brutalism) {
      return css`
        border: ${theme.brutalism.borderWidth} solid
          ${theme.colors.neutral[900]};
        box-shadow: ${theme.brutalism.shadowOffset}
          ${theme.brutalism.shadowOffset} 0 ${theme.colors.neutral[900]};
      `;
    }

    return css`
      border: 1px solid ${theme.colors.neutral[200]};
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    `;
  }}
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral[600]};
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  ${({ theme }) =>
    theme.brutalism &&
    css`
      border: ${theme.brutalism.borderWidth} solid ${theme.colors.neutral[900]};
      &:hover {
        background-color: ${theme.colors.neutral[100]};
        transform: translate(1px, 1px);
      }
    `}
`;

export const MonthYear = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const DayHeader = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[500]};
  padding: ${({ theme }) => theme.spacing[1]};
  margin-bottom: 2px;
`;

export const DayCell = styled.button<{
  $currentMonth: boolean;
  $selected: boolean;
  $today: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[1]};
  font-weight: ${({ $today, $selected }) =>
    $today || $selected ? "600" : "400"};
  pointer-events: ${({ $currentMonth }) => ($currentMonth ? "auto" : "none")};

  color: ${({ $currentMonth, $selected, $today, theme }) => {
    if (!$currentMonth) return theme.colors.neutral[300];
    if ($selected) return theme.colors.primary.contrast;
    if ($today) return theme.colors.primary[500];

    return theme.colors.neutral[900];
  }};

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary[500] : "transparent"};

  &:hover:not(:disabled) {
    background-color: ${({ $selected, theme }) =>
      $selected ? theme.colors.primary[700] : theme.colors.neutral[100]};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 1px;
  }

  ${({ $selected, $today, theme }) =>
    theme.brutalism &&
    ($selected || $today) &&
    css`
      border: ${theme.brutalism!.borderWidth} solid ${theme.colors.neutral[900]};
      ${$selected &&
      css`
        box-shadow: 2px 2px 0 ${theme.colors.neutral[900]};
      `}
    `}
`;
