import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reproduce un vídeo de YouTube embebido de forma segura.
 *
 * - Usa youtube-nocookie.com para mayor privacidad (sin cookies de seguimiento)
 * - Carga lazy: no carga el iframe hasta que el usuario hace clic
 * - Parámetros de privacidad: rel=0, modestbranding=1
 *
 * Props:
 *   videoId   — ID del vídeo de YouTube (ej. "dQw4w9WgXcQ")
 *   title     — Título del vídeo (accesibilidad)
 *   startAt   — Segundo en el que empieza (default: 0)
 *   compact   — Versión mini con thumbnail pequeño
 */
export default function YouTubePlayer({ videoId, title = 'Video', startAt = 0, compact = false }) {
    const [active, setActive] = useState(false)
    const ref = useRef(null)

    // Limpiar al desmontar
    useEffect(() => () => setActive(false), [videoId])

    if (!videoId) return null

    const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startAt}&rel=0&modestbranding=1&cc_load_policy=1`

    if (compact) {
        return (
            <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50
                   border border-slate-100 dark:border-slate-600 rounded-2xl
                   hover:border-red-300 dark:hover:border-red-700
                   transition-all group"
                title={`Ver en YouTube: ${title}`}
            >
                <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={thumbUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center
                          bg-black/30 group-hover:bg-black/20 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{title}</p>
                    <p className="text-xs text-red-500 font-medium">YouTube</p>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-red-400 transition-colors flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        )
    }

    return (
        <div ref={ref} className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-black">
            <AnimatePresence mode="wait">
                {!active ? (
                    /* Thumbnail con botón play — no carga el iframe hasta el clic */
                    <motion.button
                        key="thumb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(true)}
                        className="relative w-full group"
                        aria-label={`Reproducir: ${title}`}
                    >
                        <img
                            src={thumbUrl}
                            alt={title}
                            className="w-full aspect-video object-cover"
                            loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors
                            flex items-center justify-center">
                            <div className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full
                              flex items-center justify-center shadow-lg transition-all
                              group-hover:scale-110">
                                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        {/* Título */}
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3
                            bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-sm font-medium truncate">{title}</p>
                        </div>
                    </motion.button>
                ) : (
                    /* Iframe activo — solo se monta cuando el usuario hace clic */
                    <motion.div
                        key="player"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="aspect-video"
                    >
                        <iframe
                            src={embedUrl}
                            title={title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}