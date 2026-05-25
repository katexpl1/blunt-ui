import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutral[100]};
  padding: 24px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${({ theme }) => theme.colors.neutral[0]};
  border: 2px solid ${({ theme }) => theme.colors.neutral[900]};
  box-shadow: 8px 8px 0 ${({ theme }) => theme.colors.neutral[900]};
`;

export const CardAccent = styled.div`
  background: ${({ theme }) => theme.colors.primary[500]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[900]};
  padding: 10px 32px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary.contrast};
`;

export const CardBody = styled.div`
  padding: 40px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral[500]};
  line-height: 1.5;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Credit = styled.p`
  margin: 0;
  padding-top: 16px;
  border-top: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  font-size: 0.8rem;
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
  gap: 10px;
`;

export const ColorPickerLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral[500]};
  cursor: pointer;
`;

export const ColorInput = styled.input`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ theme }) => theme.colors.neutral[900]};
  box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.neutral[900]};
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
