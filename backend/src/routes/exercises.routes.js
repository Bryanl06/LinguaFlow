import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validate, exerciseSchema } from '../middleware/validate.middleware.js'

const router = Router()

/**
 * GET /api/exercises
 * Lista ejercicios. Filtros: ?lessonId=uuid&type=fill_blank&difficulty=2
 */
router.get('/', async (req, res) => {
    const { lessonId, type, difficulty } = req.query

    let query = supabase
        .from('exercises')
        .select('*')
        .order('difficulty', { ascending: true })

    if (lessonId) query = query.eq('lesson_id', lessonId)
    if (type) query = query.eq('type', type)
    if (difficulty) query = query.eq('difficulty', parseInt(difficulty))

    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

/**
 * GET /api/exercises/review
 * Devuelve los ejercicios pendientes de revisión para el usuario (SM-2).
 * Solo los que tienen next_review <= ahora.
 */
router.get('/review', authenticate, async (req, res) => {
    const now = new Date().toISOString()

    const { data, error } = await supabase
        .from('user_progress')
        .select(`
      exercise_id,
      interval_days,
      ease_factor,
      correct_count,
      wrong_count,
      exercises (
        id, type, question, correct_answer,
        options, audio_url, hint, difficulty, lesson_id
      )
    `)
        .eq('user_id', req.user.id)
        .lte('next_review', now)
        .limit(20)

    if (error) return res.status(500).json({ error: error.message })

    // Aplanar: devolver solo los datos del ejercicio + metadatos SM-2
    const exercises = data.map(row => ({
        ...row.exercises,
        sm2: {
            interval_days: row.interval_days,
            ease_factor: row.ease_factor,
            correct_count: row.correct_count,
            wrong_count: row.wrong_count,
        },
    }))

    res.json(exercises)
})

/**
 * GET /api/exercises/:id
 * Devuelve un ejercicio por ID
 */
router.get('/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', req.params.id)
        .single()

    if (error || !data) return res.status(404).json({ error: 'Ejercicio no encontrado' })
    res.json(data)
})

/**
 * POST /api/exercises
 * Crea un nuevo ejercicio
 */
router.post('/', authenticate, validate(exerciseSchema), async (req, res) => {
    const { data, error } = await supabase
        .from('exercises')
        .insert([req.body])
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
})

/**
 * PUT /api/exercises/:id
 * Actualiza un ejercicio existente
 */
router.put('/:id', authenticate, validate(exerciseSchema), async (req, res) => {
    const { data, error } = await supabase
        .from('exercises')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single()

    if (error || !data) return res.status(404).json({ error: 'Ejercicio no encontrado' })
    res.json(data)
})

/**
 * DELETE /api/exercises/:id
 */
router.delete('/:id', authenticate, async (req, res) => {
    const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', req.params.id)

    if (error) return res.status(500).json({ error: error.message })
    res.json({ message: 'Ejercicio eliminado' })
})

export default router