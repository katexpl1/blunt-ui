import styled, { css } from "styled-components";
import type { TableSizes } from "../Table/Table.types";
import {
  TableWrapper,
  StyledTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../Table/Table.styles";

export { TableWrapper, Thead, Tbody, Tr, Th };

export const StyledDataTable = styled(StyledTable)`
  table-layout: fixed;
`;

export const EditableTd = styled(Td)<{ $editable?: boolean }>`
  ${({ $editable, theme }) =>
    $editable &&
    css`
      cursor: pointer;
      position: relative;

      &:hover {
        background-color: ${theme.brutalism
          ? theme.colors.neutral[100]
          : theme.colors.primary[50]};
      }
    `}
`;

export const CellInput = styled.input<{ $size: TableSizes }>`
  display: block;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: inherit;
  padding: 0;
  margin: 0;

  ${({ theme }) =>
    theme.brutalism
      ? css`
          &:focus {
            outline: 2px solid ${theme.colors.neutral[900]};
            outline-offset: 1px;
          }
        `
      : css`
          &:focus {
            box-shadow: ${theme.shadows.focusRing};
          }
        `}
`;

export const ActionsTh = styled(Th)`
  width: 40px;
`;

export const ActionsTd = styled(Td)`
  width: 40px;
  text-align: center;
  padding-left: 0;
  padding-right: 0;
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.neutral[500]};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color 0.1s;

  &:hover {
    color: ${({ theme }) => theme.colors.error[500]};

    ${({ theme }) =>
      theme.brutalism &&
      css`
        background-color: ${theme.colors.error[50]};
      `}
  }
`;

export const AddRowRow = styled.tr`
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

export const AddRowButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[600]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  width: 100%;
  text-align: left;

  &:hover {
    color: ${({ theme }) =>
      theme.brutalism ? theme.colors.neutral[900] : theme.colors.primary[500]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
