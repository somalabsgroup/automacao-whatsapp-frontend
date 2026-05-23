import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'

export const metadata: Metadata = {
  title: 'Automação WhatsApp',
  description: 'Sistema de automação de mensagens WhatsApp para clínicas médicas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
