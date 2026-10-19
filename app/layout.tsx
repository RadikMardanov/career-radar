import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Карьерный радар',
  description: 'Персональный поиск работы с AI-подбором вакансий',
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
