'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SavedVacancies() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [savedCount, setSavedCount] = useState<number | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      
      // Заглушка: считаем количество сохранённых вакансий
      // Реальная выборка появится после подключения Collector
      const { count } = await supabase
        .from('saved_vacancies')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
      
      setSavedCount(count ?? 0)
      setLoading(false)
    }
    
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">⭐</div>
          <p className="text-slate-600">Загрузка избранного...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">⭐ Избранные вакансии</h1>
          <p className="text-slate-600">Здесь будут отображаться вакансии, которые вы сохранили из ежедневных отчётов.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 text-center">
          <div className="text-6xl mb-4">📭</div>
          
          {savedCount === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Пока нет сохранённых вакансий</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Когда мы запустим сбор вакансий с hh.ru, SuperJob и других площадок, 
                вы сможете сохранять лучшие предложения одним кликом из письма или личного кабинета.
              </p>
              <Link 
                href="/profile" 
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                ⚙️ Настроить профиль поиска
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">У вас {savedCount} сохранённых вакансий</h2>
              <p className="text-slate-600 mb-6">
                Список появится после запуска модуля сбора вакансий (Collector).
              </p>
              <button 
                disabled 
                className="inline-block bg-slate-200 text-slate-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                🔜 Скоро будет доступно
              </button>
            </>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/applications" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
            <h3 className="font-semibold text-slate-900 mb-1">Трекер откликов</h3>
            <p className="text-sm text-slate-600">Отслеживайте статусы ваших откликов</p>
          </Link>
          
          <Link href="/profile" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
            <h3 className="font-semibold text-slate-900 mb-1">Мой профиль</h3>
            <p className="text-sm text-slate-600">Измените параметры поиска работы</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
