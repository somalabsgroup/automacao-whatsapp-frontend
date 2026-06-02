'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${({ $isOpen }) => ($isOpen ? '#14B8A6' : '#E5E7EB')};
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ $isOpen }) => ($isOpen ? 'white' : '#F9FAFB')};
  cursor: pointer;
  color: #111827;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '0 0 0 4px rgba(20, 184, 166, 0.08)' : 'none'};
  
  &:hover {
    border-color: #14B8A6;
    background: white;
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    color: ${({ $isOpen }) => ($isOpen ? '#14B8A6' : '#6B7280')};
  }
  
  @media (max-width: 640px) {
    padding: 12px 14px;
    font-size: 14px;
  }
`;

const SelectButtonText = styled.span<{ $isPlaceholder: boolean }>`
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? '#9CA3AF' : '#111827')};
  font-weight: ${({ $isPlaceholder }) => ($isPlaceholder ? '500' : '600')};
`;

const OptionsContainer = styled.div<{ $isOpen: boolean; $top: number; $left: number; $width: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  max-height: 280px;
  overflow-y: auto;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F9FAFB;
    border-radius: 0 12px 12px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 4px;
    
    &:hover {
      background: #9CA3AF;
    }
  }
`;

const Option = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: ${({ $isSelected }) =>
    $isSelected
      ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)'
      : 'white'};
  color: ${({ $isSelected }) => ($isSelected ? '#0D9488' : '#111827')};
  font-size: 15px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '500')};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: ${({ $isSelected }) =>
      $isSelected
        ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(8, 145, 178, 0.2) 100%)'
        : '#F0FDFA'};
    color: #0D9488;
    padding-left: 20px;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
    transition: height 0.2s ease;
    border-radius: 0 2px 2px 0;
  }
  
  &:hover::before {
    height: 50%;
  }
  
  ${({ $isSelected }) =>
    $isSelected &&
    `
    &::before {
      height: 70%;
    }
  `}
  
  @media (max-width: 640px) {
    padding: 10px 14px;
    font-size: 14px;
    
    &:hover {
      padding-left: 18px;
    }
  }
`;

interface CustomSelectProps {
  placeholder: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  placeholder,
  options,
  value,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const updatePosition = () => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + 8,
            left: rect.left,
            width: rect.width,
          });
        }
      };

      // Atualiza imediatamente de forma síncrona
      updatePosition();
      
      // E também registra listeners para mudanças
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      // Reset position quando fechar
      setDropdownPosition({ top: 0, left: 0, width: 0 });
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  const dropdownContent = (
    <OptionsContainer 
      ref={dropdownRef}
      $isOpen={isOpen}
      $top={dropdownPosition.top}
      $left={dropdownPosition.left}
      $width={dropdownPosition.width}
    >
      {options.map((option) => (
        <Option
          key={option}
          type="button"
          $isSelected={selectedValue === option}
          onClick={() => handleSelect(option)}
        >
          {option}
        </Option>
      ))}
    </OptionsContainer>
  );

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton
        ref={buttonRef}
        type="button"
        $isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SelectButtonText $isPlaceholder={!selectedValue}>
          {selectedValue || placeholder}
        </SelectButtonText>
        <ChevronDown size={18} />
      </SelectButton>

      {isMounted && dropdownPosition.width > 0 && createPortal(dropdownContent, document.body)}
    </SelectContainer>
  );
}
