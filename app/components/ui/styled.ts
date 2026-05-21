import styled from 'styled-components';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '~/styles/tokens';

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  font-family: inherit;
  font-weight: ${fontWeight.semibold};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  /* Variants */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${colors.primary.main};
          color: white;
          &:hover:not(:disabled) {
            background: ${colors.primary.hover};
            transform: translateY(-1px);
            box-shadow: ${shadows.md};
          }
        `;
      case 'secondary':
        return `
          background: ${colors.secondary.main};
          color: white;
          &:hover:not(:disabled) {
            background: ${colors.secondary.hover};
            transform: translateY(-1px);
            box-shadow: ${shadows.md};
          }
        `;
      case 'outline':
        return `
          background: white;
          color: ${colors.primary.main};
          border: 2px solid ${colors.primary.main};
          &:hover:not(:disabled) {
            background: ${colors.primary.light};
          }
        `;
    }
  }}

  /* Sizes */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${spacing.sm} ${spacing.md};
          font-size: ${fontSize.sm};
        `;
      case 'md':
        return `
          padding: ${spacing.md} ${spacing.xl};
          font-size: ${fontSize.base};
        `;
      case 'lg':
        return `
          padding: ${spacing.lg} ${spacing['2xl']};
          font-size: ${fontSize.lg};
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${colors.primary.light};
    outline-offset: 2px;
  }
`;

export const Card = styled.div<{ padding?: keyof typeof spacing }>`
  background: white;
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.xl};
  padding: ${({ padding = '2xl' }) => spacing[padding]};
`;

export const Container = styled.div<{ maxWidth?: string }>`
  width: 100%;
  max-width: ${({ maxWidth = '1200px' }) => maxWidth};
  margin: 0 auto;
  padding: 0 ${spacing.lg};
`;

export const Heading = styled.h1<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  margin: 0;
  font-weight: ${fontWeight.bold};
  color: ${colors.neutral[800]};
  line-height: 1.2;

  ${({ size = 'lg' }) => {
    switch (size) {
      case 'sm':
        return `font-size: ${fontSize.xl};`;
      case 'md':
        return `font-size: ${fontSize['2xl']};`;
      case 'lg':
        return `font-size: ${fontSize['3xl']};`;
      case 'xl':
        return `font-size: ${fontSize['4xl']};`;
    }
  }}
`;

export const Text = styled.p<{
  size?: keyof typeof fontSize;
  color?: string;
  weight?: keyof typeof fontWeight;
}>`
  margin: 0;
  font-size: ${({ size = 'base' }) => fontSize[size]};
  color: ${({ color = colors.neutral[600] }) => color};
  font-weight: ${({ weight = 'normal' }) => fontWeight[weight]};
  line-height: 1.6;
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.background.gradient};
  padding: ${spacing.lg};
`;

export const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Logo = styled.div`
  font-size: ${fontSize['4xl']};
  font-weight: ${fontWeight.bold};
  color: ${colors.primary.main};
  margin-bottom: ${spacing.md};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.neutral[200]};
  margin: ${spacing.xl} 0;
`;

export const Grid = styled.div<{ columns?: number; gap?: keyof typeof spacing }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ gap = 'lg' }) => spacing[gap]};
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  gap?: keyof typeof spacing;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = 'md' }) => spacing[gap]};
  align-items: ${({ align = 'flex-start' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
`;
