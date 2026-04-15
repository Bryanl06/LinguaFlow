import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLesson, useSubmitAnswer } from '../../hooks'
import FillBlank from '../../components/exercises/FillBlank'
import MultipleChoice from '../../components/exercises/MultipleChoice'
import FlashCard from '../../components/exercises/FlashCard'
import ListeningExercise from '../../components/exercises/ListeningExercises'
import AnswerFeedback from '../../components/exercises/AnswerFeedback'

const EXERCISE_MAP = {
    fill_blank: FillBlank,
    multiple_choice: MultipleChoice,
    flashcard: FlashCard,
    listening: ListeningExercise,
}

const FINISH_MESSAGES = [
    { min: 90, emoji: '🏆', title: '¡Eres una bestia!', sub: 'Casi perfecto. Poco se te resiste.' },
    { min: 70, emoji: '🎉', title: '¡Muy bien hecho!', sub: 'Estás en racha. Sigue así.' },
    { min: 50, emoji: '💪', title: '¡Buen trabajo!', sub: 'Cada lección te hace más fuerte.' },
    { min: 0, emoji: '📚', title: '¡La práctica manda!', sub: 'Repite esta lección y lo clavarás.' },
]

// ── Skeleton — Umbral de Doherty ─────────────────────────────────────────────
function ExerciseSkeleton() {
    return (
        <div className="max-w-2xl mx-auto space-y-5">
            {/* Progress bar area */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="shimmer h-8 w-16 rounded-xl" />
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="shimmer h-2 w-2 rounded-full" />
                        ))}
                    </div>
                </div>
                <div className="shimmer h-2.5 w-full rounded-full" />
            </div>
            {/* Exercise card */}
            <div className="card space-y-5">
                <div className="shimmer h-6 w-36 rounded-full" />
                <div className="shimmer h-24 w-full rounded-2xl" />
                <div className="grid grid-cols-2 gap-2.5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="shimmer h-14 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function ExerciseRunner() {
    const [params] = useSearchParams()
    const lessonId = params.get('lessonId')
    const navigate = useNavigate()

    const { data: lesson, isLoading } = useLesson(lessonId)
    const submitAnswer = useSubmitAnswer()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState(null)
    const [xpEarned, setXpEarned] = useState(0)
    const [results, setResults] = useState([])
    const [finished, setFinished] = useState(false)

    const exercises = lesson?.exercises ?? []
    const exercise = exercises[currentIndex]

    useEffect(() => {
        setCurrentIndex(0); setAnswered(false); setFinished(false)
        setResults([]); setIsCorrect(null); setXpEarned(0)
    }, [lessonId])

    const handleAnswer = useCallback(async (userAnswer, quality = null) => {
        if (answered || !exercise) return
        const ok = userAnswer.toLowerCase().trim() === exercise.correct_answer.toLowerCase().trim()
        const q = quality ?? (ok ? 4 : 1)
        setIsCorrect(ok); setAnswered(true)
        try {
            const { data } = await submitAnswer.mutateAsync({
                exercise_id: exercise.id, correct: ok, quality: q,
            })
            setXpEarned(data?.xp_earned ?? 0)
        } catch { }
        setResults(r => [...r, { exercise, correct: ok }])
    }, [answered, exercise, submitAnswer])

    const handleNext = useCallback(() => {
        if (currentIndex + 1 >= exercises.length) { setFinished(true); return }
        setCurrentIndex(i => i + 1)
        setAnswered(false); setIsCorrect(null); setXpEarned(0)
    }, [currentIndex, exercises.length])

    const reset = () => {
        setCurrentIndex(0); setAnswered(false); setFinished(false)
        setResults([]); setIsCorrect(null); setXpEarned(0)
    }

    // ── Resultados ──────────────────────────────────────────────────────────────
    if (finished) {
        const correct = results.filter(r => r.correct).length
        const pct = Math.round((correct / results.length) * 100)
        const msg = FINISH_MESSAGES.find(m => pct >= m.min)
        const totalXp = results.reduce((acc, r) => acc + (r.correct ? 10 : 2), 0)
        const errors = results.filter(r => !r.correct)
        // Regla de fin de pico: CTA apunta a la próxima lección específica
        const nextHint = lesson?.title ? `Siguiente lección →` : 'Ver lecciones →'

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center space-y-6 py-10"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="text-7xl sm:text-8xl"
                >
                    {msg.emoji}
                </motion.div>

                <div>
                    <h1 className="font-display text-3xl sm:text-4xl font-extrabold
                         text-[#e2e8f0] dark:text-[#e8e4ff]">
                        {msg.title}
                    </h1>
                    <p className="text-[#64748b] dark:text-[#64748b] mt-1.5">{msg.sub}</p>
                </div>

                <div className="card">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                            { value: correct, label: 'Correctas', color: 'text-green-500' },
                            { value: `${pct}%`, label: 'Precisión', color: 'text-brand-500' },
                            { value: `+${totalXp}`, label: 'XP ganados', color: 'text-amber-500' },
                        ].map(s => (
                            <div key={s.label}>
                                <p className={`font-display font-extrabold text-3xl ${s.color}`}>{s.value}</p>
                                <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-medium mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 progress-bar">
                        <motion.div
                            className={`h-full rounded-full ${pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Repaso de errores */}
                    {errors.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-[#d0c2ff]/60 dark:border-[#7c3aed]/22">
                            <p className="text-xs font-bold text-[#9d8fc4] dark:text-slate-500
                            uppercase tracking-widest mb-3">
                                Repasa estos
                            </p>
                            <div className="space-y-2">
                                {errors.slice(0, 3).map((r, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                        <span className="text-red-400 flex-shrink-0">✗</span>
                                        <span className="text-[#94a3b8] dark:text-[#475569] truncate flex-1">
                                            {r.exercise.question}
                                        </span>
                                        <span className="text-green-600 dark:text-green-400 font-semibold flex-shrink-0 ml-auto">
                                            {r.exercise.correct_answer}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Von Restorff + Regla de fin de pico: acción principal dominante */}
                <div className="space-y-2">
                    <Link to="/lessons" className="btn-primary w-full block">
                        {nextHint}
                    </Link>
                    <button onClick={reset} className="btn-ghost w-full text-sm">
                        🔁 Repetir esta lección
                    </button>
                </div>
            </motion.div>
        )
    }

    // ── Cargando — Umbral de Doherty: skeleton en lugar de spinner ──────────────
    if (isLoading) return <ExerciseSkeleton />

    if (lesson && exercises.length === 0) {
        return (
            <div className="text-center py-20 space-y-4">
                <p className="text-5xl">📭</p>
                <p className="font-display font-bold text-[#94a3b8] dark:text-[#c8beff]">
                    Esta lección no tiene ejercicios todavía
                </p>
                <Link to="/lessons" className="btn-primary">Volver a lecciones</Link>
            </div>
        )
    }

    const ExerciseComponent = exercise ? EXERCISE_MAP[exercise.type] : null
    const progress = ((currentIndex + (answered ? 1 : 0)) / exercises.length) * 100

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Cabecera con progreso */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    {/* Von Restorff: "Salir" visualmente débil con btn-ghost pequeño */}
                    <Link
                        to={lessonId ? `/lessons/${lessonId}` : '/lessons'}
                        className="btn-ghost py-1.5 px-3 text-sm text-[#9d8fc4] dark:text-[#5a4f88]"
                    >
                        ✕ Salir
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-1 items-center">
                            {exercises.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: i === currentIndex ? '1rem' : '0.45rem',
                                        backgroundColor: i < currentIndex ? '#0ea5e9' : i === currentIndex ? '#38bdf8' : undefined,
                                    }}
                                    className={`h-2 rounded-full ${i > currentIndex ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-[#9d8fc4] dark:text-[#64748b] tabular-nums">
                            {currentIndex + 1}<span className="opacity-50">/{exercises.length}</span>
                        </span>
                    </div>
                </div>

                <div className="progress-bar">
                    <motion.div
                        className="progress-bar-fill"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Ejercicio — Memoria de trabajo: badge de tipo solo mientras NO se está respondiendo */}
            <AnimatePresence mode="wait">
                {exercise && ExerciseComponent && (
                    <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="card"
                    >
                        <ExerciseComponent
                            exercise={exercise}
                            onAnswer={handleAnswer}
                            disabled={answered}
                            showTypeBadge={!answered}
                        />
                        {answered && (
                            <AnswerFeedback
                                isCorrect={isCorrect}
                                correctAnswer={exercise.correct_answer}
                                xpEarned={xpEarned}
                                onNext={handleNext}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}