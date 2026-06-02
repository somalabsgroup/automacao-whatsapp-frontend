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
  max-width: 1360px;
  margin: 0 auto;
  padding: 12px 40px;
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

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  transition: opacity 0.3s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileMenuContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 24px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E5E7EB;
`;

export const MobileMenuCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  font-size: 24px;
  color: #6B7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(20, 184, 166, 0.1);
    color: #14B8A6;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const MobileMenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  flex: 1;
`;

export const MobileMenuLink = styled.a`
  display: block;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(20, 184, 166, 0.1);
    color: #14B8A6;
  }
  
  &:active {
    background: rgba(20, 184, 166, 0.15);
  }
`;

export const MobileMenuCTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  background: #14B8A6;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  
  &:hover {
    background: #0D9488;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  }
  
  &:active {
    transform: translateY(0);
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
  padding: 0 24px 40px;
  background: white;
  
  @media (max-width: 968px) {
    padding: 60px 16px 30px;
    align-items: flex-start;
    min-height: auto;
  }
`;

export const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: 1fr;
  overflow: visible;
  
  @media (min-width: 968px) {
    grid-template-columns: 1fr 1.5fr;
    gap: 24px;
  }
  
  @media (max-width: 968px) {
    gap: 20px;
  }
`;

export const HeroText = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
  
  @media (max-width: 968px) {
    gap: 14px;
  }
`;

export const HeroTag = styled.p`
  color: white;
  font-size: 11px;
  font-weight: 500;
  margin: 16px 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  letter-spacing: -0.03em;
  background: #14B8A6;
  padding: 6px 12px;
  border-radius: 16px;
  border: none;
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
`;

export const HeroTitle = styled.h1`
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.15;
  font-size: 2.25rem;
  letter-spacing: -0.02em;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
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
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  
  @media (max-width: 968px) {
    font-size: 14px;
    line-height: 1.55;
  }
`;

export const BenefitCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 0;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const BenefitCard = styled.div`
  background: white;
  border: 1px solid #E0F7F4;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  transition: all 0.25s ease;
  cursor: default;
  height: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px 8px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(20, 184, 166, 0.13);
    border-color: #A7E9E3;

    svg {
      transform: scale(1.08);
    }
  }
`;

export const BenefitIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #F0FDFA;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  transition: transform 0.25s ease;

  svg {
    width: 18px;
    height: 18px;
    color: #14B8A6;
    stroke-width: 2;
    transition: transform 0.25s ease;
  }
`;

export const BenefitCardTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-inter), system-ui, sans-serif;
  color: #111827;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
`;

export const BenefitCardDesc = styled.p`
  font-size: 10px;
  color: #6B7280;
  margin: 0;
  line-height: 1.4;
  font-weight: 400;
  font-family: var(--font-inter), system-ui, sans-serif;
  letter-spacing: -0.01em;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  width: 100%;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
    
    a {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const PrimaryButton = styled.a`
  background: #14B8A6;
  color: white;
  padding: 12px 24px;
  min-height: 44px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.25);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  @media (max-width: 640px) {
    white-space: normal;
    text-align: center;
    padding: 12px 20px;
    min-height: 44px;
    font-size: 13px;
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

export const SecondaryButton = styled.a`
  color: #0891B2;
  font-size: 14px;
  font-weight: 600;
  background: white;
  border: 1.5px solid #E5E7EB;
  padding: 12px 24px;
  min-height: 44px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  white-space: nowrap;
  
  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
    fill: currentColor;
    flex-shrink: 0;
  }
  
  @media (max-width: 640px) {
    white-space: normal;
    text-align: center;
    padding: 12px 20px;
    min-height: 44px;
    font-size: 13px;
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
  gap: 6px;
  margin: 0;
  color: #6B7280;
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  
  svg {
    width: 16px;
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

export const HeroImageSection = styled.div`
  @media (max-width: 968px) {
    display: none;
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
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/assets/back-hero.png');
    background-position: left center;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.3;
    z-index: 0;
  }
  
  img {
    width: 70%;
    height: auto;
    display: block;
    max-width: 70%;
    image-rendering: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 968px) {
    height: 400px;
    
    &::before {
      background-position: center center;
    }
    
    img {
      width: 100%;
      max-width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

// ══════════════ VIDEO SECTION ══════════════
export const VideoSection = styled.section`
  background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 0 80px;
  }
`;

export const VideoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

export const VideoTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.2;
  
  em {
    font-style: italic;
    color: #14B8A6;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const VideoSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6B7280;
  margin: 0 auto 48px;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

export const VideoContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 20px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, #0D9488 0%, #14B8A6 100%);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 30px 60px -15px rgba(0, 0, 0, 0.3),
      0 15px 25px -7px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    max-width: 100%;
  }
`;

export const VideoPlayOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 2;
`;

export const VideoPlayButton = styled.div<{ $isVisible: boolean }>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: ${({ $isVisible }) => ($isVisible ? 'scale(1)' : 'scale(0.8)')};
  transition: all 0.3s ease;
  
  svg {
    width: 32px;
    height: 32px;
    color: #14B8A6;
    margin-left: 4px;
  }
  
  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  background: transparent;
  will-change: auto;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  &::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  
  &::-webkit-media-controls-download-button {
    display: none;
  }
`;

export const VideoFeaturesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const VideoFeatureItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: start;
  padding: 12px 14px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #14B8A6;
  }
