import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ClerkProvider } from "@clerk/react";
import { ptBR } from "@clerk/localizations";

import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ClerkProvider 
      afterSignOutUrl="/" 
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      localization={ptBR}
      appearance={{
        baseTheme: undefined, // ou 'dark' para tema escuro
        variables: {
          colorPrimary: '#10b981', // cor principal (verde)
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          colorDanger: '#ef4444',
          borderRadius: '0.5rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
        elements: {
          formButtonPrimary: 'bg-green-500 hover:bg-green-600',
          card: 'shadow-lg',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
          formFieldInput: 'border-gray-300 focus:border-green-500',
          footerAction: { display: 'none' },
          footerActionLink: { display: 'none' },
          footerActionText: { display: 'none' },
        },
      }}
    >
      <Outlet />
    </ClerkProvider>
  );
}
