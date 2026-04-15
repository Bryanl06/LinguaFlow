/**
 * GET /api/tts?text=Hello&lang=en-US&slow=false&engine=edge
 *
 * Proxy TTS que evita restricciones CORS.
 *
 * SEGURIDAD:
 *  - Validación estricta de parámetros (whitelist de langs/engines/genders)
 *  - Sanitización de texto para prevenir SSML injection en Edge TTS
 *  - Límite de longitud de texto
 *  - Headers de caché y Content-Type forzados
 *  - No expone errores internos al cliente
 */

import { Router } from 'express'

const router = Router()

const MAX_TEXT = 250
const TIMEOUT_MS = 8000

// Whitelist estricta de parámetros aceptados
const ALLOWED_LANGS = new Set(['en-US', 'en-GB', 'en-AU'])
const ALLOWED_ENGINES = new Set(['edge', 'google'])
const ALLOWED_GENDERS = new Set(['female', 'male'])

const GOOGLE_TTS_LANG = { 'en-US': 'en-US', 'en-GB': 'en-GB', 'en-AU': 'en-AU' }

const EDGE_VOICES = {
    'en-US': 'en-US-AriaNeural',
    'en-US-male': 'en-US-GuyNeural',
    'en-GB': 'en-GB-SoniaNeural',
    'en-GB-male': 'en-GB-RyanNeural',
    'en-AU': 'en-AU-NatashaNeural',
    'en-AU-male': 'en-AU-WilliamNeural',
}

// Sanitizar texto para XML/SSML — previene SSML injection
function sanitizeForSsml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        // Eliminar caracteres de control
        .replace(/[\x00-\x1F\x7F]/g, '')
        .trim()
}

async function fetchGoogleTTS(text, lang, slow) {
    const url = 'https://translate.google.com/translate_tts?' + new URLSearchParams({
        ie: 'UTF-8',
        q: text,
        tl: GOOGLE_TTS_LANG[lang] ?? 'en-US',
        ttsspeed: slow ? '0.5' : '1',
        client: 'gtx',
    })

    return fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://translate.google.com',
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
    })
}

async function fetchEdgeTTS(text, lang, slow, gender) {
    const voiceKey = gender === 'male' ? `${lang}-male` : lang
    const voice = EDGE_VOICES[voiceKey] ?? EDGE_VOICES[lang] ?? 'en-US-AriaNeural'
    const rate = slow ? '-30%' : '+0%'
    const safe = sanitizeForSsml(text)

    const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'><voice name='${voice}'><prosody rate='${rate}'>${safe}</prosody></voice></speak>`

    const tokenRes = await fetch(
        'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/token',
        {
            headers: {
                'Origin': 'https://www.bing.com',
                'Referer': 'https://www.bing.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            signal: AbortSignal.timeout(4000),
        }
    )
    if (!tokenRes.ok) throw new Error('Edge token failed')
    const token = await tokenRes.text()

    return fetch(
        'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=' + token,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
                'Origin': 'https://www.bing.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            },
            body: ssml,
            signal: AbortSignal.timeout(TIMEOUT_MS),
        }
    )
}

router.get('/', async (req, res) => {
    // Validar parámetros con whitelist — previene inyección
    const rawText = String(req.query.text ?? '').trim()
    const rawLang = String(req.query.lang ?? 'en-US')
    const rawEngine = String(req.query.engine ?? 'edge')
    const rawGender = String(req.query.gender ?? 'female')
    const isSlow = req.query.slow === 'true'

    if (!rawText) {
        return res.status(400).json({ error: 'text es requerido' })
    }

    // Whitelist estricta
    const lang = ALLOWED_LANGS.has(rawLang) ? rawLang : 'en-US'
    const engine = ALLOWED_ENGINES.has(rawEngine) ? rawEngine : 'edge'
    const gender = ALLOWED_GENDERS.has(rawGender) ? rawGender : 'female'

    // Truncar texto para prevenir abuso
    const text = rawText.slice(0, MAX_TEXT)

    try {
        let audioRes

        if (engine === 'google') {
            audioRes = await fetchGoogleTTS(text, lang, isSlow)
        } else {
            try {
                audioRes = await fetchEdgeTTS(text, lang, isSlow, gender)
            } catch {
                audioRes = await fetchGoogleTTS(text, lang, isSlow)
            }
        }

        if (!audioRes.ok) {
            return res.status(502).json({ error: 'Servicio de audio no disponible' })
        }

        const buffer = await audioRes.arrayBuffer()

        res.set({
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'X-Content-Type-Options': 'nosniff',
            'Content-Length': buffer.byteLength,
        })
        res.end(Buffer.from(buffer))

    } catch (err) {
        // Log interno, mensaje genérico al cliente
        console.error('[TTS]', err.message)
        res.status(503).json({ error: 'Servicio de audio temporalmente no disponible' })
    }
})

export default router