import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import "./globals.css";

export const metadata: Metadata = {
  title: "SomaClini - Automação WhatsApp",
  description: "Sistema de automação de mensagens WhatsApp para clínicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={ptBR}
      signInUrl="/sign-in"
    >
      <html lang="pt-BR">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
