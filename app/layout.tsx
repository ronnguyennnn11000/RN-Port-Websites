import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ronnguyen.me'),
  title: {
    default: 'RonNguyen-PMM',
    template: '%s | RonNguyen-PMM',
  },
  description:
    'Thoughtful design across brands, products, and digital experiences. We help ideas become clear, usable, and beautifully crafted.',
  keywords: [
    'design studio',
    'web design',
    'brand identity',
    'product design',
    'framer',
    'ux design',
    'ui design',
  ],
  authors: [{ name: 'Ron Nguyen' }],
  creator: 'Ron Nguyen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ronnguyen.me',
    siteName: 'RonNguyen-PMM',
    title: 'RonNguyen-PMM',
    description:
      'Thoughtful design across brands, products, and digital experiences.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RonNguyen-PMM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RonNguyen-PMM',
    description:
      'Thoughtful design across brands, products, and digital experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
