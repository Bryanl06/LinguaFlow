import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { speakText, getAccent } from '../../services/speech'

const CORRECT_MSGS = [
    '¡Perfecto! Lo tienes muy claro 🎯',
    '¡Exacto! Sigue así de bien 🌟',
    '¡Correcto! Tu inglés mejora cada día ✨',
    '¡Genial! Sin ninguna duda 💪',
    '¡Lo clavaste! 🎉',
    '¡Eso es! Que lo sepas 🔥',
    '¡Bien dicho! 👏',
]

const WRONG_MSGS = [
    'Casi, casi. Con práctica lo clavas',
    'No pasa nada — así es como funciona aprender',
    'Buen intento. ¡La próxima es tuya!',
    'Equivocarse es parte del camino, de verdad',
    'Lo importante es que lo has intentado 💙',
    'Un error más aprendido. Eso cuenta',
]

export default function AnswerFeedback({ isCorrect, correctAnswer, xpEarned, onNext }) {
    const msg = useMemo(() => {
        const list = isCorrect ? CORRECT_MSGS : WRONG_MSGS
        return list[Math.floor(Math.random() * list.length)]
    }, [isCorrect])

    return (
        <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`mt-5 rounded-3xl p-5 border-2 ${isCorrect
                    ? 'bg-green-50 dark:bg-green-500/10 border-green-500/30 dark:border-green-800'
                    : 'bg-red-900/20 dark:bg-red-500/10 border-red-500/30 dark:border-red-800'
                }`}
        >
            <div className="flex items-start gap-3 mb-4">
                <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 380, delay: 0.08 }}
                    className="text-3xl flex-shrink-0 leading-none mt-0.5"
                >
                    {isCorrect ? '🎉' : '💡'}
                </motion.span>

                <div className="flex-1 min-w-0">
                    <p className={`font-display font-bold text-base leading-snug ${isCorrect
                            ? 'text-green-400 dark:text-green-400'
                            : 'text-red-400 dark:text-red-400'
                        }`}>
                        {msg}
                    </p>

                    {!isCorrect && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                            className="mt-3 space-y-1.5"
                        >
                            <p className="text-xs font-bold text-[#9d8fc4] dark:text-[#64748b] uppercase tracking-wider">
                                Respuesta correcta
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-[#e2e8f0] dark:text-slate-100
                                 bg-[#161b27] dark:bg-slate-700
                                 px-3 py-1.5 rounded-xl text-sm
                                 border-2 border-[#c8beff] dark:border-[#7c3aed]/22">
                                    {correctAnswer}
                                </span>
                                <button
                                    onClick={() => speakText(correctAnswer, { accent: getAccent() })}
                                    className="flex items-center gap-1.5 text-xs font-semibold
                             text-brand-600 dark:text-brand-300
                             hover:text-brand-700 dark:hover:text-brand-300
                             bg-[#1c2333] dark:bg-brand-500/15
                             px-2.5 py-1.5 rounded-xl transition-colors"
                                >
                                    🔊 Escuchar
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {xpEarned > 0 && (
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.28, type: 'spring' }}
                            className="mt-2.5 inline-flex items-center gap-1.5
                         bg-amber-900/20 dark:bg-amber-500/100/15
                         text-amber-700 dark:text-amber-400
                         px-3 py-1 rounded-xl text-sm font-bold"
                        >
                            ⭐ +{xpEarned} XP
                        </motion.div>
                    )}
                </div>
            </div>

            <motion.button
                onClick={onNext}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full"
            >
                Siguiente →
            </motion.button>
        </motion.div>
    )
}