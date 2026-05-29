'use client';

import { MessageSquare, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
  LogoIcon,
  LogoText,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
  MetricsContainer,
} from './styles';

export interface HeaderMetric {
  label: string;
  value: string | number;
  variant?: 'default' | 'warning' | 'success' | 'info';
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  logoText?: string;
  metrics?: HeaderMetric[];
}

const metricIcons = {
  'Total Conversas': MessageSquare,
  'Aguardando Ação': AlertTriangle,
  'Follow-ups Hoje': Calendar,
  'Bot Ativo': CheckCircle,
};

export default function Header({
  title,
  subtitle,
  logoText = 'SomaClini',
  metrics = [],
}: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo>
          <LogoIcon>
            <MessageSquare />
          </LogoIcon>
          <LogoText>{logoText}</LogoText>
        </Logo>
        <HeaderInfo>
          <HeaderTitle>{title}</HeaderTitle>
          {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
        </HeaderInfo>
      </HeaderLeft>

      <MetricsContainer>
        {metrics.map((metric) => {
          const IconComponent =
            metricIcons[metric.label as keyof typeof metricIcons] || MessageSquare;
          
          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={IconComponent}
              variant={metric.variant}
            />
          );
        })}
      </MetricsContainer>
    </HeaderContainer>
  );
}
