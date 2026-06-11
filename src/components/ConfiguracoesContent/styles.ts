import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const ContentArea = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
  background-color: ${({ theme }) => theme.bg.secondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1.25rem;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

export const FormatNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text.secondary};
  background-color: ${({ theme }) => theme.brand.tint};
  border: 1px solid rgba(20, 184, 166, 0.25);

  svg { flex-shrink: 0; margin-top: 1px; color: ${({ theme }) => theme.brand.primary}; }

  code {
    font-family: 'Consolas', 'Fira Mono', monospace;
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 3px;
    padding: 1px 4px;
  }
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
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.125rem 1rem;
    height: auto;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 0.125rem 0;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.875rem;
  margin-bottom: 0.125rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
`;

export const SectionTitlePlain = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const ToggleWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
`;

export const ToggleText = styled.span`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  white-space: nowrap;
`;

export const Switch = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 999px;
  border: none;
  padding: 0;
  flex-shrink: 0;
  cursor: pointer;
  background-color: ${({ $checked, theme }) => ($checked ? theme.brand.primary : theme.border.default)};
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $checked }) => ($checked ? '20px' : '2px')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: left 0.2s;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const InlineLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ImpactNote = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.secondary};
  border-left: 2px solid #f59e0b;
  padding-left: 0.625rem;
  margin: 0;
  line-height: 1.4;
`;

export const HelpText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border.default)};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.card.bg};
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

  &::placeholder { color: ${({ theme }) => theme.text.placeholder}; }
`;

export const InputSmall = styled(Input)`
  width: 80px;
  text-align: center;
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border.default)};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.card.bg};
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  min-height: 80px;
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

  &::placeholder { color: ${({ theme }) => theme.text.placeholder}; }
`;

export const CharCounter = styled.span<{ $isNearLimit?: boolean }>`
  font-size: 0.8125rem;
  color: ${({ $isNearLimit, theme }) => ($isNearLimit ? '#f59e0b' : theme.text.muted)};
  font-weight: ${({ $isNearLimit }) => ($isNearLimit ? '500' : '400')};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ErrorMessage = styled.span`
  font-size: 0.8125rem;
  color: #ef4444;
`;

export const FollowupGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.25rem 2rem;
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const DaysRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DaysUnit = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  white-space: nowrap;
`;

export const FormFooter = styled.div`
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
  padding: 0.75rem 1.75rem;
  background-color: ${({ theme }) => theme.brand.primary};
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  min-width: 180px;

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
