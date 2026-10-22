'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Applications() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [appsCount, setAppsCount] = useState<number | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      
      // Заглушка: считаем количество заявок в трекере
      // Реальная таблица statuses и заметки появятся после Mod.6
      const { count } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
      
      setAppsCount(count ?? 0)
      setLoading(false)
    }
    
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📋</div>
          <p className="text-slate-600">Загрузка трекера...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">📋 Трекер откликов</h1>
          <p className="text-slate-600">Здесь вы будете отслеживать статусы ваших откликов на вакансии.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 text-center">
          <div className="text-6xl mb-4">🗂️</div>
          
          {appsCount === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Пока нет активных откликов</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Когда мы запустим модуль сбора вакансий и AI-генерацию писем, 
                вы сможете отправлять отклики и отслеживать их статус здесь: 
                Новая → Отклик отправлен → Собеседование → Оффер / Отказ.
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
              <h2 className="text-xl font-semibold text-slate-900 mb-2">У вас {appsCount} активных откликов</h2>
              <p className="text-slate-600 mb-6">
                Таблица со статусами и заметками появится после запуска модуля матчинга.
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

        {/* Предпросмотр будущей структуры статусов */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Как будет работать трекер:</h3>
          <div className="flex flex-wrap gap-2 items-center justify-center text-sm">
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium">Новая</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Отклик отправлен</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-medium">Собеседование</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium">Оффер ✅</span>
            <span className="mx-2 text-slate-300">или</span>
            <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full font-medium">Отказ ❌</span>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/saved" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⭐</div>
            <h3 className="font-semibold text-slate-900 mb-1">Избранные вакансии</h3>
            <p className="text-sm text-slate-600">Просматривайте сохранённые предложения</p>
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
