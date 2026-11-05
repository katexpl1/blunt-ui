import styled, { css } from "styled-components";
import type { SwitchSize } from "./Switch.types";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const SwitchLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;

  &:focus-visible + div {
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const SwitchTrack = styled.div<{
  $checked?: boolean;
  $size?: SwitchSize;
  $color?: string;
  $borderColor?: string;
}>`
  position: relative;
  flex-shrink: 0;
  border-radius: 9999px;
  border: ${({ theme }) => theme.brutalism?.borderWidth ?? "2px"} solid
    ${({ $borderColor, theme }) => $borderColor ?? theme.colors.neutral[900]};
  background-color: ${({ $checked, $color, theme }) =>
    $checked
      ? ($color ?? theme.colors.primary[500])
      : theme.colors.neutral[200]};
  transition:
    background-color 0.15s,
    box-shadow 0.15s;

  ${({ $checked, theme }) =>
    $checked &&
    css`
      box-shadow: ${theme.brutalism?.shadowOffset ?? "4px"}
        ${theme.brutalism?.shadowOffset ?? "4px"} 0 ${theme.colors.neutral[900]};
    `}

  ${({ $size = "md" }) => {
    const sizes: Record<SwitchSize, ReturnType<typeof css>> = {
      sm: css`
        width: 36px;
        height: 20px;
      `,
      md: css`
        width: 44px;
        height: 24px;
      `,
    };

    return sizes[$size];
  }}

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[900]};
    transition: transform 0.15s;

    ${({ $size = "md", $checked }) => {
      const smThumb = css`
        width: 12px;
        height: 12px;
        margin-top: -6px;
        transform: translateX(${$checked ? "calc(100% + 4px)" : "2px"});
      `;
      const mdThumb = css`
        width: 16px;
        height: 16px;
        margin-top: -8px;
        transform: translateX(${$checked ? "calc(100% + 4px)" : "2px"});
      `;

      return $size === "sm" ? smThumb : mdThumb;
    }}
  }
`;

export const LabelText = styled.span<{ $size?: SwitchSize }>`
  font-size: ${({ $size = "md", theme }) =>
    $size === "sm" ? theme.fontSizes.sm : theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
