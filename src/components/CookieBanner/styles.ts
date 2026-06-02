import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 20px 20px 12px;
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Content = styled.div`
  padding: 20px 24px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
`;

export const DetailsSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CookieType = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const CookieHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #14B8A6;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  label {
    font-size: 14px;
    color: #111827;
    cursor: pointer;
    flex: 1;

    strong {
      font-weight: 600;
    }
  }
`;

export const CookieDescription = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  padding-left: 28px;
  line-height: 1.5;
`;

export const Footer = styled.div`
  padding: 20px 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #14B8A6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #0D9488;
    text-decoration: underline;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PrimaryButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.25);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
