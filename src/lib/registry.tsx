'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { useThemeStore } from '@/stores/useThemeStore';
import { lightTheme, darkTheme } from '@/styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.text.primary};
    background: ${({ theme }) => theme.bg.secondary};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  /* Scrollbar global — Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.scrollbar.thumb} transparent;
  }

  /* Scrollbar global — WebKit/Blink */
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.thumb};
    border-radius: 9999px;
    transition: background 0.2s;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbar.thumbHover};
  }

  *::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const { mode } = useThemeStore();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
}
