import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
        url: '/assets/hero.png',
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
    images: ['/assets/hero.png'],
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
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '192x192' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180' },
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
