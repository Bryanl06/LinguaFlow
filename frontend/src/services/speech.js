/**
 * Servicio de Audio — cadena de calidad descendente:
 *
 *  1. Free Dictionary API  → grabaciones reales de nativos (palabras sueltas)
 *  2. Microsoft Edge TTS   → voces neurales via backend proxy
 *                           (en-US-AriaNeural / en-US-GuyNeural /
 *                            en-GB-SoniaNeural / en-GB-RyanNeural /
 *                            en-AU-NatashaNeural)
 *  3. Google Translate TTS → fallback neural sin clave
 *  4. ElevenLabs           → ultrarrealista (requiere VITE_ELEVENLABS_API_KEY)
 *  5. Web Speech API       → siempre disponible, calidad del sistema
 */

const API_BASE = import.meta.env.VITE_API_URL ?? ''
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY ?? ''

const ELEVENLABS_VOICES = {
    'en-US': { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (American)' },
    'en-US-male': { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold (American)' },
    'en-GB': { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte (British)' },
    'en-GB-male': { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (British)' },
    'en-AU': { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Australian)' },
}
const ELEVENLABS_MODEL = 'eleven_turbo_v2_5'

const VOICE_PRIORITY = {
    'en-US': [
        'Google US English',
        'Microsoft Aria Online (Natural) - English (United States)',
        'Microsoft Guy Online (Natural) - English (United States)',
        'Samantha', 'Alex', 'Ava',
    ],
    'en-GB': [
        'Google UK English Female',
        'Google UK English Male',
        'Microsoft Libby Online (Natural) - English (United Kingdom)',
        'Microsoft Ryan Online (Natural) - English (United Kingdom)',
        'Microsoft Sonia Online (Natural) - English (United Kingdom)',
        'Daniel', 'Serena',
    ],
    'en-AU': [
        'Google Australian English',
        'Microsoft Natasha Online (Natural) - English (Australia)',
        'Karen',
    ],
}

export const ACCENTS = [
    { code: 'en-US', label: 'Americano', flag: '🇺🇸', desc: 'Inglés americano neutro' },
    { code: 'en-GB', label: 'Británico', flag: '🇬🇧', desc: 'Received Pronunciation — BBC English' },
    { code: 'en-AU', label: 'Australiano', flag: '🇦🇺', desc: 'Inglés australiano estándar' },
]

let currentAccent = 'en-US'
let currentGender = 'female'
let currentAudio = null

export function setAccent(a) { currentAccent = a }
export function getAccent() { return currentAccent }
export function setGender(g) { currentGender = g }
export function getGender() { return currentGender }

export function stopSpeaking() {
    if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
        currentAudio = null
    }
    window.speechSynthesis?.cancel()
}

const audioCache = new Map()
const MAX_CACHE = 100

function cacheKey(text, accent, gender, slow) {
    return `${accent}:${gender}:${slow}::${text}`
}

function addToCache(key, url) {
    if (audioCache.size >= MAX_CACHE) {
        const first = audioCache.keys().next().value
        try { URL.revokeObjectURL(audioCache.get(first)) } catch { }
        audioCache.delete(first)
    }
    audioCache.set(key, url)
}

async function playUrl(url, rate = 1.0) {
    return new Promise((resolve, reject) => {
        stopSpeaking()
        const audio = new Audio(url)
        audio.playbackRate = Math.max(0.5, Math.min(2, rate))
        currentAudio = audio
        audio.onended = () => { currentAudio = null; resolve() }
        audio.onerror = () => { currentAudio = null; reject(new Error('Audio error')) }
        audio.play().catch(reject)
    })
}

async function dictionaryAudio(word, accent = 'en-US') {
    const clean = word.trim().toLowerCase().replace(/[^a-z'-]/g, '')
    if (!clean || clean.includes(' ')) return null
    const key = `dict:${accent}:${clean}`
    if (audioCache.has(key)) return audioCache.get(key)
    try {
        const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`,
            { signal: AbortSignal.timeout(4000) }
        )
        if (!res.ok) return null
        const data = await res.json()
        const phonetics = data[0]?.phonetics ?? []
        const isUK = accent === 'en-GB'
        const isAU = accent === 'en-AU'
        let audioUrl = null
        if (isUK) {
            audioUrl = phonetics.find(p => p.audio?.includes('-uk'))?.audio ?? phonetics.find(p => p.audio)?.audio
        } else if (isAU) {
            audioUrl = phonetics.find(p => p.audio?.includes('-au'))?.audio ?? phonetics.find(p => p.audio)?.audio
        } else {
            audioUrl = phonetics.find(p => p.audio && !p.audio.includes('-uk') && !p.audio.includes('-au'))?.audio
                ?? phonetics.find(p => p.audio)?.audio
        }
        if (!audioUrl) return null
        addToCache(key, audioUrl)
        return audioUrl
    } catch { return null }
}

async function backendTTS(text, accent = 'en-US', slow = false, gender = 'female', engine = 'edge') {
    const key = cacheKey(text, accent, gender + engine, slow)
    if (audioCache.has(key)) return audioCache.get(key)
    try {
        const params = new URLSearchParams({ text, lang: accent, slow: slow.toString(), engine, gender })
        const res = await fetch(`${API_BASE}/api/tts?${params}`, { signal: AbortSignal.timeout(9000) })
        if (!res.ok) return null
        const blob = new Blob([await res.arrayBuffer()], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        addToCache(key, url)
        return url
    } catch { return null }
}

async function elevenLabsTTS(text, accent = 'en-US', gender = 'female') {
    if (!ELEVENLABS_API_KEY) return null
    const voiceKey = gender === 'male' ? `${accent}-male` : accent
    const voice = ELEVENLABS_VOICES[voiceKey] ?? ELEVENLABS_VOICES[accent] ?? ELEVENLABS_VOICES['en-US']
    const key = cacheKey(text, accent, `eleven:${gender}`, false)
    if (audioCache.has(key)) return audioCache.get(key)
    try {
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.id}/stream`, {
            method: 'POST',
            headers: { 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
            body: JSON.stringify({
                text, model_id: ELEVENLABS_MODEL,
                voice_settings: { stability: 0.45, similarity_boost: 0.90, style: 0.15, use_speaker_boost: true },
            }),
            signal: AbortSignal.timeout(12000),
        })
        if (!res.ok) return null
        const blob = new Blob([await res.arrayBuffer()], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        addToCache(key, url)
        return url
    } catch { return null }
}

function getBestVoice(accent = 'en-US') {
    const voices = window.speechSynthesis?.getVoices() ?? []
    const priority = VOICE_PRIORITY[accent] ?? VOICE_PRIORITY['en-US']
    for (const name of priority) {
        const v = voices.find(v => v.name === name)
        if (v) return v
    }
    for (const name of priority) {
        const parts = name.split(' ')
        const v = voices.find(v => parts.some(p => v.name.includes(p) && v.lang.startsWith('en')))
        if (v) return v
    }
    return voices.find(v => v.lang === accent && v.localService)
        ?? voices.find(v => v.lang === accent)
        ?? voices.find(v => v.lang.startsWith('en'))
        ?? null
}

function webSpeechTTS(text, accent = 'en-US', rate = 0.9) {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = accent
    utt.rate = Math.max(0.5, Math.min(2, rate))
    utt.pitch = 1.0
    utt.volume = 1.0
    const assign = () => { const v = getBestVoice(accent); if (v) utt.voice = v }
    if (window.speechSynthesis.getVoices().length > 0) assign()
    else window.speechSynthesis.addEventListener('voiceschanged', assign, { once: true })
    utt.onerror = (e) => { if (e.error !== 'interrupted') console.warn('[WebSpeech]', e.error) }
    window.speechSynthesis.speak(utt)
}

/**
 * Pronuncia texto con la mejor fuente disponible.
 * @param {string} text
 * @param {{ accent?, gender?, rate?, slow? }} options
 */
export async function speakText(text, options = {}) {
    if (!text?.trim()) return

    const accent = options.accent ?? currentAccent
    const gender = options.gender ?? currentGender
    const rate = options.rate ?? 1.0
    const slow = options.slow ?? false
    const isSingleWord = text.trim().split(/\s+/).length === 1

    if (isSingleWord) {
        const url = await dictionaryAudio(text, accent)
        if (url) { try { await playUrl(url, slow ? 0.75 : rate); return } catch { } }
    }

    const edgeUrl = await backendTTS(text, accent, slow, gender, 'edge')
    if (edgeUrl) { try { await playUrl(edgeUrl, rate); return } catch { } }

    const googleUrl = await backendTTS(text, accent, slow, gender, 'google')
    if (googleUrl) { try { await playUrl(googleUrl, rate); return } catch { } }

    if (ELEVENLABS_API_KEY) {
        const elUrl = await elevenLabsTTS(text, accent, gender)
        if (elUrl) { try { await playUrl(elUrl, rate); return } catch { } }
    }

    webSpeechTTS(text, accent, slow ? 0.65 : rate * 0.9)
}

export function startListening({ onResult, onError, onEnd, lang = 'en-US' }) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { onError?.('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.'); return null }
    const rec = new SR()
    rec.lang = lang; rec.interimResults = false; rec.maxAlternatives = 5; rec.continuous = false
    rec.onresult = (e) => onResult?.({ transcript: e.results[0][0].transcript, confidence: e.results[0][0].confidence })
    rec.onerror = (e) => {
        const msgs = { 'no-speech': 'No se detectó voz.', 'audio-capture': 'Sin acceso al micrófono.', 'not-allowed': 'Permiso denegado.', 'network': 'Error de red.', 'aborted': null }
        const msg = msgs[e.error]
        if (msg !== null) onError?.(msg ?? `Error: ${e.error}`)
    }
    rec.onend = () => onEnd?.()
    try { rec.start() } catch { onError?.('No se pudo iniciar el reconocimiento de voz.') }
    return rec
}

export async function getWordInfo(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim().toLowerCase())}`)
        if (!res.ok) return null
        const [entry] = await res.json()
        return {
            word: entry?.word,
            phonetic: entry?.phonetic,
            phonetics: entry?.phonetics ?? [],
            audioUrlUS: entry?.phonetics?.find(p => p.audio && !p.audio.includes('-uk'))?.audio ?? null,
            audioUrlUK: entry?.phonetics?.find(p => p.audio?.includes('-uk'))?.audio ?? null,
            definition: entry?.meanings?.[0]?.definitions?.[0]?.definition ?? null,
            partOfSpeech: entry?.meanings?.[0]?.partOfSpeech ?? null,
            example: entry?.meanings?.[0]?.definitions?.[0]?.example ?? null,
        }
    } catch { return null }
}

export const isSpeechSynthesisSupported = () => 'speechSynthesis' in window
export const isSpeechRecognitionSupported = () => !!(window.SpeechRecognition || window.webkitSpeechRecognition)
export const isElevenLabsConfigured = () => !!ELEVENLABS_API_KEY
export function listAvailableVoices() {
    return (window.speechSynthesis?.getVoices() ?? []).filter(v => v.lang.startsWith('en')).map(v => ({ name: v.name, lang: v.lang, local: v.localService }))
}