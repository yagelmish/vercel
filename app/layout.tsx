import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Heebo, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import { siteContent } from '@/lib/site-content'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: siteContent.meta.title.en,
  description: siteContent.meta.description.en,
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`dark ${inter.variable} ${heebo.variable} ${geistMono.variable} bg-background`}
    >
      <body className="antialiased bg-background text-foreground font-sans">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
