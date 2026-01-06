import { createBrowserClient } from '@supabase/ssr'

// Asegúrate de tener estas variables en tu .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => {
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}