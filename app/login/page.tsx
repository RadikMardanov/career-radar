'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Диагностическая функция: показывает длину и края значения env
function debugEnv(name: string, value: string | undefined) {
  if (!value) return `${name}: НЕ ЗАДАН (undefined)`
  const len = value.length
  const head = value.slice(0, 14)
  const tail = value.slice(-8)
  return `${name}: длина=${len} | ${head}...${tail}`
}

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/dashboard')
    }
    checkUser()
  }, [router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('✅ Регистрация успешна! Перенаправляем в кабинет...')
        setTimeout(() => router.push('/dashboard'), 1200)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      if (err.message.includes('Invalid login credentials')) {
        setError('Неверный email или пароль. Проверьте данные или зарегистрируйтесь.')
      } else if (err.message.includes('User already registered')) {
        setError('Этот email уже зарегистрирован. Войдите в систему.')
        setIsSignUp(false)
      } else if (err.message.includes('Invalid API key')) {
        setError('Ошибка ключа API. См. жёлтую диагностику внизу.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Читаем env для диагностики (публичные ключи, это безопасно)
  const dbgUrl = debugEnv('URL', process.env.NEXT_PUBLIC_SUPABASE_URL)
  const dbgKey = debugEnv('KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">🎯 Карьерный радар</h1>
          <p className="text-slate-600">{isSignUp ? 'Создайте аккаунт' : 'Войдите в аккаунт'}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="your@email.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Пароль</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Минимум 6 символов" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-400">
            {loading ? 'Обработка...' : (isSignUp ? 'Зарегистрироваться' : 'Войти')}
          </button>
        </form>

        {message && <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">{message}</div>}
        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm text-center">{error}</div>}

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 mb-2">{isSignUp ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}</p>
          <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage('') }}
            className="text-primary font-semibold hover:underline text-sm">
            {isSignUp ? 'Войти в систему' : 'Зарегистрироваться бесплатно'}
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm">← На главную</Link>
        </div>

        {/* === ДИАГНОСТИКА (жёлтый блок) === */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-xs font-mono break-all text-slate-700">
          <div className="font-bold mb-1 text-yellow-800">DEBUG ENV:</div>
          <div>{dbgUrl}</div>
          <div>{dbgKey}</div>
        </div>
      </div>
    </main>
  )
}
