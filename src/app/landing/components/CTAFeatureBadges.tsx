'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, Clock, TrendingUp, Award } from 'lucide-react';
import styled from 'styled-components';

const BadgesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 32px;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const Badge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(204, 251, 241, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const BadgeIconBox = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(204, 251, 241, 0.2) 0%, rgba(224, 242, 254, 0.2) 100%);
  border: 1px solid rgba(204, 251, 241, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    width: 22px;
    height: 22px;
    color: #CCFBF1;
    stroke-width: 2.5;
  }
`;

const BadgeLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #CCFBF1;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

const BadgeValue = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: rgba(204, 251, 241, 0.7);
  line-height: 1.2;
`;

export function CTAFeatureBadges() {
  const badges = [
    {
      Icon: Shield,
      label: 'LGPD',
      value: '100% seguro',
    },
    {
      Icon: Zap,
      label: 'Setup',
      value: '< 24h',
    },
    {
      Icon: Users,
      label: 'Suporte',
      value: 'Dedicado',
    },
    {
      Icon: Clock,
      label: 'Uptime',
      value: '99.9%',
    },
    {
      Icon: TrendingUp,
      label: 'ROI',
      value: 'Garantido',
    },
    {
      Icon: Award,
      label: 'Qualidade',
      value: 'Premium',
    },
  ];

  return (
    <BadgesContainer>
      {badges.map(({ Icon, label, value }, index) => (
        <Badge
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          <BadgeIconBox>
            <Icon />
          </BadgeIconBox>
          <BadgeLabel>{label}</BadgeLabel>
          <BadgeValue>{value}</BadgeValue>
        </Badge>
      ))}
    </BadgesContainer>
  );
}
