'use client';

import styled from 'styled-components';
import { useSidebarStore } from '@/stores/useSidebarStore';

const MainWrapper = styled.div<{ $sidebarOpen: boolean }>`
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '256px' : '80px')};
  transition: margin-left 0.3s ease, background-color 0.2s ease;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bg.secondary};
`;

const MainContent = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen } = useSidebarStore();

  return (
    <MainWrapper $sidebarOpen={isOpen}>
      <MainContent>{children}</MainContent>
    </MainWrapper>
  );
}
