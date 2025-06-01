import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShutterConnect - Professional Photography Marketplace',
  description: 'Connect with professional photographers for your events, portraits, and commercial needs. Book sessions in under 60 seconds.',
  keywords: 'photography, photographer, booking, events, portraits, commercial photography',
  authors: [{ name: 'ShutterConnect Team' }],
  creator: 'ShutterConnect',
  publisher: 'ShutterConnect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ShutterConnect - Professional Photography Marketplace',
    description: 'Connect with professional photographers for your events, portraits, and commercial needs.',
    url: 'https://shutterconnect.com',
    siteName: 'ShutterConnect',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShutterConnect - Professional Photography Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShutterConnect - Professional Photography Marketplace',
    description: 'Connect with professional photographers for your events, portraits, and commercial needs.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
