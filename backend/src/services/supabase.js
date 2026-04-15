import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el .env')
}

if (!process.env.SUPABASE_ANON_KEY) {
    throw new Error('Falta SUPABASE_ANON_KEY en el .env')
}

/**
 * Cliente con SECRET KEY (antes service_role)
 * Compatible tanto con sb_secret_... como con el JWT legacy service_role
 * Bypasa RLS — solo para operaciones del servidor
 * NUNCA exponer en el frontend
 */
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
        global: {
            headers: {
                // Con las nuevas claves sb_secret_... el SDK necesita
                // la clave también en apikey además de Authorization
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            },
        },
    }
)

/**
 * Cliente con PUBLISHABLE KEY (antes anon)
 * Compatible tanto con sb_publishable_... como con el JWT legacy anon
 * Usar para verificar tokens de usuario (auth.getUser)
 * Es la misma clave que usa el frontend
 */
export const supabaseAnon = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
        global: {
            headers: {
                apikey: process.env.SUPABASE_ANON_KEY,
            },
        },
    }
)