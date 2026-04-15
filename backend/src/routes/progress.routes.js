import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validate, progressSchema } from '../middleware/validate.middleware.js'
import { calculateNextReview } from '../services/spacedRepetition.js'

const router = Router()

/**
 * POST /api/progress/submit
 */
router.post('/submit', authenticate, validate(progressSchema), async (req, res) => {
    const { exercise_id, correct, quality } = req.body
    const userId = req.user.id

    console.log('[submit] START', { userId, exercise_id, correct, quality })

    try {
        // 1. Progreso existente
        const { data: existing, error: e1 } = await supabase
            .from('user_progress')
            .select('correct_count,wrong_count,ease_factor,interval_days')
            .eq('user_id', userId)
            .eq('exercise_id', exercise_id)
            .maybeSingle()

        if (e1) console.error('[submit] step1 error:', e1.message)
        console.log('[submit] existing progress:', existing)

        // 2. SM-2
        const { newInterval, newEaseFactor, nextReview } = calculateNextReview(
            quality,
            existing?.ease_factor ?? 2.5,
            existing?.interval_days ?? 1
        )

        // 3. Upsert user_progress
        const { error: e2 } = await supabase
            .from('user_progress')
            .upsert({
                user_id: userId,
                exercise_id,
                correct_count: ((existing?.correct_count) || 0) + (correct ? 1 : 0),
                wrong_count: ((existing?.wrong_count) || 0) + (correct ? 0 : 1),
                interval_days: newInterval,
                ease_factor: newEaseFactor,
                next_review: nextReview,
                last_reviewed: new Date().toISOString(),
            }, { onConflict: 'user_id,exercise_id' })

        if (e2) {
            console.error('[submit] step3 upsert error:', e2.message)
            return res.status(500).json({ error: 'Error guardando progreso: ' + e2.message })
        }
        console.log('[submit] step3 upsert OK')

        // 4. XP
        const xpEarned = correct ? 10 : 2

        // 5. Perfil
        const { data: profile, error: e3 } = await supabase
            .from('profiles')
            .select('xp,level,streak_days,last_activity')
            .eq('id', userId)
            .maybeSingle()

        if (e3) console.error('[submit] step5 profile error:', e3.message)
        console.log('[submit] profile:', profile)

        const newXp = ((profile?.xp) || 0) + xpEarned
        const newLevel = calculateLevel(newXp)
        const today = new Date().toISOString().split('T')[0]
        const newStreak = calculateStreak(profile?.last_activity, today, (profile?.streak_days) || 0)

        const { error: e4 } = await supabase
            .from('profiles')
            .update({ xp: newXp, level: newLevel, streak_days: newStreak, last_activity: today })
            .eq('id', userId)

        if (e4) console.error('[submit] step5 update error:', e4.message)

        // 6. daily_stats
        const { data: todayStats, error: e5 } = await supabase
            .from('daily_stats')
            .select('exercises_done,correct_answers,xp_earned,minutes_studied')
            .eq('user_id', userId)
            .eq('date', today)
            .maybeSingle()

        if (e5) console.error('[submit] step6 stats error:', e5.message)

        const { error: e6 } = await supabase
            .from('daily_stats')
            .upsert({
                user_id: userId,
                date: today,
                exercises_done: ((todayStats?.exercises_done) || 0) + 1,
                correct_answers: ((todayStats?.correct_answers) || 0) + (correct ? 1 : 0),
                xp_earned: ((todayStats?.xp_earned) || 0) + xpEarned,
                minutes_studied: (todayStats?.minutes_studied) || 0,
            }, { onConflict: 'user_id,date' })

        if (e6) console.error('[submit] step6 upsert error:', e6.message)

        // 7. Logros
        let unlockedAchievements = []
        try {
            unlockedAchievements = await checkAchievements(userId, newXp, newStreak)
        } catch (achErr) {
            console.error('[submit] achievements error:', achErr.message)
        }

        const response = {
            correct,
            xp_earned: xpEarned,
            total_xp: newXp,
            level: newLevel,
            streak_days: newStreak,
            next_review: nextReview,
            new_achievements: unlockedAchievements,
        }
        console.log('[submit] SUCCESS, returning:', response)
        return res.json(response)

    } catch (err) {
        console.error('[submit] UNHANDLED ERROR:', err.message)
        console.error('[submit] STACK:', err.stack)
        return res.status(500).json({ error: err.message ?? 'Error interno' })
    }
})

/**
 * GET /api/progress
 */
router.get('/', authenticate, async (req, res) => {
    const { data, error } = await supabase
        .from('user_progress')
        .select('*, exercises ( id, type, question, lesson_id )')
        .eq('user_id', req.user.id)
        .order('last_reviewed', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    res.json(data ?? [])
})

// ── Helpers ────────────────────────────────────────────────────────────────────

function calculateLevel(xp) {
    const thresholds = [0, 100, 300, 700, 1500, 3000, 5500, 9000, 14000, 21000]
    let level = 1
    for (let i = 0; i < thresholds.length; i++) {
        if (xp >= thresholds[i]) level = i + 1
        else break
    }
    return level
}

function calculateStreak(lastActivity, today, currentStreak) {
    if (!lastActivity) return 1
    const diffDays = Math.floor(
        (new Date(today) - new Date(lastActivity)) / (1000 * 60 * 60 * 24)
    )
    if (diffDays === 0) return currentStreak
    if (diffDays === 1) return currentStreak + 1
    return 1
}

async function checkAchievements(userId, xp, streak) {
    const { data: allAchievements, error: e1 } = await supabase
        .from('achievements')
        .select('*')

    if (e1) {
        console.error('[checkAchievements] fetch error:', e1.message)
        return []
    }

    if (!Array.isArray(allAchievements) || allAchievements.length === 0) return []

    const { data: earned, error: e2 } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', userId)

    if (e2) {
        console.error('[checkAchievements] earned error:', e2.message)
        return []
    }

    const earnedIds = new Set(Array.isArray(earned) ? earned.map(e => e.achievement_id) : [])
    const newlyUnlocked = []

    for (const ach of allAchievements) {
        if (earnedIds.has(ach.id)) continue
        const unlocked =
            (ach.condition_type === 'xp' && xp >= ach.condition_value) ||
            (ach.condition_type === 'streak' && streak >= ach.condition_value)

        if (unlocked) {
            const { error: e3 } = await supabase
                .from('user_achievements')
                .insert({ user_id: userId, achievement_id: ach.id })
            if (!e3) newlyUnlocked.push(ach)
            else console.error('[checkAchievements] insert error:', e3.message)
        }
    }

    return newlyUnlocked
}

export default router