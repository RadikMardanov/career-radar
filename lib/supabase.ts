import { createClient } from '@supabase/supabase-js'

// Берем данные из переменных окружения (которые мы добавили в Netlify)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Создаем "клиент" для общения с базой данных
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
