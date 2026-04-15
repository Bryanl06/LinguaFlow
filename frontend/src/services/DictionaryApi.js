/**
 * dictionaryApi.js
 * ─────────────────────────────────────────────────────────────
 * Wrapper sobre Free Dictionary API (dictionaryapi.dev)
 * • Completamente gratuita
 * • Sin API key
 * • Código abierto
 *
 * Endpoint: https://api.dictionaryapi.dev/api/v2/entries/en/{word}
 *
 * Se usa para enriquecer las lecciones de vocabulario con
 * definiciones, ejemplos y pronunciación en tiempo real.
 * ─────────────────────────────────────────────────────────────
 */

const BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en'

// Cache en memoria para no repetir peticiones
const cache = new Map()

/**
 * Obtiene definición completa de una palabra en inglés.
 *
 * @param {string} word
 * @returns {Promise<Object|null>}
 * {
 *   word, phonetic, audio,
 *   definitions: [{ partOfSpeech, definition, example }],
 *   synonyms, antonyms
 * }
 */
export async function lookupWord(word) {
    if (!word?.trim()) return null
    const key = word.toLowerCase().trim()

    if (cache.has(key)) return cache.get(key)

    try {
        const res = await fetch(`${BASE}/${encodeURIComponent(key)}`)
        if (!res.ok) return null
        const data = await res.json()
        if (!Array.isArray(data) || !data[0]) return null

        const entry = data[0]

        // Extraer audio (preferir uk > us > cualquiera)
        let audio = ''
        for (const ph of entry.phonetics ?? []) {
            if (ph.audio) {
                audio = ph.audio
                if (ph.audio.includes('-uk') || ph.audio.includes('-gb')) break
            }
        }

        // Extraer definiciones (máx 3)
        const definitions = []
        for (const meaning of entry.meanings ?? []) {
            for (const def of meaning.definitions?.slice(0, 2) ?? []) {
                if (definitions.length >= 3) break
                definitions.push({
                    partOfSpeech: meaning.partOfSpeech,
                    definition: def.definition,
                    example: def.example ?? null,
                })
            }
        }

        // Sinónimos y antónimos (hasta 5 de cada)
        const synonyms = [...new Set(entry.meanings?.flatMap(m => m.synonyms ?? []))].slice(0, 5)
        const antonyms = [...new Set(entry.meanings?.flatMap(m => m.antonyms ?? []))].slice(0, 5)

        const result = {
            word: entry.word,
            phonetic: entry.phonetic ?? '',
            audio,
            definitions,
            synonyms,
            antonyms,
        }

        cache.set(key, result)
        return result

    } catch {
        return null
    }
}

/**
 * Genera un ejercicio de opción múltiple a partir de una definición.
 * Útil para crear ejercicios de vocabulario dinámicamente.
 *
 * @param {string} correctWord  - Palabra correcta
 * @param {string[]} wrongWords - 3 palabras incorrectas para el distractors
 * @returns {Promise<Object|null>} Ejercicio en formato LinguaFlow
 */
export async function buildVocabExercise(correctWord, wrongWords = []) {
    const entry = await lookupWord(correctWord)
    if (!entry?.definitions?.length) return null

    const def = entry.definitions[0]
    const distractors = wrongWords.slice(0, 3)

    // Si no hay suficientes distractores, no generamos el ejercicio
    if (distractors.length < 2) return null

    const options = [...distractors, correctWord].sort(() => Math.random() - 0.5)

    return {
        id: `dict_${correctWord}_${Date.now()}`,
        type: 'multiple_choice',
        question: `Which word means: "${def.definition}"?`,
        correct_answer: correctWord,
        options: JSON.stringify(options),
        hint: `Part of speech: ${def.partOfSpeech}`,
        difficulty: 2,
        source: 'dictionaryapi',
    }
}