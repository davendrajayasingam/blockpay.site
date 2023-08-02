import { Metadata } from 'next'

import '@/app/globals.css'

import { Toaster } from 'react-hot-toast'

import Analytics from '@/utils/components/Analytics'

const metadataTitle = 'Get Paid in Crypto | BTC | ETH | USDT | USDC'
const metadataDescription = 'Create invoices for your customers and accept cryptocurrency as payment.'

export const metadata: Metadata = {
  title: {
    default: metadataTitle,
    template: `%s | ${metadataTitle}`
  },
  description: metadataDescription,
  openGraph: {
    title: {
      default: metadataTitle,
      template: `%s | ${metadataTitle}`
    },
    description: metadataDescription,
    url: process.env.NEXT_PUBLIC_DOMAIN_NAME,
    type: 'website'
  },
  keywords: [],
  robots: 'index, follow',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png'
  }
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props)
{
  return (
    <html
      lang='en'
      className='h-full bg-gray-900'
    >
      <head />
      <body className='font-sans h-full'>
        <main>
          {children}
        </main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}