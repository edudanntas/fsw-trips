import { NextAuthProvider } from '@/providers/auth'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import ToastProvider from '@/providers/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trip Reservation',
  description: 'Created by Eduardo',
  favicon: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen">
              <div className="h-[94px]"><Header /></div>
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
