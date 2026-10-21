import { createClient } from '@supabase/supabase-js'

// Читаем из переменных окружения (Netlify подставит реальные значения при сборке).
// Заглушки нужны только чтобы `next build` не падал на этапе prerender, если env вдруг пуст.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
