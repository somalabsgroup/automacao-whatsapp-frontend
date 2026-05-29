import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'

export const metadata: Metadata = {
  metadataBase: new URL('https://somaclini.com.br'),
  title: {
    default: 'SomaClini - Atendimento Inteligente via WhatsApp para Clínicas',
    template: '%s | SomaClini'
  },
  description: 'Automatize o atendimento da sua clínica com IA. Agende consultas, confirme horários e reduza faltas pelo WhatsApp. Atendimento 24h, mais eficiência e tempo para o que importa.',
  keywords: [
    'atendimento whatsapp clínicas',
    'agendamento automático consultas',
    'automação clínica médica',
    'chatbot clínica',
    'confirmação consulta whatsapp',
    'redução faltas consulta',
    'atendimento 24h clínica',
    'agendamento inteligente',
    'IA para clínicas',
    'gestão clínica whatsapp'
  ],
  authors: [{ name: 'SomaLabs' }],
  creator: 'SomaLabs',
  publisher: 'SomaLabs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://somaclini.com.br',
    siteName: 'SomaClini',
    title: 'SomaClini - Atendimento Inteligente via WhatsApp para Clínicas',
    description: 'Automatize o atendimento da sua clínica com IA. Agende consultas, confirme horários e reduza faltas pelo WhatsApp. Atendimento 24h inteligente e humanizado.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SomaClini - Atendimento via WhatsApp para Clínicas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SomaClini - Atendimento Inteligente via WhatsApp',
    description: 'Automatize agendamentos e reduza faltas com atendimento 24h pelo WhatsApp. Mais eficiência para sua clínica.',
    images: ['/og-image.png'],
    creator: '@somaclini',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://somaclini.com.br',
  },
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
