import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Contact Book - A Contact Management App",
  description: "Developed by ~Zain-ul-Abdin",
  creator: "Muhammad Zain-ul-Abdin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body className={`${inter.className} min-w-[350px]`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
