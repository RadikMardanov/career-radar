import { createClient } from '@supabase/supabase-js'

// Добавляем заглушки, чтобы сборка (build) не падала с ошибкой "supabaseUrl is required"
// Во время реальной работы в браузере процесс.env подставит настоящие значения из Cloudflare
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
