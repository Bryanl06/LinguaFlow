/**
 * triviaApi.js
 * ─────────────────────────────────────────────────────────────
 * Wrapper sobre Open Trivia Database (opentdb.com)
 * • Completamente gratuita
 * • Sin API key
 * • Licencia CC BY-SA 4.0
 *
 * Se usa para enriquecer los ejercicios de lecciones con
 * preguntas extra de inglés generadas dinámicamente.
 * ─────────────────────────────────────────────────────────────
 */

const BASE = 'https://opentdb.com/api.php'

// Categoría 10 = "Entertainment: Books" (más relacionada con idioma/inglés)
// Sin categoría = general knowledge en inglés
const LANG_CATEGORY = '' // sin filtro para máxima variedad

/**
 * Decodifica entidades HTML que devuelve la API
 * Ej: &quot; → "   &amp; → &
 */
function decode(str) {
    const txt = document.createElement('textarea')
    txt.innerHTML = str
    return txt.value
}

/**
 * Obtiene un token de sesión (evita repetir preguntas).
 * Se guarda en sessionStorage para reutilizarlo.
 */
async function getSessionToken() {
    const stored = sessionStorage.getItem('opentdb_token')
    if (stored) return stored

    try {
        const res = await fetch('https://opentdb.com/api_token.php?command=request')
        const data = await res.json()
        if (data.response_code === 0) {
            sessionStorage.setItem('opentdb_token', data.token)
            return data.token
        }
    } catch {
        // Si falla el token seguimos sin él
    }
    return null
}

/**
 * Resetea el token cuando se han agotado las preguntas.
 */
async function resetToken(token) {
    try {
        await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
        sessionStorage.removeItem('opentdb_token')
    } catch { }
}

/**
 * Obtiene preguntas de la API y las transforma al formato
 * de ejercicios de LinguaFlow.
 *
 * @param {Object} opts
 * @param {number} opts.amount      - Nº de preguntas (1-50)
 * @param {'easy'|'medium'|'hard'} opts.difficulty
 * @param {'multiple'|'boolean'} opts.type
 * @returns {Promise<Array>}  Array de ejercicios en formato {type, question, correct_answer, options}
 */
export async function fetchTriviaExercises({
    amount = 5,
    difficulty = 'easy',
    type = 'multiple',
} = {}) {
    // Rate limit de la API: 1 request cada 5 segundos por IP
    const token = await getSessionToken()

    let url = `${BASE}?amount=${amount}&difficulty=${difficulty}&type=${type}&encode=url3986`
    if (token) url += `&token=${token}`

    let data
    try {
        const res = await fetch(url)
        data = await res.json()
    } catch {
        return [] // Si la API falla, devolvemos array vacío sin romper la app
    }

    // Token agotado → resetear
    if (data.response_code === 4 && token) {
        await resetToken(token)
    }

    // Sin resultados o error
    if (data.response_code !== 0 || !data.results?.length) return []

    return data.results.map(q => {
        const correct = decode(decodeURIComponent(q.correct_answer))
        const incorrect = (q.incorrect_answers ?? []).map(a => decode(decodeURIComponent(a)))
        const question = decode(decodeURIComponent(q.question))

        // Mezclar opciones aleatoriamente
        const options = [...incorrect, correct].sort(() => Math.random() - 0.5)

        return {
            id: `trivia_${Math.random().toString(36).slice(2)}`,
            type: type === 'boolean' ? 'multiple_choice' : 'multiple_choice',
            question,
            correct_answer: correct,
            options: JSON.stringify(options),
            hint: `Categoría: ${decode(decodeURIComponent(q.category))}`,
            difficulty: q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 2 : 3,
            source: 'opentdb', // Para saber que viene de la API externa
        }
    })
}

/**
 * Mapa de dificultad CEFR → Open Trivia difficulty
 */
export const CEFR_TO_TRIVIA = {
    A1: 'easy',
    A2: 'easy',
    B1: 'medium',
    B2: 'medium',
    C1: 'hard',
    C2: 'hard',
}

/**
 * Hook helper: devuelve ejercicios de trivia para un nivel CEFR dado.
 * Se llama desde el LessonDetail para añadir preguntas extra.
 */
export async function fetchExercisesForLevel(level = 'A1', amount = 3) {
    const difficulty = CEFR_TO_TRIVIA[level] ?? 'easy'
    return fetchTriviaExercises({ amount, difficulty, type: 'multiple' })
}