import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { speakText, startListening, isSpeechRecognitionSupported } from '../../services/speech'

export default function ListeningExercise({ exercise, onAnswer, disabled }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [hasListened, setHasListened] = useState(false)
    const [hasPlayed, setHasPlayed] = useState(false)
    const [recRef, setRecRef] = useState(null)
    const [playCount, setPlayCount] = useState(0)
    const canRecognize = isSpeechRecognitionSupported()

    const handlePlay = useCallback(async () => {
        if (isPlaying) return
        setIsPlaying(true)
        setPlayCount(n => n + 1)
        try {
            await speakText(exercise.correct_answer, { slow: playCount >= 1 })
        } finally {
            setIsPlaying(false)
            setHasPlayed(true)
        }
    }, [isPlaying, exercise.correct_answer, playCount])

    const handleListen = useCallback(() => {
        if (isListening || disabled) return
        setIsListening(true)
        setTranscript('')

        const rec = startListening({
            lang: 'en-US',
            onResult: ({ transcript: t }) => {
                setTranscript(t)
                setHasListened(true)
                setIsListening(false)
                onAnswer(t)
            },
            onError: (msg) => {
                setIsListening(false)
                setTranscript(msg)
            },
            onEnd: () => setIsListening(false),
        })
        setRecRef(rec)
    }, [isListening, disabled, onAnswer])

    const handleStop = useCallback(() => {
        recRef?.stop()
        setIsListening(false)
    }, [recRef])

    const handleManual = useCallback(() => {
        if (!hasPlayed) return
        onAnswer(exercise.correct_answer)
    }, [hasPlayed, onAnswer, exercise.correct_answer])

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <span className="badge-pill bg-green-900/30 dark:bg-green-900/40 text-green-400 dark:text-green-300">
                    🎧 Ejercicio de escucha
                </span>
            </div>

            {/* Instrucción */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50
                      dark:from-slate-700/50 dark:to-slate-800/50
                      rounded-2xl p-5 text-center space-y-1">
                <p className="text-lg font-bold text-[#e2e8f0] dark:text-[#e8e4ff]">
                    {exercise.question}
                </p>
                <p className="text-sm text-[#64748b] dark:text-[#7c6faa]">
                    Escucha y repite la frase en inglés
                </p>
            </div>

            {/* Botón reproducir */}
            <div className="flex flex-col items-center gap-3">
                <motion.button
                    onClick={handlePlay}
                    disabled={isPlaying || disabled}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center
                      text-3xl shadow-brand transition-all duration-200
                      ${isPlaying
                            ? 'bg-green-900/30 dark:bg-green-500/15 text-green-600 cursor-wait scale-95'
                            : 'bg-gradient-to-br from-green-400 to-teal-500 text-white hover:scale-105'
                        }
                      disabled:opacity-50`}
                    aria-label={isPlaying ? 'Reproduciendo...' : 'Escuchar frase'}
                >
                    {isPlaying ? (
                        <span className="w-7 h-7 border-3 border-green-500 border-t-transparent
                             rounded-full animate-spin block border-[3px]" />
                    ) : '🔊'}
                </motion.button>
                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium">
                    {!hasPlayed
                        ? 'Pulsa para escuchar'
                        : playCount >= 2
                            ? '🐢 Reproduciendo lento para practicar'
                            : 'Pulsa otra vez para escuchar más lento'
                    }
                </p>
            </div>

            {/* Botones de respuesta */}
            {hasPlayed && !disabled && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    {canRecognize ? (
                        <>
                            <motion.button
                                onClick={isListening ? handleStop : handleListen}
                                whileTap={{ scale: 0.97 }}
                                className={`w-full flex items-center justify-center gap-3
                            py-4 rounded-2xl font-bold text-base transition-all
                            ${isListening
                                        ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                        : 'btn-primary'
                                    }`}
                            >
                                {isListening ? (
                                    <>
                                        <span className="w-4 h-4 bg-indigo-300 rounded-full" />
                                        Escuchando... (pulsa para parar)
                                    </>
                                ) : (
                                    <>🎤 Repetir en voz alta</>
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {transcript && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-[#0f1117] dark:bg-[#0f0e20]/60 rounded-2xl p-4 text-center"
                                    >
                                        <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] mb-1">
                                            He escuchado:
                                        </p>
                                        <p className="font-semibold text-[#94a3b8] dark:text-[#e8e4ff]">
                                            "{transcript}"
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <div className="bg-amber-500/10 dark:bg-amber-900/20 rounded-2xl p-4 text-center space-y-2">
                            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                                Tu navegador no soporta reconocimiento de voz.
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-500">
                                Usa Chrome o Edge para la experiencia completa.
                            </p>
                        </div>
                    )}

                    {/* Opción manual si no puede usar micrófono */}
                    <button
                        onClick={handleManual}
                        className="w-full text-sm text-[#9d8fc4] dark:text-slate-500
                       hover:text-[#94a3b8] dark:hover:text-slate-300
                       py-2 transition-colors"
                    >
                        He escuchado correctamente — continuar →
                    </button>
                </motion.div>
            )}

            {exercise.hint && (
                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] text-center italic">
                    💡 {exercise.hint}
                </p>
            )}
        </div>
    )
}