import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { SITE_URL } from '@/lib/site'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const SITE_NAME = 'RFEC — Recife Frontend Community'
const SITE_DESCRIPTION =
  'A comunidade de pessoas desenvolvedoras frontend de Recife. Conheça, participe e cresça com a gente.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: 'RFEC',
  keywords: [
    'RFEC',
    'Recife Frontend Community',
    'comunidade frontend',
    'desenvolvedores frontend',
    'Recife',
    'Pernambuco',
    'meetup',
    'eventos de tecnologia'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'RFEC',
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
