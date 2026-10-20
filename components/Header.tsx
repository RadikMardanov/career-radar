'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Если пользователь не авторизован, меню не показываем
  if (!user) return null

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <Link href="/dashboard" className="text-xl font-bold text-primary flex items-center gap-2">
             Карьерный радар
          </Link>

          {/* Десктопное меню (скрыто на мобильных) */}
          <nav className="hidden sm:flex gap-4 sm:gap-6 items-center">
            <Link href="/saved" className="text-slate-600 hover:text-primary text-sm font-medium transition">
              ⭐ Избранное
            </Link>
            <Link href="/applications" className="text-slate-600 hover:text-primary text-sm font-medium transition">
              📋 Трекер
            </Link>
            <Link href="/profile" className="text-slate-600 hover:text-primary text-sm font-medium transition">
              ⚙️ Профиль
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-slate-500 hover:text-red-600 text-sm font-medium transition border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Выйти
            </button>
          </nav>

          {/* Мобильное меню (бургер) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Выпадающее мобильное меню */}
        {mobileMenuOpen && (
          <nav className="sm:hidden mt-4 pb-2 border-t border-slate-200 pt-4 space-y-2">
            <Link 
              href="/saved" 
              className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
               Избранное
            </Link>
            <Link 
              href="/applications" 
              className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              📋 Трекер
            </Link>
            <Link 
              href="/profile" 
              className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⚙️ Профиль
            </Link>
            <button 
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              🚪 Выйти
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
