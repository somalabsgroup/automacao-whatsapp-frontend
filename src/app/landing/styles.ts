import styled from 'styled-components';

// Skip Link for Accessibility
export const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 0;
  background: #14B8A6;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  font-weight: 600;
  z-index: 9999;
  border-radius: 0 0 8px 0;
  
  &:focus {
    top: 0;
    outline: 3px solid #0891B2;
    outline-offset: 2px;
  }
`;

// ══════════════ PAGE CONTAINER ══════════════
export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
`;

// ══════════════ HEADER ══════════════
export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
`;

export const HeaderContainer = styled.div`
  max-width: 1450px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.25);
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.35);
    transform: translateY(-1px);
  }
`;

export const LogoText = styled.span`
  font-weight: 700;
  background: linear-gradient(135deg, #0891B2 0%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 18px;
  letter-spacing: -0.02em;
`;

export const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 32px;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const NavLink = styled.a`
  color: #6B7280;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  padding: 8px 4px;
  border-radius: 4px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: linear-gradient(90deg, #14B8A6, #0891B2);
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: #14B8A6;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:focus {
    outline: 2px solid #14B8A6;
    outline-offset: 4px;
    color: #14B8A6;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const HeaderButton = styled.a`
  display: none;
  border: none;
  color: white;
  padding: 12px 24px;
  min-height: 44px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  background: #14B8A6;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.25);
  white-space: nowrap;
  text-decoration: none;
  align-items: center;
  
  @media (min-width: 768px) {
    display: flex;
  }
  
  &:hover {
    background: #0D9488;
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.35);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: 3px solid #0891B2;
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: #6B7280;
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: rgba(20, 184, 166, 0.1);
    
    svg {
      color: #14B8A6;
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: 2px solid #14B8A6;
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

// ══════════════ HERO SECTION ══════════════
export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding: 0 24px 60px;
  background: white;
  
  @media (max-width: 968px) {
    padding: 80px 16px 40px;
    align-items: flex-start;
    min-height: auto;
  }
`;

export const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 40px;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: 1fr;
  overflow-x: hidden;
  
  @media (min-width: 968px) {
    grid-template-columns: 1fr 2fr;
    gap: 20px;
  }
  
  @media (max-width: 968px) {
    gap: 32px;
  }
`;

export const HeroText = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 2;
  
  @media (max-width: 968px) {
    gap: 20px;
  }
`;

export const HeroTag = styled.p`
  color: white;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: -0.03em;
  background: #14B8A6;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  
  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`;

export const HeroTitle = styled.h1`
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.15;
  font-size: 2.75rem;
  letter-spacing: -0.02em;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    line-height: 1.25;
  }
  
  span {
    color: #14B8A6;
  }
  
  em {
    color: #14B8A6;
    font-style: italic;
  }
`;

export const HeroDescription = styled.p`
  color: #6B7280;
  font-size: 17px;
  line-height: 1.65;
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  
  @media (max-width: 968px) {
    font-size: 16px;
    line-height: 1.6;
  }
`;

export const BenefitCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const BenefitCard = styled.div`
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: default;
  width: 100%;
  min-width: 0;
  
  &:hover {
    transform: translateY(-2px);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const BenefitIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #CCFBF1 0%, #E0F2FE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  transition: transform 0.3s ease;
  
  svg {
    width: 26px;
    height: 26px;
    color: #0891B2;
    stroke-width: 2.5;
    transition: transform 0.3s ease;
  }
`;

export const BenefitCardTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const BenefitCardDesc = styled.p`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  line-height: 1.4;
  font-weight: 400;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const PrimaryButton = styled.button`
  background: #14B8A6;
  color: white;
  padding: 16px 28px;
  min-height: 52px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.25);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  
  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  @media (max-width: 640px) {
    white-space: normal;
    text-align: center;
    padding: 14px 24px;
    min-height: 48px;
    font-size: 14px;
  }
  
  &:hover {
    background: #0D9488;
    box-shadow: 0 6px 16px rgba(20, 184, 166, 0.35);
    transform: translateY(-2px);
    
    svg {
      transform: translateX(3px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: 3px solid #0891B2;
    outline-offset: 3px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
    
    svg {
      transition: none;
    }
  }
`;

export const SecondaryButton = styled.button`
  color: #0891B2;
  font-size: 15px;
  font-weight: 600;
  background: white;
  border: 1.5px solid #E5E7EB;
  padding: 16px 28px;
  min-height: 52px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  white-space: nowrap;
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
    fill: currentColor;
    flex-shrink: 0;
  }
  
  @media (max-width: 640px) {
    white-space: normal;
    text-align: center;
    padding: 14px 24px;
    min-height: 48px;
    font-size: 14px;
  }
  
  &:hover {
    border-color: #14B8A6;
    background: #F0FDFA;
    color: #0D9488;
  }
  
  &:focus {
    outline: 3px solid #0891B2;
    outline-offset: 3px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #6B7280;
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  
  svg {
    width: 17px;
    height: 17px;
    color: #10B981;
    flex-shrink: 0;
  }
  
  span {
    line-height: 1.4;
  }
  
  @media (max-width: 640px) {
    font-size: 11px;
    gap: 6px;
    
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const HeroMockup = styled.div`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  overflow: hidden;
  
  @media (max-width: 968px) {
    margin: 0;
  }
`;

export const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100%;
    image-rendering: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
`;

// ══════════════ STATS BAR ══════════════
export const StatsBarSection = styled.section`
  background: linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #0891B2 100%);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

export const StatsBarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ModernStatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 24px 20px;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.05);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 22px 18px;
    min-height: 190px;
  }
  
  @media (max-width: 640px) {
    padding: 24px;
    min-height: auto;
  }
`;

export const StatBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  ${ModernStatCard}:hover & {
    color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
  
  @media (max-width: 640px) {
    font-size: 16px;
    top: 12px;
    right: 12px;
  }
`;

export const StatIconBox = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  
  ${ModernStatCard}:hover & {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
    stroke-width: 2;
  }
  
  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StatTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  line-height: 1.3;
  letter-spacing: -0.01em;
  
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const StatDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

// ══════════════ PROBLEM SECTION - BENTO GRID ══════════════
// ══════════════ HOW IT WORKS SECTION - STEP CARDS ══════════════
export const HowItWorksSection = styled.section`
  background: linear-gradient(180deg, #F0FDFA 0%, #ffffff 50%, #F0F9FF 100%);
  padding: 100px 24px;
  position: relative;
  overflow: hidden;
  
  /* Grid pattern */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }
  
  /* Top right blob */
  &::after {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-30px, 30px) scale(1.05);
    }
  }
  
  @media (max-width: 768px) {
    padding: 64px 24px;
    
    &::after {
      width: 400px;
      height: 400px;
      top: -50px;
      right: -50px;
    }
  }
`;

export const FloatingCircle1 = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.05) 50%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  animation: float1 18s ease-in-out infinite;
  
  @keyframes float1 {
    0%, 100% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(40px, -20px);
    }
    66% {
      transform: translate(-30px, 40px);
    }
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const FloatingCircle2 = styled.div`
  position: absolute;
  bottom: 20%;
  right: 8%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  animation: float2 22s ease-in-out infinite;
  
  @keyframes float2 {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-50px, -30px) scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

export const FloatingCircle3 = styled.div`
  position: absolute;
  top: 40%;
  right: 15%;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  animation: float3 16s ease-in-out infinite;
  
  @keyframes float3 {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(30px, 50px);
    }
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  /* Bottom left accent blob */
  &::before {
    content: '';
    position: absolute;
    bottom: -200px;
    left: -150px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(14, 165, 233, 0.03) 50%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: pulse 15s ease-in-out infinite;
  }
  
  /* Center subtle glow */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(16, 185, 129, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    &::before {
      width: 300px;
      height: 300px;
      bottom: -100px;
      left: -100px;
    }
  }
`;

export const HowItWorksSubtitle = styled.p`
  font-size: 17px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 64px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 48px;
  }
`;

export const HorizontalTimeline = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  position: relative;
  padding-top: 20px;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const TimelineConnector = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: none;
  z-index: 0;
  
  @media (max-width: 1100px) {
    display: none;
  }
`;

export const HorizontalStep = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  height: 100%;
`;

export const StepCardModern = styled.div<{ $bg: string }>`
  background: white;
  border-radius: 24px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  border: 2px solid ${props => props.$bg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 320px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.$bg};
    opacity: 0.03;
    border-radius: 22px;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(20, 184, 166, 0.12);
    border-color: #14B8A6;
    
    &::before {
      opacity: 0.08;
    }
  }
  
  @media (max-width: 768px) {
    padding: 24px 18px;
    height: 300px;
  }
  
  @media (max-width: 580px) {
    height: 280px;
  }
`;

export const StepIconCircle = styled.div<{ $iconBg: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.$iconBg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px ${props => props.$iconBg}35;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: ${props => props.$iconBg};
    opacity: 0.15;
    z-index: -1;
    transition: all 0.3s ease;
  }
  
  svg {
    width: 36px;
    height: 36px;
    color: white;
    stroke-width: 2.5;
  }
  
  ${StepCardModern}:hover & {
    transform: scale(1.08);
    box-shadow: 0 12px 28px ${props => props.$iconBg}50;
    
    &::after {
      inset: -6px;
      opacity: 0.25;
    }
  }
  
  @media (max-width: 768px) {
    width: 68px;
    height: 68px;
    
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const StepNumberBadge = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  margin-top: -6px;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

export const StepTitleModern = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 8px 0 0 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const StepDescModern = styled.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const StepConnectorLine = styled.div`
  display: none;
`;

export const ConnectorDot = styled.div`
  display: none;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-align: center;
  
  em {
    color: #14B8A6;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 640px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

// ══════════════ CTA SECTION ══════════════
export const CTASection = styled.section`
  background: 
    radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(8, 145, 178, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #0891B2 100%);
  padding: 80px 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 100px,
        rgba(255, 255, 255, 0.02) 100px,
        rgba(255, 255, 255, 0.02) 101px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 100px,
        rgba(255, 255, 255, 0.02) 100px,
        rgba(255, 255, 255, 0.02) 101px
      );
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(204, 251, 241, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 64px 24px;
    
    &::after {
      width: 400px;
      height: 400px;
      right: -20%;
    }
  }
`;

export const CTAContainer = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  display: grid;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (min-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 968px) {
    gap: 40px;
  }
`;

export const CTAText = styled.div`
  color: white;
  position: relative;
  z-index: 1;
`;

export const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  em {
    color: #14B8A6;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const CTADescription = styled.p`
  font-size: 16px;
  opacity: 0.95;
  margin-bottom: 24px;
  line-height: 1.65;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const CTAFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CTAFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  line-height: 1.5;
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// ══════════════ MODERN FORM (CTA) ══════════════
export const ModernFormCard = styled.div`
  background: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(229, 231, 235, 0.5);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #14B8A6 0%, #0891B2 100%);
  }
  
  @media (max-width: 768px) {
    padding: 36px 28px;
  }
  
  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 640px) {
    margin-bottom: 24px;
  }
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  
  em {
    color: #14B8A6;
    font-style: italic;
  }
  
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  gap: 16px;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ModernFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModernFormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    color: #14B8A6;
  }
`;

export const ModernFormInput = styled.input`
  padding: 14px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #F9FAFB;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    background: white;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.08);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
  
  @media (max-width: 640px) {
    padding: 12px 14px;
    font-size: 14px;
  }
`;

export const ModernFormSelect = styled.select`
  padding: 14px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #F9FAFB;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.08);
  }
  
  @media (max-width: 640px) {
    padding: 12px 14px;
    padding-right: 36px;
    font-size: 14px;
  }
`;

export const ModernSubmitButton = styled.button`
  background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(20, 184, 166, 0.3);
  width: 100%;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: -0.01em;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(20, 184, 166, 0.4);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 640px) {
    padding: 14px 24px;
    font-size: 15px;
  }
`;

export const FormFooterText = styled.p`
  text-align: center;
  color: #6B7280;
  font-size: 13px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
  
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

// ══════════════ FAQ SECTION ══════════════
export const FAQSection = styled.section`
  padding: 100px 24px;
  background: linear-gradient(180deg, #ffffff 0%, #F0FDFA 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(8, 145, 178, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

export const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const FAQHeader = styled.div`
  margin-bottom: 56px;
  text-align: center;
  
  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`;

export const FAQSubtitle = styled.p`
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;
  margin-top: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// ══════════════ FOOTER ══════════════
export const Footer = styled.footer`
  background: white;
  padding: 64px 24px 32px;
  border-top: 1px solid #E5E7EB;
  
  @media (max-width: 768px) {
    padding: 48px 24px 24px;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1152px;
  margin: 0 auto;
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterColumn = styled.div`
  @media (max-width: 768px) {
    &:first-child {
      margin-bottom: 16px;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const SocialLink = styled.a<{ $color?: string }>`
  width: 44px;
  height: 44px;
  background: #F3F4F6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    background: ${props => props.$color || '#14B8A6'};
    color: white;
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 16px ${props => props.$color ? `${props.$color}40` : 'rgba(20, 184, 166, 0.25)'};
  }
  
  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
`;

export const FooterTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

export const FooterText = styled.p`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 12px;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FooterLink = styled.li`
  a {
    font-size: 13px;
    color: #6B7280;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #14B8A6;
    }
  }
`;

export const FooterBottom = styled.div`
  padding-top: 24px;
  border-top: 1px solid #E5E7EB;
  text-align: center;
`;

export const Copyright = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
