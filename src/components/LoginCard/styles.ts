import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 550px;
  max-width: 48rem;

  @media (max-width: 500px) {
    min-width: auto;
  }
`;

export const Card = styled.div`
  padding: 4rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 640px) {
    padding: 2.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const LogoContainer = styled.div`
  width: 4rem;
  height: 4rem;
  background: #14b8a6;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.3);
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{ $hasIcon?: boolean }>`
  height: 2.75rem;
  width: 100%;
  padding: 0 ${({ $hasIcon }) => $hasIcon ? '2.75rem' : '0.75rem'} 0 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #111827;
  background: white;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #14b8a6;
  }

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  height: 2.75rem;
  width: 100%;
  padding: 0 1rem;
  background: #14b8a6;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #0d9488;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background: #fef2f2;
  color: #dc2626;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  border-left: 4px solid #ef4444;
`;

export const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #14b8a6;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0d9488;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;
