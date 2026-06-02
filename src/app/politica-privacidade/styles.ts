import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  color: white;
  padding: 60px 24px 40px;
  text-align: center;
  position: relative;
`;

export const BackButton = styled.span`
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-4px);
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.95;
  margin: 0;
  font-weight: 500;
`;

export const Content = styled.main`
  max-width: 900px;
  margin: -20px auto 0;
  padding: 0 24px 60px;

  @media (max-width: 768px) {
    padding: 0 16px 40px;
  }
`;

export const Section = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;

  svg {
    color: #14B8A6;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SubSection = styled.div`
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px;
`;

export const Text = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 16px;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #111827;
    font-weight: 600;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;

  li {
    font-size: 15px;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 12px;
    padding-left: 24px;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #14B8A6;
      font-weight: 700;
      font-size: 16px;
    }

    strong {
      color: #111827;
      font-weight: 600;
    }
  }
`;

export const SubList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 20px;

  li {
    font-size: 14px;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #0891B2;
      font-weight: 700;
      font-size: 14px;
    }

    strong {
      color: #111827;
      font-weight: 600;
    }
  }
`;

export const HighLight = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 16px 20px;
  border-radius: 8px;
  margin: 20px 0;

  strong {
    color: #92400e;
  }

  font-size: 14px;
  line-height: 1.6;
  color: #78350f;
`;

export const InfoBox = styled.div`
  background: #f0fdfa;
  border: 1px solid #99f6e4;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  font-size: 15px;
  line-height: 1.7;
  color: #115e59;

  strong {
    color: #134e4a;
  }
`;

export const Footer = styled.footer`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 12px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #111827;
  }
`;
