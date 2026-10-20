'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🔄</div>
          <p className="text-slate-600">Загрузка личного кабинета...</p>
        </div>
      </div>
    )
  }

  const planName = profile?.plan === 'pro_trial' ? 'Pro Trial (3 дня бесплатно)' 
                 : profile?.plan === 'pro' ? 'Pro (390 ₽/мес)' 
                 : 'Beta Free'

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Добро пожаловать в Личный кабинет!</h1>
          <p className="text-slate-600">Управляйте своими поисками, отслеживайте отклики и сохраняйте лучшие вакансии.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Карточка 1: Избранное */}
          <Link href="/saved" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⭐</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Избранные вакансии</h3>
            <p className="text-slate-600 text-sm">Просматривайте и управляйте сохраненными вакансиями, чтобы не потерять лучшие предложения.</p>
          </Link>

          {/* Карточка 2: Трекер */}
          <Link href="/applications" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Трекер откликов</h3>
            <p className="text-slate-600 text-sm">Отслеживайте статусы ваших откликов: от "Новая" до "Оффер" или "Отказ".</p>
          </Link>

          {/* Карточка 3: Профиль */}
          <Link href="/profile" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚙️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Мой профиль</h3>
            <p className="text-slate-600 text-sm">Измените параметры поиска, зарплатные ожидания, ключевые и стоп-слова.</p>
          </Link>

          {/* Карточка 4: Тариф */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">Ваш текущий тариф</h3>
            <p className="text-blue-800 text-sm mb-4 font-medium">{planName}</p>
            {profile?.plan !== 'pro' && (
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition w-full sm:w-auto">
                Активировать Pro за 390 ₽
              </button>
            )}
            {profile?.plan === 'pro' && (
              <p className="text-green-700 text-sm font-medium">✅ Все функции Pro активны</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
