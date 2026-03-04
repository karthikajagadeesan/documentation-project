// ─────────────────────────────────────────────────────────────────────────────
// lib/supabase barrel — re-export both client factories from a single path.
// Usage:
//   Browser component  → import { createBrowserSupabaseClient } from '@/lib/supabase'
//   Server component   → import { createServerSupabaseClient } from '@/lib/supabase'
// ─────────────────────────────────────────────────────────────────────────────

export { createClient as createBrowserSupabaseClient } from './client'
export { createClient as createServerSupabaseClient } from './server'
