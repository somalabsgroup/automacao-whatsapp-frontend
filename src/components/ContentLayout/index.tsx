'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, ConversationPanel, MainContent, Resizer } from './styles';

interface ContentLayoutProps {
  conversationList: React.ReactNode;
  children: React.ReactNode;
}

export default function ContentLayout({ conversationList, children }: ContentLayoutProps) {
  const [panelWidth, setPanelWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;

      // Limites mínimo e máximo para a largura
      if (newWidth >= 280 && newWidth <= 600) {
        setPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <Container ref={containerRef}>
      <ConversationPanel $width={panelWidth}>{conversationList}</ConversationPanel>
      <Resizer onMouseDown={handleMouseDown} $isResizing={isResizing} />
      <MainContent>{children}</MainContent>
    </Container>
  );
}
