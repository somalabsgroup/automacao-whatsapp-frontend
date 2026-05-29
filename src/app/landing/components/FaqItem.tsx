'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FaqCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: #14B8A6;
    box-shadow: 0 4px 20px rgba(20, 184, 166, 0.08);
  }
`;

const FaqButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  gap: 20px;
  
  @media (max-width: 640px) {
    padding: 20px 24px;
    gap: 16px;
  }
`;

const FaqQuestion = styled.span`
  color: #111827;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
  
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #F0FDFA;
  flex-shrink: 0;
  
  svg {
    width: 18px;
    height: 18px;
    color: #14B8A6;
    transition: transform 0.3s ease;
  }
`;

const FaqAnswer = styled(motion.p)`
  color: #6B7280;
  font-size: 15px;
  line-height: 1.7;
  padding: 0 28px 24px;
  margin: 0;
  
  @media (max-width: 640px) {
    font-size: 14px;
    padding: 0 24px 20px;
  }
`;

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <FaqCard>
      <FaqButton onClick={() => setOpen(!open)}>
        <FaqQuestion>{q}</FaqQuestion>
        <IconWrapper
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </IconWrapper>
      </FaqButton>
      <AnimatePresence>
        {open && (
          <FaqAnswer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {a}
          </FaqAnswer>
        )}
      </AnimatePresence>
    </FaqCard>
  );
}
