'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase автоматически обрабатывает токен из URL
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          setError('Ошибка авторизации: ' + error.message)
          return
        }

        if (session) {
          // Сессия сохранена — редирект на онбординг
          router.push('/onboarding')
        } else {
          setError('Сессия не создана. Попробуйте войти снова.')
        }
      } catch (err) {
        setError('Неожиданная ошибка при обработке авторизации')
      }
    }

    handleCallback()
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200 text-center">
        {error ? (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ошибка авторизации</h1>
            <p className="text-slate-600 mb-6">{error}</p>
            <a
              href="/login"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Попробовать снова
            </a>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4 animate-pulse">🔄</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Завершаем вход...</h1>
            <p className="text-slate-600">Пожалуйста, подождите</p>
          </>
        )}
      </div>
    </main>
  )
}
