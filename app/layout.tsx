import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Дром - Размещение объявлений о продаже автомобилей',
  description: 'Разместите объявление о продаже автомобиля на Дром',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}











