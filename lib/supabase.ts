import { createClient } from '@supabase/supabase-js'

// Жестко прописанные значения (временно, для теста)
const supabaseUrl = 'https://kjvxhdcrsucmouudiyzj.supabase.co'
const supabaseAnonKey = 'sb_publishable_G8kpCqajZoR7CB6giltTBw_ptGCmyzM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
