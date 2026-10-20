'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

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

  // Если пользователь не авторизован, меню не показываем (остается чистый лендинг)
  if (!user) return null

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-primary flex items-center gap-2">
          🎯 Карьерный радар
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link href="/saved" className="text-slate-600 hover:text-primary text-sm font-medium transition">⭐ Избранное</Link>
          <Link href="/applications" className="text-slate-600 hover:text-primary text-sm font-medium transition">📋 Трекер</Link>
          <Link href="/profile" className="text-slate-600 hover:text-primary text-sm font-medium transition">⚙️ Профиль</Link>
          <button 
            onClick={handleLogout} 
            className="text-slate-500 hover:text-red-600 text-sm font-medium transition border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            Выйти
          </button>
        </nav>
      </div>
    </header>
  )
}
