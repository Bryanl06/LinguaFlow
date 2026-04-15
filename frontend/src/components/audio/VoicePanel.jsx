import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACCENTS } from '../../services/speech'

/**
 * Panel global de configuración de voz.
 * Aparece una sola vez por sección (no en cada ejemplo).
 * El usuario configura aquí acento, género y velocidad.
 * Los AudioPlayer compactos heredan esta configuración via props.
 *
 * Ley de Carga Cognitiva: 4 controles × N ejemplos → 4 controles × 1 panel global.
 */
export default function VoicePanel({ accent, gender, slow, onAccent, onGender, onSlow }) {
    const [open, setOpen] = useState(false)
    const current = ACCENTS.find(a => a.code === accent) ?? ACCENTS[0]

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {/* Acento actual — siempre visible */}
            <div className="relative">
                <button
                    onClick={() => setOpen(v => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                     bg-slate-100 dark:bg-slate-700
                     hover:bg-slate-200 dark:hover:bg-white/10
                     text-sm font-semibold text-slate-700 dark:text-slate-200
                     transition-all"
                >
                    <span>{current.flag}</span>
                    <span>{current.label}</span>
                    <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <AnimatePresence>
                    {open && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                                transition={{ duration: 0.14 }}
                                className="absolute top-full left-0 mt-1 z-20 w-56
                           bg-white dark:bg-[#0d1f5c]
                           border border-slate-100 dark:border-white/10
                           rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:shadow-glass overflow-hidden"
                            >
                                {ACCENTS.map(a => (
                                    <button
                                        key={a.code}
                                        onClick={() => { onAccent(a.code); setOpen(false) }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors
                                ${accent === a.code
                                                ? 'bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-300'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="text-lg">{a.flag}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold leading-tight">{a.label}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{a.desc}</p>
                                        </div>
                                        {accent === a.code && <span className="text-brand-500 flex-shrink-0">✓</span>}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Género */}
            <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                {[{ v: 'female', l: '♀' }, { v: 'male', l: '♂' }].map(g => (
                    <button
                        key={g.v}
                        onClick={() => onGender(g.v)}
                        title={g.v === 'female' ? 'Voz femenina' : 'Voz masculina'}
                        className={`px-3 py-1.5 text-sm font-bold transition-colors
                        ${gender === g.v
                                ? 'bg-brand-500 text-white'
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10'
                            }`}
                    >
                        {g.l}
                    </button>
                ))}
            </div>

            {/* Lento */}
            <button
                onClick={() => onSlow(!slow)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                    ${slow
                        ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                title={slow ? 'Velocidad normal' : 'Pronunciación lenta'}
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {slow ? 'Lento ✓' : 'Lento'}
            </button>
        </div>
    )
}