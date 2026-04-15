import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLesson } from '../../hooks'
import { useAuthStore } from '../../store/authStore'
import { useTriviaExercises } from '../../hooks/UseTriviaExercises'

const TYPE_INFO = {
    fill_blank: { icon: '✏️', label: 'Completar frase', color: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300' },
    multiple_choice: { icon: '🎯', label: 'Opción múltiple', color: 'bg-brand-100 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300' },
    flashcard: { icon: '🃏', label: 'Tarjeta', color: 'bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300' },
    listening: { icon: '🎧', label: 'Escucha', color: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300' },
    speaking: { icon: '🎤', label: 'Pronunciación', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
}
const LEVEL_META = {
    A1: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300',
    A2: 'bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300',
    B1: 'bg-blue-900/30 dark:bg-blue-500/10 text-blue-400 dark:text-blue-300',
    B2: 'bg-indigo-900/25 dark:bg-indigo-500/10 text-indigo-400 dark:text-indigo-300',
    C1: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300',
    C2: 'bg-rose-900/25 dark:bg-rose-900/30 text-rose-400 dark:text-rose-300',
}

// ── Skeleton — Ley Umbral de Doherty: layout idéntico al real ────────────────
function LessonDetailSkeleton() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Breadcrumb */}
            <div className="shimmer h-4 w-36 rounded-full" />

            {/* Header card */}
            <div className="card space-y-4">
                <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="flex gap-2">
                            <div className="shimmer h-6 w-10 rounded-full" />
                            <div className="shimmer h-6 w-24 rounded-full" />
                        </div>
                        <div className="shimmer h-8 w-3/4 rounded-xl" />
                        <div className="shimmer h-4 w-full rounded-lg" />
                        <div className="shimmer h-4 w-5/6 rounded-lg" />
                    </div>
                    <div className="shimmer w-20 h-20 rounded-2xl flex-shrink-0" />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="card py-4 space-y-2 flex flex-col items-center">
                        <div className="shimmer h-6 w-6 rounded-lg" />
                        <div className="shimmer h-6 w-12 rounded-lg" />
                        <div className="shimmer h-3 w-16 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Exercise list */}
            <div className="card space-y-3">
                <div className="shimmer h-5 w-40 rounded-lg" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                        <div className="shimmer w-6 h-6 rounded-lg flex-shrink-0" />
                        <div className="shimmer w-6 h-6 rounded-lg flex-shrink-0" />
                        <div className="shimmer h-4 flex-1 rounded-lg" />
                        <div className="shimmer h-5 w-24 rounded-lg flex-shrink-0" />
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="shimmer h-14 w-full rounded-2xl" />
        </div>
    )
}

// ── Limit visible exercises — Ley de Miller ──────────────────────────────────
const EXERCISES_PAGE = 5