`;

export const VideoFeatureIcon = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const VideoFeatureTitle = styled.h4`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

export const VideoFeatureDesc = styled.p`
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
  line-height: 1.45;
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
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 640px) {
    padding: 24px;
    min-height: auto;
  }
`;

export const StatBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: white;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 20px;
  padding: 3px 10px;
  transition: all 0.3s ease;

  ${ModernStatCard}:hover & {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.42);
    transform: scale(1.04);
  }

  @media (max-width: 768px) {
    ${ModernStatCard}:hover & {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    font-size: 12px;
    top: 12px;
    right: 12px;
    padding: 2px 9px;
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
  
  /* Grid pattern - only desktop */
  @media (min-width: 769px) {
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
  }
  
  @media (max-width: 768px) {
    padding: 64px 24px;
  }
`;

export const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
    
    &:hover {
      transform: none;
      box-shadow: 0 6px 16px rgba(20, 184, 166, 0.08);
    }
  }
  
  @media (max-width: 580px) {
    height: 280px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
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
  
  @media (max-width: 768px) {
    padding: 64px 24px;
    background: linear-gradient(135deg, #0F766E 0%, #0D9488 100%);
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
  width: 100%;
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
  width: 100%;
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
  color: #111827;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.08);
  }
  
  option {
    padding: 12px 16px;
    background: white;
    color: #111827;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    
    &:hover {
      background: #F0FDFA;
      color: #0D9488;
    }
    
    &:checked {
      background: linear-gradient(135deg, #14B8A6 0%, #0891B2 100%);
      color: white;
      font-weight: 600;
    }
    
    &:disabled {
      color: #9CA3AF;
      font-weight: 500;
    }
  }
  
  @media (max-width: 640px) {
    padding: 12px 14px;
    padding-right: 36px;
    font-size: 14px;
    
    option {
      font-size: 14px;
      padding: 10px 14px;
    }
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
    padding: 40px 20px 24px;
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
    grid-template-columns: 1fr 1fr;
    gap: 24px 16px;
    margin-bottom: 32px;
    
    /* Primeira coluna (logo/social) ocupa as duas colunas */
    > div:first-child {
      grid-column: 1 / -1;
    }
  }
`;

export const FooterColumn = styled.div`
  /* Estilos específicos se necessário */
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    gap: 10px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

export const FooterText = styled.p`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
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
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export const FooterBottom = styled.div`
  padding-top: 24px;
  border-top: 1px solid #E5E7EB;
  text-align: center;
  
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export const Copyright = styled.p`
  font-size: 13px;
  color: #9CA3AF;
  
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
