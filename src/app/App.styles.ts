import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutral[100]};
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${({ theme }) => theme.colors.neutral[0]};
  border: ${({ theme }) => theme.brutalism?.borderWidth} solid
    ${({ theme }) => theme.colors.neutral[900]};
  box-shadow: ${({ theme }) => theme.spacing[2]}
    ${({ theme }) => theme.spacing[2]} 0
    ${({ theme }) => theme.colors.neutral[900]};
`;

export const CardAccent = styled.div`
  background: ${({ theme }) => theme.colors.primary[500]};
  border-bottom: ${({ theme }) => theme.brutalism?.borderWidth} solid
    ${({ theme }) => theme.colors.neutral[900]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[8]}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary.contrast};
`;

export const CardBody = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing[10]} ${theme.spacing[8]} ${theme.spacing[8]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 3.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.neutral[500]};
  line-height: 1.5;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`;

export const Credit = styled.p`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: ${({ theme }) => theme.brutalism?.borderWidth} solid
    ${({ theme }) => theme.colors.neutral[200]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.neutral[400]};

  a {
    color: inherit;
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.colors.neutral[900]};
    }
  }
`;

export const ColorPickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ColorPickerLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[500]};
  cursor: pointer;
`;

export const ColorInput = styled.input`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.brutalism?.borderWidth} solid
    ${({ theme }) => theme.colors.neutral[900]};
  box-shadow: ${({ theme }) => theme.spacing[0.5]}
    ${({ theme }) => theme.spacing[0.5]} 0
    ${({ theme }) => theme.colors.neutral[900]};
  cursor: pointer;
  padding: 0;
  background: none;
  overflow: hidden;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
`;
