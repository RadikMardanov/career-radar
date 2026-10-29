import { useState } from 'react'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

type Mode = 'login' | 'signup'

export default function Login() {
  const configured = isSupabaseConfigured()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Если env не задан — не рендерим форму, а говорим почему. Это страховка
  // от «белого экрана без ошибок»: человек видит причину текстом.
  if (!configured) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl border border-amber-300 shadow-sm p-6 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Авторизация недоступна</h1>
          <p className="text-slate-600 text-sm">
            Не заданы <code className="bg-slate-100 px-1 rounded">VITE_SUPABASE_URL</code> /{' '}
            <code className="bg-slate-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code>.
            Проверь Secrets в репозитории и блок <code className="bg-slate-100 px-1 rounded">env:</code> в workflow.
          </p>
        </div>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (!email.trim() || !password) {
      setError('Заполните email и пароль.')
      return
    }

    const sb = getSupabase()
    if (!sb) {
      setError('Клиент Supabase не инициализирован.')
      return
    }

    setBusy(true)
    try {
      if (mode === 'login') {
        const { data, error: err } = await sb.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (err) {
          setError(err.message)
          return
        }
        if (data.session) {
          setUserId(data.session.user.id)
          setInfo('Вход выполнен.')
        } else {
          setError('Сессия не получена. Попробуйте подтвердить email и войти снова.')
        }
      } else {
        const { data, error: err } = await sb.auth.signUp({
          email: email.trim(),
          password,
        })
        if (err) {
          setError(err.message)
          return
        }
        if (data.session) {
          // Confirmation email выключен — пускаем сразу.
          setUserId(data.session.user.id)
          setInfo('Аккаунт создан, вход выполнен.')
        } else if (data.user) {
          // Confirmation email включён — сессии нет, ждём письмо.
          setInfo('Аккаунт создан. Проверьте почту и подтвердите адрес, затем войдите.')
        } else {
          setError('Не удалось создать аккаунт. Попробуйте ещё раз.')
        }
      }
    } catch (err) {
      // Любое неожиданное падение сети/клиента — текстом, а не тихим fail.
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка.')
    } finally {
      setBusy(false)
    }
  }

  async function handleLogout() {
    const sb = getSupabase()
    if (!sb) return
    setBusy(true)
    try {
      await sb.auth.signOut()
      setUserId(null)
      setInfo('Вы вышли.')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось выйти.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-md p-8 space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h1>
          <p className="text-sm text-slate-500">Карьерный радар — личный AI-ассистент по поиску работы</p>
        </header>

        {/* Переключатель режимов */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setInfo(null) }}
            className={`flex-1 py-2 font-medium transition ${
              mode === 'login' ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Войти
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); setInfo(null) }}
            className={`flex-1 py-2 font-medium transition ${
              mode === 'signup' ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Зарегистрироваться
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy || !!userId}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Пароль</span>
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy || !!userId}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60"
              placeholder="Минимум 6 символов"
              minLength={6}
              required
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {info && !userId && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              {info}
            </p>
          )}

          {userId ? (
            <div className="space-y-3">
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 break-all">
                Вы вошли. ID пользователя: <span className="font-mono">{userId}</span>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                disabled={busy}
                className="w-full rounded-lg border border-slate-300 py-2 font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-60"
              >
                Выйти
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          )}
        </form>

        <p className="text-center text-xs text-slate-400">
          <a href="/career-radar/" className="hover:text-primary transition">← На главную</a>
        </p>
      </div>
    </main>
  )
}
