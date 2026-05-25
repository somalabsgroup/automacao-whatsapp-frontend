import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 4rem);
  overflow: hidden;

  @media (max-width: 768px) {
    max-height: 100vh;
  }
`;

export const FormHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1rem;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  margin-bottom: 0.75rem;
  background-color: transparent;
  border: none;
  color: #9ca3af;
  font-size: 0.8125rem;
  font-weight: 400;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: #6b7280;
  }

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: translateX(-1px);
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

export const FormSubtitle = styled.p`
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
  
  span {
    color: #ef4444;
    font-weight: 500;
  }
`;

export const FormContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Required = styled.span`
  color: #ef4444;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#14b8a6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 184, 166, 0.1)')};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#14b8a6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 184, 166, 0.1)')};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const SelectWithPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ColorPreview = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background-color: ${({ $color }) => $color};
  border: 2px solid #e5e7eb;
  flex-shrink: 0;
  transition: transform 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.1);
  }
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.625rem 0.75rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#14b8a6')};
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 184, 166, 0.1)')};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.8125rem;
  color: #ef4444;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const HelpText = styled.span`
  font-size: 0.8125rem;
  color: #6b7280;
`;

export const CharCounter = styled.span<{ $isNearLimit?: boolean }>`
  font-size: 0.8125rem;
  color: ${({ $isNearLimit }) => ($isNearLimit ? '#f59e0b' : '#6b7280')};
  font-weight: ${({ $isNearLimit }) => ($isNearLimit ? '500' : '400')};
  margin-left: auto;
`;

export const StickyFooter = styled.div`
  flex-shrink: 0;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? `
    background-color: #14b8a6;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #0f9688;
      box-shadow: 0 2px 4px rgba(20, 184, 166, 0.2);
    }

    &:active:not(:disabled) {
      background-color: #0d7a6f;
    }
  `
      : `
    background-color: #ffffff;
    color: #374151;
    border: 1px solid #e5e7eb;

    &:hover:not(:disabled) {
      background-color: #f9fafb;
      border-color: #d1d5db;
    }

    &:active:not(:disabled) {
      background-color: #f3f4f6;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg.animate-spin {
    animation: ${spin} 1s linear infinite;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const WorkingHoursSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
`;

export const WorkingHoursHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const WorkingHoursTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const QuickActionButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    color: #374151;
    border-color: #d1d5db;
  }
`;

export const WorkingHoursHelp = styled.p`
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
`;

export const DayRow = styled.div<{ $enabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: ${({ $enabled }) => ($enabled ? '#ffffff' : '#f9fafb')};
  border-radius: 0.375rem;
  transition: all 0.2s;
  border: 1px solid ${({ $enabled }) => ($enabled ? '#e5e7eb' : 'transparent')};

  &:hover {
    background-color: ${({ $enabled }) => ($enabled ? '#f9fafb' : '#f3f4f6')};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const DayCheckbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  accent-color: #14b8a6;
  flex-shrink: 0;
`;

export const DayLabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;

  @media (max-width: 640px) {
    width: 100%;
    min-width: unset;
  }
`;

export const DayLabel = styled.label`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

export const TimeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  padding: 0.5rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const TimeInput = styled(Input)`
  min-width: 120px;
  max-width: 140px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  padding: 0.75rem 0.875rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  letter-spacing: 0.025rem;
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 1;
    }
  }
  
  &:disabled {
    opacity: 0.4;
    background-color: #f3f4f6;
    
    &::-webkit-calendar-picker-indicator {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  @media (max-width: 640px) {
    flex: 1;
    max-width: none;
    min-width: 100px;
  }
`;

export const TimeLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: lowercase;
  flex-shrink: 0;
`;
