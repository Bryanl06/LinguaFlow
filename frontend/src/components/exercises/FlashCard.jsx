import { useState } from 'react'
import { motion } from 'framer-motion'
import { speakText, getAccent } from '../../services/speech'

const RATINGS = [
    {
        q: 1, label: 'No lo sé', emoji: '😬',
        color: 'bg-red-500/10 dark:bg-red-500/15 text-red-400 dark:text-red-400 hover:bg-red-100 border-red-500/30 dark:border-red-800'
    },
    {
        q: 3, label: 'Con esfuerzo', emoji: '🤔',
        color: 'bg-amber-500/100/10 dark:bg-amber-500/100/15 text-amber-700 dark:text-amber-400 hover:bg-amber-100 border-amber-200 dark:border-amber-800'
    },
    {
        q: 5, label: '¡Lo sé!', emoji: '🚀',
        color: 'bg-green-500/10 dark:bg-green-500/15 text-green-400 dark:text-green-400 hover:bg-green-100 border-green-500/30 dark:border-green-800'
    },
]

export default function FlashCard({ exercise, onAnswer, disabled, showTypeBadge = true }) {
    const [flipped, setFlipped] = useState(false)
    const [answered, setAnswered] = useState(false)

    const handleFlip = () => {
        if (answered) return
        if (!flipped) speakText(exercise.question, { accent: getAccent() })
        setFlipped(v => !v)
    }

    const handleRating = (quality) => {
        if (answered || disabled) return
        setAnswered(true)
        onAnswer(exercise.correct_answer, quality)
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                {showTypeBadge && (
                    <span className="badge-pill bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300">
                        🃏 Tarjeta de estudio
                    </span>
                )}
                <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium">
                    {flipped ? '↩ Toca para voltear' : 'Toca para ver la respuesta'}
                </span>
            </div>

            {/* Tarjeta flip 3D */}
            <div
                className="relative h-52 cursor-pointer select-none"
                onClick={handleFlip}
                style={{ perspective: '1200px' }}
                role="button"
                aria-label={flipped ? 'Ver pregunta' : 'Ver respuesta'}
            >
                <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative w-full h-full"
                >
                    {/* Frente */}
                    <div
                        style={{ backfaceVisibility: 'hidden' }}
                        className="absolute inset-0 flex flex-col items-center justify-center
                       bg-gradient-to-br from-[#141e2e] via-[#161b27] to-[#1a1630]
                       dark:from-[#06b6d4]/6 dark:to-[#7c3aed]/6
                       rounded-3xl border-2 border-teal-200 dark:border-teal-800
                       p-6 text-center space-y-3"
                    >
                        <span className="text-4xl select-none">🎴</span>
                        <p className="text-2xl font-bold text-[#e2e8f0] dark:text-[#e8e4ff] leading-snug">
                            {exercise.question}
                        </p>
                        <button
                            onClick={e => { e.stopPropagation(); speakText(exercise.question, { accent: getAccent() }) }}
                            className="text-xs font-semibold text-teal-500 dark:text-teal-400
                         hover:text-teal-400 dark:hover:text-teal-300 transition-colors"
                        >
                            🔊 Escuchar
                        </button>
                        <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium absolute bottom-4">
                            Toca para ver la respuesta →
                        </p>
                    </div>

                    {/* Reverso */}
                    <div
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        className="absolute inset-0 flex flex-col items-center justify-center
                       bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-600
                       rounded-3xl border-2 border-brand-400
                       p-6 text-center space-y-4"
                    >
                        <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                            {exercise.correct_answer}
                        </p>
                        <button
                            onClick={e => { e.stopPropagation(); speakText(exercise.correct_answer, { accent: getAccent() }) }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold
                         text-brand-200 hover:text-white
                         bg-[#6366f1]/15 hover:bg-[#6366f1]/25 px-3 py-1.5 rounded-xl
                         transition-all"
                        >
                            🔊 Pronunciar
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Rating — visible tras voltear */}
            {flipped && !answered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                >
                    <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] text-center font-semibold uppercase tracking-wider">
                        ¿Cómo te fue?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {RATINGS.map(r => (
                            <motion.button
                                key={r.q}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRating(r.q)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2
                            font-semibold text-sm transition-all ${r.color}`}
                            >
                                <span className="text-2xl">{r.emoji}</span>
                                <span className="text-xs leading-tight text-center">{r.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {answered && (
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center text-sm text-[#9d8fc4] dark:text-[#64748b] font-medium"
                >
                    ✓ Guardado · SM-2 calculará el próximo repaso
                </motion.p>
            )}
        </div>
    )
}