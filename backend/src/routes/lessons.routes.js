import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { validate, lessonSchema } from '../middleware/validate.middleware.js'

const router = Router()

/**
 * GET /api/lessons
 * Lista todas las lecciones. Filtros opcionales: ?level=A1&category=vocabulary
 */
router.get('/', async (req, res) => {
    const { level, category } = req.query

    let query = supabase
        .from('lessons')
        .select(`
      id, title, description, level, category, order_index, xp_reward,
      exercises ( id )
    `)
        .order('order_index', { ascending: true })

    if (level) query = query.eq('level', level)
    if (category) query = query.eq('category', category)

    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

/**
 * GET /api/lessons/:id
 * Devuelve una lección con todos sus ejercicios
 */
router.get('/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('lessons')
        .select(`
      *,
      exercises (
        id, type, question, correct_answer, options,
        audio_url, hint, difficulty
      )
    `)
        .eq('id', req.params.id)
        .single()

    if (error || !data) return res.status(404).json({ error: 'Lección no encontrada' })
    res.json(data)
})

/**
 * POST /api/lessons
 * Crea una lección (solo usuarios autenticados — en producción añadir rol admin)
 */
router.post('/', authenticate, validate(lessonSchema), async (req, res) => {
    const { data, error } = await supabase
        .from('lessons')
        .insert([req.body])
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
})

/**
 * PUT /api/lessons/:id
 * Actualiza una lección completa
 */
router.put('/:id', authenticate, validate(lessonSchema), async (req, res) => {
    const { data, error } = await supabase
        .from('lessons')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single()

    if (error || !data) return res.status(404).json({ error: 'Lección no encontrada' })
    res.json(data)
})

/**
 * DELETE /api/lessons/:id
 * Elimina una lección y sus ejercicios (CASCADE en BD)
 */
router.delete('/:id', authenticate, async (req, res) => {
    const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', req.params.id)

    if (error) return res.status(500).json({ error: error.message })
    res.json({ message: 'Lección eliminada correctamente' })
})

/**
 * GET /api/lessons/debug
 * Comprueba la conexión con Supabase y devuelve info de diagnóstico.
 * ELIMINAR EN PRODUCCIÓN.
 */
router.get('/debug', async (req, res) => {
    // Test 1: contar lecciones sin filtros ni RLS
    const { count, error: countError } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })

    // Test 2: obtener las primeras 3 lecciones en crudo
    const { data: sample, error: sampleError } = await supabase
        .from('lessons')
        .select('id, title, level')
        .limit(3)

    res.json({
        total_lessons: count,
        count_error: countError?.message ?? null,
        sample_lessons: sample,
        sample_error: sampleError?.message ?? null,
        supabase_url: process.env.SUPABASE_URL ? 'SET' : 'MISSING',
        service_key: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
    })
})

export default router