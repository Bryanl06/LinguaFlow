import { motion } from 'framer-motion'

const LEVEL_XP = [0, 100, 300, 700, 1500, 3000, 5500, 9000, 14000, 21000]
const LEVEL_NAMES = ['', 'Novato', 'Explorador', 'Aprendiz', 'Estudiante',
    'Avanzado', 'Experto', 'Maestro', 'Elite', 'Leyenda']
const LEVEL_GRADIENTS = [
    '', 'from-slate-400 to-slate-500', 'from-green-400 to-emerald-500',
    'from-teal-400 to-cyan-500', 'from-blue-400 to-brand-500',
    'from-brand-400 to-indigo-500', 'from-purple-400 to-violet-500',
    'from-pink-400 to-rose-500', 'from-amber-400 to-orange-500',
    'from-red-400 to-rose-600',
]
const LEVEL_EMOJIS = ['', '🌱', '🗺️', '📖', '🎓', '⚡', '🏅', '👑', '💎', '🔥']

export default function XPBar({ xp = 0, level = 1, compact = false }) {
    const safeLevel = Math.max(1, Math.min(level, LEVEL_XP.length - 1))
    const currentLevelXp = LEVEL_XP[safeLevel - 1] ?? 0
    const nextLevelXp = LEVEL_XP[safeLevel] ?? null
    const isMaxLevel = nextLevelXp === null
    const progress = isMaxLevel ? 100
        : Math.min(100, Math.max(0, ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100))
    const xpToNext = isMaxLevel ? 0 : nextLevelXp - xp
    const levelName = LEVEL_NAMES[safeLevel] ?? 'Leyenda'
    const gradient = LEVEL_GRADIENTS[safeLevel] ?? LEVEL_GRADIENTS[4]
    const emoji = LEVEL_EMOJIS[safeLevel] ?? '🔥'

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-300 min-w-[2.5rem]">
                    Nv.{safeLevel}
                </span>
                <div className="progress-bar flex-1">
                    <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </div>
                <span className="text-xs text-[#9d8fc4] dark:text-[#64748b] min-w-[3.5rem] text-right">
                    {isMaxLevel ? '¡MAX! 🏆' : `${xpToNext} XP`}
                </span>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.08, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient}
                         flex items-center justify-center text-xl shadow-brand dark:animate-glow-pulse flex-shrink-0`}
                    >
                        {emoji}
                    </motion.div>
                    <div>
                        <p className="font-display font-bold text-[#e2e8f0] dark:text-[#e8e4ff] leading-tight">
                            Nivel {safeLevel} — {levelName}
                        </p>
                        <p className="text-xs text-[#9d8fc4] dark:text-[#64748b] mt-0.5">
                            {xp.toLocaleString('es-ES')} XP acumulados
                        </p>
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#94a3b8] dark:text-[#e8e4ff]">
                        {isMaxLevel ? '¡Nivel máximo! 🏆' : `${xpToNext.toLocaleString('es-ES')} XP`}
                    </p>
                    {!isMaxLevel && (
                        <p className="text-xs text-[#9d8fc4] dark:text-[#5a4f88]">para nivel {safeLevel + 1}</p>
                    )}
                </div>
            </div>

            <div className="progress-bar">
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                />
            </div>

            {!isMaxLevel && (
                <div className="flex justify-between text-xs text-[#475569] dark:text-[#94a3b8] tabular-nums">
                    <span>{currentLevelXp.toLocaleString('es-ES')}</span>
                    <span className="text-[#9d8fc4] dark:text-[#5a4f88]">{Math.round(progress)}%</span>
                    <span>{nextLevelXp.toLocaleString('es-ES')}</span>
                </div>
            )}
        </div>
    )
}