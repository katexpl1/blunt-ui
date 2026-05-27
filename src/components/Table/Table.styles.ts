import styled, { css, keyframes } from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { TableSizes } from "./Table.types";

const cellPadding = ($size: TableSizes, theme: DefaultTheme) => {
  if ($size === "sm") {
    return `${theme.spacing[1]} ${theme.spacing[2]}`;
  }
  if ($size === "lg") {
    return `${theme.spacing[3]} ${theme.spacing[4]}`;
  }

  return `${theme.spacing[2]} ${theme.spacing[3]}`;
};

export const TableWrapper = styled.div<{
  $borderColor?: string;
  $stickyHeader?: boolean;
}>`
  width: 100%;

  ${({ theme, $borderColor }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid
            ${$borderColor ?? theme.colors.neutral[900]};
          box-shadow: ${theme.brutalism.shadowOffset}
            ${theme.brutalism.shadowOffset} 0
            ${$borderColor ?? theme.colors.neutral[900]};
        `
      : css`
          border: 1px solid ${$borderColor ?? theme.colors.neutral[300]};
          border-radius: ${theme.radius.md};
          overflow: hidden;
        `}

  overflow-x: auto;
  ${({ $stickyHeader }) =>
    $stickyHeader &&
    css`
      overflow-y: auto;
    `}
`;

export const StyledTable = styled.table<{ $size: TableSizes }>`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ $size, theme }) => {
    const map: Record<TableSizes, string> = {
      sm: theme.fontSizes.sm,
      md: theme.fontSizes.md,
      lg: theme.fontSizes.lg,
    };

    return map[$size];
  }};

  caption {
    padding: 8px 0;
  }
`;

export const Thead = styled.thead<{
  $headerColor?: string;
  $borderColor?: string;
  $stickyHeader?: boolean;
}>`
  ${({ $stickyHeader }) =>
    $stickyHeader &&
    css`
      position: sticky;
      top: 0;
      z-index: 1;
    `}

  ${({ theme, $headerColor, $borderColor }) =>
    $headerColor
      ? css`
          --th-bg: ${$headerColor};
          --th-text: ${theme.colors.neutral[0]};
          --th-sep: rgba(255, 255, 255, 0.25);
        `
      : theme.brutalism
        ? css`
            --th-bg: ${theme.colors.neutral[900]};
            --th-text: ${theme.colors.neutral[0]};
            --th-sep: ${$borderColor ?? theme.colors.neutral[600]};
          `
        : css`
            --th-bg: ${theme.colors.neutral[100]};
            --th-text: ${theme.colors.neutral[600]};
            --th-sep: ${$borderColor ?? theme.colors.neutral[300]};
          `}
`;

export const Tbody = styled.tbody<{
  $striped?: boolean;
  $rowColor?: string;
  $stripeColor?: string;
}>`
  ${({ $rowColor }) =>
    $rowColor &&
    css`
      tr {
        background-color: ${$rowColor};
      }
    `}

  ${({ $striped, theme, $stripeColor }) =>
    $striped &&
    css`
      tr:nth-child(even) {
        background-color: ${$stripeColor ?? theme.colors.neutral[100]};
      }
    `}

  tr:last-child td {
    border-bottom: none;
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th<{ $size: TableSizes; $bordered?: boolean }>`
  background-color: var(--th-bg);
  color: var(--th-text);
  text-align: left;
  font-weight: 700;
  white-space: nowrap;

  padding: ${({ $size, theme }) => cellPadding($size, theme)};

  ${({ theme, $bordered }) =>
    theme.brutalism
      ? css`
          border-right: 1px solid var(--th-sep);
          &:last-child {
            border-right: none;
          }
        `
      : css`
          border-bottom: 2px solid var(--th-sep);
          ${$bordered &&
          css`
            border-right: 1px solid var(--th-sep);
            &:last-child {
              border-right: none;
            }
          `}
        `}
`;

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  font-weight: 700;
  padding: 0;
  width: 100%;
  text-align: left;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const SortIcon = styled.span`
  opacity: 0.5;
  display: inline-flex;
  align-items: center;
`;

export const Td = styled.td<{
  $size: TableSizes;
  $bordered?: boolean;
  $borderColor?: string;
}>`
  padding: ${({ $size, theme }) => cellPadding($size, theme)};

  ${({ $bordered, $borderColor, theme }) =>
    theme.brutalism
      ? css`
          border-bottom: ${theme.brutalism.borderWidth} solid
            ${$borderColor ?? theme.colors.neutral[900]};
          ${$bordered &&
          css`
            border-right: ${theme.brutalism.borderWidth} solid
              ${$borderColor ?? theme.colors.neutral[900]};
            &:last-child {
              border-right: none;
            }
          `}
        `
      : $bordered
        ? css`
            border: 1px solid ${$borderColor ?? theme.colors.neutral[300]};
          `
        : css`
            border-bottom: 1px solid
              ${$borderColor ?? theme.colors.neutral[200]};
          `}
`;

export const EmptyCell = styled.td`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[400]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-bottom: none;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonCell = styled(Td)``;

export const SkeletonLine = styled.div`
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral[200]} 25%,
    ${({ theme }) => theme.colors.neutral[100]} 50%,
    ${({ theme }) => theme.colors.neutral[200]} 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;

export const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};

  ${({ theme }) =>
    theme.brutalism
      ? css`
          border-top: ${theme.brutalism.borderWidth} solid
            ${theme.colors.neutral[900]};
        `
      : css`
          border-top: 1px solid ${theme.colors.neutral[200]};
        `}
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  ${({ $active, theme }) =>
    theme.brutalism
      ? css`
          border: ${theme.brutalism.borderWidth} solid
            ${theme.colors.neutral[900]};
          background: ${$active ? theme.colors.neutral[900] : "transparent"};
          color: ${$active
            ? theme.colors.neutral[0]
            : theme.colors.neutral[900]};
          box-shadow: ${$active
            ? "none"
            : `2px 2px 0 ${theme.colors.neutral[900]}`};

          &:hover:not(:disabled) {
            background: ${$active
              ? theme.colors.neutral[600]
              : theme.colors.neutral[100]};
          }
        `
      : css`
          border: 1px solid
            ${$active ? theme.colors.primary[500] : "transparent"};
          border-radius: ${theme.radius.md};
          background: ${$active ? theme.colors.primary[500] : "transparent"};
          color: ${$active
            ? theme.colors.neutral[0]
            : theme.colors.neutral[600]};

          &:hover:not(:disabled) {
            background: ${$active
              ? theme.colors.primary[700]
              : theme.colors.neutral[100]};
            border-color: ${$active
              ? theme.colors.primary[700]
              : theme.colors.neutral[200]};
          }
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
