import { useState } from 'react'
import { motion } from 'framer-motion'
import { speakText, getAccent } from '../../services/speech'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

/**
 * showTypeBadge: visible solo cuando el usuario aún no ha respondido.
 * Reduce la carga cognitiva durante la toma de decisión (Memoria de trabajo).
 */
export default function MultipleChoice({ exercise, onAnswer, disabled, showTypeBadge = true }) {
    const [selected, setSelected] = useState(null)

    const options = typeof exercise.options === 'string'
        ? JSON.parse(exercise.options)
        : (exercise.options ?? [])

    const handleSelect = (option) => {
        if (disabled || selected) return
        setSelected(option)
        setTimeout(() => onAnswer(option), 320)
    }

    const getStyle = (option) => {
        if (!selected) return 'border-[#c8beff] dark:border-[#7c3aed]/22 bg-[#161b27] dark:bg-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-[#1c2333] dark:hover:bg-brand-900/20 hover:-translate-y-0.5 cursor-pointer'
        if (option === exercise.correct_answer) return 'border-green-400 bg-green-500/10 dark:bg-green-500/15 dark:border-green-600 scale-[1.01]'
        if (option === selected && option !== exercise.correct_answer) return 'border-red-400 bg-red-500/10 dark:bg-red-500/15 dark:border-red-600 opacity-80'
        return 'border-[#d0c2ff]/60 dark:border-[#7c3aed]/22 bg-[#1c2333]/40 dark:bg-[#0f0e20]/30 opacity-40'
    }

    return (
        <div className="space-y-5">
            {/* Badge solo antes de responder — Memoria de trabajo */}
            {showTypeBadge && !selected && (
                <div className="flex items-center gap-2">
                    <span className="badge-pill bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300">
                        🎯 Elige la respuesta correcta
                    </span>
                </div>
            )}

            {/* Pregunta */}
            <div className="bg-gradient-to-br from-[#161b27] to-[#1c2333]
                      dark:from-[#7c3aed]/8 dark:to-[#2979ff]/5
                      rounded-2xl p-5 text-center space-y-3">
                <p className="text-xl font-bold text-[#e2e8f0] dark:text-[#e8e4ff] leading-snug">
                    {exercise.question}
                </p>
                <button
                    onClick={() => speakText(exercise.question, { accent: getAccent() })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                     text-brand-500 dark:text-brand-400
                     hover:text-brand-700 dark:hover:text-brand-300
                     bg-[#232d42]/80 dark:bg-[#0f0e20]/60 px-3 py-1.5 rounded-xl transition-all"
                >
                    🔊 Escuchar
                </button>
            </div>

            {/* Opciones — Hick: máx. 4, claramente diferenciadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((option, i) => (
                    <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileTap={{ scale: disabled ? 1 : 0.98 }}
                        onClick={() => handleSelect(option)}
                        disabled={!!selected || disabled}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2
                        text-left font-semibold text-sm transition-all duration-200 ${getStyle(option)}`}
                    >
                        {!selected ? (
                            <span className="w-8 h-8 rounded-xl bg-[#1c2333] dark:bg-slate-700 flex items-center
                               justify-center text-xs font-bold text-[#64748b] dark:text-[#64748b] flex-shrink-0">
                                {OPTION_LETTERS[i]}
                            </span>
                        ) : option === exercise.correct_answer ? (
                            <span className="text-xl flex-shrink-0">✅</span>
                        ) : option === selected ? (
                            <span className="text-xl flex-shrink-0">❌</span>
                        ) : (
                            <span className="w-8 h-8 rounded-xl bg-[#1c2333] dark:bg-slate-700 flex items-center
                               justify-center text-xs font-bold text-[#64748b] flex-shrink-0">
                                {OPTION_LETTERS[i]}
                            </span>
                        )}
                        <span className="text-[#94a3b8] dark:text-slate-200 leading-snug flex-1">{option}</span>
                    </motion.button>
                ))}
            </div>

            {exercise.hint && !selected && (
                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] text-center italic">
                    💡 Pista: {exercise.hint}
                </p>
            )}
        </div>
    )
}