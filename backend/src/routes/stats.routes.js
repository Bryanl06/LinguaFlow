import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * GET /api/stats/dashboard
 * Resumen completo para la pantalla principal del usuario.
 * Devuelve: perfil, stats de hoy, últimos 7 días, lecciones completadas.
 */
router.get('/dashboard', authenticate, async (req, res) => {
    const userId = req.user.id
    const today = new Date().toISOString().split('T')[0]

    // Stats del día de hoy
    const { data: todayStats } = await supabase
        .from('daily_stats')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .single()

    // Últimos 7 días (para gráfica de actividad)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

    const { data: weekStats } = await supabase
        .from('daily_stats')
        .select('date, exercises_done, correct_answers, xp_earned, minutes_studied')
        .eq('user_id', userId)
        .gte('date', sevenDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: true })

    // Conteo total de ejercicios completados
    const { count: totalExercises } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    // Ejercicios pendientes de revisión (SM-2)
    const { count: pendingReview } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .lte('next_review', new Date().toISOString())

    // Perfil del usuario
    const { data: profile } = await supabase
        .from('profiles')
        .select('username, level, xp, streak_days, avatar_url')
        .eq('id', userId)
        .single()

    res.json({
        profile,
        today: todayStats ?? {
            exercises_done: 0,
            correct_answers: 0,
            xp_earned: 0,
            minutes_studied: 0,
        },
        week_activity: weekStats ?? [],
        totals: {
            exercises_completed: totalExercises ?? 0,
            pending_review: pendingReview ?? 0,
        },
    })
})

/**
 * GET /api/stats/accuracy
 * Precisión por tipo de ejercicio (para el perfil detallado)
 */
router.get('/accuracy', authenticate, async (req, res) => {
    const { data, error } = await supabase
        .from('user_progress')
        .select(`
      correct_count,
      wrong_count,
      exercises ( type )
    `)
        .eq('user_id', req.user.id)

    if (error) return res.status(500).json({ error: error.message })

    // Agrupar por tipo de ejercicio
    const byType = {}
    for (const row of data) {
        const type = row.exercises?.type ?? 'unknown'
        if (!byType[type]) byType[type] = { correct: 0, wrong: 0 }
        byType[type].correct += row.correct_count
        byType[type].wrong += row.wrong_count
    }

    const result = Object.entries(byType).map(([type, counts]) => ({
        type,
        correct: counts.correct,
        wrong: counts.wrong,
        accuracy: counts.correct + counts.wrong > 0
            ? Math.round((counts.correct / (counts.correct + counts.wrong)) * 100)
            : 0,
    }))

    res.json(result)
})

export default router