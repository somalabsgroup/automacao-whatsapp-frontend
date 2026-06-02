'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: none;
  color: #14B8A6;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: rgba(20, 184, 166, 0.1);
    text-decoration: underline;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export default function ManageCookiesButton() {
  const handleClick = () => {
    // Remove o consentimento atual
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    
    // Recarrega a página para mostrar o banner novamente
    window.location.reload();
  };

  return (
    <Button onClick={handleClick} type="button">
      <Settings />
      Gerenciar Cookies
    </Button>
  );
}
