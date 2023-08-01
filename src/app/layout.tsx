import '~styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StoreProvider } from '~redux/Provider/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Super Hexagon',
  description: ':DDDDD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
