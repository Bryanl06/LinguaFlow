import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * GET /api/achievements
 * Lista todos los logros disponibles con indicador de si el usuario los tiene
 */
router.get('/', authenticate, async (req, res) => {
    const { data: all, error } = await supabase
        .from('achievements')
        .select('*')
        .order('condition_value', { ascending: true })

    if (error) return res.status(500).json({ error: error.message })

    const { data: earned } = await supabase
        .from('user_achievements')
        .select('achievement_id, earned_at')
        .eq('user_id', req.user.id)

    const earnedMap = {}
    for (const e of (earned ?? [])) earnedMap[e.achievement_id] = e.earned_at

    const result = all.map(ach => ({
        ...ach,
        earned: !!earnedMap[ach.id],
        earned_at: earnedMap[ach.id] ?? null,
    }))

    res.json(result)
})

export default router