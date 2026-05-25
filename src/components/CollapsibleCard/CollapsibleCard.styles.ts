import styled, { css } from "styled-components";

export const CardWrapper = styled.div<{ $accentColor?: string }>`
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.neutral[0]};
  overflow: hidden;

  ${({ theme, $accentColor }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid
            ${$accentColor ?? theme.colors.neutral[900]};
          box-shadow: ${theme.brutalism.shadowOffset}
            ${theme.brutalism.shadowOffset} 0
            ${$accentColor ?? theme.colors.neutral[900]};
        `
      : css`
          border: 1px solid ${$accentColor ?? theme.colors.neutral[200]};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        `}
`;

export const CardHeader = styled.button<{
  $open: boolean;
  $accentColor?: string;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) =>
    theme.brutalism ? theme.colors.neutral[100] : theme.colors.neutral[0]};
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $accentColor }) => $accentColor ?? theme.colors.primary[500]};
    outline-offset: -2px;
  }
`;

export const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Subtitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const ChevronWrapper = styled.span<{
  $open: boolean;
  $accentColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  color: ${({ theme, $accentColor }) =>
    $accentColor ?? theme.colors.neutral[500]};
`;

export const ContentWrapper = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.2s ease;
`;

export const ContentInner = styled.div`
  overflow: hidden;
`;

export const ContentBody = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;
