'use client';

import { MessageSquare, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import {
  HeaderContainer,
  HeaderLeft,
  Logo,
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
  metrics = [],
}: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo>
          <img 
            src="/assets/somaclini-logo.png" 
            alt="SomaClini Logo" 
            style={{ height: '32px', width: 'auto', imageRendering: '-webkit-optimize-contrast', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
          />
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
