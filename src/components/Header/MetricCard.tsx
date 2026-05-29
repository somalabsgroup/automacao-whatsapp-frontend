import { LucideIcon } from 'lucide-react';
import styled from 'styled-components';
import {
  MetricContent,
  MetricLabel,
  MetricValue,
  StatusBadge,
  IconWrapper as BaseIconWrapper,
} from './styles';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'success' | 'info';
}

const variantStyles = {
  default: {
    iconColor: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0.02) 100%)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
  },
  warning: {
    iconColor: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  success: {
    iconColor: '#10b981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  info: {
    iconColor: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
};

const CardContainer = styled.div<{ $variant: string }>`
  background: ${({ theme, $variant }) => {
    const variant = $variant as keyof typeof variantStyles;
    return `linear-gradient(135deg, 
      ${theme.bg.primary} 0%, 
      ${theme.bg.primary} 100%
    ), ${variantStyles[variant].bgGradient}`;
  }};
  background-blend-mode: overlay;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 140px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $variant }) => {
      const variant = $variant as keyof typeof variantStyles;
      return `linear-gradient(90deg, 
        transparent,
        ${variantStyles[variant].iconColor}80,
        transparent
      )`;
    }};
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) => {
      const variant = $variant as keyof typeof variantStyles;
      return `0 8px 16px ${variantStyles[variant].iconColor}15, 
              0 2px 4px rgba(0, 0, 0, 0.06)`;
    }};
    border-color: ${({ $variant }) => {
      const variant = $variant as keyof typeof variantStyles;
      return variantStyles[variant].borderColor;
    }};
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    flex: 1;
    min-width: 120px;
    padding: 0.625rem 0.875rem;
  }
`;

const IconWrapper = styled(BaseIconWrapper)`
  width: 36px;
  height: 36px;
  border-radius: 0.625rem;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.brand.primary}30 0%, ${theme.brand.primary}40 100%)`};
    box-shadow: 0 2px 8px ${({ theme }) => `${theme.brand.primary}20`};
    
    &::before {
      opacity: 1;
    }
  }
`;

export default function MetricCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  const styles = variantStyles[variant];
  const isTextValue = typeof value === 'string' && isNaN(Number(value));

  return (
    <CardContainer $variant={variant}>
      <IconWrapper>
        <Icon size={20} color={styles.iconColor} strokeWidth={2.5} />
      </IconWrapper>
      <MetricContent>
        <MetricLabel>{label}</MetricLabel>
        {isTextValue ? (
          <StatusBadge $variant={variant}>{value}</StatusBadge>
        ) : (
          <MetricValue>{value}</MetricValue>
        )}
      </MetricContent>
    </CardContainer>
  );
}
