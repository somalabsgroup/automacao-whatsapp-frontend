import { LucideIcon } from 'lucide-react';
import {
  CardContainer,
  MetricContent,
  MetricLabel,
  MetricValue,
  StatusBadge,
  IconWrapper,
} from './styles';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'success' | 'info';
}

const variantStyles = {
  default: {
    iconColor: '#3b82f6',
  },
  warning: {
    iconColor: '#f59e0b',
  },
  success: {
    iconColor: '#10b981',
  },
  info: {
    iconColor: '#06b6d4',
  },
};

export default function MetricCard({
  label,
  value,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  const styles = variantStyles[variant];
  const isTextValue = typeof value === 'string' && isNaN(Number(value));

  return (
    <CardContainer>
      <IconWrapper>
        <Icon size={20} color={styles.iconColor} strokeWidth={2} />
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
