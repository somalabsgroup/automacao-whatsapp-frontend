import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1;

  @media (max-width: 500px) {
    padding: 1.5rem;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;

  @media (max-width: 640px) {
    padding: 2rem;
    max-width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
  
  &:hover {
    box-shadow: 0 6px 16px rgba(20, 184, 166, 0.4);
    transform: translateY(-2px);
  }
`;

export const LogoText = styled.span`
  font-weight: 700;
  background: linear-gradient(135deg, #0891B2 0%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 0.9375rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const Label = styled.label`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #374151;
  letter-spacing: -0.01em;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{ $hasIcon?: boolean }>`
  height: 3rem;
  width: 100%;
  padding: 0 ${({ $hasIcon }) => $hasIcon ? '3rem' : '1rem'} 0 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: #111827;
  background: white;
  transition: all 0.2s ease;
  font-weight: 500;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 
      0 0 0 3px rgba(20, 184, 166, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.05);
    background: #ffffff;
  }

  &:disabled {
    background: #f9fafb;
    border-color: #e5e7eb;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 0.5rem;

  &:hover {
    color: #14b8a6;
    background: rgba(20, 184, 166, 0.08);
  }

  &:focus {
    outline: none;
    color: #14b8a6;
    background: rgba(20, 184, 166, 0.12);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const Button = styled.button`
  height: 3.25rem;
  width: 100%;
  padding: 0 1.5rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 
    0 4px 12px rgba(20, 184, 166, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.08);
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 16px rgba(20, 184, 166, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(20, 184, 166, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem 1.125rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 0.75rem;
  border-left: 4px solid #ef4444;
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.1);
  display: flex;
  align-items: center;
  gap: 0.625rem;

  &::before {
    content: '⚠';
    font-size: 1.25rem;
    line-height: 1;
  }
`;

export const Footer = styled.div`
  margin-top: 2.5rem;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
