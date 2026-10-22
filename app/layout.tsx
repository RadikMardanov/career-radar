import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import YandexMetrika from '@/components/YandexMetrika'

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
      <body className="flex flex-col min-h-screen">
        {/* Компонент Метрики рендерится один раз при монтировании */}
        <YandexMetrika />
        
        {/* Адаптивное меню видно только авторизованным пользователям */}
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  )
}
