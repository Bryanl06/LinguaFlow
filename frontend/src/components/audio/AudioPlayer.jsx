import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { speakText, stopSpeaking, ACCENTS } from '../../services/speech'

/**
 * Reproductor de audio reutilizable.
 *
 * Props:
 *   text       — Texto a pronunciar (obligatorio)
 *   showAccent — Mostrar selector de acento (default: true)
 *   showGender — Mostrar selector de género (default: true)
 *   showSlow   — Mostrar botón de velocidad lenta (default: true)
 *   compact    — Versión compacta sin etiquetas (default: false)
 *   className  — Clases adicionales
 */
export default function AudioPlayer({
    text,
    showAccent = true,
    showGender = true,
    showSlow = true,
    compact = false,
    className = '',
}) {
    const [accent, setAccent] = useState('en-US')
    const [gender, setGender] = useState('female')
    const [slow, setSlow] = useState(false)
    const [loading, setLoading] = useState(false)  // Doherty: feedback antes del TTS
    const [playing, setPlaying] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const handlePlay = useCallback(async () => {
        if (!text?.trim()) return

        if (loading || playing) {
            stopSpeaking()
            setPlaying(false)
            setLoading(false)
            return
        }

        // Doherty Threshold (<400ms): feedback visual inmediato, sin esperar la red
        setLoading(true)
        try {
            await speakText(text, { accent, gender, slow })
        } finally {
            setLoading(false)
            setPlaying(false)
        }
    }, [text, accent, gender, slow, loading, playing])

    const currentAccent = ACCENTS.find(a => a.code === accent) ?? ACCENTS[0]
    const isActive = loading || playing

    // ── Modo compacto ──────────────────────────────────────────────────────────
    if (compact) {
        return (
            <button
                onClick={handlePlay}
                disabled={!text?.trim()}
                aria-live="polite"
                aria-label={isActive ? 'Detener audio' : `Escuchar en ${currentAccent.label}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl
                    bg-brand-50 dark:bg-brand-500/10
                    text-brand-600 dark:text-brand-400
                    hover:bg-brand-100 dark:hover:bg-brand-900/40
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-150 active:scale-95 text-xs font-semibold ${className}`}
                title={`Escuchar en ${currentAccent.label}`}
            >
                {isActive ? (
                    <span className="w-3 h-3 border-2 border-brand-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                ) : (
                    <span className="text-sm leading-none">{currentAccent.flag}</span>
                )}
                <span>
                    {loading ? 'Cargando...' : playing ? 'Reproduciendo...' : 'Escuchar'}
                </span>
            </button>
        )
    }

    // ── Modo expandido ─────────────────────────────────────────────────────────
    return (
        <div className={`space-y-2.5 ${className}`}>
            <div className="flex flex-wrap items-center gap-2">

                {/* Botón play / stop — feedback inmediato (Doherty) */}
                <button
                    onClick={handlePlay}
                    disabled={!text?.trim()}
                    aria-live="polite"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm
                      transition-all duration-150 active:scale-95
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${loading
                            ? 'bg-brand-400 text-white cursor-wait'
                            : playing
                                ? 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400'
                                : 'bg-brand-500 text-white hover:bg-brand-600 shadow-[0_4px_14px_rgba(14,165,233,0.3)]'
                        }`}
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                            Cargando audio...
                        </>
                    ) : playing ? (
                        <>
                            <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                            Detener
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            {currentAccent.flag} Escuchar
                        </>
                    )}
                </button>

                {/* Botón lento */}
                {showSlow && (
                    <button
                        onClick={() => setSlow(v => !v)}
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-sm font-semibold
                        transition-all duration-150
                        ${slow
                                ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                            }`}
                        title={slow ? 'Velocidad normal' : 'Pronunciación lenta para practicar'}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        {slow ? 'Lento ✓' : 'Lento'}
                    </button>
                )}

                {/* Selector de acento */}
                {showAccent && (
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(v => !v)}
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-sm font-semibold
                         bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300
                         hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                        >
                            <span>{currentAccent.flag}</span>
                            <span>{currentAccent.label}</span>
                            <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <AnimatePresence>
                            {showMenu && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.14 }}
                                        className="absolute top-full left-0 mt-1 z-20 min-w-[200px]
                               bg-white dark:bg-slate-800
                               border border-slate-100 dark:border-slate-700
                               rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
                                    >
                                        {ACCENTS.map(a => (
                                            <button
                                                key={a.code}
                                                onClick={() => { setAccent(a.code); setShowMenu(false) }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors
                                    ${accent === a.code
                                                        ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className="text-xl">{a.flag}</span>
                                                <div>
                                                    <p className="font-semibold leading-none">{a.label}</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{a.desc}</p>
                                                </div>
                                                {accent === a.code && <span className="ml-auto text-brand-500 text-xs">✓</span>}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Selector de género */}
                {showGender && (
                    <div className="flex rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                        {[
                            { value: 'female', label: '♀', title: 'Voz femenina' },
                            { value: 'male', label: '♂', title: 'Voz masculina' },
                        ].map(g => (
                            <button
                                key={g.value}
                                onClick={() => setGender(g.value)}
                                title={g.title}
                                className={`px-3 py-2.5 text-sm font-bold transition-colors
                            ${gender === g.value
                                        ? 'bg-brand-500 text-white'
                                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10'
                                    }`}
                            >
                                {g.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Info de voz activa */}
            <p className="text-xs text-slate-400 dark:text-slate-500">
                {currentAccent.flag} {currentAccent.desc}
                {slow ? ' · velocidad reducida' : ''}
                {gender === 'male' ? ' · voz masculina' : ' · voz femenina'}
            </p>
        </div>
    )
}