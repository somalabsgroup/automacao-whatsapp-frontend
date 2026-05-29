import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0.625rem 1rem;
    gap: 0.75rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const LogoContainer = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 0.625rem;
  background: linear-gradient(135deg, #14b8a6, #0f766e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.35);
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const HeaderTitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

export const HeaderSubtitle = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

export const MetricsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    width: 100%;
    gap: 0.375rem;
  }
`;

// MetricCard Styles
export const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 120px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    flex: 1;
    min-width: 100px;
    padding: 0.5rem 0.625rem;
  }
`;

export const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MetricLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.3;
`;

export const MetricValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  line-height: 1;
`;

export const StatusBadge = styled.span<{ $variant?: string }>`
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  line-height: 1;
  display: inline-block;
  background-color: ${({ $variant }) => {
    if ($variant === 'success') return '#d1fae5';
    if ($variant === 'warning') return '#fed7aa';
    if ($variant === 'danger') return '#fee2e2';
    return '#e5e7eb';
  }};
  color: ${({ $variant }) => {
    if ($variant === 'success') return '#059669';
    if ($variant === 'warning') return '#ea580c';
    if ($variant === 'danger') return '#dc2626';
    return '#6b7280';
  }};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
