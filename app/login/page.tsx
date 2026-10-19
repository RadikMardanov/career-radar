'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Проверяем, авторизован ли пользователь при загрузке
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Если уже авторизован — сразу на онбординг
        router.push('/onboarding')
      }
    }
    checkUser()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('✅ Ссылка для входа отправлена на вашу почту! Проверьте inbox.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">🎯 Карьерный радар</h1>
          <p className="text-slate-600">Войдите или зарегистрируйтесь через email</p>
          <p className="text-sm text-slate-500 mt-2">Без пароля — просто клик по ссылке</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-400"
          >
            {loading ? 'Отправка...' : ' Получить ссылку для входа'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:underline text-sm">
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </main>
  )
}
