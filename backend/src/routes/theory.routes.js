import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import {
    authenticate,
    optionalAuth
} from '../middleware/auth.middleware.js'
import { getStaticContent } from '../services/grammarContent.js'
import { checkSentence } from '../services/languagetool.js'

const router = Router()

/**
 * GET /api/theory
 * Lista todos los temas con filtro opcional por nivel.
 */
router.get('/', optionalAuth, async (req, res) => {
    const { level } = req.query

    let query = supabase
        .from('grammar_topics')
        .select('id, slug, title, level, category, order_index, generated_at')
        .order('order_index', { ascending: true })

    if (level) {
        const levels = Array.isArray(level) ? level : [level]
        query = query.in('level', levels)
    }

    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })

    const topics = (data ?? []).map(t => ({
        ...t,
        has_content: !!t.generated_at,
    }))

    res.json(topics)
})

/**
 * GET /api/theory/:slug
 * Devuelve un tema con su explicación completa.
 * Usa contenido estático integrado — sin APIs externas, sin límites.
 */
router.get('/:slug', optionalAuth, async (req, res) => {
    const { slug } = req.params

    // 1. Buscar el tema en la BD
    const { data: topic, error } = await supabase
        .from('grammar_topics')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })
    if (!topic) return res.status(404).json({ error: `Tema "${slug}" no encontrado` })

    // 2. Si ya tiene contenido cacheado en BD, devolverlo directamente
    if (topic.content && topic.generated_at) {
        return res.json(topic)
    }

    // 3. Obtener contenido estático integrado (sin APIs, sin límites, siempre disponible)
    const staticContent = getStaticContent(slug)

    if (!staticContent) {
        return res.status(404).json({ error: `No hay contenido disponible para "${slug}"` })
    }

    // 4. Guardar en BD para acelerar las siguientes peticiones
    const { data: updated } = await supabase
        .from('grammar_topics')
        .update({ content: staticContent, generated_at: new Date().toISOString() })
        .eq('slug', slug)
        .select()
        .maybeSingle()

    return res.json(updated ?? { ...topic, content: staticContent })
})

/**
 * POST /api/theory/:slug/regenerate
 * Recarga el contenido estático en BD (útil si se actualizó grammarContent.js).
 */
router.post('/:slug/regenerate', authenticate, async (req, res) => {
    const { slug } = req.params

    const staticContent = getStaticContent(slug)
    if (!staticContent) {
        return res.status(404).json({ error: 'No hay contenido estático para este tema' })
    }

    const { data: updated, error } = await supabase
        .from('grammar_topics')
        .update({ content: staticContent, generated_at: new Date().toISOString() })
        .eq('slug', slug)
        .select()
        .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })
    res.json(updated)
})

/**
 * POST /api/theory/check-grammar
 * Comprueba gramática con LanguageTool (gratuito, sin clave).
 */
router.post('/check-grammar', authenticate, async (req, res) => {
    const { text } = req.body

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Se requiere el campo text' })
    }

    if (text.length > 500) {
        return res.status(400).json({ error: 'El texto no puede superar 500 caracteres' })
    }

    try {
        const result = await checkSentence(text.trim())
        res.json(result)
    } catch (err) {
        console.error('[check-grammar] LanguageTool error:', err.message)
        res.status(503).json({
            error: 'Servicio de corrección no disponible temporalmente',
            correct: null,
            errors: [],
        })
    }
})

export default router