import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { speakText, getAccent } from '../../services/speech'

export default function FillBlank({ exercise, onAnswer, disabled, showTypeBadge = true }) {
    const [value, setValue] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!disabled) inputRef.current?.focus()
    }, [disabled])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.trim() || submitted || disabled) return
        setSubmitted(true)
        onAnswer(value.trim())
    }

    const parts = exercise.question.split('___')
    const hasBlanks = parts.length > 1

    return (
        <div className="space-y-5">
            {showTypeBadge && (
                <div className="flex items-center gap-2">
                    <span className="badge-pill bg-purple-900/30 dark:bg-purple-900/40 text-purple-400 dark:text-purple-300">
                        ✏️ Completa la frase
                    </span>
                </div>
            )}

            {/* Frase con hueco */}
            {hasBlanks ? (
                <div className="bg-gradient-to-br from-[#161b27] to-[#1c2333]
                        dark:from-[#7c3aed]/8 dark:to-[#2979ff]/5
                        rounded-2xl p-5 text-center space-y-3">
                    <p className="text-xl font-bold text-[#e2e8f0] dark:text-[#e8e4ff] leading-relaxed">
                        {parts[0]}
                        <span className="inline-block mx-2 px-4 py-1
                             bg-[#161b27] dark:bg-slate-700
                             border-b-2 border-brand-400
                             rounded-lg min-w-[80px]
                             text-brand-600 dark:text-brand-300
                             font-mono text-base">
                            {submitted ? value : '‌\u200C_____'}
                        </span>
                        {parts[1]}
                    </p>
                    <button
                        type="button"
                        onClick={() => speakText(
                            exercise.question.replace('___', exercise.correct_answer),
                            { accent: getAccent() }
                        )}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold
                       text-purple-500 dark:text-purple-400
                       hover:text-purple-400 dark:hover:text-purple-300
                       bg-[#232d42]/80 dark:bg-[#0f0e20]/60 px-3 py-1.5 rounded-xl transition-all"
                    >
                        🔊 Escuchar completa
                    </button>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-[#161b27] to-[#1c2333]
                        dark:from-[#7c3aed]/8 dark:to-[#2979ff]/5
                        rounded-2xl p-5 text-center space-y-3">
                    <p className="text-xl font-bold text-[#e2e8f0] dark:text-[#e8e4ff]">
                        {exercise.question}
                    </p>
                    <button
                        type="button"
                        onClick={() => speakText(exercise.question, { accent: getAccent() })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold
                       text-purple-500 dark:text-purple-400
                       hover:text-purple-400 dark:hover:text-purple-300
                       bg-[#232d42]/80 dark:bg-[#0f0e20]/60 px-3 py-1.5 rounded-xl transition-all"
                    >
                        🔊 Escuchar
                    </button>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        disabled={submitted || disabled}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        className={`input-base text-center text-lg font-semibold pr-10
                        ${submitted ? 'opacity-60' : ''}`}
                    />
                    {value && !submitted && (
                        <button
                            type="button"
                            onClick={() => setValue('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6
                         flex items-center justify-center
                         text-[#475569] hover:text-[#64748b] dark:hover:text-slate-300
                         rounded-full hover:bg-[#1c2333] dark:hover:bg-[#7c3aed]/15
                         transition-all text-lg leading-none"
                        >
                            ×
                        </button>
                    )}
                </div>

                {exercise.hint && !submitted && (
                    <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] text-center italic">
                        💡 {exercise.hint}
                    </p>
                )}

                <motion.button
                    type="submit"
                    disabled={!value.trim() || submitted || disabled}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full"
                >
                    {submitted ? '✓ Respuesta enviada' : 'Comprobar →'}
                </motion.button>
            </form>
        </div>
    )
}