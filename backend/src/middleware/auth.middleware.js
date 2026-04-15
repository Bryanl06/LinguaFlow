import { supabaseAnon } from '../services/supabase.js'

/**
 * Verifica el JWT de Supabase.
 * Usa supabaseAnon (no service_role) para validar tokens de usuario.
 *
 * SEGURIDAD:
 *  - No expone mensajes de error internos de Supabase al cliente
 *  - No loguea el token completo, solo los primeros 8 chars para debug
 */
export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autorización requerido' })
    }

    const token = authHeader.slice(7).trim()

    if (!token) {
        return res.status(401).json({ error: 'Token vacío' })
    }

    const { data: { user }, error } = await supabaseAnon.auth.getUser(token)

    if (error || !user) {
        // Log interno con info mínima — nunca exponer error.message al cliente
        console.warn('[Auth] token inválido | prefix:', token.slice(0, 8) + '...')
        return res.status(401).json({ error: 'No autorizado' })
    }

    req.user = user
    req.token = token
    next()
}

/**
 * Adjunta el usuario si hay token válido, pero no bloquea si falta.
 */
export const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return next()

    const token = authHeader.slice(7).trim()
    if (!token) return next()

    const { data: { user } } = await supabaseAnon.auth.getUser(token)
    if (user) {
        req.user = user
        req.token = token
    }
    next()
}