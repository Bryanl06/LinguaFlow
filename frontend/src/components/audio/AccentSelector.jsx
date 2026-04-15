import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACCENTS, getAccent, setAccent, speakText, listAvailableVoices } from '../../services/speech'

const DEMO_PHRASES = {
    'en-US': "Hello! How are you today?",
    'en-GB': "Good day! How are you getting on?",
    'en-AU': "G'day! How are you going?",
}

export default function AccentSelector({ compact = false }) {
    const [current, setCurrent] = useState(getAccent())
    const [playing, setPlaying] = useState(null)
    const [open, setOpen] = useState(false)

    const handleSelect = async (code) => {
        setAccent(code)
        setCurrent(code)
        setOpen(false)
        // Reproducir demo automáticamente al cambiar
        setPlaying(code)
        try {
            await speakText(DEMO_PHRASES[code], { accent: code })
        } finally {
            setPlaying(null)
        }
    }

    const handleDemo = async (e, code) => {
        e.stopPropagation()
        if (playing === code) return
        setPlaying(code)
        try {
            await speakText(DEMO_PHRASES[code], { accent: code })
        } finally {
            setPlaying(null)
        }
    }

    const currentAccent = ACCENTS.find(a => a.code === current) ?? ACCENTS[0]

    if (compact) {
        return (
            <div className="relative">
                <button
                    onClick={() => setOpen(v => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                     bg-slate-100 dark:bg-slate-700
                     hover:bg-slate-200 dark:hover:bg-white/10
                     text-sm font-semibold text-slate-700 dark:text-slate-200
                     transition-all duration-150"
                >
                    <span>{currentAccent.flag}</span>
                    <span>{currentAccent.label}</span>
                    <span className="text-slate-400 text-xs">{open ? '▲' : '▼'}</span>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 right-0 z-50 w-56
                         bg-white dark:bg-[#0d1f5c]
                         border border-slate-100 dark:border-white/10
                         rounded-2xl shadow-card-hover dark:shadow-glass overflow-hidden"
                        >
                            {ACCENTS.map(a => (
                                <button
                                    key={a.code}
                                    onClick={() => handleSelect(a.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left
                              transition-colors duration-100
                              ${a.code === current
                                            ? 'bg-brand-50 dark:bg-brand-500/15'
                                            : 'hover:bg-slate-50 dark:hover:bg-white/10'
                                        }`}
                                >
                                    <span className="text-xl">{a.flag}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                            {a.label}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                            {a.desc}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => handleDemo(e, a.code)}
                                        className="w-7 h-7 flex items-center justify-center
                               rounded-lg bg-brand-50 dark:bg-brand-500/15
                               hover:bg-brand-100 dark:hover:bg-brand-900/50
                               text-brand-500 text-sm transition-colors"
                                        title={`Escuchar acento ${a.label}`}
                                    >
                                        {playing === a.code ? (
                                            <span className="w-3 h-3 border-2 border-brand-400 border-t-transparent
                                       rounded-full animate-spin block" />
                                        ) : '▶'}
                                    </button>
                                </button>
                            ))}
                            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50
                              border-t border-slate-100 dark:border-white/10">
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    Calidad: Google Neural TTS
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    // Versión expandida (para página de perfil / settings)
    return (
        <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
                Acento de pronunciación
            </p>
            <div className="grid gap-2">
                {ACCENTS.map(a => (
                    <button
                        key={a.code}
                        onClick={() => handleSelect(a.code)}
                        className={`flex items-center gap-4 p-3.5 rounded-2xl border-2
                        text-left transition-all duration-150
                        ${a.code === current
                                ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10'
                                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 hover:border-brand-200 dark:hover:border-brand-700'
                            }`}
                    >
                        <span className="text-3xl">{a.flag}</span>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-800 dark:text-white">{a.label}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{a.desc}</p>
                            <p className="text-xs text-slate-300 dark:text-slate-600 italic mt-0.5">
                                "{DEMO_PHRASES[a.code]}"
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {a.code === current && (
                                <span className="text-xs font-bold text-brand-500 bg-brand-100 dark:bg-brand-500/20
                                 px-2 py-0.5 rounded-lg">
                                    Activo
                                </span>
                            )}
                            <button
                                onClick={(e) => handleDemo(e, a.code)}
                                disabled={playing === a.code}
                                className="w-9 h-9 flex items-center justify-center rounded-xl
                           bg-brand-100 dark:bg-brand-500/15
                           hover:bg-brand-200 dark:hover:bg-brand-900/60
                           text-brand-600 dark:text-brand-400
                           disabled:opacity-50 transition-colors"
                                title="Escuchar demo"
                            >
                                {playing === a.code ? (
                                    <span className="w-4 h-4 border-2 border-brand-400 border-t-transparent
                                   rounded-full animate-spin block" />
                                ) : (
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </button>
                ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                Audio generado por Google Neural TTS · Calidad nativa de hablante real
            </p>
        </div>
    )
}