import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'

const router = Router()

const updateProfileSchema = z.object({
    username: z
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres')
        .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
        .optional(),
    avatar_url: z.string().url().nullable().optional(),
})

/**
 * GET /api/users/profile
 * Perfil completo del usuario autenticado
 */
router.get('/profile', authenticate, async (req, res) => {
    const { data, error } = await supabase
        .from('profiles')
        .select(`
      *,
      user_achievements (
        earned_at,
        achievements ( id, name, description, icon )
      )
    `)
        .eq('id', req.user.id)
        .single()

    if (error) return res.status(404).json({ error: 'Perfil no encontrado' })
    res.json(data)
})

/**
 * PATCH /api/users/profile
 * Actualiza username y/o avatar_url
 */
router.patch('/profile', authenticate, validate(updateProfileSchema), async (req, res) => {
    const { username, avatar_url } = req.body

    // Comprobar unicidad del username si se quiere cambiar
    if (username) {
        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .neq('id', req.user.id)
            .single()

        if (existing) {
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' })
        }
    }

    const updates = {}
    if (username !== undefined) updates.username = username
    if (avatar_url !== undefined) updates.avatar_url = avatar_url

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No se enviaron datos para actualizar' })
    }

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', req.user.id)
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

/**
 * POST /api/users/avatar
 * Sube una imagen de perfil a Supabase Storage y actualiza avatar_url.
 * Body: multipart/form-data con campo "avatar" (imagen)
 *
 * Nota: usamos el cliente con service_role para poder subir sin politicas
 * adicionales en el bucket. En produccion configura RLS en Storage tambien.
 */
router.post('/avatar', authenticate, async (req, res) => {
    // Leer el body como buffer raw (imagen en base64 enviada como JSON)
    const { base64, mimeType } = req.body

    if (!base64 || !mimeType) {
        return res.status(400).json({ error: 'Se requiere base64 y mimeType' })
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(mimeType)) {
        return res.status(400).json({ error: 'Formato no permitido. Usa JPG, PNG, WEBP o GIF' })
    }

    // Convertir base64 a Buffer
    const buffer = Buffer.from(base64, 'base64')

    // Limitar tamaño a 2MB
    if (buffer.length > 2 * 1024 * 1024) {
        return res.status(400).json({ error: 'La imagen no puede superar 2MB' })
    }

    const ext = mimeType.split('/')[1].replace('jpeg', 'jpg')
    const fileName = `${req.user.id}/avatar.${ext}`

    // Subir a Supabase Storage (bucket: avatars)
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true,   // sobreescribir si ya existe
        })

    if (uploadError) {
        return res.status(500).json({ error: 'Error subiendo imagen: ' + uploadError.message })
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

    const avatar_url = urlData.publicUrl

    // Actualizar perfil con la nueva URL
    const { data: profile, error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url })
        .eq('id', req.user.id)
        .select()
        .single()

    if (updateError) return res.status(500).json({ error: updateError.message })

    res.json({ avatar_url, profile })
})

/**
 * GET /api/users/leaderboard
 * Top 10 por XP — público
 */
router.get('/leaderboard', async (req, res) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, xp, level, avatar_url, streak_days')
        .order('xp', { ascending: false })
        .limit(10)

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

export default router