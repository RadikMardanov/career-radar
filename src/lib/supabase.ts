import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Читаем env один раз и приводим к честному типу string | undefined.
// Имена ОБЯЗАНЫ совпадать с именами secrets и с блоком env: в workflow (Шаг 16).
const SUPABASE_URL: string | undefined = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY

// Ленивый singleton: клиент создаётся при первом обращении, а не на импорте модуля.
// Благодаря этому отсутствие env не роняет лендинг — падение было бы только если бы
// createClient(...) вызывался на верхнем уровне файла.
let client: SupabaseClient | null = null
let warned = false

/**
 * Возвращает настроенный клиент Supabase или null, если env не задан.
 * Вызывающий код (форма входа, Шаг 18) обязан обработать null.
 */
export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (!warned) {
      // Одно предупреждение на сессию, чтобы не спамить консоль при каждом рендере.
      console.warn(
        '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY не заданы — ' +
        'авторизация недоступна. Проверь Secrets в репозитории и блок env: в workflow.',
      )
      warned = true
    }
    return null
  }

  if (client === null) {
    // Без третьего аргумента: дефолты supabase-js (persistSession через localStorage,
    // авто-обновление токена) — именно то, что нужно для статики на GitHub Pages.
    // Намеренно не передаём options-объект, чтобы не зависеть от схемы конкретной версии.
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }

  return client
}

/** Быстрый флаг для UI: показать баннер «не настроено», не дёргая getSupabase() в рендере. */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}
