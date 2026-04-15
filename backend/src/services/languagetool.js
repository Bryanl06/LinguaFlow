/**
 * LanguageTool — API pública gratuita de corrección gramatical.
 *
 * Sin clave de API, sin registro.
 * Límite: 20 peticiones por minuto por IP.
 * Endpoint oficial: https://dev.languagetool.org/public-http-api
 *
 * Úsalo para el ejercicio "corrige el error" en la sección de teoría.
 */

const LANGUAGETOOL_URL = 'https://api.languagetool.org/v2/check'

/**
 * Comprueba un texto en inglés y devuelve los errores gramaticales encontrados.
 * @param {string} text - Texto a comprobar
 * @returns {Array} - Array de errores con mensaje, sugerencia y posición
 */
export async function checkGrammar(text) {
    const body = new URLSearchParams({
        text,
        language: 'en-US',
        enabledOnly: 'false',
    })

    const response = await fetch(LANGUAGETOOL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
    })

    if (!response.ok) {
        throw new Error(`LanguageTool error: ${response.status}`)
    }

    const data = await response.json()

    // Normalizar la respuesta para el frontend
    return (data.matches ?? []).map(match => ({
        message: match.message,
        short: match.shortMessage || null,
        offset: match.offset,
        length: match.length,
        context: match.context?.text ?? text,
        // Primera sugerencia de corrección
        suggestion: match.replacements?.[0]?.value ?? null,
        // Todas las sugerencias (máx 4)
        suggestions: (match.replacements ?? []).slice(0, 4).map(r => r.value),
        rule: {
            id: match.rule?.id,
            category: match.rule?.category?.name,
            description: match.rule?.description,
        },
    }))
}

/**
 * Comprueba si una frase tiene errores gramaticales.
 * Devuelve { correct: bool, errors: [], corrected: string }
 */
export async function checkSentence(sentence) {
    const errors = await checkGrammar(sentence)

    // Construir la versión corregida aplicando las sugerencias
    let corrected = sentence
    // Aplicar correcciones de derecha a izquierda para no alterar offsets
    const sorted = [...errors].sort((a, b) => b.offset - a.offset)
    for (const err of sorted) {
        if (err.suggestion) {
            corrected =
                corrected.slice(0, err.offset) +
                err.suggestion +
                corrected.slice(err.offset + err.length)
        }
    }

    return {
        correct: errors.length === 0,
        errors,
        corrected: errors.length > 0 ? corrected : sentence,
        original: sentence,
    }
}