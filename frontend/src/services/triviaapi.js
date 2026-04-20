/**
 * Preguntas de inglés adicionales por nivel CEFR.
 * Pool local, sin dependencia de APIs externas para el contenido de inglés
 * (Open Trivia DB da preguntas de cultura general, no de idioma).
 *
 * Cada llamada devuelve un subconjunto aleatorio del pool correspondiente.
 */

const QUESTIONS = {
  A1: [
    { question: '¿Qué significa "apple"?', options: ['manzana', 'naranja', 'plátano', 'uva'], correct: 'manzana' },
    { question: 'Elige el saludo formal:', options: ['Good morning', 'Hey', 'What\'s up', 'Yo'], correct: 'Good morning' },
    { question: '¿Cómo se dice "gracias"?', options: ['Thank you', 'Please', 'Sorry', 'Hello'], correct: 'Thank you' },
    { question: '¿Qué color es "red"?', options: ['rojo', 'azul', 'verde', 'amarillo'], correct: 'rojo' },
    { question: '"My name ___ Ana" — completa:', options: ['is', 'are', 'am', 'be'], correct: 'is' },
    { question: '¿Cuál es el plural de "child"?', options: ['children', 'childs', 'childes', 'child'], correct: 'children' },
    { question: 'Días de la semana: ¿cuál falta? Monday, Tuesday, ___, Thursday', options: ['Wednesday', 'Friday', 'Saturday', 'Sunday'], correct: 'Wednesday' },
    { question: '¿Qué significa "book"?', options: ['libro', 'mesa', 'silla', 'lápiz'], correct: 'libro' },
    { question: '"She ___ a teacher" — completa:', options: ['is', 'are', 'am', 'be'], correct: 'is' },
    { question: 'El opuesto de "big" es:', options: ['small', 'tall', 'fast', 'old'], correct: 'small' },
    { question: '¿Cómo se dice "agua"?', options: ['water', 'milk', 'juice', 'tea'], correct: 'water' },
    { question: '"I ___ from Spain" — completa:', options: ['am', 'is', 'are', 'be'], correct: 'am' },
  ],
  A2: [
    { question: '¿Pasado de "go"?', options: ['went', 'goed', 'gone', 'going'], correct: 'went' },
    { question: '"She ___ coffee every morning":', options: ['drinks', 'drink', 'drinking', 'drank'], correct: 'drinks' },
    { question: '¿Qué significa "however"?', options: ['sin embargo', 'también', 'porque', 'entonces'], correct: 'sin embargo' },
    { question: 'Elige el comparativo de "good":', options: ['better', 'gooder', 'more good', 'best'], correct: 'better' },
    { question: '"There ___ three books on the table":', options: ['are', 'is', 'am', 'be'], correct: 'are' },
    { question: '¿Pasado de "buy"?', options: ['bought', 'buyed', 'boughten', 'buying'], correct: 'bought' },
    { question: '"Can you ___ me, please?":', options: ['help', 'helps', 'helping', 'to help'], correct: 'help' },
    { question: '¿Qué significa "breakfast"?', options: ['desayuno', 'almuerzo', 'cena', 'merienda'], correct: 'desayuno' },
    { question: 'El superlativo de "tall":', options: ['tallest', 'taller', 'most tall', 'more tall'], correct: 'tallest' },
    { question: '"I don\'t have ___ money":', options: ['any', 'some', 'no', 'a'], correct: 'any' },
    { question: '¿Pasado de "see"?', options: ['saw', 'seen', 'seed', 'seeing'], correct: 'saw' },
    { question: '"What ___ you doing?" (ahora):', options: ['are', 'do', 'did', 'were'], correct: 'are' },
  ],
  B1: [
    { question: 'Pasado participio de "write":', options: ['written', 'wrote', 'writed', 'writting'], correct: 'written' },
    { question: '"I have ___ in London for 5 years":', options: ['lived', 'live', 'living', 'lives'], correct: 'lived' },
    { question: '¿Qué significa "to look forward to"?', options: ['tener ganas de', 'mirar atrás', 'buscar', 'esperar'], correct: 'tener ganas de' },
    { question: 'El segundo condicional: "If I ___ rich, I would travel":', options: ['were', 'am', 'was', 'be'], correct: 'were' },
    { question: 'Phrasal verb de "rendirse":', options: ['give up', 'give in', 'give out', 'give away'], correct: 'give up' },
    { question: '"She has ___ finished her work":', options: ['already', 'yet', 'still', 'ever'], correct: 'already' },
    { question: '¿Qué significa "meanwhile"?', options: ['mientras tanto', 'después', 'aunque', 'porque'], correct: 'mientras tanto' },
    { question: 'Pasado de "catch":', options: ['caught', 'catched', 'catchen', 'catching'], correct: 'caught' },
    { question: '"If it rains, I ___ stay home":', options: ['will', 'would', 'am', 'do'], correct: 'will' },
    { question: 'Phrasal verb de "posponer":', options: ['put off', 'put on', 'put up', 'put in'], correct: 'put off' },
    { question: '¿Qué significa "hardly"?', options: ['apenas', 'duramente', 'fuertemente', 'rápido'], correct: 'apenas' },
    { question: '"I\'ve been working ___ 8am":', options: ['since', 'for', 'from', 'at'], correct: 'since' },
  ],
  B2: [
    { question: '"By the time she arrived, we ___ already eaten":', options: ['had', 'have', 'did', 'were'], correct: 'had' },
    { question: 'Voz pasiva de "They built this house":', options: ['This house was built', 'This house is built', 'This house built', 'This house has built'], correct: 'This house was built' },
    { question: '¿Qué significa "to come up with"?', options: ['ocurrírsele', 'encontrar', 'subir', 'aparecer'], correct: 'ocurrírsele' },
    { question: 'Tercer condicional: "If I had known, I ___ come":', options: ['would have', 'will have', 'had', 'would'], correct: 'would have' },
    { question: 'Estilo indirecto: "I am tired" → She said she ___ tired', options: ['was', 'is', 'were', 'had been'], correct: 'was' },
    { question: '¿Qué significa "thorough"?', options: ['minucioso', 'a través', 'aburrido', 'pensativo'], correct: 'minucioso' },
    { question: 'Phrasal verb de "descubrir":', options: ['find out', 'find up', 'find in', 'find away'], correct: 'find out' },
    { question: '"Not only ___ she smart, but also kind":', options: ['is', 'does', 'was', 'has'], correct: 'is' },
    { question: '¿Qué significa "despite"?', options: ['a pesar de', 'porque', 'aunque', 'durante'], correct: 'a pesar de' },
    { question: '"I wish I ___ more time" (deseo actual):', options: ['had', 'have', 'would have', 'had had'], correct: 'had' },
    { question: 'Gerundio vs infinitivo: "I enjoy ___":', options: ['reading', 'to read', 'read', 'reads'], correct: 'reading' },
    { question: '¿Qué significa "bound to"?', options: ['seguro de que', 'atado a', 'dirigido a', 'cerca de'], correct: 'seguro de que' },
  ],
  C1: [
    { question: 'Inversión: "Never ___ I seen such a thing":', options: ['have', 'I have', 'had', 'did'], correct: 'have' },
    { question: '¿Qué significa "to beat around the bush"?', options: ['irse por las ramas', 'pegar un árbol', 'esconderse', 'buscar algo'], correct: 'irse por las ramas' },
    { question: 'Cleft sentence: "It was John ___ told me":', options: ['who', 'that', 'which', 'whom'], correct: 'who' },
    { question: '¿Qué significa "to take something with a grain of salt"?', options: ['ser escéptico', 'añadir sal', 'tomar despacio', 'disfrutar'], correct: 'ser escéptico' },
    { question: 'Subjuntivo: "I suggest that he ___ here":', options: ['be', 'is', 'was', 'were'], correct: 'be' },
    { question: 'Phrasal formal para "tolerar":', options: ['put up with', 'put down', 'put off', 'put on'], correct: 'put up with' },
    { question: '¿Qué significa "a blessing in disguise"?', options: ['un mal que trae bien', 'una bendición real', 'un disfraz', 'una sorpresa'], correct: 'un mal que trae bien' },
    { question: '"Should you need help, ___ me":', options: ['call', 'calling', 'to call', 'called'], correct: 'call' },
    { question: '¿Qué significa "notwithstanding"?', options: ['a pesar de', 'sin embargo', 'aunque', 'por eso'], correct: 'a pesar de' },
    { question: 'Idiom: "to bite off more than you can chew":', options: ['abarcar demasiado', 'comer mucho', 'morder fuerte', 'esforzarse'], correct: 'abarcar demasiado' },
    { question: '"It\'s high time you ___ the truth":', options: ['told', 'tell', 'have told', 'are telling'], correct: 'told' },
    { question: '¿Qué significa "to hit the nail on the head"?', options: ['dar en el clavo', 'golpear fuerte', 'ser exacto', 'equivocarse'], correct: 'dar en el clavo' },
  ],
  C2: [
    { question: '¿Qué significa "to burn the midnight oil"?', options: ['trabajar hasta tarde', 'gastar dinero', 'quemar algo', 'dormir mucho'], correct: 'trabajar hasta tarde' },
    { question: 'Matiz: "He left" vs "He had left" — la segunda implica:', options: ['acción anterior a otra', 'futuro', 'continuidad', 'presente'], correct: 'acción anterior a otra' },
    { question: '¿Qué significa "to throw in the towel"?', options: ['rendirse', 'lanzar algo', 'limpiar', 'terminar'], correct: 'rendirse' },
    { question: 'Eufemismo para "to die":', options: ['to pass away', 'to fall', 'to stop', 'to leave'], correct: 'to pass away' },
    { question: '¿Qué significa "a storm in a teacup"?', options: ['mucho ruido y pocas nueces', 'una tormenta', 'un problema', 'una taza'], correct: 'mucho ruido y pocas nueces' },
    { question: 'Colocación: "to make a ___ difference":', options: ['stark', 'big', 'huge', 'strong'], correct: 'stark' },
    { question: 'Hedging académico: "It ___ be argued that...":', options: ['could', 'is', 'will', 'would'], correct: 'could' },
    { question: '¿Qué significa "the elephant in the room"?', options: ['tema evidente que nadie menciona', 'animal', 'gran problema', 'secreto'], correct: 'tema evidente que nadie menciona' },
    { question: 'Nominalización de "to improve":', options: ['improvement', 'improving', 'improves', 'improved'], correct: 'improvement' },
    { question: '¿Qué significa "to play devil\'s advocate"?', options: ['defender lo contrario', 'ser malo', 'jugar', 'actuar'], correct: 'defender lo contrario' },
    { question: 'Registro formal para "a lot of":', options: ['a considerable number of', 'many', 'lots of', 'tons of'], correct: 'a considerable number of' },
    { question: '¿Qué significa "to cut corners"?', options: ['hacer algo rápido y mal', 'cortar esquinas', 'ahorrar tiempo', 'ser cuidadoso'], correct: 'hacer algo rápido y mal' },
  ],
}

/**
 * Baraja un array (Fisher-Yates).
 */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Devuelve un subconjunto aleatorio de preguntas para un nivel dado,
 * con las opciones también mezcladas.
 */
export async function fetchExercisesForLevel(level = 'A1', amount = 3) {
  const pool = QUESTIONS[level] ?? QUESTIONS.A1
  const selected = shuffle(pool).slice(0, amount)

  return selected.map((q, i) => ({
    id: `extra_${level}_${Date.now()}_${i}`,
    type: 'multiple_choice',
    question: q.question,
    correct_answer: q.correct,
    options: JSON.stringify(shuffle(q.options)),
    hint: null,
    difficulty: level.startsWith('A') ? 1 : level.startsWith('B') ? 2 : 3,
    source: 'extra',
  }))
}

// Alias por compatibilidad si alguien usa el nombre antiguo
export const fetchTriviaExercises = fetchExercisesForLevel