export default function LessonDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isRestoring = useAuthStore(s => s.isRestoring)
    const [showAll, setShowAll] = useState(false)

    const { data: lesson, isLoading } = useLesson(id)

    // ── Todos los hooks ANTES de cualquier return condicional (Reglas de Hooks) ──
    // Ejercicios extra de Open Trivia DB — bonus dinámico
    const { exercises: triviaExs, loading: triviaLoading } = useTriviaExercises(
        lesson?.level ?? null, 3
    )

    // Umbral de Doherty: skeleton contextual en lugar de spinner vacío
    if (isLoading || isRestoring) return <LessonDetailSkeleton />

    if (!lesson) {
        return (
            <div className="text-center py-20 space-y-4">
                <p className="text-5xl">😕</p>
                <p className="text-[#64748b] dark:text-[#7c6faa]">Lección no encontrada</p>
                <Link to="/lessons" className="btn-primary">Volver a lecciones</Link>
            </div>
        )
    }

    const exercises = lesson.exercises ?? []
    const typeCount = exercises.reduce((acc, e) => { acc[e.type] = (acc[e.type] ?? 0) + 1; return acc }, {})
    // Miller: mostrar máx. EXERCISES_PAGE items, el resto bajo "ver todos"
    const visibleExs = showAll ? exercises : exercises.slice(0, EXERCISES_PAGE)
    const hasMore = exercises.length > EXERCISES_PAGE

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Link to="/lessons"
                className="inline-flex items-center gap-1.5 text-sm font-semibold
                   text-[#9d8fc4] dark:text-[#64748b] hover:text-brand-500
                   transition-colors">
                ← Volver a lecciones
            </Link>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="card bg-gradient-to-br from-[#1c2333] to-[#161b27]
                        dark:from-slate-800 dark:to-slate-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className={`level-badge ${LEVEL_META[lesson.level] ?? 'bg-[#1c2333] text-[#94a3b8]'}`}>
                                    {lesson.level}
                                </span>
                                <span className="level-badge bg-[#1c2333] dark:bg-slate-700
                                 text-[#94a3b8] dark:text-[#475569] capitalize">
                                    {lesson.category}
                                </span>
                            </div>
                            <h1 className="font-display text-2xl sm:text-3xl font-bold
                             text-[#e2e8f0] dark:text-[#e8e4ff]">
                                {lesson.title}
                            </h1>
                            {lesson.description && (
                                <p className="text-[#64748b] dark:text-[#64748b] mt-2 leading-relaxed">
                                    {lesson.description}
                                </p>
                            )}
                        </div>
                        <div className="text-center bg-[#161b27] dark:bg-slate-700 rounded-2xl p-4
                            border border-[#6366f1]/20 dark:border-[#7c3aed]/22 flex-shrink-0">
                            <p className="font-display font-extrabold text-2xl
                            text-brand-600 dark:text-brand-300">
                                +{lesson.xp_reward}
                            </p>
                            <p className="text-xs text-brand-400 dark:text-brand-500 font-bold">XP</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-3 gap-3"
            >
                {[
                    { value: exercises.length, label: 'Ejercicios', icon: '📝' },
                    { value: `~${Math.ceil(exercises.length * 1.5)} min`, label: 'Duración', icon: '⏱️' },
                    { value: Object.keys(typeCount).length, label: 'Tipos', icon: '🎯' },
                ].map(s => (
                    <div key={s.label} className="card text-center py-4 space-y-1">
                        <p className="text-xl">{s.icon}</p>
                        <p className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff]">
                            {s.value}
                        </p>
                        <p className="text-xs text-[#9d8fc4] dark:text-[#5a4f88]">{s.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Tipos badge */}
            {Object.keys(typeCount).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-2"
                >
                    {Object.entries(typeCount).map(([type, count]) => {
                        const info = TYPE_INFO[type] ?? { icon: '❓', label: type, color: 'bg-[#1c2333] text-[#94a3b8]' }
                        return (
                            <span key={type} className={`badge-pill ${info.color}`}>
                                {info.icon} {info.label} ({count})
                            </span>
                        )
                    })}
                </motion.div>
            )}

            {/* Lista de ejercicios — Miller: máx 5 visibles por defecto */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="card"
            >
                <h2 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff] mb-4">
                    Ejercicios incluidos
                </h2>
                <ul className="space-y-1">
                    {visibleExs.map((ex, i) => {
                        const info = TYPE_INFO[ex.type] ?? { icon: '❓', label: ex.type, color: 'bg-[#1c2333] text-[#94a3b8]' }
                        return (
                            <li key={ex.id}
                                className="flex items-center gap-3 py-2.5 px-2 rounded-xl
                           hover:bg-[#0f1117] dark:hover:bg-[#7c3aed]/15/50
                           transition-colors border-b border-[#1c2333]
                           dark:border-[#7c3aed]/22 last:border-0">
                                <span className="w-6 h-6 rounded-lg bg-[#1c2333] dark:bg-slate-700
                                 flex items-center justify-center
                                 text-xs font-bold text-[#9d8fc4] dark:text-[#64748b] flex-shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-lg flex-shrink-0">{info.icon}</span>
                                <span className="text-sm text-[#94a3b8] dark:text-[#475569] flex-1 truncate">
                                    {ex.question}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0 ${info.color}`}>
                                    {info.label}
                                </span>
                            </li>
                        )
                    })}
                </ul>

                {/* Ver más / menos — Ley de Miller */}
                {hasMore && (
                    <button
                        onClick={() => setShowAll(v => !v)}
                        className="mt-3 w-full py-2 text-xs font-semibold text-brand-500
                       dark:text-brand-300 hover:text-brand-700
                       bg-[#1c2333] dark:bg-brand-500/10 rounded-xl transition-colors"
                    >
                        {showAll
                            ? `↑ Ver menos`
                            : `Ver los ${exercises.length - EXERCISES_PAGE} restantes →`}
                    </button>
                )}
            </motion.div>

            {/* ── Ejercicios bonus (Open Trivia DB) ── */}
            {(triviaLoading || triviaExs.length > 0) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    className="card"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">🎲</span>
                        <h2 className="font-display font-bold text-base"
                            style={{ color: 'var(--c-text)' }}>
                            Bonus — Trivia de conocimiento general
                        </h2>
                        <span className="chip-neon ml-auto">Dinámico</span>
                    </div>
                    <p className="text-xs mb-4" style={{ color: 'var(--c-text-3)' }}>
                        Preguntas extra cargadas en tiempo real desde Open Trivia DB para
                        practicar vocabulario y comprensión en inglés.
                    </p>
                    {triviaLoading ? (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="shimmer h-10 rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {triviaExs.map((ex, i) => (
                                <li key={ex.id}
                                    className="flex items-start gap-3 py-2 px-3 rounded-xl text-sm"
                                    style={{ background: 'var(--c-surface-alt)', border: '1px solid var(--c-border)' }}>
                                    <span className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5
                                   flex items-center justify-center text-xs font-bold"
                                        style={{ background: 'rgba(99,102,241,0.20)', color: '#a5b4fc' }}>
                                        {i + 1}
                                    </span>
                                    <span style={{ color: 'var(--c-text-2)' }} className="flex-1 leading-snug">
                                        {ex.question}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            )}

            {/* CTA — Von Restorff: "Salir" débil, "Empezar" dominante */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
            >
                <button
                    onClick={() => navigate(`/exercise/${exercises[0]?.id}?lessonId=${lesson.id}`)}
                    disabled={exercises.length === 0}
                    className="btn-primary w-full text-lg py-4"
                >
                    🚀 Empezar lección
                </button>
                <Link to="/lessons"
                    className="btn-ghost w-full text-sm text-center block py-2">
                    Volver a lecciones
                </Link>
                {exercises.length === 0 && (
                    <p className="text-center text-sm text-[#9d8fc4] dark:text-[#5a4f88]">
                        Esta lección aún no tiene ejercicios
                    </p>
                )}
            </motion.div>
        </div>
    )
}