import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ScrabbleSolver',
  description: 'If you\'ve always wanted to win at scrabble, but never been creative enough with your options, you\'ve come to the right place',
}

// With NextJs, all pages can have a layout file which will provide the return to
// all child pages as well. so theoretical /profile and /profile/settings routes
// could share a layout file.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
