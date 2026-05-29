import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.bg.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-shrink: 0;
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem 1.25rem;
    gap: 1rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateX(2px);
  }
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.25);
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

export const LogoText = styled.span`
  font-weight: 700;
  background: linear-gradient(135deg, #0891B2 0%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  transition: transform 0.2s;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  @media (max-width: 480px) {
    gap: 0.125rem;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.02em;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.text.muted};
  margin: 0;
  line-height: 1.4;
  font-weight: 400;
`;

export const MetricsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    width: 100%;
    gap: 0.625rem;
  }
  
  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

export const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

export const MetricLabel = styled.span`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.text.muted};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  opacity: 0.85;
`;

export const MetricValue = styled.span`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

export const StatusBadge = styled.span<{ $variant?: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: ${({ $variant, theme }) => {
    if ($variant === 'success') return `linear-gradient(135deg, ${theme.status.success.bg} 0%, ${theme.status.success.bg}dd 100%)`;
    if ($variant === 'warning') return `linear-gradient(135deg, ${theme.status.warning.bg} 0%, ${theme.status.warning.bg}dd 100%)`;
    if ($variant === 'danger') return `linear-gradient(135deg, ${theme.status.danger.bg} 0%, ${theme.status.danger.bg}dd 100%)`;
    return `linear-gradient(135deg, ${theme.status.default.bg} 0%, ${theme.status.default.bg}dd 100%)`;
  }};
  color: ${({ $variant, theme }) => {
    if ($variant === 'success') return theme.status.success.text;
    if ($variant === 'warning') return theme.status.warning.text;
    if ($variant === 'danger') return theme.status.danger.text;
    return theme.status.default.text;
  }};
  box-shadow: 0 1px 3px ${({ $variant, theme }) => {
    if ($variant === 'success') return `${theme.status.success.bg}25`;
    if ($variant === 'warning') return `${theme.status.warning.bg}25`;
    if ($variant === 'danger') return `${theme.status.danger.bg}25`;
    return `${theme.status.default.bg}25`;
  }};
  transition: all 0.2s;
  letter-spacing: 0.01em;
  
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 4px currentColor;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.95);
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 0.625rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.brand.primary}20 0%, ${theme.brand.primary}30 100%)`};
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px ${({ theme }) => `${theme.brand.primary}15`};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 0.625rem;
    padding: 1px;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.brand.primary}40,
      transparent
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
  }
`;
