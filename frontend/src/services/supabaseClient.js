import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el .env')
}

// Compatible con sb_publishable_... (nuevo formato) y eyJ... (legacy anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        headers: {
            // Con las nuevas claves sb_publishable_... el SDK necesita
            // la clave en el header apikey además de en la inicialización
            apikey: supabaseAnonKey,
        },
    },
})