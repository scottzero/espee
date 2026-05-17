import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchGlobalXP(): Promise<number> {
  const { data, error } = await supabase
    .from('global_stats')
    .select('total_xp')
    .single()
  if (error) return 0
  return data?.total_xp ?? 0
}

export async function incrementGlobalXP(amount: number): Promise<void> {
  const current = await fetchGlobalXP()
  await supabase
    .from('global_stats')
    .update({ total_xp: current + amount })
    .eq('total_xp', current)
}