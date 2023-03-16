import './globals.css'

import { Poppins } from 'next/font/google'


const poppins = Poppins({
  weight: ['200', '500', '800'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Fundadores Podcast Image Generator',
  description: 'Made using vercel/og, by Kai Takami',
  image: `${process.env.NEXT_PUBLIC_URL}/api/thumbnail`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  )
}
