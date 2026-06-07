import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const Section = styled.div`
  background-color: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.card.shadow};
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    padding: 1.125rem 1rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const SectionTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $active, theme }) =>
    $active
      ? `
    background-color: ${theme.status.success.bg};
    color: ${theme.status.success.text};
    border: 1px solid ${theme.status.success.border};
  `
      : `
    background-color: ${theme.status.default.bg};
    color: ${theme.status.default.text};
    border: 1px solid ${theme.status.default.border};
  `}

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

export const ImpactNote = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.secondary};
  border-left: 2px solid #f59e0b;
  padding-left: 0.625rem;
  margin: 0;
  line-height: 1.5;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
`;

export const HelpIconWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const HelpIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.muted};
  border-radius: 50%;
  line-height: 0;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.brand.primary};
    outline-offset: 2px;
  }
`;

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 300px;
  background: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  padding: 0.875rem 1rem;
  z-index: 50;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text.secondary};

  p {
    margin: 0 0 0.25rem 0;
  }

  ul {
    margin: 0.25rem 0 0 1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  code {
    font-family: 'Consolas', 'Fira Mono', monospace;
    font-size: 0.75rem;
    background: ${({ theme }) => theme.bg.tertiary};
    border-radius: 3px;
    padding: 1px 5px;
  }

  /* Seta apontando para o ícone */
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 8px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.card.bg};
    border-left: 1px solid ${({ theme }) => theme.border.default};
    border-top: 1px solid ${({ theme }) => theme.border.default};
    transform: rotate(45deg);
  }

  @media (max-width: 480px) {
    width: 260px;
  }
`;

export const PopoverTitle = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 0.25rem 0 !important;
  font-size: 0.8125rem;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border.default)};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.card.bg};
  font-family: 'Consolas', 'Fira Mono', monospace;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#14b8a6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) =>
      $hasError ? 'rgba(239,68,68,0.1)' : 'rgba(20,184,166,0.1)'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.bg.tertiary};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
    font-family: inherit;
  }
`;

export const HelpText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const FormatWarning = styled.p`
  font-size: 0.8125rem;
  color: #b45309;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

export const SaveStatus = styled.div<{ $variant: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $variant }) => ($variant === 'success' ? '#059669' : '#dc2626')};
`;

export const UnsavedBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #b45309;
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  background-color: ${({ theme }) => theme.brand.primary};
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  min-width: 140px;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.hover};
    box-shadow: 0 2px 6px rgba(20, 184, 166, 0.25);
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.active};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg.spin {
    animation: ${spin} 1s linear infinite;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
