import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { theoryAPI } from '../../services/api'
import { speakText } from '../../services/speech'

export default function GrammarChecker() {
    const [text, setText] = useState('')
    const [result, setResult] = useState(null)
    const textareaRef = useRef(null)

    const check = useMutation({
        mutationFn: t => theoryAPI.checkGrammar(t).then(r => r.data),
        onSuccess: data => setResult(data),
        onError: () => setResult(null),
    })

    const handleCheck = () => {
        if (!text.trim() || check.isPending) return
        check.mutate(text.trim())
    }

    const handleApplyCorrection = () => {
        if (result?.corrected) {
            setText(result.corrected)
            setResult(null)
            textareaRef.current?.focus()
        }
    }

    const handleClear = () => { setText(''); setResult(null) }

    return (
        <div className="card space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg flex items-center gap-2"
                    style={{ color: 'var(--c-text)' }}>
                    <span>🔍</span> Comprobador de gramática
                </h2>
                <span className="text-xs px-2 py-1 rounded-lg"
                    style={{
                        background: 'var(--c-surface-alt)', color: 'var(--c-text-3)',
                        border: '1px solid var(--c-border)'
                    }}>
                    LanguageTool · Gratis
                </span>
            </div>

            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
                Escribe una frase en inglés y comprueba si tiene errores gramaticales.
            </p>

            {/* Textarea */}
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={e => { setText(e.target.value); setResult(null) }}
                    placeholder="Ej: She don't likes coffee"
                    rows={3}
                    maxLength={500}
                    className="input-base resize-none"
                    onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleCheck() }}
                />
                <span className="absolute bottom-3 right-3 text-xs"
                    style={{ color: 'var(--c-text-3)' }}>
                    {text.length}/500
                </span>
            </div>

            {/* Botones */}
            <div className="flex gap-2">
                <button onClick={handleCheck} disabled={!text.trim() || check.isPending}
                    className="btn-primary flex-1 py-2.5">
                    {check.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Comprobando...
                        </span>
                    ) : '🔍 Comprobar (Ctrl+Enter)'}
                </button>
                {text && (
                    <button onClick={handleClear} className="btn-secondary px-4 py-2.5">
                        ✕ Limpiar
                    </button>
                )}
            </div>

            {/* Resultado */}
            <AnimatePresence mode="wait">
                {result && (
                    <motion.div key={result.original}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="space-y-3">

                        {/* Sin errores */}
                        {result.correct && (
                            <div className="flex items-center gap-3 p-4 rounded-2xl"
                                style={{
                                    background: 'rgba(34,197,94,0.10)',
                                    border: '1px solid rgba(34,197,94,0.25)'
                                }}>
                                <span className="text-2xl">✅</span>
                                <div>
                                    <p className="font-bold" style={{ color: '#4ade80' }}>¡Sin errores detectados!</p>
                                    <p className="text-sm" style={{ color: '#86efac' }}>
                                        La frase es gramaticalmente correcta.
                                    </p>
                                </div>
                                <button onClick={() => speakText(result.original)}
                                    className="ml-auto text-xl" style={{ color: '#4ade80' }}>
                                    🔊
                                </button>
                            </div>
                        )}

                        {/* Con errores */}
                        {!result.correct && result.errors.length > 0 && (
                            <>
                                <div className="flex items-start gap-3 p-4 rounded-2xl"
                                    style={{
                                        background: 'rgba(239,68,68,0.10)',
                                        border: '1px solid rgba(239,68,68,0.25)'
                                    }}>
                                    <span className="text-2xl">⚠️</span>
                                    <p className="font-bold" style={{ color: '#f87171' }}>
                                        {result.errors.length} error{result.errors.length > 1 ? 'es' : ''} encontrado{result.errors.length > 1 ? 's' : ''}
                                    </p>
                                </div>

                                {/* Detalle de cada error */}
                                {result.errors.map((err, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-4 rounded-2xl space-y-2"
                                        style={{
                                            background: 'var(--c-surface-alt)',
                                            border: '1px solid rgba(99,102,241,0.20)'
                                        }}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-semibold" style={{ color: 'var(--c-text-2)' }}>
                                                {err.message}
                                            </p>
                                            {err.rule?.category && (
                                                <span className="text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0"
                                                    style={{
                                                        background: 'var(--c-surface)', color: 'var(--c-text-3)',
                                                        border: '1px solid var(--c-border)'
                                                    }}>
                                                    {err.rule.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Texto con error resaltado */}
                                        <div className="font-mono text-sm px-3 py-2 rounded-xl"
                                            style={{ background: 'var(--c-surface)' }}>
                                            <span style={{ color: 'var(--c-text-2)' }}>{err.context.slice(0, err.offset)}</span>
                                            <span className="font-bold px-0.5 rounded"
                                                style={{
                                                    background: 'rgba(239,68,68,0.20)',
                                                    color: '#f87171'
                                                }}>
                                                {err.context.slice(err.offset, err.offset + err.length)}
                                            </span>
                                            <span style={{ color: 'var(--c-text-2)' }}>{err.context.slice(err.offset + err.length)}</span>
                                        </div>

                                        {/* Sugerencias */}
                                        {err.suggestions.length > 0 && (
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs font-medium" style={{ color: 'var(--c-text-3)' }}>
                                                    Sugerencias:
                                                </span>
                                                {err.suggestions.map((s, j) => (
                                                    <button key={j}
                                                        onClick={() => {
                                                            const newText = text.slice(0, err.offset) + s + text.slice(err.offset + err.length)
                                                            setText(newText); setResult(null)
                                                        }}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                                                        style={{
                                                            background: 'rgba(99,102,241,0.15)',
                                                            color: '#a5b4fc',
                                                            border: '1px solid rgba(99,102,241,0.25)'
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.28)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.15)'}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Versión corregida completa */}
                                {result.corrected !== result.original && (
                                    <div className="p-4 rounded-2xl space-y-2"
                                        style={{
                                            background: 'rgba(99,102,241,0.10)',
                                            border: '1px solid rgba(99,102,241,0.25)'
                                        }}>
                                        <p className="text-xs font-bold uppercase tracking-widest"
                                            style={{ color: '#a5b4fc' }}>
                                            Versión corregida
                                        </p>
                                        <p className="font-semibold" style={{ color: 'var(--c-text)' }}>
                                            {result.corrected}
                                        </p>
                                        <div className="flex gap-2">
                                            <button onClick={handleApplyCorrection} className="text-xs btn-primary py-1.5 px-3">
                                                ✓ Usar esta versión
                                            </button>
                                            <button onClick={() => speakText(result.corrected)}
                                                className="text-xs btn-secondary py-1.5 px-3">
                                                🔊 Escuchar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}