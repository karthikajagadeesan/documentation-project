import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/app/type/database-type'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'your-supabase-url' || !url.startsWith('http')) {
    if (typeof window !== 'undefined') {
      console.warn(
        'Supabase URL or Anon Key is missing or invalid. Please check your .env.local file.'
      )
    }
    throw new Error('Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return createBrowserClient<Database>(url, key)
}
