import styled from "styled-components";

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
  margin-left: ${({ theme }) => theme.spacing[0.5]};
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $error, theme }) =>
    $error ? theme.colors.error[500] : theme.colors.neutral[500]};
`;
