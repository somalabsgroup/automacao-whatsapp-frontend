import styled from 'styled-components';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '~/styles/tokens';

export const FeatureCard = styled.div`
  background: white;
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${spacing.md};
  line-height: 1;
`;

export const FeatureTitle = styled.h3`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.semibold};
  color: ${colors.neutral[800]};
  margin: 0 0 ${spacing.sm};
`;

export const FeatureDescription = styled.p`
  color: ${colors.neutral[600]};
  margin: 0;
  line-height: 1.6;
`;

export const Header = styled.header`
  padding: ${spacing.lg} ${spacing.xl};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: ${spacing.md} ${spacing.lg};
  }
`;

export const HeaderTitle = styled.h1`
  font-size: ${fontSize['2xl']};
  font-weight: ${fontWeight.bold};
  color: ${colors.neutral[800]};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${fontSize.xl};
  }
`;

export const HeroSection = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing['3xl']} ${spacing.xl};
  text-align: center;

  @media (max-width: 768px) {
    padding: ${spacing['2xl']} ${spacing.lg};
  }
`;

export const HeroTitle = styled.h2`
  font-size: 3rem;
  font-weight: ${fontWeight.bold};
  color: white;
  margin: 0 0 ${spacing.lg};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: ${fontSize.xl};
  color: rgba(255, 255, 255, 0.95);
  margin: 0 auto ${spacing['2xl']};
  max-width: 800px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${fontSize.base};
  }
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.xl};
  margin-top: ${spacing['3xl']};
`;

export const StatCard = styled.div`
  background: white;
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const StatLabel = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.neutral[600]};
  margin-bottom: ${spacing.sm};
`;

export const StatValue = styled.div`
  font-size: ${fontSize['3xl']};
  font-weight: ${fontWeight.bold};
  color: ${colors.neutral[800]};
`;
