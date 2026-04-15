import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import lessonsRoutes from './routes/lessons.routes.js'
import exercisesRoutes from './routes/exercises.routes.js'
import progressRoutes from './routes/progress.routes.js'
import statsRoutes from './routes/stats.routes.js'
import achievementsRoutes from './routes/achievements.routes.js'
import theoryRoutes from './routes/theory.routes.js'
import ttsRoutes from './routes/tts.routes.js'

// ── Variables de entorno obligatorias ─────────────────────────────────────────
const REQUIRED_ENV = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
for (const key of REQUIRED_ENV) {
    if (!process.env[key]) {
        console.error(`[FATAL] Variable de entorno faltante: ${key}`)
        process.exit(1)
    }
}

const app = express()
const PORT = process.env.PORT || 3000
const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5173'

// ── Seguridad: Helmet (cabeceras HTTP) ────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'", 'https://*.supabase.co'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginEmbedderPolicy: false,  // necesario para audio/video embebido
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
}))

// ── Seguridad: CORS estricto ──────────────────────────────────────────────────
app.use(cors({
    origin: (origin, cb) => {
        // Permitir peticiones sin origen (Postman, scripts locales en dev)
        if (!origin || origin === ALLOWED_ORIGIN) return cb(null, true)
        cb(new Error(`CORS: origen no permitido → ${origin}`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-TTS-Engine'],
    maxAge: 600,  // preflight cache 10 min
}))

// ── Seguridad: HTTP Parameter Pollution ──────────────────────────────────────
app.use(hpp())

// ── Rate limiting global + por ruta sensible ──────────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 min
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas peticiones. Inténtalo en 15 minutos.' },
    skip: (req) => req.path === '/api/health',
})

// Auth: límite más estricto para prevenir fuerza bruta
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'Demasiados intentos de autenticación. Espera 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
})

// TTS: limitar para no abusar de los proxies externos
const ttsLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 min
    max: 30,
    message: { error: 'Demasiadas peticiones de audio. Espera un momento.' },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(globalLimiter)
app.use('/api/auth', authLimiter)
app.use('/api/tts', ttsLimiter)

// ── Parsers con límites de tamaño (previene DoS) ──────────────────────────────
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: false, limit: '50kb' }))

// ── Eliminar cabecera X-Powered-By (no revelar stack) ────────────────────────
app.disable('x-powered-by')

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/lessons', lessonsRoutes)
app.use('/api/exercises', exercisesRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/achievements', achievementsRoutes)
app.use('/api/theory', theoryRoutes)
app.use('/api/tts', ttsRoutes)

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

// ── Error handler global ──────────────────────────────────────────────────────
// IMPORTANTE: nunca exponer stack traces ni mensajes internos al cliente
app.use((err, _req, res, _next) => {
    // Solo loguear internamente
    console.error('[Error]', err.message)

    // CORS error
    if (err.message?.startsWith('CORS')) {
        return res.status(403).json({ error: 'Acceso no permitido' })
    }

    // No exponer detalles en producción
    const isProd = process.env.NODE_ENV === 'production'
    res.status(err.status || 500).json({
        error: isProd ? 'Error interno del servidor' : (err.message || 'Error interno'),
    })
})

app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`)
    console.log(`🌍 Origen CORS permitido: ${ALLOWED_ORIGIN}`)
})

export default app