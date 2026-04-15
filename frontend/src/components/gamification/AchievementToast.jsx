import { motion, AnimatePresence } from 'framer-motion'

export default function AchievementToast({ achievement, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50
                   bg-white rounded-3xl shadow-card-hover border border-brand-100
                   px-6 py-4 flex items-center gap-4 min-w-[280px]"
            >
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                    <p className="text-xs font-bold text-brand-500 uppercase tracking-widest">
                        ¡Logro desbloqueado!
                    </p>
                    <p className="font-display font-bold text-slate-800">{achievement.name}</p>
                    <p className="text-sm text-slate-500">{achievement.description}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-auto text-slate-300 hover:text-slate-500 text-xl"
                >
                    ×
                </button>
            </motion.div>
        </AnimatePresence>
    )
}