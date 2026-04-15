/**
 * Algoritmo de Repetición Espaciada SM-2
 * ─────────────────────────────────────────
 * Basado en el algoritmo original de Piotr Woźniak (SuperMemo 2).
 *
 * Parámetros de entrada:
 *   quality      → Calidad de la respuesta del usuario (0–5)
 *                  0-2: incorrecto   3: correcto con dificultad
 *                  4: correcto       5: correcto muy fácil
 *   easeFactor   → Factor de facilidad (empieza en 2.5, mínimo 1.3)
 *   intervalDays → Días hasta la siguiente revisión (empieza en 1)
 *
 * Retorna: { newInterval, newEaseFactor, nextReview }
 */
export function calculateNextReview(quality, easeFactor = 2.5, intervalDays = 1) {
    if (quality < 0 || quality > 5) {
        throw new Error('quality debe estar entre 0 y 5')
    }

    let newInterval
    let newEaseFactor = easeFactor

    if (quality < 3) {
        // Respuesta incorrecta: reiniciar el intervalo
        newInterval = 1
        // El easeFactor baja ligeramente cuando fallas
        newEaseFactor = Math.max(1.3, easeFactor - 0.2)
    } else {
        // Respuesta correcta: calcular nuevo intervalo
        if (intervalDays <= 1) {
            newInterval = 6
        } else {
            newInterval = Math.round(intervalDays * easeFactor)
        }

        // Ajuste del easeFactor según la calidad (SM-2 original)
        newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        newEaseFactor = Math.max(1.3, newEaseFactor)
    }

    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + newInterval)

    return {
        newInterval,
        newEaseFactor: parseFloat(newEaseFactor.toFixed(4)),
        nextReview: nextReview.toISOString(),
    }
}

/**
 * Mapea una respuesta booleana + dificultad a quality (0-5).
 * Útil para ejercicios simples donde solo sabemos si fue correcto o no.
 *
 *   correct=false                   → quality 1
 *   correct=true, difficulty=hard   → quality 3
 *   correct=true, difficulty=medium → quality 4
 *   correct=true, difficulty=easy   → quality 5
 */
export function mapAnswerToQuality(correct, difficulty = 'medium') {
    if (!correct) return 1
    const map = { hard: 3, medium: 4, easy: 5 }
    return map[difficulty] ?? 4
}