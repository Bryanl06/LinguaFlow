import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { validate, registerSchema, loginSchema } from '../middleware/validate.middleware.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * POST /api/auth/register
 * Crea usuario en auth.users + perfil en profiles con service_role.
 * El service_role bypasa RLS — el INSERT en profiles siempre funciona.
 */
router.post('/register', validate(registerSchema), async (req, res) => {
    const { email, password, username } = req.body

    // maybeSingle() en lugar de single() — no explota si no hay fila
    const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle()

    if (existing) {
        return res.status(409).json({ error: 'El nombre de usuario ya está en uso' })
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })

    if (authError) {
        const msg = authError.message
        if (msg.includes('already registered') || msg.includes('already been registered')) {
            return res.status(409).json({ error: 'El email ya está registrado' })
        }
        return res.status(500).json({ error: msg })
    }

    const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: authData.user.id, username, level: 1, xp: 0, streak_days: 0 })

    if (profileError) {
        await supabase.auth.admin.deleteUser(authData.user.id)
        return res.status(500).json({ error: 'Error creando el perfil: ' + profileError.message })
    }

    res.status(201).json({
        message: 'Cuenta creada. Ya puedes iniciar sesión.',
        user: { id: authData.user.id, email, username },
    })
})

/**
 * POST /api/auth/login — SOLO usado como fallback para obtener el perfil.
 * El login real lo hace el SDK de Supabase en el frontend directamente.
 * Este endpoint ya no gestiona tokens — solo devuelve los datos del perfil
 * a quien ya está autenticado (útil para /api/auth/me).
 */
router.post('/login', validate(loginSchema), async (req, res) => {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(401).json({ error: 'Email o contraseña incorrectos' })

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()

    await supabase
        .from('profiles')
        .update({ last_activity: new Date().toISOString().split('T')[0] })
        .eq('id', data.user.id)

    res.json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        user: {
            id: data.user.id,
            email: data.user.email,
            username: profile?.username ?? null,
            level: profile?.level ?? 1,
            xp: profile?.xp ?? 0,
            streak_days: profile?.streak_days ?? 0,
            avatar_url: profile?.avatar_url ?? null,
            created_at: profile?.created_at ?? null,
            last_activity: profile?.last_activity ?? null,
        },
    })
})

/**
 * POST /api/auth/logout
 */
router.post('/logout', authenticate, async (req, res) => {
    await supabase.auth.admin.signOut(req.token)
    res.json({ message: 'Sesión cerrada correctamente' })
})

/**
 * GET /api/auth/me
 */
router.get('/me', authenticate, async (req, res) => {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.user.id)
        .maybeSingle()

    if (error || !profile) return res.status(404).json({ error: 'Perfil no encontrado' })
    res.json({ id: req.user.id, email: req.user.email, ...profile })
})

export default router