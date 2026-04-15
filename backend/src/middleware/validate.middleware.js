import { z } from 'zod'

/**
 * Middleware de validación con Zod.
 *
 * SEGURIDAD:
 *  - Nunca loguea req.body en producción (puede contener contraseñas)
 *  - Los mensajes de error son genéricos y seguros para el cliente
 */
export const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            const issues = result.error?.errors ?? result.error?.issues ?? []
            const detalles = Array.isArray(issues)
                ? issues.map(e => ({
                    campo: e.path?.join('.') ?? '',
                    mensaje: e.message ?? 'Valor inválido',
                }))
                : []

            // Solo loguear en desarrollo
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[validate] fallo en', req.path, '→', detalles.map(d => d.campo).join(', '))
            }

            return res.status(400).json({ error: 'Datos inválidos', detalles })
        }

        req.body = result.data
        next()
    } catch (err) {
        console.error('[validate] error inesperado en', req.path)
        return res.status(400).json({ error: 'Error de validación' })
    }
}

// ── UUID permisivo (compatible con Zod v4 + UUIDs no estándar del seed) ───────
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// ── Schemas ───────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
    email: z.string().email('Email inválido').max(254),
    password: z.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(128, 'La contraseña es demasiado larga'),
    username: z.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres')
        .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
})

export const loginSchema = z.object({
    email: z.string().email('Email inválido').max(254),
    password: z.string().min(1).max(128),
})

export const exerciseSchema = z.object({
    lesson_id: z.string().regex(uuidRegex, 'lesson_id debe ser un UUID válido'),
    type: z.enum(['fill_blank', 'multiple_choice', 'flashcard', 'listening', 'speaking']),
    question: z.string().min(1).max(500),
    correct_answer: z.string().min(1).max(500),
    options: z.array(z.string().max(200)).min(2).max(6).nullable().optional(),
    audio_url: z.string().url().max(1000).nullable().optional(),
    hint: z.string().max(300).nullable().optional(),
    difficulty: z.number().int().min(1).max(5).default(1),
})

export const progressSchema = z.object({
    exercise_id: z.string().regex(uuidRegex, 'exercise_id debe ser un UUID válido'),
    correct: z.boolean(),
    quality: z.number().int().min(0).max(5),
})

export const lessonSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
    category: z.enum(['vocabulary', 'grammar', 'listening', 'speaking', 'reading']),
    order_index: z.number().int().min(0).default(0),
    xp_reward: z.number().int().min(1).max(1000).default(10),
})