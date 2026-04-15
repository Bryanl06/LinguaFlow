import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { useTheoryTopic, useYouTubeVideos } from '../../hooks'
import AudioPlayer from '../../components/audio/AudioPlayer'
import VoicePanel from '../../components/audio/VoicePanel'
import GrammarChecker from '../../components/theory/GrammarChecker'
import YouTubePlayer from '../../components/video/YouTubePlayer'

const LEVEL_COLORS = {
    A1: 'bg-green-900/30 dark:bg-green-500/15 text-green-400 dark:text-green-300',
    A2: 'bg-teal-900/25 dark:bg-teal-500/15 text-teal-400 dark:text-teal-300',
    B1: 'bg-blue-900/30 dark:bg-blue-500/10 text-blue-400 dark:text-blue-300',
    B2: 'bg-indigo-900/25 dark:bg-indigo-500/10 text-indigo-400 dark:text-indigo-300',
    C1: 'bg-purple-900/30 dark:bg-purple-500/15 text-purple-400 dark:text-purple-300',
    C2: 'bg-rose-900/25 dark:bg-rose-900/30 text-rose-400 dark:text-rose-300',
}

// ── Componente de ejemplo individual ─────────────────────────────────────────
function ExampleCard({ example, index, accent, gender, slow }) {
    const [showTranslation, setShowTranslation] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-[#161b27] dark:bg-[#0f0e20]/60 border border-[#d0c2ff]/60 dark:border-slate-700
                 rounded-2xl p-4 space-y-3"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="font-semibold text-[#e2e8f0] dark:text-[#e8e4ff] text-base leading-snug">
                        {example.english}
                    </p>
                    <AnimatePresence>
                        {showTranslation && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-sm text-brand-600 dark:text-brand-300 font-medium mt-1"
                            >
                                {example.spanish}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={() => setShowTranslation(v => !v)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center
                      text-sm transition-colors flex-shrink-0
                      ${showTranslation
                            ? 'bg-brand-100 dark:bg-brand-500/15 text-brand-600'
                            : 'bg-[#0f1117] dark:bg-slate-700 hover:bg-[#232d42] text-slate-400'
                        }`}
                    title={showTranslation ? 'Ocultar traducción' : 'Ver traducción'}
                >
                    🇪🇸
                </button>
            </div>

            {/* Reproductor de audio con selector de acento */}
            {/* Conectividad uniforme: borde izquierdo conecta visualmente el ejemplo con su audio */}
            <div className="border-l-2 border-brand-200 dark:border-brand-800 pl-3">
                <AudioPlayer
                    text={example.english}
                    accent={accent}
                    gender={gender}
                    slow={slow}
                    compact
                />
            </div>
        </motion.div>
    )
}

// ── Skeleton mientras carga ───────────────────────────────────────────────────
function TheorySkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-200 rounded-xl w-2/3" />
            <div className="h-4 bg-[#1c2333] rounded-lg w-1/3" />
            <div className="card space-y-3">
                <div className="h-4 bg-[#1c2333] rounded-lg" />
                <div className="h-4 bg-[#1c2333] rounded-lg w-4/5" />
                <div className="h-4 bg-[#1c2333] rounded-lg w-3/5" />
            </div>
            <div className="card space-y-3">
                <div className="h-4 bg-[#1c2333] rounded-lg w-1/4" />
                <div className="h-12 bg-[#1c2333] rounded-xl" />
                <div className="h-12 bg-[#1c2333] rounded-xl" />
                <div className="h-12 bg-[#1c2333] rounded-xl" />
            </div>
        </div>
    )
}



// ── Acordeón para reducir carga cognitiva (Law: Cognitive Load) ───────────────
function AccordionSection({ id, title, emoji, children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div className="card p-0 overflow-hidden">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between px-6 py-4
                   hover:bg-[#0f1117] dark:hover:bg-[#7c3aed]/15/50 transition-colors"
            >
                <h2 className="font-display font-bold text-base sm:text-lg
                       text-[#e2e8f0] dark:text-[#e8e4ff] flex items-center gap-2">
                    <span>{emoji}</span> {title}
                </h2>
                <span className={`text-[#9d8fc4] dark:text-[#64748b] text-sm transition-transform duration-200
                          ${open ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 pt-2"
                >
                    {children}
                </motion.div>
            )}
        </div>
    )
}

// ── YouTube vídeos de pronunciación ──────────────────────────────────────────
function YouTubeSection({ slug, title, level }) {
    const query = `${title} English grammar lesson ${level}`
    const { data: videos = [], isLoading } = useYouTubeVideos(query)
    const hasKey = !!import.meta.env.VITE_YOUTUBE_API_KEY

    if (!hasKey) {
        // Sin API key: mostrar enlace directo a YouTube
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' English grammar explanation')}`
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="card space-y-3"
            >
                <h2 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff] flex items-center gap-2">
                    <span>🎬</span> Vídeos de pronunciación
                </h2>
                <p className="text-sm text-[#64748b] dark:text-[#7c6faa]">
                    Busca vídeos sobre este tema en YouTube con hablantes nativos.
                </p>
                <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 text-sm py-2 px-4"
                >
                    <span>🎬</span> Buscar en YouTube →
                </a>
                <p className="text-xs text-[#9d8fc4] dark:text-[#5a4f88]">
                    Añade <code className="bg-[#1c2333] dark:bg-slate-700 px-1 rounded">VITE_YOUTUBE_API_KEY</code> en el .env para ver vídeos integrados.
                </p>
            </motion.div>
        )
    }

    if (isLoading) return (
        <div className="card animate-pulse h-20" />
    )

    if (!videos.length) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="card space-y-4"
        >
            <h2 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff] flex items-center gap-2">
                <span>🎬</span> Vídeos recomendados
                <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] font-normal">via YouTube</span>
            </h2>
            <YouTubePlayer videoId={videos[0].id} title={videos[0].title} />
            {videos.length > 1 && (
                <div className="space-y-2">
                    {videos.slice(1).map(v => (
                        <YouTubePlayer key={v.id} videoId={v.id} title={v.title} compact />
                    ))}
                </div>
            )}
        </motion.div>
    )
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function TheoryDetail() {
    const { slug } = useParams()
    const { data: topic, isLoading, isFetching } = useTheoryTopic(slug)
    const [voiceAccent, setVoiceAccent] = useState('en-US')
    const [voiceGender, setVoiceGender] = useState('female')
    const [voiceSlow, setVoiceSlow] = useState(false)
    const content = topic?.content

    if (isLoading) return (
        <div className="max-w-2xl mx-auto">
            <Link to="/theory" className="flex items-center gap-2 text-sm font-semibold
                                    text-[#64748b] hover:text-brand-500 mb-6">
                ← Volver a gramática
            </Link>
            <TheorySkeleton />
        </div>
    )


    if (!topic) return (
        <div className="text-center py-16">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-[#64748b]">Tema no encontrado</p>
            <Link to="/theory" className="btn-primary mt-4 inline-block">Volver</Link>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Back */}
            <Link to="/theory" className="flex items-center gap-2 text-sm font-semibold
                                    text-[#64748b] hover:text-brand-500 transition-colors">
                ← Gramática
            </Link>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-[#e2e8f0]">
                            {topic.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`level-badge ${LEVEL_COLORS[topic.level] ?? 'bg-[#1c2333] text-[#94a3b8]'}`}>
                                {topic.level}
                            </span>

                            {isFetching && !isLoading && (
                                <span className="text-xs text-brand-500 bg-brand-50 px-2 py-0.5 rounded-lg font-medium animate-pulse">
                                    ✨ Generando con IA...
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {content ? (
                <>
                    {/* Explicación */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="card space-y-4"
                    >
                        <h2 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff] flex items-center gap-2">
                            <span>📝</span> Explicación
                        </h2>
                        <p className="text-[#94a3b8] leading-relaxed text-base">
                            {content.explanation}
                        </p>

                        {/* Estructura / Fórmula */}
                        {content.structure && (
                            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">
                                    Estructura
                                </p>
                                <p className="font-mono text-brand-700 font-semibold">
                                    {content.structure}
                                </p>
                            </div>
                        )}

                        {/* Signal words */}
                        {content.signal_words?.length > 0 && (
                            <div>
                                <p className="text-xs font-bold text-[#64748b] uppercase tracking-widest mb-2">
                                    Palabras clave
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {content.signal_words.map(w => (
                                        <span
                                            key={w}
                                            className="px-3 py-1 bg-[#1c2333] text-[#94a3b8] rounded-xl
                                 text-sm font-semibold cursor-pointer hover:bg-brand-100
                                 hover:text-brand-700 transition-colors"
                                            onClick={() => import('../../services/speech').then(m => m.speakText(w))}
                                        >
                                            {w}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Ejemplos */}
                    {content.examples?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card space-y-3"
                        >
                            <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                                <h2 className="font-display font-bold text-lg text-[#e2e8f0] dark:text-[#e8e4ff] flex items-center gap-2">
                                    <span>💬</span> Ejemplos
                                </h2>
                                {/* Panel global de voz — Ley Carga Cognitiva */}
                                <VoicePanel
                                    accent={voiceAccent} gender={voiceGender} slow={voiceSlow}
                                    onAccent={setVoiceAccent} onGender={setVoiceGender} onSlow={setVoiceSlow}
                                />
                            </div>

                            <div className="space-y-2">
                                {content.examples.map((ex, i) => (
                                    <ExampleCard key={i} example={ex} index={i} accent={voiceAccent} gender={voiceGender} slow={voiceSlow} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Errores + truco juntos en un acordeón */}
                    {(content.common_mistakes || content.tip) && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <AccordionSection id="tips" emoji="💡" title="Errores frecuentes y trucos" defaultOpen={false}>
                                {content.common_mistakes && (
                                    <div className="p-4 bg-red-900/20 dark:bg-red-500/10 rounded-2xl mb-3">
                                        <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5">
                                            ⚠️ Error frecuente
                                        </p>
                                        <p className="text-[#94a3b8] dark:text-[#475569] text-sm leading-relaxed">
                                            {content.common_mistakes}
                                        </p>
                                    </div>
                                )}
                                {content.tip && (
                                    <div className="p-4 bg-[#1c2333] dark:bg-brand-500/10 rounded-2xl">
                                        <p className="text-xs font-bold text-brand-600 dark:text-brand-300 uppercase tracking-wider mb-1.5">
                                            💡 Truco para recordarlo
                                        </p>
                                        <p className="text-[#94a3b8] dark:text-[#475569] text-sm leading-relaxed">
                                            {content.tip}
                                        </p>
                                    </div>
                                )}
                            </AccordionSection>
                        </motion.div>
                    )}

                    {/* Vídeos de pronunciación — YouTube */}
                    <YouTubeSection slug={topic.slug} title={topic.title} level={topic.level} />

                    {/* Corrector gramatical — LanguageTool */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <AccordionSection id="grammar" emoji="🔍" title="Practica: corrector gramatical" defaultOpen={false}>
                            <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] mb-4">
                                Escribe una frase en inglés y recibe correcciones al instante.
                            </p>
                            <GrammarChecker />
                        </AccordionSection>
                    </motion.div>

                    {/* CTA — ir a practicar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="card text-center space-y-3"
                    >
                        <p className="font-display font-bold text-[#e2e8f0]">
                            ¿Listo para practicar?
                        </p>
                        <p className="text-sm text-[#64748b]">
                            Refuerza lo aprendido con ejercicios interactivos
                        </p>
                        <Link to="/lessons" className="btn-primary inline-block">
                            Ir a lecciones →
                        </Link>
                    </motion.div>
                </>
            ) : (
                /* Cargando contenido de Gemini */
                <div className="card text-center py-12 space-y-4">
                    <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500
                          rounded-full animate-spin mx-auto" />
                    <div>
                        <p className="font-display font-bold text-[#e2e8f0]">
                            Generando explicación con IA...
                        </p>
                        <p className="text-sm text-[#64748b] mt-1">
                            Solo tarda unos segundos la primera vez
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}