/**
 * Contenido gramatical estático — A1 a C2 completo.
 * Sin APIs, sin límites, sin coste. Funciona offline.
 *
 * Cada entrada tiene: explanation, structure, examples (3),
 * common_mistakes, tip, signal_words.
 */

export const GRAMMAR_CONTENT = {

    // ══════════════════════════════════════════════════════════════ A1
    'verb-to-be': {
        explanation: 'El verbo "to be" significa ser o estar en español. Es el verbo más importante del inglés y tiene tres formas en presente: am (para I), is (para he, she, it) y are (para you, we, they). Se usa para describir personas, objetos, lugares y estados.',
        structure: 'I am / He·She·It is / You·We·They are + adjetivo o nombre',
        examples: [
            { english: 'I am a student.', spanish: 'Soy estudiante.' },
            { english: 'She is not happy today.', spanish: 'Ella no está contenta hoy.' },
            { english: 'Are you from Spain?', spanish: '¿Eres de España?' },
        ],
        common_mistakes: 'Los hispanohablantes suelen omitir el sujeto ("Is cold" en vez de "It is cold") porque en español es opcional, pero en inglés el sujeto es obligatorio.',
        tip: 'Recuerda: AM solo va con I. IS con él/ella/ello. ARE con todos los demás. Piensa en "I AM special".',
        signal_words: ['am', 'is', 'are', 'was', 'were'],
    },

    'subject-pronouns': {
        explanation: 'Los pronombres personales sujeto reemplazan al nombre del sujeto en la oración. Son: I (yo), you (tú/usted/vosotros), he (él), she (ella), it (ello/para objetos y animales), we (nosotros), they (ellos/ellas). En inglés son obligatorios, no se pueden omitir.',
        structure: 'Pronombre sujeto + verbo + complemento',
        examples: [
            { english: 'She works in a hospital.', spanish: 'Ella trabaja en un hospital.' },
            { english: 'They are my best friends.', spanish: 'Ellos son mis mejores amigos.' },
            { english: 'It is very cold outside.', spanish: 'Hace mucho frío fuera.' },
        ],
        common_mistakes: 'Confundir "he" y "she" porque en español ambos son simplemente "él/ella". También olvidar usar "it" para objetos — en español no existe este pronombre neutro.',
        tip: 'I·you·he·she·it·we·they — apréndelos en orden, son siempre los mismos y nunca cambian de forma.',
        signal_words: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    },

    'present-simple': {
        explanation: 'El presente simple se usa para hablar de rutinas, hábitos, hechos generales y verdades universales. En afirmativo, la tercera persona singular (he, she, it) añade -s o -es al verbo. Para negativos e interrogativos se usan los auxiliares do/does.',
        structure: 'Sujeto + verbo (+ s/es en 3ª sing.) | Do/Does + sujeto + verbo?',
        examples: [
            { english: 'She drinks coffee every morning.', spanish: 'Ella bebe café todas las mañanas.' },
            { english: 'He does not like spicy food.', spanish: 'A él no le gusta la comida picante.' },
            { english: 'Do you speak French?', spanish: '¿Hablas francés?' },
        ],
        common_mistakes: 'Olvidar la -s en tercera persona: "She drink coffee" es incorrecto. Debe ser "She drinks coffee". También usar "do" con he/she/it en lugar de "does".',
        tip: 'Piensa en la -s de "she/he" → siempre lleva -s en el verbo. Si hay "does" en la pregunta o negación, el verbo principal NO lleva -s.',
        signal_words: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'on Mondays'],
    },

    'present-continuous': {
        explanation: 'El presente continuo se usa para acciones que ocurren en este momento, planes futuros confirmados y situaciones temporales. Se forma con el verbo "to be" + el verbo principal terminado en -ing.',
        structure: 'Sujeto + am/is/are + verbo-ing',
        examples: [
            { english: 'I am studying English right now.', spanish: 'Estoy estudiando inglés ahora mismo.' },
            { english: 'They are not watching TV.', spanish: 'Ellos no están viendo la tele.' },
            { english: 'Are you coming to the party tonight?', spanish: '¿Vienes a la fiesta esta noche?' },
        ],
        common_mistakes: 'Usar presente continuo con verbos de estado (like, know, want, believe) es incorrecto: "I am knowing her" → "I know her". Estos verbos no admiten -ing normalmente.',
        tip: 'Si puedes decir "en este momento" o "ahora mismo", usa el presente continuo. La terminación -ing es tu señal visual.',
        signal_words: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week'],
    },

    'articles': {
        explanation: 'En inglés hay dos tipos de artículos: el indefinido (a/an) para mencionar algo por primera vez o algo no específico, y el definido (the) para algo específico o ya mencionado. "A" se usa antes de consonante, "an" antes de sonido vocálico.',
        structure: 'a/an + nombre (primera mención o no específico) | the + nombre (específico o único)',
        examples: [
            { english: 'I saw a dog in the park.', spanish: 'Vi un perro en el parque.' },
            { english: 'The dog was very friendly.', spanish: 'El perro era muy simpático.' },
            { english: 'She is an engineer.', spanish: 'Ella es ingeniera.' },
        ],
        common_mistakes: 'Los hispanohablantes tienden a añadir "the" donde no hace falta: "I like the music" (general) debería ser "I like music". Con sustantivos en sentido general no se usa artículo.',
        tip: 'Primera vez que mencionas algo → a/an. Ya lo has mencionado o es único → the. Nunca artículo con sustantivos generales (I love music, not "the music").',
        signal_words: ['a', 'an', 'the'],
    },

    'there-is-there-are': {
        explanation: 'Se usa "there is" (singular) y "there are" (plural) para indicar la existencia o presencia de algo en un lugar. Equivale a "hay" en español. En negativo: there isn\'t / there aren\'t. En interrogativo: Is there...? / Are there...?',
        structure: 'There is + singular | There are + plural',
        examples: [
            { english: 'There is a supermarket near here.', spanish: 'Hay un supermercado cerca de aquí.' },
            { english: 'There are no eggs in the fridge.', spanish: 'No hay huevos en la nevera.' },
            { english: 'Is there a bus stop here?', spanish: '¿Hay una parada de autobús aquí?' },
        ],
        common_mistakes: 'Decir "It is a park" para indicar existencia es incorrecto. Se debe usar "There is a park". Además, confundir singular/plural: "There are a cat" → "There is a cat".',
        tip: '"There is/are" = HAY en español. Singular → is, plural → are. ¿Hay una cosa o varias?',
        signal_words: ['there is', 'there are', 'there was', 'there were'],
    },

    'have-got': {
        explanation: '"Have got" se usa principalmente en inglés británico para hablar de posesión. Significa lo mismo que "have" en inglés americano. Se forma con have/has + got. Es muy común en conversaciones informales.',
        structure: 'I/You/We/They have got | He/She/It has got + nombre',
        examples: [
            { english: 'I have got two brothers.', spanish: 'Tengo dos hermanos.' },
            { english: 'She has not got a car.', spanish: 'Ella no tiene coche.' },
            { english: 'Have you got the keys?', spanish: '¿Tienes las llaves?' },
        ],
        common_mistakes: 'Mezclar "have got" con "do": "Do you have got?" es incorrecto. Con "have got" las preguntas se forman invirtiendo: "Have you got...?"',
        tip: '"Have got" = "tener". En British English es muy común. En American English se prefiere simplemente "have". Ambas son correctas.',
        signal_words: ['have got', 'has got', "haven't got", "hasn't got"],
    },

    'imperatives': {
        explanation: 'El imperativo se usa para dar órdenes, instrucciones, consejos o hacer peticiones. Se forma simplemente con el infinitivo del verbo sin sujeto. Para la forma negativa, se añade "Don\'t" antes del verbo.',
        structure: 'Verbo (infinitivo) + complemento | Don\'t + verbo + complemento',
        examples: [
            { english: 'Open your book, please.', spanish: 'Abre tu libro, por favor.' },
            { english: "Don't touch that!", spanish: '¡No toques eso!' },
            { english: 'Be careful on the stairs.', spanish: 'Ten cuidado en las escaleras.' },
        ],
        common_mistakes: 'Añadir el pronombre "you": "You open the door" es una afirmación, no un imperativo. El imperativo no lleva sujeto.',
        tip: 'El imperativo es el verbo solo, sin sujeto. "Sit down!" "Don\'t run!" Son órdenes directas — simples y sin rodeos.',
        signal_words: ['please', 'never', 'always', 'let\'s'],
    },

    'adjectives-basic': {
        explanation: 'Los adjetivos describen características de los sustantivos. En inglés, los adjetivos van ANTES del sustantivo (al contrario que en español). Los adjetivos no cambian según el género o número del sustantivo — siempre tienen la misma forma.',
        structure: 'Adjetivo + sustantivo | Sujeto + verbo to be + adjetivo',
        examples: [
            { english: 'She has a beautiful garden.', spanish: 'Ella tiene un jardín bonito.' },
            { english: 'The old man was very kind.', spanish: 'El anciano era muy amable.' },
            { english: 'Those are expensive shoes.', spanish: 'Esos son zapatos caros.' },
        ],
        common_mistakes: 'Poner el adjetivo después del sustantivo como en español: "a house big" es incorrecto → "a big house". También añadir -s al adjetivo: "two bigs dogs" → "two big dogs".',
        tip: 'En inglés, el adjetivo va ANTES del nombre. Piensa al revés del español: "casa grande" → "big house".',
        signal_words: ['very', 'quite', 'really', 'so', 'too'],
    },

    'possessives': {
        explanation: 'Los adjetivos posesivos (my, your, his, her, its, our, their) indican a quién pertenece algo. Los pronombres posesivos (mine, yours, his, hers, ours, theirs) reemplazan al nombre. Ninguno cambia según el género del objeto poseído.',
        structure: 'Adjetivo posesivo + sustantivo | Pronombre posesivo (sin sustantivo)',
        examples: [
            { english: 'This is my laptop.', spanish: 'Este es mi portátil.' },
            { english: 'Is that bag hers?', spanish: '¿Es ese bolso suyo/de ella?' },
            { english: 'Their house is bigger than ours.', spanish: 'Su casa es más grande que la nuestra.' },
        ],
        common_mistakes: 'Confundir "its" (posesivo) con "it\'s" (it is). "Its color is red" (su color) vs "It\'s red" (es rojo). También decir "her" cuando debería ser "his" por el género del dueño, no del objeto.',
        tip: 'El posesivo en inglés depende del DUEÑO, no del objeto. "Su coche" = "his car" (si el dueño es él) o "her car" (si es ella). El objeto no importa.',
        signal_words: ['my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours'],
    },

    'numbers-dates': {
        explanation: 'Los números cardinales (one, two, three...) se usan para contar. Los ordinales (first, second, third...) se usan para fechas y posiciones. Las fechas en inglés tienen formatos diferentes: en British English día/mes, en American English mes/día.',
        structure: 'Fechas: the + ordinal + of + mes | mes + ordinal (AmE)',
        examples: [
            { english: 'My birthday is on the 15th of March.', spanish: 'Mi cumpleaños es el 15 de marzo.' },
            { english: 'The meeting is on April 3rd.', spanish: 'La reunión es el 3 de abril.' },
            { english: 'She came second in the race.', spanish: 'Ella llegó segunda en la carrera.' },
        ],
        common_mistakes: 'Confundir el formato de fechas: 04/05 en British English es el 4 de mayo, pero en American English es el 5 de abril. Escribir "the 3th" en lugar de "the 3rd" o "the 4th".',
        tip: 'Los ordinales irregulares: 1st (first), 2nd (second), 3rd (third). Del 4 en adelante, añade -th. Excepción: 11th, 12th, 13th (nunca 11st).',
        signal_words: ['first', 'second', 'third', 'last', 'next', 'on', 'in', 'at'],
    },

    'question-words': {
        explanation: 'Las palabras interrogativas (Wh- questions) se usan para pedir información específica. What (qué), Who (quién), Where (dónde), When (cuándo), Why (por qué), How (cómo), Which (cuál/qué), Whose (de quién).',
        structure: 'Wh- + auxiliar + sujeto + verbo? | Wh- + to be + sujeto?',
        examples: [
            { english: 'Where do you live?', spanish: '¿Dónde vives?' },
            { english: 'Why is she crying?', spanish: '¿Por qué está llorando?' },
            { english: 'How much does it cost?', spanish: '¿Cuánto cuesta?' },
        ],
        common_mistakes: 'Olvidar invertir el orden sujeto-verbo: "Where you live?" es incorrecto → "Where do you live?". También confundir "what" y "which": "what" para opciones abiertas, "which" para opciones limitadas.',
        tip: 'What=qué/cuál, Who=quién, Where=dónde, When=cuándo, Why=por qué, How=cómo. Aprende: W·W·W·W·W·H.',
        signal_words: ['what', 'who', 'where', 'when', 'why', 'how', 'which', 'whose'],
    },

    'prepositions-place': {
        explanation: 'Las preposiciones de lugar indican la posición de algo respecto a otra cosa. Las más comunes son: in (dentro de), on (sobre/encima de, en contacto), at (en un punto específico), under (debajo), next to (al lado), between (entre dos), behind (detrás).',
        structure: 'Sustantivo + preposición + lugar',
        examples: [
            { english: 'The keys are on the table.', spanish: 'Las llaves están sobre la mesa.' },
            { english: 'She lives in Madrid.', spanish: 'Ella vive en Madrid.' },
            { english: 'The cat is under the bed.', spanish: 'El gato está debajo de la cama.' },
        ],
        common_mistakes: 'Confundir "in" y "at": "in" para lugares con interior (in the house), "at" para puntos o eventos (at the bus stop, at school). "On" para superficies (on the floor, on the wall).',
        tip: 'IN = dentro. ON = encima (contacto). AT = en un punto. Piensa: "in a box", "on a table", "at the door".',
        signal_words: ['in', 'on', 'at', 'under', 'above', 'next to', 'between', 'behind', 'in front of'],
    },

    'prepositions-time-basic': {
        explanation: 'Las preposiciones de tiempo at, in y on tienen usos específicos. AT se usa para horas exactas y momentos precisos. IN para meses, años, siglos y partes del día. ON para días de la semana y fechas.',
        structure: 'AT + hora | IN + mes/año/parte del día | ON + día/fecha',
        examples: [
            { english: 'The class starts at 9 o\'clock.', spanish: 'La clase empieza a las 9.' },
            { english: 'I was born in July 1995.', spanish: 'Nací en julio de 1995.' },
            { english: 'We play football on Saturdays.', spanish: 'Jugamos al fútbol los sábados.' },
        ],
        common_mistakes: 'Decir "in Monday" o "at Monday" en lugar de "on Monday". Decir "in the night" → "at night" (sin artículo). Decir "in 3 o\'clock" → "at 3 o\'clock".',
        tip: 'AT es un punto exacto (hora). IN es un periodo largo (mes, año). ON es un día. Piensa: un reloj·un calendario·una agenda.',
        signal_words: ['at', 'in', 'on', 'during', 'for', 'since'],
    },

    'can-ability': {
        explanation: '"Can" es un verbo modal que expresa capacidad o habilidad (poder/saber), permiso informal y posibilidad. Su forma negativa es "cannot" o "can\'t". No necesita auxiliar para preguntas ni negaciones — solo se invierte con el sujeto.',
        structure: 'Sujeto + can + verbo (infinitivo sin to)',
        examples: [
            { english: 'She can speak three languages.', spanish: 'Ella sabe hablar tres idiomas.' },
            { english: 'Can I open the window?', spanish: '¿Puedo abrir la ventana?' },
            { english: 'He cannot swim very well.', spanish: 'Él no sabe nadar muy bien.' },
        ],
        common_mistakes: 'Decir "She can to speak" — después de modal NUNCA va "to": "She can speak". Usar "can" para el futuro: "I can go tomorrow" es informal pero aceptable, aunque "I will be able to go" es más formal.',
        tip: 'CAN + verbo sin TO. Nunca "can to do". Pregunta: solo invierte → "Can you...?" Sin "do" ni "does".',
        signal_words: ['can', 'cannot', "can't", 'could', 'be able to'],
    },

    'plural-nouns': {
        explanation: 'En inglés, la mayoría de los sustantivos forman el plural añadiendo -s. Hay reglas especiales: palabras acabadas en -s, -ss, -sh, -ch, -x añaden -es. Las acabadas en consonante + -y cambian -y por -ies. Algunos plurales son irregulares (man→men, child→children).',
        structure: 'Sustantivo + s/es | Irregulares: man→men, woman→women, child→children',
        examples: [
            { english: 'I have three cats and two dogs.', spanish: 'Tengo tres gatos y dos perros.' },
            { english: 'The children are playing in the garden.', spanish: 'Los niños están jugando en el jardín.' },
            { english: 'There are many buses in this city.', spanish: 'Hay muchos autobuses en esta ciudad.' },
        ],
        common_mistakes: 'Plurales irregulares que se olvidan: "mouses" → "mice", "foots" → "feet", "tooths" → "teeth", "persons" es correcto pero "people" es más natural en plural general.',
        tip: 'Memoriza los irregulares más comunes: man/men, woman/women, child/children, tooth/teeth, foot/feet, mouse/mice, person/people.',
        signal_words: ['-s', '-es', '-ies', 'men', 'women', 'children'],
    },

    'countable-uncountable': {
        explanation: 'Los sustantivos contables son cosas que se pueden contar (a book, two books). Los incontables no se pueden contar directamente (water, music, advice) y no llevan "a/an" ni plural. Para cuantificar incontables se usan expresiones como "a glass of", "a piece of".',
        structure: 'Contable: a/an + singular, plural + -s | Incontable: sin artículo, sin plural',
        examples: [
            { english: 'Can I have a glass of water, please?', spanish: '¿Me pone un vaso de agua, por favor?' },
            { english: 'She gave me some good advice.', spanish: 'Ella me dio un buen consejo.' },
            { english: 'I need two pieces of bread.', spanish: 'Necesito dos trozos de pan.' },
        ],
        common_mistakes: 'Decir "an advice" o "advices" — "advice" es incontable. Decir "informations" → "information" (incontable). Decir "a furniture" → "a piece of furniture".',
        tip: 'Incontables frecuentes: water, milk, bread, rice, money, information, advice, luggage, furniture, news. Recuerda: "News" lleva verbo en singular: "The news is bad."',
        signal_words: ['some', 'any', 'much', 'many', 'a lot of', 'a piece of', 'a glass of'],
    },

    'this-that-these-those': {
        explanation: 'Los demostrativos señalan distancia. THIS (este/esta) y THESE (estos/estas) se usan para objetos cercanos. THAT (ese/aquel) y THOSE (esos/aquellos) para objetos lejanos. THIS y THAT son singulares, THESE y THOSE son plurales.',
        structure: 'This/That + singular | These/Those + plural',
        examples: [
            { english: 'This book is very interesting.', spanish: 'Este libro es muy interesante.' },
            { english: 'Those mountains are beautiful.', spanish: 'Aquellas montañas son hermosas.' },
            { english: 'Are these your keys?', spanish: '¿Son estas tus llaves?' },
        ],
        common_mistakes: 'Usar "this" con plural: "this books" → "these books". Confundir cercanía y lejanía según contexto. En inglés hablado, "this" y "that" también se usan para presentar cosas o personas ("This is my friend Tom").',
        tip: 'Cerca: THIS (1) / THESE (varios). Lejos: THAT (1) / THOSE (varios). Recuerda con las iniciales: THIS=cerca, THAT=lejos.',
        signal_words: ['this', 'that', 'these', 'those', 'here', 'there'],
    },

    'adverbs-frequency-basic': {
        explanation: 'Los adverbios de frecuencia indican con qué regularidad ocurre algo. Los más comunes son: always (siempre), usually (normalmente), often (a menudo), sometimes (a veces), rarely (raramente), never (nunca). Se colocan entre el sujeto y el verbo principal, o después del verbo "to be".',
        structure: 'Sujeto + adverbio + verbo | Sujeto + to be + adverbio',
        examples: [
            { english: 'She always drinks tea in the morning.', spanish: 'Ella siempre toma té por las mañanas.' },
            { english: 'I am never late for work.', spanish: 'Nunca llego tarde al trabajo.' },
            { english: 'They sometimes go to the cinema.', spanish: 'A veces van al cine.' },
        ],
        common_mistakes: 'Poner el adverbio al final: "She drinks tea always" es incorrecto → "She always drinks tea". Con "to be" va después: "I am always tired", no "I always am tired".',
        tip: 'Orden de frecuencia: always·usually·often·sometimes·rarely·never. El adverbio va ANTES del verbo principal pero DESPUÉS de "to be".',
        signal_words: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every'],
    },

    'object-pronouns': {
        explanation: 'Los pronombres objeto reemplazan al complemento de la oración. Son: me, you, him, her, it, us, them. Van después del verbo o de una preposición. Se diferencian de los pronombres sujeto (I→me, he→him, she→her, we→us, they→them).',
        structure: 'Verbo + pronombre objeto | Preposición + pronombre objeto',
        examples: [
            { english: 'Can you help me, please?', spanish: '¿Me puedes ayudar, por favor?' },
            { english: 'I saw him at the supermarket.', spanish: 'Lo vi en el supermercado.' },
            { english: 'This gift is for her.', spanish: 'Este regalo es para ella.' },
        ],
        common_mistakes: 'Usar pronombre sujeto donde debería ir objeto: "between you and I" es incorrecto → "between you and me". También "Call I later" → "Call me later".',
        tip: 'Sujeto→Objeto: I→me, he→him, she→her, we→us, they→them. You e it no cambian. Después de verbo o preposición, usa la forma objeto.',
        signal_words: ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
    },

    // ══════════════════════════════════════════════════════════════ A2
    'past-simple': {
        explanation: 'El pasado simple se usa para hablar de acciones completadas en un momento específico del pasado. Los verbos regulares añaden -ed. Los irregulares tienen formas propias que hay que memorizar (go→went, have→had, see→saw). En negativo e interrogativo se usa "did".',
        structure: 'Sujeto + verbo-ed (reg.) o forma pasada (irreg.) | Did + sujeto + verbo base?',
        examples: [
            { english: 'She visited her grandmother last Sunday.', spanish: 'Ella visitó a su abuela el domingo pasado.' },
            { english: 'I did not go to the gym yesterday.', spanish: 'No fui al gimnasio ayer.' },
            { english: 'Did you enjoy the concert?', spanish: '¿Disfrutaste del concierto?' },
        ],
        common_mistakes: 'Usar "did" en la afirmación: "She did went" es incorrecto → "She went". Con "did" en negativas/preguntas el verbo vuelve a su forma base: "Did she go?" no "Did she went?"',
        tip: 'Afirmativa → forma pasada directa. Negativa/pregunta → "did" + verbo BASE (sin -ed, sin forma pasada). "Did" ya lleva el pasado por ti.',
        signal_words: ['yesterday', 'last week', 'last year', 'ago', 'in 1990', 'when'],
    },

    'past-continuous': {
        explanation: 'El pasado continuo describe una acción que estaba ocurriendo en un momento específico del pasado o que fue interrumpida por otra acción. Se forma con was/were + verbo-ing. Muy frecuente con "when" (cuando algo interrumpió) y "while" (dos acciones simultáneas).',
        structure: 'Sujeto + was/were + verbo-ing',
        examples: [
            { english: 'I was cooking when she called.', spanish: 'Estaba cocinando cuando ella llamó.' },
            { english: 'They were not listening to the teacher.', spanish: 'No estaban escuchando al profesor.' },
            { english: 'What were you doing at 8pm?', spanish: '¿Qué estabas haciendo a las 8 de la tarde?' },
        ],
        common_mistakes: 'Confundir pasado simple y pasado continuo: "I was going to the shop" (en curso) vs "I went to the shop" (completado). La acción más larga usa continuo, la que interrumpe usa simple.',
        tip: 'WHEN + pasado simple (acción corta que interrumpe). WHILE + pasado continuo (acción larga en progreso). "I was sleeping WHILE she was studying."',
        signal_words: ['when', 'while', 'at that moment', 'at 8 o\'clock', 'all day'],
    },

    'future-will': {
        explanation: '"Will" se usa para predicciones, decisiones espontáneas, promesas y ofrecimientos. Se forma con "will" + infinitivo sin "to". La contracción es "\'ll" (I\'ll, she\'ll). La negación es "won\'t" (will not).',
        structure: 'Sujeto + will + verbo (infinitivo sin to)',
        examples: [
            { english: "I'll call you tomorrow, I promise.", spanish: 'Te llamo mañana, te lo prometo.' },
            { english: "It won't rain today according to the forecast.", spanish: 'No lloverá hoy según la previsión.' },
            { english: 'Will you help me with this?', spanish: '¿Me ayudarás con esto?' },
        ],
        common_mistakes: 'Usar "will" para planes ya organizados: "I will meet John tonight" (si ya está organizado) → mejor usar "going to" o presente continuo. "Will" es para decisiones en el momento o predicciones.',
        tip: 'WILL = decisión en el momento, promesa o predicción. Si ya lo tenías planeado → GOING TO. "It\'s cloudy → it\'s going to rain" (evidencia). "I think it will rain tomorrow" (predicción).',
        signal_words: ['tomorrow', 'next week', 'soon', 'in the future', 'I think', 'probably', 'I promise'],
    },

    'future-going-to': {
        explanation: '"Going to" se usa para planes ya decididos antes del momento de hablar y para predicciones basadas en evidencia presente. Se forma con am/is/are + going to + infinitivo.',
        structure: 'Sujeto + am/is/are + going to + verbo (infinitivo)',
        examples: [
            { english: "We're going to visit Paris next summer.", spanish: 'Vamos a visitar París el próximo verano.' },
            { english: 'Look at those clouds — it is going to rain.', spanish: 'Mira esas nubes — va a llover.' },
            { english: 'Are you going to study medicine?', spanish: '¿Vas a estudiar medicina?' },
        ],
        common_mistakes: 'Decir "I am going to will..." — nunca se combinan will y going to. Pronunciar "gonna" en escritura formal (es solo informal hablado).',
        tip: 'GOING TO = planes previos ("I\'m going to the gym after work — it\'s in my calendar") o predicciones con evidencia visible ("She\'s going to fall!").',
        signal_words: ['going to', 'plan to', 'intend to', 'next', 'tomorrow', 'soon'],
    },

    'comparatives-superlatives': {
        explanation: 'Los comparativos se usan para comparar dos cosas (more...than / adjetivo+er...than). Los superlativos expresan el grado máximo entre un grupo (the most... / the adjetivo+est). Adjetivos cortos (1-2 sílabas) añaden -er/-est; los largos usan more/most.',
        structure: 'Adjetivo corto + -er than | more + adjetivo largo + than | the + adjetivo + -est / the most',
        examples: [
            { english: 'This laptop is cheaper than the other one.', spanish: 'Este portátil es más barato que el otro.' },
            { english: 'She is the most intelligent student in the class.', spanish: 'Ella es la estudiante más inteligente de la clase.' },
            { english: 'Is English more difficult than French?', spanish: '¿Es el inglés más difícil que el francés?' },
        ],
        common_mistakes: 'Usar "more bigger" o "the most tallest" — nunca se combinan -er/-est con more/most. Irregulares importantes: good→better→best, bad→worse→worst, far→further→furthest.',
        tip: 'Adjetivos CORTOS (1 sílaba): old→older→oldest. LARGOS (3+ sílabas): more/most. 2 sílabas: depende (happy→happier, pero boring→more boring). Irregulares: good/better/best.',
        signal_words: ['than', 'the most', 'the least', 'as...as', 'not as...as'],
    },

    'modal-verbs-basic': {
        explanation: 'Los verbos modales expresan posibilidad, obligación, permiso y consejo. Must expresa obligación fuerte o deducción lógica. Should expresa consejo o recomendación. Could es el pasado de can y expresa posibilidad o petición educada.',
        structure: 'Sujeto + modal (must/should/could) + verbo (infinitivo sin to)',
        examples: [
            { english: 'You must wear a seatbelt by law.', spanish: 'Debes ponerte el cinturón de seguridad por ley.' },
            { english: 'You should see a doctor about that cough.', spanish: 'Deberías ver a un médico por esa tos.' },
            { english: 'Could you pass the salt, please?', spanish: '¿Me podrías pasar la sal, por favor?' },
        ],
        common_mistakes: 'Añadir "to" después del modal: "You must to go" → "You must go". Confundir "must" (obligación interna/personal) y "have to" (obligación externa/regla): "I must study" (yo quiero) vs "I have to study" (es obligatorio).',
        tip: 'MUST = obligación fuerte o deducción. SHOULD = consejo. COULD = posibilidad o petición educada. Ninguno lleva TO después.',
        signal_words: ['must', 'mustn\'t', 'should', 'shouldn\'t', 'could', 'couldn\'t'],
    },

    'some-any-no': {
        explanation: '"Some" se usa en oraciones afirmativas y en ofertas/peticiones. "Any" se usa en negativas e interrogativas. "No" equivale a "not any". También forman compuestos: somebody/anybody/nobody, something/anything/nothing, somewhere/anywhere/nowhere.',
        structure: 'Some + (afirmativa) | Any + (negativa/interrogativa) | No + (afirmativa con sentido negativo)',
        examples: [
            { english: 'There is some milk in the fridge.', spanish: 'Hay algo de leche en la nevera.' },
            { english: 'I don\'t have any money with me.', spanish: 'No tengo nada de dinero encima.' },
            { english: 'Would you like some coffee?', spanish: '¿Te gustaría tomar café?' },
        ],
        common_mistakes: 'Usar "some" en preguntas generales: "Do you have some questions?" (ofrece respuesta sí) vs "Do you have any questions?" (pregunta neutral). "Some" en preguntas implica que esperas respuesta afirmativa.',
        tip: 'SOME → afirmativa o cuando esperas "sí". ANY → negativa o pregunta neutral. NO → directamente negativo ("There is no water" = "There isn\'t any water").',
        signal_words: ['some', 'any', 'no', 'somebody', 'anybody', 'nobody', 'something', 'anything', 'nothing'],
    },

    'much-many-few-little': {
        explanation: '"Much" y "little" se usan con sustantivos incontables. "Many" y "few" se usan con sustantivos contables. "A lot of" funciona con ambos. "Few/little" (negativo: apenas) vs "a few/a little" (positivo: algo de).',
        structure: 'Much/Little + incontable | Many/Few + contable plural | A lot of + ambos',
        examples: [
            { english: 'There is not much time left.', spanish: 'No queda mucho tiempo.' },
            { english: 'How many people came to the party?', spanish: '¿Cuánta gente vino a la fiesta?' },
            { english: 'She has a few friends in London.', spanish: 'Ella tiene algunos amigos en Londres.' },
        ],
        common_mistakes: 'Decir "much people" → "many people". Confundir "few" (muy pocos, casi ninguno) con "a few" (algunos, suficientes): "I have few friends" (casi ninguno) vs "I have a few friends" (algunos).',
        tip: 'MUCH/LITTLE con incontables (agua, tiempo, dinero). MANY/FEW con contables (personas, libros, días). A LOT OF sirve para todo.',
        signal_words: ['much', 'many', 'few', 'little', 'a lot of', 'plenty of', 'enough'],
    },

    'adverbs-manner': {
        explanation: 'Los adverbios de modo describen cómo se realiza una acción. La mayoría se forman añadiendo -ly al adjetivo (quick→quickly, careful→carefully). Algunos son irregulares: good→well, fast→fast, hard→hard. Se colocan generalmente al final de la oración.',
        structure: 'Adjetivo + -ly = adverbio | Verbo + adverbio (al final)',
        examples: [
            { english: 'She spoke very clearly during the presentation.', spanish: 'Habló muy claramente durante la presentación.' },
            { english: 'He drives fast but carefully.', spanish: 'Conduce rápido pero con cuidado.' },
            { english: 'The children played happily in the park.', spanish: 'Los niños jugaron felizmente en el parque.' },
        ],
        common_mistakes: 'Decir "She sings good" → "She sings well". "Good" es adjetivo (a good singer), "well" es adverbio (she sings well). "Fast", "hard", "late" son iguales como adjetivo y adverbio: "a fast car" / "she drives fast".',
        tip: 'Adjetivo + LY = adverbio. Pero ojo: "good" → "well" (irregular). "He is a good player" (adj) vs "He plays well" (adv). Hard/fast/late no cambian.',
        signal_words: ['quickly', 'slowly', 'carefully', 'well', 'badly', 'hard', 'fast', 'loudly'],
    },

    'prepositions-movement': {
        explanation: 'Las preposiciones de movimiento indican dirección. Las principales son: to (hacia un destino), into (hacia dentro de), out of (hacia fuera de), onto (hacia encima de), off (apartándose de), through (a través de), along (a lo largo de), across (de un lado al otro), up (hacia arriba), down (hacia abajo).',
        structure: 'Verbo de movimiento + preposición de movimiento + lugar',
        examples: [
            { english: 'She walked into the room quietly.', spanish: 'Ella entró en la habitación silenciosamente.' },
            { english: 'The cat jumped onto the sofa.', spanish: 'El gato saltó sobre el sofá.' },
            { english: 'We drove through the tunnel.', spanish: 'Condujimos a través del túnel.' },
        ],
        common_mistakes: 'Confundir "in" (posición estática) con "into" (movimiento hacia dentro): "She is in the room" (está dentro) vs "She walked into the room" (entró). Lo mismo con "on" vs "onto".',
        tip: 'Movimiento hacia dentro → INTO. Movimiento hacia encima → ONTO. Estático → IN/ON. "I am in the car" vs "I got into the car".',
        signal_words: ['to', 'into', 'out of', 'onto', 'off', 'through', 'across', 'along', 'up', 'down'],
    },

    'conjunctions-basic': {
        explanation: 'Las conjunciones coordinantes unen palabras, frases u oraciones del mismo nivel gramatical. AND une ideas similares. BUT introduce contraste. BECAUSE explica la razón. SO indica consecuencia. OR presenta alternativas.',
        structure: 'Oración 1 + conjunción + Oración 2',
        examples: [
            { english: 'I was tired but I finished the project.', spanish: 'Estaba cansado pero terminé el proyecto.' },
            { english: 'She missed the bus because she woke up late.', spanish: 'Perdió el autobús porque se levantó tarde.' },
            { english: 'Study hard so you can pass the exam.', spanish: 'Estudia mucho para que puedas aprobar el examen.' },
        ],
        common_mistakes: 'Comenzar una oración con "Because" sin la otra parte: "Because I was tired." es un fragmento incompleto a menos que vaya unido a otra oración. En inglés formal, evita empezar con "And" o "But".',
        tip: 'AND = además. BUT = sin embargo. BECAUSE = porque (causa). SO = por eso (consecuencia). OR = o (alternativa). Recuerda FANBOYS: For·And·Nor·But·Or·Yet·So.',
        signal_words: ['and', 'but', 'or', 'so', 'because', 'although', 'however'],
    },

    'present-perfect-intro': {
        explanation: 'El present perfect conecta el pasado con el presente. Se usa para hablar de experiencias de vida (sin tiempo específico), acciones recientes con relevancia presente, y situaciones que empezaron en el pasado y continúan. Se forma con have/has + participio pasado.',
        structure: 'Sujeto + have/has + participio pasado',
        examples: [
            { english: 'I have never been to Japan.', spanish: 'Nunca he estado en Japón.' },
            { english: 'She has just finished her homework.', spanish: 'Ella acaba de terminar los deberes.' },
            { english: 'Have you ever tried sushi?', spanish: '¿Has probado alguna vez el sushi?' },
        ],
        common_mistakes: 'Usar past simple cuando debería ir present perfect: "I went to Paris" (viaje específico terminado) vs "I have been to Paris" (experiencia de vida). En inglés americano, "I just ate" (past simple) también es aceptable.',
        tip: 'Ya/todavía/alguna vez/nunca → Present Perfect. Ayer/el año pasado/en 2010 → Past Simple. Si hay tiempo específico, usa Past Simple.',
        signal_words: ['ever', 'never', 'already', 'yet', 'just', 'recently', 'since', 'for'],
    },

    'used-to': {
        explanation: '"Used to" expresa hábitos o estados del pasado que ya no existen en el presente. No existe en presente — solo se usa para el pasado. La negación es "didn\'t use to" y la pregunta "Did you use to...?"',
        structure: 'Sujeto + used to + verbo (infinitivo sin to)',
        examples: [
            { english: 'I used to play the piano when I was young.', spanish: 'Solía tocar el piano cuando era joven.' },
            { english: 'She didn\'t use to like vegetables.', spanish: 'Antes no le gustaban las verduras.' },
            { english: 'Did you use to live in this city?', spanish: '¿Vivías en esta ciudad antes?' },
        ],
        common_mistakes: 'Confundir "used to do" (hábito pasado) con "be used to doing" (estar acostumbrado a). "I used to swim" (antes nadaba, ahora no) vs "I am used to swimming" (estoy acostumbrado a nadar).',
        tip: '"Used to" = "solía" en español. Solo para el pasado. No existe "I use to do it now" — para hábitos presentes usa "usually" o present simple.',
        signal_words: ['used to', 'would', 'in the past', 'when I was young', 'as a child', 'before'],
    },

    'be-going-to-plans': {
        explanation: 'Además de predicciones basadas en evidencia, "going to" se usa para planes ya decididos. Implica que la decisión se tomó antes del momento de hablar. Se diferencia de "will" que se usa para decisiones tomadas en el momento.',
        structure: 'Sujeto + am/is/are + going to + verbo',
        examples: [
            { english: 'I\'m going to start a new diet next Monday.', spanish: 'Voy a empezar una nueva dieta el próximo lunes.' },
            { english: 'They are going to get married in June.', spanish: 'Se van a casar en junio.' },
            { english: 'Is she going to apply for that job?', spanish: '¿Va ella a solicitar ese trabajo?' },
        ],
        common_mistakes: 'Pronunciar "gonna" en contextos escritos formales. Olvidar el verbo "to be": "I going to go" → "I am going to go". Usar "going to go" — es correcto pero a veces se simplifica a "going".',
        tip: 'Plan decidido antes = GOING TO. Decisión en el momento = WILL. "I\'ll have the salad" (decido ahora) vs "I\'m going to have salad for lunch" (ya lo había decidido).',
        signal_words: ['going to', 'plan to', 'intend to', 'next', 'this weekend', 'soon'],
    },

    'verb-patterns-basic': {
        explanation: 'Algunos verbos van seguidos de infinitivo (to + verbo), otros van seguidos de gerundio (verbo-ing), y otros admiten ambos. Verbos + gerundio: enjoy, finish, stop, mind, suggest. Verbos + infinitivo: want, decide, hope, plan, promise.',
        structure: 'Verbo + to + infinitivo | Verbo + verbo-ing',
        examples: [
            { english: 'I enjoy watching films at the cinema.', spanish: 'Me encanta ver películas en el cine.' },
            { english: 'She decided to move to a new city.', spanish: 'Ella decidió mudarse a una nueva ciudad.' },
            { english: 'He stopped smoking two years ago.', spanish: 'Dejó de fumar hace dos años.' },
        ],
        common_mistakes: 'Decir "I enjoy to watch" → "I enjoy watching". O "She decided moving" → "She decided to move". Algunos verbos cambian de significado: "stop to smoke" (parar para fumar) vs "stop smoking" (dejar de fumar).',
        tip: 'ENJOY, MIND, FINISH, STOP, SUGGEST → siempre -ING. WANT, DECIDE, HOPE, PROMISE, PLAN → siempre TO. LIKE, LOVE, HATE → admiten ambos (con ligero cambio de matiz).',
        signal_words: ['enjoy', 'finish', 'stop', 'want', 'decide', 'hope', 'like', 'love', 'hate'],
    },

    'questions-indirect': {
        explanation: 'Las preguntas indirectas se introducen con expresiones como "Could you tell me...", "Do you know...", "I was wondering...". A diferencia de las preguntas directas, el orden de las palabras es el de una afirmación (sujeto + verbo), sin inversión ni auxiliar do/does/did.',
        structure: 'Could you tell me + where/when/what/if + sujeto + verbo?',
        examples: [
            { english: 'Could you tell me where the station is?', spanish: '¿Me podría decir dónde está la estación?' },
            { english: 'Do you know what time it is?', spanish: '¿Sabes qué hora es?' },
            { english: 'I was wondering if you could help me.', spanish: 'Me preguntaba si podrías ayudarme.' },
        ],
        common_mistakes: 'Mantener el orden de pregunta directa: "Could you tell me where is the station?" → incorrecto. Con preguntas indirectas el orden es afirmativo: "...where the station is".',
        tip: 'Pregunta directa: "Where is the station?" → Indirecta: "Could you tell me where THE STATION IS?" — el verbo vuelve al final como en afirmativa.',
        signal_words: ['could you tell me', 'do you know', 'I wonder', 'I\'d like to know', 'can you tell me'],
    },

    'possessive-s': {
        explanation: 'El genitivo sajón (\'s) indica posesión en inglés. Se añade \'s al poseedor (singular o plural irregular). Para plurales regulares acabados en -s, solo se añade el apóstrofo. Para cosas inanimadas, a veces se prefiere "of": "the leg of the table".',
        structure: 'Poseedor + \'s + objeto poseído | Plural regular + \' + objeto',
        examples: [
            { english: 'This is John\'s car.', spanish: 'Este es el coche de John.' },
            { english: 'The students\' exam results were excellent.', spanish: 'Los resultados del examen de los estudiantes fueron excelentes.' },
            { english: 'The end of the film was surprising.', spanish: 'El final de la película fue sorprendente.' },
        ],
        common_mistakes: 'Confundir "it\'s" (it is) con "its" (posesivo). El posesivo "its" nunca lleva apóstrofo: "The dog wagged its tail." Escribir "the car\'s of John" — incorrecto en inglés.',
        tip: 'John\'s = de John. Students\' = de los estudiantes (plural -s ya incluido). ITS (posesivo, sin apóstrofo) vs IT\'S (it is, con apóstrofo).',
        signal_words: ["'s", "'", 'of', 'belonging to'],
    },

    'adverbs-degree': {
        explanation: 'Los adverbios de grado modifican adjetivos o adverbios indicando intensidad. Very (muy) intensifica. Quite (bastante) es más moderado. Too (demasiado) implica exceso negativo. Enough (suficiente) indica cantidad adecuada y va después del adjetivo.',
        structure: 'Very/Quite/Too + adjetivo/adverbio | Adjetivo + enough',
        examples: [
            { english: 'The soup is too hot to eat right now.', spanish: 'La sopa está demasiado caliente para comerla ahora.' },
            { english: 'She is quite good at mathematics.', spanish: 'Ella es bastante buena en matemáticas.' },
            { english: 'Are you old enough to drive?', spanish: '¿Tienes edad suficiente para conducir?' },
        ],
        common_mistakes: 'Poner "enough" antes del adjetivo: "enough old" → "old enough". "Too" siempre implica algo negativo o excesivo: "too hot" (malo), diferente de "very hot" (solo intensifica).',
        tip: 'VERY = simplemente intensifica. TOO = exceso negativo. QUITE = moderado. ENOUGH va DESPUÉS del adjetivo: "good enough", "fast enough".',
        signal_words: ['very', 'quite', 'too', 'enough', 'rather', 'fairly', 'extremely'],
    },

    'future-present-cont': {
        explanation: 'El presente continuo también se usa para hablar del futuro cuando hay un plan o acuerdo concreto ya organizado, especialmente para citas y arreglos sociales. Es más concreto que "going to" porque implica que ya está confirmado y en el calendario.',
        structure: 'Sujeto + am/is/are + verbo-ing + referencia temporal futura',
        examples: [
            { english: 'I\'m meeting Sarah for lunch tomorrow.', spanish: 'He quedado con Sarah para comer mañana.' },
            { english: 'They are flying to Rome on Friday.', spanish: 'Vuelan a Roma el viernes.' },
            { english: 'What are you doing this weekend?', spanish: '¿Qué vas a hacer este fin de semana?' },
        ],
        common_mistakes: 'Usar presente continuo para predicciones del tiempo: "It is raining tomorrow" → incorrecto (usa "it\'s going to rain"). El presente continuo futuro implica que ya está decidido y confirmado.',
        tip: 'Si tienes una cita en el calendario o un billete comprado → presente continuo. "I\'m having dinner with my boss tonight" (ya está confirmado).',
        signal_words: ['tonight', 'tomorrow', 'this weekend', 'next week', 'on Friday', 'soon'],
    },

    'reflexive-pronouns': {
        explanation: 'Los pronombres reflexivos (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) se usan cuando el sujeto y el objeto son la misma persona. También se usan para énfasis ("I did it myself" = yo solo, sin ayuda) y en expresiones fijas.',
        structure: 'Sujeto + verbo + pronombre reflexivo | Sujeto + verbo + pronombre reflexivo (énfasis)',
        examples: [
            { english: 'She hurt herself while cooking.', spanish: 'Se hizo daño mientras cocinaba.' },
            { english: 'Make yourself at home.', spanish: 'Estás en tu casa (siéntete cómodo).' },
            { english: 'He built the house himself.', spanish: 'Él construyó la casa él mismo.' },
        ],
        common_mistakes: 'Usar reflexivo donde no es necesario: "I feel myself tired" → "I feel tired". En inglés muchos verbos que son reflexivos en español no lo son en inglés: "I washed" (me lavé), "She dressed" (se vistió).',
        tip: 'Myself·yourself·himself·herself·itself·ourselves·yourselves·themselves. Úsalos cuando el sujeto se hace algo a sí mismo o para énfasis: "The CEO himself attended the meeting".',
        signal_words: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves', 'by myself', 'on my own'],
    },

    // ══════════════════════════════════════════════════════════════ B1
    'present-perfect': {
        explanation: 'El present perfect conecta experiencias pasadas con el presente. Se usa para: experiencias de vida (ever/never), acciones recientes (just, recently), situaciones que continúan (for/since), y noticias. Se forma con have/has + participio pasado. Contraste clave con el past simple: si hay tiempo específico → past simple.',
        structure: 'Sujeto + have/has + participio pasado (+ complemento)',
        examples: [
            { english: 'I have lived in three different countries.', spanish: 'He vivido en tres países diferentes.' },
            { english: 'She has been working here since 2018.', spanish: 'Lleva trabajando aquí desde 2018.' },
            { english: 'Have you finished the report yet?', spanish: '¿Has terminado el informe ya?' },
        ],
        common_mistakes: 'Mezclar present perfect con expresiones de tiempo pasado específico: "I have seen him yesterday" → "I saw him yesterday". Si el tiempo está cerrado (yesterday, last week, in 2010), usa past simple.',
        tip: 'EVER/NEVER/JUST/ALREADY/YET/RECENTLY/FOR/SINCE → Present Perfect. YESTERDAY/LAST.../IN+año/AGO → Past Simple. El tiempo específico cierra el pasado.',
        signal_words: ['ever', 'never', 'already', 'yet', 'just', 'recently', 'since', 'for', 'so far'],
    },

    'present-perfect-cont': {
        explanation: 'El present perfect continuous enfatiza la duración o la actividad continuada hasta el presente. Se usa con "for" y "since" para indicar cuánto tiempo lleva algo ocurriendo. A veces deja evidencia visible en el presente. Se forma con have/has + been + verbo-ing.',
        structure: 'Sujeto + have/has + been + verbo-ing',
        examples: [
            { english: 'I have been studying for three hours.', spanish: 'Llevo estudiando tres horas.' },
            { english: 'She has been waiting since 9 o\'clock.', spanish: 'Lleva esperando desde las 9.' },
            { english: 'Why are your eyes red? Have you been crying?', spanish: '¿Por qué tienes los ojos rojos? ¿Has estado llorando?' },
        ],
        common_mistakes: 'Usarlo con verbos de estado (know, believe, own): "I have been knowing her" → "I have known her". Los verbos de estado no admiten formas continuas.',
        tip: 'Enfatiza DURACIÓN o ACTIVIDAD RECIENTE. "I have been running" (se nota que estás cansado/sudado). Contraste: "I have read the book" (terminado) vs "I have been reading the book" (todavía en proceso).',
        signal_words: ['for', 'since', 'how long', 'all day', 'all morning', 'lately', 'recently'],
    },

    'past-perfect': {
        explanation: 'El past perfect indica una acción que ocurrió antes de otro momento o acción en el pasado. Es el "pasado del pasado". Se forma con had + participio pasado. Muy usado con before, after, when, already, by the time.',
        structure: 'Sujeto + had + participio pasado',
        examples: [
            { english: 'When I arrived, the film had already started.', spanish: 'Cuando llegué, la película ya había empezado.' },
            { english: 'She had never tried sushi before that day.', spanish: 'Nunca había probado el sushi antes de ese día.' },
            { english: 'By the time he called, I had left the office.', spanish: 'Para cuando llamó, yo ya había salido de la oficina.' },
        ],
        common_mistakes: 'Usar past perfect donde no es necesario (cuando el orden es claro por el contexto). Si ya hay "before" o "after", a veces el past simple es suficiente: "After I ate, I left" es tan correcto como "After I had eaten, I left".',
        tip: 'HAD + participio = el pasado del pasado. Dos acciones en el pasado → la más antigua usa had. "She had left BEFORE he arrived."',
        signal_words: ['before', 'after', 'when', 'by the time', 'already', 'just', 'never...before'],
    },

    'passive-voice': {
        explanation: 'La voz pasiva se usa cuando el objeto de la acción es más importante que quien la realiza, o cuando no se sabe quién realizó la acción. Se forma con el verbo "to be" en el tiempo correspondiente + participio pasado. El agente se introduce con "by".',
        structure: 'Objeto + to be + participio pasado + (by + agente)',
        examples: [
            { english: 'The Eiffel Tower was built in 1889.', spanish: 'La Torre Eiffel fue construida en 1889.' },
            { english: 'English is spoken in over 50 countries.', spanish: 'El inglés se habla en más de 50 países.' },
            { english: 'The package will be delivered tomorrow.', spanish: 'El paquete será entregado mañana.' },
        ],
        common_mistakes: 'Olvidar el participio pasado: "The letter was write" → "The letter was written". Confundir los tiempos del verbo "to be": presente pasiva → is/are + pp; pasado → was/were + pp.',
        tip: 'Activa: "Shakespeare wrote Hamlet." Pasiva: "Hamlet was written by Shakespeare." El objeto de la activa se convierte en el sujeto de la pasiva. BY solo se incluye si el agente es importante.',
        signal_words: ['is/are made', 'was/were built', 'has been', 'will be', 'by'],
    },

    'modal-verbs': {
        explanation: 'Los verbos modales expresan diversas actitudes hacia la acción. Must/have to (obligación), mustn\'t (prohibición), don\'t have to (no necesario), should/ought to (consejo), may/might (posibilidad), can/could (capacidad/permiso), shall (sugerencia/oferta en BrE), will/would (voluntad/hipótesis).',
        structure: 'Sujeto + modal + verbo (infinitivo sin to)',
        examples: [
            { english: 'You might want to bring an umbrella.', spanish: 'Puede que quieras traer un paraguas.' },
            { english: 'She must have missed the train.', spanish: 'Debe de haber perdido el tren (deducción).' },
            { english: 'You don\'t have to come if you don\'t want to.', spanish: 'No tienes que venir si no quieres.' },
        ],
        common_mistakes: 'Confundir "mustn\'t" (prohibición: no debes) con "don\'t have to" (no es necesario). "You mustn\'t park here" (está prohibido) vs "You don\'t have to park here" (puedes aparcar en otro sitio si quieres).',
        tip: 'MUST = obligación interna. HAVE TO = obligación externa. MUSTN\'T = prohibición. DON\'T HAVE TO = no es necesario (pero puedes). MIGHT = posibilidad débil. MAY = posibilidad o permiso formal.',
        signal_words: ['must', 'have to', 'should', 'ought to', 'may', 'might', 'can', 'could', 'would', 'shall'],
    },

    'zero-first-conditional': {
        explanation: 'El condicional cero expresa verdades generales y hechos científicos (if + presente simple, presente simple). El primer condicional expresa situaciones reales o posibles en el futuro (if + presente simple, will + infinitivo).',
        structure: 'Cero: If + present simple, present simple | Primero: If + present simple, will + infinitivo',
        examples: [
            { english: 'If you heat water to 100°C, it boils.', spanish: 'Si calientas agua a 100°C, hierve.' },
            { english: 'If it rains tomorrow, we will stay home.', spanish: 'Si llueve mañana, nos quedaremos en casa.' },
            { english: 'If she studies hard, she will pass the exam.', spanish: 'Si estudia mucho, aprobará el examen.' },
        ],
        common_mistakes: 'Usar "will" en la cláusula "if": "If it will rain, I will stay" → "If it rains, I will stay". La cláusula "if" usa presente simple, nunca will.',
        tip: 'Cero: IF + presente → presente (siempre verdad). Primero: IF + presente → WILL (posibilidad real). La cláusula IF NUNCA lleva WILL.',
        signal_words: ['if', 'when', 'unless', 'as long as', 'provided that'],
    },

    'second-conditional': {
        explanation: 'El segundo condicional expresa situaciones hipotéticas, imaginarias o poco probables en el presente o futuro. Se forma con if + past simple, would + infinitivo. Se usa para consejos hipotéticos ("If I were you...") y deseos poco probables.',
        structure: 'If + past simple, would + infinitivo',
        examples: [
            { english: 'If I won the lottery, I would travel the world.', spanish: 'Si ganara la lotería, viajaría por el mundo.' },
            { english: 'If I were you, I would apologize immediately.', spanish: 'Si yo fuera tú, me disculparía inmediatamente.' },
            { english: 'Would you move abroad if you had the chance?', spanish: '¿Te irías al extranjero si tuvieras la oportunidad?' },
        ],
        common_mistakes: 'Usar "was" en lugar de "were" con I/he/she/it en contextos formales: "If I was you" es coloquial, pero "If I were you" es el estándar gramatical. También mezclar tiempos: "If I would have..." → incorrecto.',
        tip: 'Segundo = hipotético/imaginario. IF + past simple (incluso con I: "If I WERE rich"). WOULD + infinitivo en la oración principal. "If I were a bird, I WOULD fly away."',
        signal_words: ['if', 'would', 'could', 'might', 'if I were you', 'imagine'],
    },

    'reported-speech-intro': {
        explanation: 'El estilo indirecto (reported speech) transmite lo que alguien dijo sin citar sus palabras exactas. Los tiempos verbales retroceden: present simple → past simple, present continuous → past continuous, will → would, can → could. Los pronombres también cambian según el contexto.',
        structure: 'He/She said (that) + oración con tiempos retrocedidos',
        examples: [
            { english: '"I am tired" → She said she was tired.', spanish: '"Estoy cansada" → Dijo que estaba cansada.' },
            { english: '"I will help you" → He said he would help me.', spanish: '"Te ayudaré" → Dijo que me ayudaría.' },
            { english: '"Do you speak Spanish?" → She asked if I spoke Spanish.', spanish: '"¿Hablas español?" → Preguntó si hablaba español.' },
        ],
        common_mistakes: 'Olvidar el retroceso temporal: "He said he is tired" → "He said he was tired". No retroceder en las preguntas indirectas: "She asked where did I live" → "She asked where I lived" (orden afirmativo).',
        tip: 'Discurso directo → Indirecto: am/is/are → was/were; will → would; can → could; have → had. SAID para afirmaciones, TOLD + persona para "decir a alguien", ASKED para preguntas.',
        signal_words: ['said', 'told', 'asked', 'explained', 'replied', 'mentioned', 'that'],
    },

    'gerunds-infinitives': {
        explanation: 'Los gerundios (verbo-ing) funcionan como sustantivos y siguen a ciertos verbos y preposiciones. Los infinitivos (to + verbo) siguen a otros verbos. Algunos verbos cambian de significado según vayan con gerundio o infinitivo (stop, remember, try, forget).',
        structure: 'Verbo + gerundio (-ing) | Verbo + infinitivo (to + verbo)',
        examples: [
            { english: 'I avoid eating fast food.', spanish: 'Evito comer comida rápida.' },
            { english: 'She forgot to lock the door.', spanish: 'Olvidó cerrar la puerta con llave.' },
            { english: 'He stopped to talk to his neighbor.', spanish: 'Se detuvo para hablar con su vecino.' },
        ],
        common_mistakes: 'Confundir "forget to do" (olvidar hacer algo — no lo hizo) con "forget doing" (no recordar haber hecho algo). "Stop to smoke" (parar para fumar) vs "stop smoking" (dejar de fumar).',
        tip: 'Gerundio después de preposiciones: "interested IN doing", "good AT swimming". Infinitivo con propósito: "I went to the shop to buy milk". Verbos especiales: REMEMBER/FORGET/STOP/TRY cambian de significado.',
        signal_words: ['enjoy', 'avoid', 'suggest', 'want', 'decide', 'hope', 'before', 'after', 'interested in'],
    },

    'relative-clauses-basic': {
        explanation: 'Las oraciones relativas especificativas dan información esencial sobre el antecedente (sin comas). WHO se usa para personas, WHICH para cosas, THAT para personas y cosas. WHERE para lugares. WHOSE para posesión. El pronombre relativo puede omitirse cuando es objeto.',
        structure: 'Nombre + who/which/that/where/whose + verbo...',
        examples: [
            { english: 'The man who called yesterday is my boss.', spanish: 'El hombre que llamó ayer es mi jefe.' },
            { english: 'This is the book that I recommended.', spanish: 'Este es el libro que recomendé.' },
            { english: 'I know a restaurant where the food is excellent.', spanish: 'Conozco un restaurante donde la comida es excelente.' },
        ],
        common_mistakes: 'Añadir pronombre personal adicional: "The book that I read it" → "The book that I read". El relativo ya funciona como pronombre. Usar "who" para objetos o "which" para personas.',
        tip: 'WHO = personas. WHICH = cosas. THAT = ambos (pero no en relativas explicativas). WHERE = lugares. WHOSE = posesión. Si el relativo es objeto, puedes omitirlo: "The film (that) I saw was great."',
        signal_words: ['who', 'which', 'that', 'where', 'whose', 'when'],
    },

    'time-clauses': {
        explanation: 'Las cláusulas temporales indican cuándo ocurre la acción principal. Se introducen con conjunciones como when (cuando), while (mientras), before (antes de), after (después de), as soon as (en cuanto), until (hasta que), by the time (para cuando). Con futuro, se usa presente simple en la cláusula temporal.',
        structure: 'When/While/Before/After/As soon as + presente simple/pasado + oración principal',
        examples: [
            { english: 'Call me when you arrive at the station.', spanish: 'Llámame cuando llegues a la estación.' },
            { english: 'As soon as I finish work, I\'ll go to the gym.', spanish: 'En cuanto acabe el trabajo, iré al gimnasio.' },
            { english: 'While she was cooking, he set the table.', spanish: 'Mientras ella cocinaba, él puso la mesa.' },
        ],
        common_mistakes: 'Usar "will" en la cláusula temporal con referencia futura: "When I will arrive" → "When I arrive". La cláusula temporal con referencia futura usa presente simple, igual que en los condicionales.',
        tip: 'Cláusula temporal + futuro → usa PRESENTE SIMPLE (no will): "I\'ll call you WHEN I get there." "AS SOON AS she arrives, we\'ll start."',
        signal_words: ['when', 'while', 'before', 'after', 'as soon as', 'until', 'by the time', 'once'],
    },

    'wish-if-only': {
        explanation: '"Wish" y "If only" expresan deseos sobre situaciones presentes o pasadas que son diferentes a la realidad. Para deseos sobre el presente se usa wish + past simple. Para deseos sobre el pasado se usa wish + past perfect. "If only" añade mayor énfasis emocional.',
        structure: 'I wish + past simple (presente) | I wish + past perfect (pasado)',
        examples: [
            { english: 'I wish I spoke better English.', spanish: 'Ojalá hablara inglés mejor (ahora).' },
            { english: 'If only I had studied harder at school!', spanish: '¡Ojalá hubiera estudiado más en el colegio!' },
            { english: 'She wishes she could travel more.', spanish: 'Ojalá pudiera viajar más.' },
        ],
        common_mistakes: 'Decir "I wish I can" → "I wish I could" (present wish usa formas pasadas). Decir "I wish I would have" → "I wish I had" (past wish usa past perfect, sin "would").',
        tip: 'WISH + past simple = quiero que el presente fuera diferente. WISH + past perfect = me arrepiento del pasado. IF ONLY = wish con más emoción. "I wish I WERE richer" (más formal: were, no was).',
        signal_words: ['wish', 'if only', 'I wish I could', 'I wish I had'],
    },

    'quantifiers': {
        explanation: 'Los cuantificadores expresan cantidad. All (todo/todos), most (la mayoría de), many/much (mucho/a), some (algún/alguna), a few/a little (algunos/algo de), few/little (pocos/poco), no/none (ninguno). Su uso depende de si el sustantivo es contable o incontable, y de si la oración es afirmativa o negativa.',
        structure: 'All/Most/Many/Some/Few/No + of + the + sustantivo | Cuantificador + sustantivo',
        examples: [
            { english: 'Most of the students passed the exam.', spanish: 'La mayoría de los estudiantes aprobó el examen.' },
            { english: 'All the windows were open.', spanish: 'Todas las ventanas estaban abiertas.' },
            { english: 'None of the answers were correct.', spanish: 'Ninguna de las respuestas era correcta.' },
        ],
        common_mistakes: 'Decir "All of students" — con "the/my/these" se necesita "of": "All of the students". Sin determinante: "All students". "None of them IS" vs "None of them ARE" — ambas son aceptables en inglés moderno.',
        tip: 'ALL/MOST/SOME/NONE + of + THE + sustantivo. Sin "the": ALL/MOST/SOME + sustantivo directamente. NONE es más formal que "not any". "Most people" (sin "of" cuando no hay determinante).',
        signal_words: ['all', 'most', 'many', 'some', 'few', 'little', 'none', 'both', 'either', 'neither'],
    },

    'linking-words': {
        explanation: 'Los conectores y marcadores del discurso organizan el texto y guían al lector. Adición: furthermore, moreover, in addition. Contraste: however, nevertheless, on the other hand. Causa: therefore, consequently, as a result. Ejemplo: for instance, such as. Conclusión: in conclusion, to sum up.',
        structure: 'Oración 1. Connector, oración 2. | Connector + oración',
        examples: [
            { english: 'The project was complex; however, the team succeeded.', spanish: 'El proyecto era complejo; sin embargo, el equipo tuvo éxito.' },
            { english: 'Furthermore, the new policy will reduce costs significantly.', spanish: 'Además, la nueva política reducirá los costes significativamente.' },
            { english: 'As a result, sales increased by 20% last quarter.', spanish: 'Como resultado, las ventas aumentaron un 20% el último trimestre.' },
        ],
        common_mistakes: 'Confundir "although" (conjunción, dentro de la oración) con "however" (adverbio, al inicio de oración separada): "Although it was cold, we went out" vs "It was cold. However, we went out."',
        tip: 'ALTHOUGH/EVEN THOUGH → dentro de la misma oración. HOWEVER/NEVERTHELESS → al inicio de una nueva oración (con coma). THEREFORE/CONSEQUENTLY → consecuencia lógica.',
        signal_words: ['however', 'therefore', 'furthermore', 'moreover', 'nevertheless', 'consequently', 'in addition', 'on the other hand'],
    },

    'phrasal-verbs-common': {
        explanation: 'Los phrasal verbs son combinaciones de verbo + partícula (preposición o adverbio) con un significado diferente al verbo original. Son esenciales en el inglés coloquial. Pueden ser separables (put off → put it off) o inseparables (look after → look after the baby).',
        structure: 'Verbo + partícula (+ objeto) | Verbo + objeto + partícula (separables)',
        examples: [
            { english: 'Can you look after my cat this weekend?', spanish: '¿Puedes cuidar a mi gato este fin de semana?' },
            { english: 'I need to give up sugar for a month.', spanish: 'Necesito dejar el azúcar durante un mes.' },
            { english: 'Something unexpected came up at work.', spanish: 'Surgió algo inesperado en el trabajo.' },
        ],
        common_mistakes: 'Separar incorrectamente los inseparables: "look the children after" → "look after the children". Con los separables, si el objeto es pronombre debe ir en medio: "turn it off" no "turn off it".',
        tip: 'Aprende los phrasal verbs más comunes por grupos temáticos: break (break up, break down, break into), give (give up, give in, give away), look (look up, look after, look out for).',
        signal_words: ['give up', 'take off', 'look after', 'put off', 'come up', 'turn up', 'find out', 'carry on'],
    },

    'verb-patterns-advanced': {
        explanation: '"Make", "let", "have" y "help" son verbos causativos que van seguidos de objeto + infinitivo sin to (bare infinitive). "Make" implica obligación, "let" implica permiso, "have" implica encargo, "help" implica asistencia. "Get" también es causativo pero usa infinitivo con to.',
        structure: 'Make/Let/Have/Help + objeto + infinitivo (sin to) | Get + objeto + to + infinitivo',
        examples: [
            { english: 'The teacher made the students repeat the exercise.', spanish: 'El profesor hizo repetir el ejercicio a los alumnos.' },
            { english: 'My parents never let me stay up late.', spanish: 'Mis padres nunca me dejaban quedarme hasta tarde.' },
            { english: 'She got the mechanic to fix her car.', spanish: 'Consiguió que el mecánico le arreglara el coche.' },
        ],
        common_mistakes: 'Añadir "to" después de make/let/have: "She made him to apologize" → "She made him apologize". Solo "get" usa "to": "She got him to help".',
        tip: 'MAKE/LET/HAVE/HELP + objeto + verbo BASE (sin to). GET + objeto + TO + verbo. "Let me go" (déjame ir), "Make me laugh" (hazme reír), "Get him to come" (consigue que venga).',
        signal_words: ['make', 'let', 'have', 'help', 'get', 'allow', 'force'],
    },

    'question-tags': {
        explanation: 'Las question tags (coletillas interrogativas) se añaden al final de una oración para pedir confirmación o invitar al acuerdo. Si la oración es afirmativa, la tag es negativa, y viceversa. La tag usa el mismo tiempo verbal y auxiliar de la oración principal.',
        structure: 'Oración afirmativa + , + auxiliar negativo + pronombre? | Oración negativa + , + auxiliar positivo + pronombre?',
        examples: [
            { english: 'It\'s a beautiful day, isn\'t it?', spanish: 'Es un día precioso, ¿verdad?' },
            { english: 'You haven\'t finished yet, have you?', spanish: 'No has terminado todavía, ¿verdad?' },
            { english: 'Let\'s go to the beach, shall we?', spanish: 'Vamos a la playa, ¿no?' },
        ],
        common_mistakes: 'Usar "isn\'t it?" para todo: "You like pizza, isn\'t it?" → "You like pizza, don\'t you?". La tag debe usar el mismo auxiliar de la oración. "I am late, aren\'t I?" (no "amn\'t I").',
        tip: 'La tag siempre es opuesta (afirmativa↔negativa) y usa el mismo auxiliar. "You CAN drive, CAN\'T you?" "She HAS eaten, HASN\'T she?" "It IS cold, ISN\'T it?"',
        signal_words: ["isn't it?", "don't you?", "can't she?", "haven't they?", "shall we?", "won't you?"],
    },

    'so-neither': {
        explanation: '"So do I" y "Neither do I" se usan para mostrar acuerdo con lo que alguien ha dicho. "So" se usa para estar de acuerdo con algo afirmativo, "neither/nor" para coincidir con algo negativo. Se usa el auxiliar correspondiente al tiempo verbal.',
        structure: 'So + auxiliar + sujeto (acuerdo afirmativo) | Neither + auxiliar + sujeto (acuerdo negativo)',
        examples: [
            { english: '"I love jazz." "So do I."', spanish: '"Me encanta el jazz." "A mí también."' },
            { english: '"I can\'t swim." "Neither can I."', spanish: '"No sé nadar." "Yo tampoco."' },
            { english: '"She has been to Paris." "So has he."', spanish: '"Ella ha estado en París." "Él también."' },
        ],
        common_mistakes: 'Decir "Me too" y "Me neither" es coloquialmente aceptable pero gramaticalmente incorrecto en algunos contextos formales. Confundir el auxiliar: "I like it." "So do I" (no "so I do").',
        tip: 'Afirmativo → SO + aux + sujeto ("So am I", "So do I", "So have I"). Negativo → NEITHER + aux + sujeto ("Neither am I", "Neither do I"). El auxiliar es el mismo que en la oración original.',
        signal_words: ['so do I', 'neither do I', 'so am I', 'neither can I', 'nor do I'],
    },

    'future-perfect': {
        explanation: 'El futuro perfecto (will have + participio) expresa una acción que estará completada antes de un momento específico en el futuro. El futuro continuo (will be + -ing) expresa una acción que estará en progreso en un momento del futuro.',
        structure: 'Futuro perfecto: will have + participio | Futuro continuo: will be + verbo-ing',
        examples: [
            { english: 'By next year, I will have finished my degree.', spanish: 'Para el año que viene, habré terminado mi carrera.' },
            { english: 'At 8pm I will be having dinner with my family.', spanish: 'A las 8 estaré cenando con mi familia.' },
            { english: 'She will have been working here for 10 years by June.', spanish: 'En junio llevará 10 años trabajando aquí.' },
        ],
        common_mistakes: 'Confundir futuro perfecto con future simple: "By Monday I will finish" (incorrecto si enfatiza la completitud) → "By Monday I will have finished".',
        tip: 'BY + tiempo futuro → futuro perfecto (WILL HAVE + pp). AT + tiempo futuro → futuro continuo (WILL BE + ing). "By 2030, we will have solved this problem." "At 3pm I will be sleeping."',
        signal_words: ['by', 'by the time', 'by then', 'at this time tomorrow', 'in two years'],
    },

    'passive-voice-advanced': {
        explanation: 'La pasiva con modales combina verbos modales con la estructura pasiva. Se forma con modal + be + participio pasado. Es muy común en inglés formal y escrito para instrucciones, reglas y posibilidades.',
        structure: 'Modal + be + participio pasado',
        examples: [
            { english: 'This problem can be solved easily.', spanish: 'Este problema puede resolverse fácilmente.' },
            { english: 'The report should be submitted by Friday.', spanish: 'El informe debería entregarse antes del viernes.' },
            { english: 'All applications must be sent online.', spanish: 'Todas las solicitudes deben enviarse online.' },
        ],
        common_mistakes: 'Usar "be" conjugado: "It can is solved" → "It can be solved". El "be" siempre es infinitivo después de modal.',
        tip: 'Modal + BE + participio (invariable). "Can BE done", "Must BE submitted", "Should BE considered". El BE nunca cambia — siempre es infinitivo.',
        signal_words: ['can be', 'must be', 'should be', 'might be', 'will be', 'could be', 'ought to be'],
    },

    // ══════════════════════════════════════════════════════════════ B2
    'third-conditional': {
        explanation: 'El tercer condicional expresa situaciones hipotéticas en el pasado — cosas que no ocurrieron y sus consecuencias imaginadas. Se usa para hablar de arrepentimientos y situaciones pasadas que podrían haber sido diferentes. If + past perfect, would have + participio.',
        structure: 'If + past perfect, would have + participio pasado',
        examples: [
            { english: 'If I had studied harder, I would have passed the exam.', spanish: 'Si hubiera estudiado más, habría aprobado el examen.' },
            { english: 'She wouldn\'t have missed the flight if she had left earlier.', spanish: 'No habría perdido el vuelo si hubiera salido antes.' },
            { english: 'Would you have accepted the job if they had offered it?', spanish: '¿Habrías aceptado el trabajo si te lo hubieran ofrecido?' },
        ],
        common_mistakes: 'Decir "If I would have studied" → "If I had studied". En la cláusula IF nunca va "would". También mezclar el tercer con el segundo: "If he worked harder, he would have succeeded" mezcla tiempos.',
        tip: 'Tercer condicional = arrepentimiento del pasado. IF + HAD + pp (nunca "would have" en la cláusula if). WOULD HAVE + pp en la principal. "If I HAD known, I WOULD HAVE helped."',
        signal_words: ['if...had', 'would have', 'could have', 'might have', 'should have'],
    },

    'mixed-conditionals': {
        explanation: 'Los condicionales mixtos combinan tiempos de diferentes condicionales. El tipo más común mezcla el tercer condicional (pasado hipotético) en la cláusula if con el segundo (presente hipotético) en la principal, para expresar el efecto presente de una condición pasada.',
        structure: 'If + past perfect (pasado hipotético), would + infinitivo (efecto presente)',
        examples: [
            { english: 'If I had studied medicine, I would be a doctor now.', spanish: 'Si hubiera estudiado medicina, ahora sería médico.' },
            { english: 'If she hadn\'t moved abroad, she might not be so fluent.', spanish: 'Si no se hubiera ido al extranjero, quizás no hablaría con tanta fluidez.' },
            { english: 'He would be in prison now if he had been caught.', spanish: 'Estaría en prisión ahora si lo hubieran pillado.' },
        ],
        common_mistakes: 'Intentar usar solo un tipo de condicional cuando el contexto requiere uno mixto. Reconocer cuándo la causa está en el pasado pero el efecto es presente.',
        tip: 'Causa pasada (if + past perfect) → efecto presente (would + infinitivo). "If I had been born rich (pasado), I would be living in a mansion NOW (presente)."',
        signal_words: ['now', 'still', 'today', 'at this moment', 'currently', 'if...had', 'would be'],
    },

    'reported-speech': {
        explanation: 'El reported speech completo incluye: afirmaciones (said/told), preguntas (asked), órdenes (told/asked + to), y expresiones de consejos y peticiones. Los cambios incluyen retroceso temporal, cambios de pronombres, adverbios de tiempo/lugar (now→then, here→there, today→that day).',
        structure: 'Said (that) + cláusula con tiempos retrocedidos | Asked if/whether + oración afirmativa | Told + objeto + to + infinitivo',
        examples: [
            { english: '"Don\'t be late!" → He told me not to be late.', spanish: '"¡No llegues tarde!" → Me dijo que no llegara tarde.' },
            { english: '"Are you coming?" → She asked if I was coming.', spanish: '"¿Vas a venir?" → Preguntó si iba a venir.' },
            { english: '"I saw her yesterday" → He said he had seen her the day before.', spanish: '"La vi ayer" → Dijo que la había visto el día anterior.' },
        ],
        common_mistakes: 'No cambiar los adverbios de tiempo: "yesterday" → "the day before", "tomorrow" → "the next day/following day", "now" → "then", "here" → "there". Olvidar invertir el orden en preguntas indirectas.',
        tip: 'Cambios clave: yesterday→the day before, tomorrow→the next day, now→then, here→there, this→that. Órdenes en indirecto: told/asked + someone + NOT TO + verbo.',
        signal_words: ['said', 'told', 'asked', 'the day before', 'the following day', 'then', 'there', 'that'],
    },

    'relative-clauses-advanced': {
        explanation: 'Las oraciones relativas explicativas (non-defining) añaden información adicional no esencial sobre algo ya identificado. Van entre comas y NO pueden usar "that". Las especificativas (defining) no llevan comas y pueden usar "that" o "which/who". Con preposición: "the person to whom I spoke" (formal).',
        structure: 'Nombre, + who/which + información adicional, + verbo principal',
        examples: [
            { english: 'My sister, who lives in London, is visiting next week.', spanish: 'Mi hermana, que vive en Londres, viene a visitar la semana que viene.' },
            { english: 'The report, which was written by the CEO, caused controversy.', spanish: 'El informe, que fue escrito por el CEO, causó controversia.' },
            { english: 'The company for which she works is very prestigious.', spanish: 'La empresa para la que trabaja es muy prestigiosa.' },
        ],
        common_mistakes: 'Usar "that" en relativas explicativas: "My father, that works in Madrid" → "My father, who works in Madrid". Omitir las comas en relativas explicativas cambia el significado de la oración.',
        tip: 'Explicativa (entre comas) = información extra, puede quitarse. Solo WHO/WHICH (nunca THAT). Especificativa (sin comas) = información esencial para identificar. Puede usarse THAT.',
        signal_words: ['who', 'which', 'whose', 'whom', 'where', 'when', 'that'],
    },

    'cleft-sentences': {
        explanation: 'Las cleft sentences dividen una oración en dos para enfatizar un elemento específico. "It is/was + elemento enfatizado + that/who..." destaca el sujeto u objeto. "What + sujeto + verbo + is/was + elemento enfatizado" crea una pseudohendida que enfatiza el predicado.',
        structure: 'It is/was + foco + that/who + resto | What + sujeto + verbo + is/was + foco',
        examples: [
            { english: 'It was John who broke the window.', spanish: 'Fue John quien rompió la ventana.' },
            { english: 'It is hard work that leads to success.', spanish: 'Es el trabajo duro lo que lleva al éxito.' },
            { english: 'What I really need is a holiday.', spanish: 'Lo que realmente necesito es unas vacaciones.' },
        ],
        common_mistakes: 'Olvidar "that" después del foco en estructuras con "it": "It was John broke the window" → "It was John WHO broke the window". En cleft con "What", el verbo principal es singular si el foco es singular.',
        tip: 'IT IS/WAS + FOCO + THAT/WHO = énfasis en sujeto/objeto. WHAT + cláusula + IS = énfasis en predicado. Úsalas para dar énfasis contrastivo: "It was HIM, not her."',
        signal_words: ['it is', 'it was', 'what I need', 'what matters', 'the thing that'],
    },

    'inversion-emphasis': {
        explanation: 'La inversión se usa para énfasis o en estructuras formales. Con expresiones negativas al inicio (never, rarely, hardly, not only, no sooner) se invierte el auxiliar y el sujeto. También en condicionales formales sin "if" (Had I known, Were she here, Should you need).',
        structure: 'Expresión negativa + auxiliar + sujeto + verbo | Had/Were/Should + sujeto + verbo (condicional formal)',
        examples: [
            { english: 'Never have I seen such beautiful scenery.', spanish: 'Nunca he visto un paisaje tan hermoso.' },
            { english: 'Not only did she win, but she also broke the record.', spanish: 'No solo ganó, sino que también batió el récord.' },
            { english: 'Had I known earlier, I would have acted differently.', spanish: 'De haberlo sabido antes, habría actuado de otra manera.' },
        ],
        common_mistakes: 'No invertir cuando es obligatorio: "Never I have seen" → "Never have I seen". Confundir la inversión con el orden normal. En inglés coloquial la inversión es menos común.',
        tip: 'NEVER/RARELY/HARDLY/SELDOM/NOT ONLY al principio → inversión obligatoria (auxiliar antes del sujeto). "NEVER HAVE I..." "RARELY DOES SHE..." Son construcciones muy formales y literarias.',
        signal_words: ['never', 'rarely', 'hardly', 'scarcely', 'not only', 'not until', 'only when', 'little did'],
    },

    'subjunctive': {
        explanation: 'El subjuntivo en inglés es menos prominente que en español pero existe. Se usa en estructuras mandativas (suggest, recommend, insist, demand + that + sujeto + verbo base) y en expresiones fijas (if I were you, as it were, be that as it may).',
        structure: 'Verbo mandativo + that + sujeto + verbo base (sin conjugar) | If + were + sujeto',
        examples: [
            { english: 'The doctor recommended that she take the medication daily.', spanish: 'El médico recomendó que tomara la medicación a diario.' },
            { english: 'It is essential that he be present at the meeting.', spanish: 'Es esencial que él esté presente en la reunión.' },
            { english: 'If I were the president, I would change many things.', spanish: 'Si yo fuera el presidente, cambiaría muchas cosas.' },
        ],
        common_mistakes: 'Usar el verbo conjugado: "She suggested that he goes" → "She suggested that he go" (sin -s). En inglés americano el subjuntivo es más frecuente; en británico a veces se sustituye por "should + verbo".',
        tip: 'Verbo base sin conjugar después de: suggest/recommend/insist/demand/require/propose + that. "I suggest that she COME tomorrow" (no "comes"). Subjuntivo = misma forma para todas las personas.',
        signal_words: ['suggest', 'recommend', 'insist', 'demand', 'require', 'propose', 'it is essential that'],
    },

    'participle-clauses': {
        explanation: 'Las cláusulas de participio reducen oraciones relativas o temporales. El participio presente (-ing) indica una acción activa o simultánea. El participio pasado indica una acción pasiva. Se usan en inglés formal y escrito para mayor concisión.',
        structure: 'Participio (-ing/pp) + complemento (mismo sujeto que oración principal)',
        examples: [
            { english: 'Walking along the river, she found a lost wallet.', spanish: 'Caminando a lo largo del río, encontró una cartera perdida.' },
            { english: 'Written in 1847, the novel is still widely read.', spanish: 'Escrita en 1847, la novela se sigue leyendo ampliamente.' },
            { english: 'Having finished her work, she went home early.', spanish: 'Habiendo terminado su trabajo, se fue a casa pronto.' },
        ],
        common_mistakes: 'El sujeto de la cláusula de participio debe coincidir con el de la oración principal: "Walking down the street, the rain started" es incorrecto — la lluvia no caminaba. Esto se llama "dangling participle".',
        tip: 'La cláusula de participio y la oración principal deben tener el MISMO SUJETO. "Arriving at the station, I met my friend." (yo llegué y yo encontré). Si no, cambia la estructura.',
        signal_words: ['-ing', 'having + pp', 'being + pp', 'not + -ing'],
    },

    'passive-advanced': {
        explanation: 'Las construcciones pasivas avanzadas incluyen: pasiva con doble objeto (She was given a prize), pasiva de percepción (He is seen as a leader), construcciones con "get" (She got promoted), y pasivas con verbos de reporte (It is said that..., He is believed to be...).',
        structure: 'Sujeto + to be + participio + complemento | It is said/believed/thought + that | Sujeto + is said/believed + to + infinitivo',
        examples: [
            { english: 'She was given a standing ovation by the audience.', spanish: 'El público le brindó una ovación de pie.' },
            { english: 'It is believed that the economy will improve.', spanish: 'Se cree que la economía mejorará.' },
            { english: 'He is thought to be the best candidate for the job.', spanish: 'Se cree que es el mejor candidato para el puesto.' },
        ],
        common_mistakes: 'Confundir "He is said to be" con "It is said that he is" — ambas son correctas pero tienen distinto sujeto gramatical. La pasiva con get es más informal: "She got fired" vs "She was dismissed".',
        tip: 'Pasiva de reporte: "It IS SAID that + oración" o "He IS SAID TO BE + adjetivo/nombre". La segunda opción es más concisa. "It is believed that prices will rise" = "Prices are believed to rise".',
        signal_words: ['it is said', 'it is believed', 'it is thought', 'it is known', 'is considered', 'is seen as', 'get + pp'],
    },

    'modal-perfect': {
        explanation: 'Los modales perfectos (modal + have + participio) expresan especulaciones, deducciones y arrepentimientos sobre el pasado. Must have = certeza sobre el pasado. Can\'t have = imposibilidad pasada. Could have = posibilidad pasada no realizada. Should have = reproche o arrepentimiento.',
        structure: 'Modal + have + participio pasado',
        examples: [
            { english: 'She must have been exhausted after the marathon.', spanish: 'Debía de estar agotada después del maratón.' },
            { english: 'You should have told me earlier.', spanish: 'Deberías habérmelo dicho antes.' },
            { english: 'He can\'t have passed the test — he didn\'t study at all.', spanish: 'No puede haber aprobado el examen — no estudió nada.' },
        ],
        common_mistakes: 'Confundir "must have done" (deducción) con "had to do" (obligación pasada). "She must have been tired" (deducción/especulación) vs "She had to work late" (obligación real).',
        tip: 'MUST HAVE = casi seguro que pasó. CAN\'T HAVE = imposible que haya pasado. SHOULD HAVE = era lo correcto pero no se hizo (reproche). COULD HAVE = era posible pero no ocurrió.',
        signal_words: ['must have', 'can\'t have', 'couldn\'t have', 'should have', 'shouldn\'t have', 'might have', 'could have', 'would have'],
    },

    'wish-regrets': {
        explanation: '"Wish + past perfect" expresa arrepentimientos sobre acciones pasadas — cosas que ocurrieron y nos gustaría que hubieran sido diferentes. "If only + past perfect" añade más énfasis emocional. "I wish I could have" también se usa para lamentarse de incapacidades pasadas.',
        structure: 'I wish + had + participio (arrepentimiento) | I wish + would + infinitivo (queja/deseo futuro)',
        examples: [
            { english: 'I wish I had taken that job opportunity.', spanish: 'Ojalá hubiera aprovechado esa oportunidad de trabajo.' },
            { english: 'If only she hadn\'t said those things.', spanish: 'Ojalá no hubiera dicho esas cosas.' },
            { english: 'I wish you would stop complaining.', spanish: 'Ojalá dejaras de quejarte.' },
        ],
        common_mistakes: '"I wish I would have done" es incorrecto → "I wish I had done". Sin embargo, "I wish you would..." (sobre el comportamiento de otros) es correcto: "I wish he would listen".',
        tip: 'WISH + HAD + pp = arrepentimiento del pasado (ya no se puede cambiar). WISH + WOULD + inf = deseo sobre el comportamiento futuro/habitual de otros. "I wish it WOULD stop raining" (hábito molesto).',
        signal_words: ['wish', 'if only', 'I wish I had', 'I wish I hadn\'t', 'I wish you would'],
    },

    'expressing-contrast': {
        explanation: 'Las expresiones de contraste y concesión conectan ideas opuestas. Although/Even though + cláusula (dentro de la oración). However/Nevertheless + oración nueva. Despite/In spite of + nombre o gerundio. While/Whereas para comparar dos situaciones contrarias.',
        structure: 'Although/Even though + cláusula, oración principal | Despite/In spite of + nombre/-ing, oración | Oración 1. However/Nevertheless, oración 2.',
        examples: [
            { english: 'Although it was raining, they played tennis.', spanish: 'Aunque llovía, jugaron al tenis.' },
            { english: 'Despite feeling ill, she went to work.', spanish: 'A pesar de encontrarse mal, fue a trabajar.' },
            { english: 'The price is high. Nevertheless, it\'s worth buying.', spanish: 'El precio es alto. Sin embargo, merece la pena comprarlo.' },
        ],
        common_mistakes: 'Usar "despite" con una cláusula completa: "Despite she was tired" → "Despite being tired" o "Although she was tired". "Despite" y "in spite of" van seguidos de nombre o gerundio, nunca de oración.',
        tip: 'ALTHOUGH/EVEN THOUGH + sujeto + verbo. DESPITE/IN SPITE OF + nombre o -ing (sin sujeto). HOWEVER → nueva oración. WHEREAS = comparación: "He likes jazz, WHEREAS she prefers rock."',
        signal_words: ['although', 'even though', 'despite', 'in spite of', 'however', 'nevertheless', 'whereas', 'while'],
    },

    'noun-clauses': {
        explanation: 'Las cláusulas nominales funcionan como sustantivos en la oración. Pueden ser sujeto, objeto o complemento. Se introducen con "that", "whether/if", o con palabras interrogativas (what, who, how, why). Son fundamentales en el inglés formal y académico.',
        structure: 'That + cláusula (como objeto) | What/whether + cláusula (como sujeto u objeto)',
        examples: [
            { english: 'I believe that honesty is the best policy.', spanish: 'Creo que la honestidad es la mejor política.' },
            { english: 'What she said surprised everyone in the room.', spanish: 'Lo que dijo sorprendió a todos en la sala.' },
            { english: 'Whether he agrees or not is irrelevant.', spanish: 'Que esté de acuerdo o no es irrelevante.' },
        ],
        common_mistakes: 'Confundir "if" y "whether" en cláusulas nominales: "I don\'t know if/whether she\'ll come" (ambas correctas) pero solo "whether" puede ir al inicio de oración como sujeto: "Whether she comes matters."',
        tip: 'THAT + cláusula = objeto de verbos de pensamiento/comunicación (think, believe, know, say). WHAT + cláusula = "lo que". WHETHER + cláusula = "si (es el caso que)".',
        signal_words: ['that', 'what', 'whether', 'how', 'why', 'whoever', 'whatever'],
    },

    'ellipsis-substitution': {
        explanation: 'La elipsis omite palabras que ya se entienden por el contexto para evitar repetición. La sustitución reemplaza palabras o cláusulas con formas reducidas. "So" y "not" sustituyen cláusulas after verbos de opinión. "Do so/do it" sustituye al predicado.',
        structure: 'Auxiliar solo (sin verbo principal) | So/Not + verbo de opinión',
        examples: [
            { english: '"Are you coming?" "I hope so."', spanish: '"¿Vienes?" "Espero que sí."' },
            { english: 'She can play guitar and so can her brother.', spanish: 'Ella sabe tocar la guitarra y su hermano también.' },
            { english: '"Will it rain?" "I don\'t think so."', spanish: '"¿Lloverá?" "No creo."' },
        ],
        common_mistakes: 'Decir "I hope it" o "I think it" → incorrecto. Después de hope, think, believe, expect, suppose → "so" o "not": "I think so/I don\'t think so".',
        tip: 'HOPE/THINK/BELIEVE/EXPECT/SUPPOSE + SO (afirmativo) o NOT (negativo). "I\'m afraid so" (sí, me temo). "I hope not" (espero que no). Nunca "I hope it" en sustitución.',
        signal_words: ['so', 'not', 'do so', 'if so', 'if not', 'I think so', 'I hope not'],
    },

    'fronting': {
        explanation: 'El fronting (topicalización) coloca un elemento normalmente no inicial al principio de la oración para darle énfasis. Puede ser el objeto directo, un adverbio, un adjetivo predicativo o una cláusula entera. Es más común en inglés escrito y formal.',
        structure: 'Elemento enfatizado + (inversión del verbo si es necesaria) + resto de la oración',
        examples: [
            { english: 'This book I have read three times.', spanish: 'Este libro lo he leído tres veces.' },
            { english: 'Rarely does he make such mistakes.', spanish: 'Raramente comete tales errores.' },
            { english: 'Beautiful though the city is, I prefer the countryside.', spanish: 'Por muy bonita que sea la ciudad, prefiero el campo.' },
        ],
        common_mistakes: 'No usar inversión cuando es necesaria con negativos frontados: "Never I have seen" → "Never HAVE I seen". El fronting del objeto NO requiere inversión: "This book I have read" (correcto).',
        tip: 'Fronting del objeto: sin inversión. "This BOOK I recommend." Fronting de negativos/restrictivos: con inversión. "RARELY DOES he smile." "ONLY THEN did I understand."',
        signal_words: ['this', 'that', 'rarely', 'never', 'only', 'not until', 'such', 'so'],
    },

    'causative-have-get': {
        explanation: 'La estructura causativa expresa que alguien hace que otra persona realice una acción. "Have + objeto + participio" indica encargo formal o experiencia. "Get + objeto + to + infinitivo" indica persuasión. "Have + objeto + infinitivo" implica instrucción.',
        structure: 'Have + objeto + participio pasado | Get + objeto + to + infinitivo',
        examples: [
            { english: 'I had my car repaired at the garage.', spanish: 'Le hice reparar el coche en el taller.' },
            { english: 'She got the students to stay after class.', spanish: 'Consiguió que los estudiantes se quedaran después de clase.' },
            { english: 'We need to have this document translated urgently.', spanish: 'Necesitamos que nos traduzcan este documento urgentemente.' },
        ],
        common_mistakes: 'Confundir causativa con pasiva: "I had my car repaired" (yo lo encargué) ≠ "My car was repaired" (pasiva neutra). "Have something done" implica que tú encargas el servicio a alguien.',
        tip: 'HAVE + objeto + pp = encargar un servicio. GET + objeto + TO + inf = persuadir/conseguir. "I had my photo TAKEN" (lo encargué). "I got him TO TAKE my photo" (le convencí).',
        signal_words: ['have...done', 'get...to do', 'make', 'have someone do'],
    },

    'adverbial-clauses': {
        explanation: 'Las cláusulas adverbiales de propósito y resultado añaden información sobre la intención o la consecuencia. Propósito: so that (para que), in order to/so as to (con el fin de). Resultado: so...that, such...that (tan...que). También: in case (por si acaso).',
        structure: 'So that + sujeto + modal | So + adjetivo + that + consecuencia | Such + nombre + that',
        examples: [
            { english: 'She studies every day so that she can pass the exam.', spanish: 'Estudia todos los días para poder aprobar el examen.' },
            { english: 'It was so cold that the pipes froze.', spanish: 'Hacía tanto frío que las tuberías se helaron.' },
            { english: 'Take an umbrella in case it rains.', spanish: 'Llévate un paraguas por si llueve.' },
        ],
        common_mistakes: 'Confundir "so that" con "so": "I woke up early so that I could catch the train" (propósito, con can/could) vs "I was tired, so I went to bed early" (resultado).',
        tip: 'PROPÓSITO: so that + can/could (presente/pasado) o in order to/so as to + infinitivo. RESULTADO: so + adjetivo/adverbio + that. IN CASE = precaución: "Bring a coat in case it gets cold."',
        signal_words: ['so that', 'in order to', 'so as to', 'in case', 'so...that', 'such...that'],
    },

    'future-in-the-past': {
        explanation: 'El futuro en el pasado se usa para hablar de planes o predicciones que se tenían en el pasado. Se forman con "was/were going to" (plan pasado), "would" (futuro en pasado en reported speech), y "was/were about to" (estaba a punto de).',
        structure: 'Was/were going to + infinitivo | Would + infinitivo | Was/were about to + infinitivo',
        examples: [
            { english: 'I was going to call you but I forgot.', spanish: 'Iba a llamarte pero se me olvidó.' },
            { english: 'She knew she would regret it someday.', spanish: 'Sabía que algún día se arrepentiría.' },
            { english: 'We were about to leave when it started to rain.', spanish: 'Estábamos a punto de salir cuando empezó a llover.' },
        ],
        common_mistakes: 'Confundir "was going to" (plan que no se cumplió) con "went to" (pasado simple). "I was going to study" ≠ "I went to study". La primera implica que no ocurrió como se planeó.',
        tip: 'WAS/WERE GOING TO = plan del pasado (a veces fallido). WOULD = futuro desde el pasado (en narrativa y reported speech). WAS/WERE ABOUT TO = acción inminente interrumpida.',
        signal_words: ['was going to', 'were going to', 'would', 'was about to', 'were about to', 'was to'],
    },

    'past-perfect-cont': {
        explanation: 'El past perfect continuous expresa una acción que llevaba tiempo ocurriendo antes de otro momento pasado. Enfatiza la duración y a menudo implica que la acción tuvo un resultado visible en el pasado. Se forma con had been + verbo-ing.',
        structure: 'Sujeto + had been + verbo-ing + (for/since + tiempo)',
        examples: [
            { english: 'She had been crying before I arrived.', spanish: 'Había estado llorando antes de que yo llegara.' },
            { english: 'He had been working for 12 hours when he finally stopped.', spanish: 'Llevaba 12 horas trabajando cuando por fin paró.' },
            { english: 'They had been arguing, so the atmosphere was tense.', spanish: 'Habían estado discutiendo, así que el ambiente estaba tenso.' },
        ],
        common_mistakes: 'Confundir con past perfect simple: "She had read the book" (completado) vs "She had been reading the book" (proceso enfatizado, quizás incompleto). El continuo enfatiza el proceso, el simple el resultado.',
        tip: 'HAD BEEN + -ing = duración de una actividad antes de otro momento pasado. Para o junto a: evidencia visible + duración. "The ground was wet — it had been raining for hours."',
        signal_words: ['for', 'since', 'before', 'when', 'by the time', 'all day', 'all morning'],
    },

    'verb-patterns-complex': {
        explanation: 'Los patrones verbales complejos incluyen: verbos de percepción + objeto + infinitivo o -ing (see/hear/feel + obj + bare inf/-ing), verbos de preferencia con distintos matices (prefer to/would rather/had better), y construcciones con "need": need + -ing (= need to be + pp).',
        structure: 'See/hear/watch + objeto + bare infinitive/-ing | Would rather/had better + bare infinitive | Need + -ing',
        examples: [
            { english: 'I heard him talking on the phone.', spanish: 'Lo oí hablando por teléfono.' },
            { english: 'You had better apologize before it\'s too late.', spanish: 'Será mejor que te disculpes antes de que sea demasiado tarde.' },
            { english: 'The car needs servicing urgently.', spanish: 'El coche necesita urgentemente una revisión.' },
        ],
        common_mistakes: 'Usar "to" después de "had better": "You had better to go" → "You had better go". También "would rather" + bare infinitive: "I would rather stay" (no "to stay").',
        tip: 'HAD BETTER = advertencia fuerte (mejor que hagas esto o habrá consecuencias). WOULD RATHER = preferencia. Ambos + verbo BASE (sin to). NEED + -ing = pasiva informal: "The house needs painting" = "The house needs to be painted".',
        signal_words: ['had better', 'would rather', 'would sooner', 'need + -ing', 'see/hear + obj + -ing'],
    },

    // ══════════════════════════════════════════════════════════════ C1
    'advanced-modals': {
        explanation: 'Los modales avanzados expresan matices sutiles de certeza epistémica, permiso deóntico y necesidad. "Need not" (don\'t have to, más formal). "Dare" (atreverse, modal o verbo pleno). Los modales perfectos con matiz de evidencia: "must have", "can\'t have", "will have" (para suposiciones sobre el presente/futuro).',
        structure: 'Need + not + bare infinitive | Dare + not/bare infinitive | Will/Would + have + pp (deducción presente)',
        examples: [
            { english: 'You needn\'t worry about the details — I\'ll handle them.', spanish: 'No tienes por qué preocuparte por los detalles — yo me encargo.' },
            { english: 'He will have arrived by now.', spanish: 'A estas horas ya habrá llegado.' },
            { english: 'How dare he say that to you!', spanish: '¡Cómo se atreve a decirte eso!' },
        ],
        common_mistakes: 'Confundir "needn\'t have done" (lo hiciste pero no era necesario) con "didn\'t need to do" (no era necesario y no lo hiciste). "I needn\'t have bought more wine" (compré de más) vs "I didn\'t need to buy wine" (no lo compré porque no hacía falta).',
        tip: 'WILL HAVE + pp = deducción sobre el presente: "She\'ll have left by now." NEEDN\'T HAVE + pp = acción innecesaria realizada. DARE + bare inf: negativo/interrogativo "He dare not..." / afirmativo: "She dared to..."',
        signal_words: ['needn\'t', 'dare not', 'will have', 'would have', 'can\'t possibly', 'must surely'],
    },

    'dependent-prepositions': {
        explanation: 'Las preposiciones dependientes son las que van ligadas a verbos, adjetivos o sustantivos específicos. No siguen una lógica deducible y deben memorizarse: depend ON, consist OF, succeed IN, complain ABOUT, be interested IN, be aware OF, result IN.',
        structure: 'Verbo/Adjetivo/Sustantivo + preposición fija + objeto/gerundio',
        examples: [
            { english: 'The success of the project depends on the team\'s commitment.', spanish: 'El éxito del proyecto depende del compromiso del equipo.' },
            { english: 'She is very good at dealing with difficult customers.', spanish: 'Es muy buena tratando con clientes difíciles.' },
            { english: 'He insists on checking every detail himself.', spanish: 'Insiste en verificar cada detalle personalmente.' },
        ],
        common_mistakes: 'Transferir las preposiciones del español: "interested in" correcto, pero "depend of" → "depend on". No existe una regla universal — hay que aprender cada combinación.',
        tip: 'Agrupa por preposición: ON (depend, insist, congratulate, focus, rely, base). IN (succeed, result, believe, be interested). OF (consist, think, remind, be aware). ABOUT (worry, complain, think).',
        signal_words: ['depend on', 'consist of', 'result in', 'insist on', 'apologize for', 'congratulate on', 'deal with', 'be aware of'],
    },

    'advanced-conditionals': {
        explanation: 'Las estructuras condicionales avanzadas incluyen: Unless (a menos que = if not), Provided that/As long as (siempre que/con la condición de que), Supposing/Imagine (suponiendo que), Whether...or not (independientemente de si). También inversiones condicionales sin "if".',
        structure: 'Unless + present/past | Provided that/As long as + present | Supposing + past simple/pp',
        examples: [
            { english: 'Unless you start now, you won\'t finish on time.', spanish: 'A menos que empieces ahora, no terminarás a tiempo.' },
            { english: 'You can use my car as long as you fill it up with petrol.', spanish: 'Puedes usar mi coche siempre y cuando le pongas gasolina.' },
            { english: 'Supposing you won the lottery, what would you do?', spanish: 'Suponiendo que te tocase la lotería, ¿qué harías?' },
        ],
        common_mistakes: 'Doblar la negación con "unless": "Unless you don\'t come" ya lleva negación implícita → "Unless you come". También usar "unless" para condiciones hipotéticas imaginarias: mejor "if...not" para segundo/tercer condicional.',
        tip: 'UNLESS = IF...NOT (para condiciones reales o probables). PROVIDED THAT / AS LONG AS = condición necesaria. SUPPOSING = como "imagine if" + past simple. "Supposing she WERE here, what would you say?"',
        signal_words: ['unless', 'provided that', 'as long as', 'supposing', 'on condition that', 'in case', 'whether or not'],
    },

    'discourse-markers-advanced': {
        explanation: 'Los marcadores del discurso avanzados organizan textos complejos. Para añadir: what is more, furthermore, above all. Para contrastar: admittedly, granted, that said. Para reformular: in other words, to put it differently, that is to say. Para concluir: all in all, on balance, taking everything into account.',
        structure: 'Marcador (al inicio de oración o cláusula) + , + oración',
        examples: [
            { english: 'The project failed. Admittedly, we did not have enough resources.', spanish: 'El proyecto fracasó. Hay que reconocer que no teníamos suficientes recursos.' },
            { english: 'What is more, the results exceeded all expectations.', spanish: 'Es más, los resultados superaron todas las expectativas.' },
            { english: 'On balance, the benefits outweigh the drawbacks.', spanish: 'En general, los beneficios superan a los inconvenientes.' },
        ],
        common_mistakes: 'Usar los mismos marcadores repetidamente (solo "however" y "therefore"). Emplear marcadores demasiado informales en textos académicos ("anyway", "well" → mejor "that said", "nevertheless").',
        tip: 'Para ensayos y textos formales: WHAT IS MORE (adición enfática), THAT SAID (concesión matizada), ON BALANCE (conclusión ponderada), TO PUT IT DIFFERENTLY (reformulación), GRANTED (concesión).',
        signal_words: ['what is more', 'admittedly', 'granted', 'that said', 'in other words', 'on balance', 'all in all', 'above all'],
    },

    'nominalization': {
        explanation: 'La nominalización transforma verbos y adjetivos en sustantivos para crear un estilo más formal y conciso, especialmente en inglés académico. Es una característica clave del inglés formal: "They decided to expand" → "The decision to expand". Sufijos comunes: -tion, -ment, -ance, -ness, -ity.',
        structure: 'Verbo/Adjetivo → Sustantivo mediante sufijo | Verbo → Sustantivo + of',
        examples: [
            { english: '"We concluded that..." → "The conclusion of the study was..."', spanish: '"Concluimos que..." → "La conclusión del estudio fue..."' },
            { english: 'The development of new technologies has transformed communication.', spanish: 'El desarrollo de nuevas tecnologías ha transformado la comunicación.' },
            { english: 'There has been a significant improvement in productivity.', spanish: 'Se ha producido una mejora significativa en la productividad.' },
        ],
        common_mistakes: 'El abuso de nominalizaciones puede hacer el texto oscuro. "The facilitation of the enhancement of" es peor que "improving". Usa nominalizaciones con moderación para dar variedad al estilo.',
        tip: 'Sufijos de nominalización: -TION (decide→decision), -MENT (develop→development), -ANCE (perform→performance), -NESS (aware→awareness), -ITY (able→ability), -AL (arrive→arrival).',
        signal_words: ['-tion', '-ment', '-ance', '-ness', '-ity', '-al', '-ure', 'the + verbo sustantivado'],
    },

    'abstract-nouns-collocations': {
        explanation: 'Las colocaciones son combinaciones naturales de palabras que un nativo usaría automáticamente. Los sustantivos abstractos tienen colocaciones específicas: make a decision (no "do a decision"), do research (no "make research"), reach a conclusion, draw a distinction, raise awareness.',
        structure: 'Verbo colocación + sustantivo abstracto',
        examples: [
            { english: 'The committee reached a unanimous decision after hours of debate.', spanish: 'El comité llegó a una decisión unánime tras horas de debate.' },
            { english: 'This study raises important questions about climate change.', spanish: 'Este estudio plantea preguntas importantes sobre el cambio climático.' },
            { english: 'We need to draw a clear distinction between the two concepts.', spanish: 'Necesitamos trazar una distinción clara entre los dos conceptos.' },
        ],
        common_mistakes: '"Do a mistake" → "Make a mistake". "Make research" → "Do research". "Take a decision" es British English (menos frecuente); "make a decision" es el estándar.',
        tip: 'MAKE: a decision, a mistake, progress, an effort, an argument. DO: research, harm, damage, work, a course. TAKE: action, responsibility, into account. REACH: a conclusion, an agreement, a compromise. RAISE: awareness, a question, concerns.',
        signal_words: ['make', 'do', 'take', 'reach', 'draw', 'raise', 'pay', 'give', 'have'],
    },

    'passive-reporting': {
        explanation: 'Las estructuras pasivas de reporte se usan en inglés formal para distanciarse de la fuente o para ser más objetivo. Son muy comunes en textos académicos, periodísticos y oficiales. Formas: "It is/was + pp + that + cláusula" y "Sujeto + is/was + pp + to + infinitivo".',
        structure: 'It is claimed/alleged/reported + that + cláusula | Subject + is said/known/believed + to + infinitivo',
        examples: [
            { english: 'It has been reported that the company is facing financial difficulties.', spanish: 'Se ha informado de que la empresa está atravesando dificultades financieras.' },
            { english: 'The treatment is known to have serious side effects.', spanish: 'Se sabe que el tratamiento tiene efectos secundarios graves.' },
            { english: 'The suspect is alleged to have stolen the painting last month.', spanish: 'Se alega que el sospechoso robó el cuadro el mes pasado.' },
        ],
        common_mistakes: 'Confundir los tiempos del infinitivo: "is said to be" (presente) vs "is said to have been" (pasado). "The company is said to BE struggling" (ahora) vs "to HAVE struggled" (en el pasado).',
        tip: 'Verbos comunes: say, report, claim, allege, believe, think, know, consider, understand, expect, suppose. "It is CLAIMED that..." = alguien lo afirma pero no es certeza. Uso clave en periodismo y derecho.',
        signal_words: ['it is said', 'it is claimed', 'it is believed', 'it is alleged', 'it is reported', 'is thought to', 'is known to', 'is expected to'],
    },

    'concessive-clauses': {
        explanation: 'Las cláusulas concesivas reconocen un hecho o argumento contrario antes de introducir el punto principal. Incluyen: although/though/even though (aunque), whereas/while (mientras que, en contraste), however + adjetivo/adverbio + subject + may/might (por muy + adj + que).',
        structure: 'However + adj/adv + sujeto + may, oración principal | Much as + sujeto + verbo, oración | Adj/Adv + as + sujeto + verbo, oración',
        examples: [
            { english: 'However hard he tries, he never seems to succeed.', spanish: 'Por mucho que lo intente, nunca parece tener éxito.' },
            { english: 'Much as I would like to help, I simply don\'t have the time.', spanish: 'Por mucho que quisiera ayudar, sencillamente no tengo tiempo.' },
            { english: 'Tired as she was, she continued working until midnight.', spanish: 'Por cansada que estaba, siguió trabajando hasta medianoche.' },
        ],
        common_mistakes: 'Confundir "however" como marcador discursivo ("sin embargo") con "however" como concesivo ("por muy...que"): "However, she continued" ≠ "However hard she tried".',
        tip: 'HOWEVER + adj/adv + sujeto + may = "por muy/mucho...que". MUCH AS = "por mucho que". ADJ + AS + SUJETO + VERBO (inversión de adjetivo) = estructura literaria concesiva.',
        signal_words: ['however', 'much as', 'even though', 'as...as', 'adj + as + subject', 'despite the fact that'],
    },

    'rhetorical-questions': {
        explanation: 'Las preguntas retóricas se hacen para causar efecto, no para obtener respuesta. El hedging (mitigación) expresa incertidumbre o suaviza afirmaciones: "It would seem that...", "It could be argued that...", "There is a tendency to...". Son esenciales en el inglés académico y persuasivo.',
        structure: 'Preguntas retóricas: forma interrogativa sin respuesta esperada | Hedging: modal/verbo tentativo + afirmación',
        examples: [
            { english: 'Can we really afford to ignore climate change any longer?', spanish: '¿Podemos realmente permitirnos ignorar el cambio climático por más tiempo?' },
            { english: 'It could be argued that technology has done more harm than good.', spanish: 'Se podría argumentar que la tecnología ha causado más daño que bien.' },
            { english: 'There appears to be a correlation between stress and illness.', spanish: 'Parece haber una correlación entre el estrés y la enfermedad.' },
        ],
        common_mistakes: 'Usar hedging excesivo que debilita el argumento. O al contrario, hacer afirmaciones demasiado absolutas sin hedge en ensayos académicos: "This proves that" → "This suggests that / This indicates that".',
        tip: 'Hedging académico: "It SEEMS that / It APPEARS that / It COULD BE argued / There is EVIDENCE to suggest / This INDICATES that". Evita "I think" en ensayos formales — usa hedge impersonal.',
        signal_words: ['it seems', 'it appears', 'it could be argued', 'there appears to be', 'would seem to', 'tend to', 'is likely to'],
    },

    'formal-informal-register': {
        explanation: 'El registro formal usa vocabulario latinizado, oraciones complejas y distancia. El informal usa contracciones, phrasal verbs, coloquialismos y vocabulario anglosajón. El registro académico tiene características propias: pasiva, nominalizaciones, hedging, evidenciales.',
        structure: 'Formal: Latinate vocabulary + complex syntax | Informal: Anglo-Saxon words + contractions + phrasal verbs',
        examples: [
            { english: 'Formal: The committee has reached a consensus. Informal: Everyone agrees.', spanish: 'Formal: El comité ha llegado a un consenso. Informal: Todos están de acuerdo.' },
            { english: 'Formal: I would be grateful if you could... Informal: Could you please...?', spanish: 'Formal: Le agradecería que pudiera... Informal: ¿Podría por favor...?' },
            { english: 'Formal: Subsequently. Informal: Then/After that.', spanish: 'Formal: Posteriormente. Informal: Luego/Después.' },
        ],
        common_mistakes: 'Mezclar registros en el mismo texto. Usar contracciones (I\'ve, can\'t) en un ensayo académico. O usar vocabulario excesivamente formal en conversación cotidiana, lo cual puede sonar artificial.',
        tip: 'Señales de formalidad: avoid contractions, use Latinate vocabulary (purchase vs buy, commence vs start, therefore vs so), use full forms, passive voice, complex sentences. Señales de informalidad: phrasal verbs, short sentences, contractions.',
        signal_words: ['furthermore', 'subsequently', 'consequently', 'with regard to', 'in relation to', 'it is noteworthy that'],
    },

    'complex-inversion': {
        explanation: 'La inversión compleja incluye construcciones con "only" (only after, only when, only by), "no sooner...than", "hardly/scarcely/barely...when", "not until", "not since", y la inversión condicional sin "if" (Were I, Had they, Should you).',
        structure: 'Only after/when + cláusula, + auxiliar + sujeto + verbo | No sooner + had + sujeto + pp + than',
        examples: [
            { english: 'Only after the meeting did we realize the problem.', spanish: 'Solo después de la reunión nos dimos cuenta del problema.' },
            { english: 'No sooner had she sat down than the phone rang.', spanish: 'No bien se había sentado cuando sonó el teléfono.' },
            { english: 'Should you require further assistance, please contact us.', spanish: 'Si necesitara ayuda adicional, por favor contáctenos.' },
        ],
        common_mistakes: 'Olvidar la inversión después de "only + preposición/adverbio": "Only then I understood" → "Only then DID I understand". La inversión es obligatoria con estos adverbios negativos/restrictivos al inicio.',
        tip: 'ONLY AFTER/WHEN/IF/THEN/BY → inversión obligatoria. NO SOONER...THAN → inversión + THAN (no "when"). HARDLY/SCARCELY/BARELY...WHEN → inversión + WHEN. SHOULD YOU... (= If you should...).',
        signal_words: ['only after', 'only then', 'no sooner...than', 'hardly...when', 'not until', 'should you', 'were it not for'],
    },

    'idiomatic-language': {
        explanation: 'El lenguaje idiomático incluye expresiones fijas cuyo significado no puede deducirse de las palabras individuales. Categorías principales: idioms (kick the bucket = die), collocations (make a decision), fixed expressions (by and large, as a matter of fact), and binomials (black and white, pros and cons).',
        structure: 'Expresión fija + contexto apropiado (nivel de formalidad)',
        examples: [
            { english: 'By and large, the conference was a great success.', spanish: 'En general, la conferencia fue un gran éxito.' },
            { english: 'We\'re back to square one — the plan didn\'t work.', spanish: 'Volvemos a empezar de cero — el plan no funcionó.' },
            { english: 'To cut a long story short, they didn\'t get the contract.', spanish: 'En pocas palabras, no consiguieron el contrato.' },
        ],
        common_mistakes: 'Traducir idioms literalmente del español: "It rains over wet" para "it never rains but it pours" (llueve sobre mojado). Usar idioms muy coloquiales en contextos formales.',
        tip: 'Aprende idioms en contexto, no de forma aislada. Fíjate en el nivel de formalidad: "kick the bucket" es coloquial, "pass away" es neutral, "expire" es formal. Los binomials siempre van en el mismo orden: pros and cons (nunca "cons and pros").',
        signal_words: ['by and large', 'as a matter of fact', 'in a nutshell', 'to cut a long story short', 'on the whole', 'at the end of the day'],
    },

    'compound-adjectives': {
        explanation: 'Los adjetivos compuestos se forman combinando dos o más palabras, generalmente unidas por guión cuando van antes del nombre. Tipos: número + nombre (a five-day course), adjetivo + nombre+-ed (long-legged), adjetivo/adverbio + participio (well-known, newly-built), nombre + participio (handmade, heartbreaking).',
        structure: 'Elemento1 + guión + Elemento2 + nombre (antes del nombre llevan guión)',
        examples: [
            { english: 'She works in a well-established law firm.', spanish: 'Trabaja en un bufete de abogados bien consolidado.' },
            { english: 'It was a thought-provoking documentary.', spanish: 'Era un documental que invitaba a la reflexión.' },
            { english: 'He gave a ten-minute presentation without notes.', spanish: 'Hizo una presentación de diez minutos sin notas.' },
        ],
        common_mistakes: 'Olvidar el guión antes del nombre: "a well known actor" → "a well-known actor". Pero sin nombre: "The actor is well known" (sin guión). El guión marca la función adjetival prenominal.',
        tip: 'Antes del nombre + guión: "a thought-PROVOKING film". Después de "to be": sin guión: "The film is thought provoking." NÚMERO + nombre: siempre en singular: "a two-hour film" (no "two-hours").',
        signal_words: ['well-known', 'long-lasting', 'thought-provoking', 'hard-working', 'life-changing', 'ground-breaking'],
    },

    'subjunctive-advanced': {
        explanation: 'El subjuntivo avanzado en inglés incluye su uso en expresiones fijas arcaicas (Long live the King!, Be that as it may, God save the Queen), en cláusulas de deseo y propósito formal (The committee agreed that the vote be held), y en algunos condicionales literarios (If truth be told, Were this not the case).',
        structure: 'Expresión fija + subjuntivo (forma base) | Cláusula nominal + subjuntivo mandativo',
        examples: [
            { english: 'Be that as it may, we cannot change the decision now.', spanish: 'Sea como fuere, no podemos cambiar la decisión ahora.' },
            { english: 'The board insisted that the CEO resign immediately.', spanish: 'La junta insistió en que el director general dimitiera inmediatamente.' },
            { english: 'If need be, we can postpone the meeting.', spanish: 'Si fuera necesario, podemos aplazar la reunión.' },
        ],
        common_mistakes: 'Confundir el subjuntivo mandativo con el indicativo: "The board insists that he resignS" → "The board insists that he RESIGN" (sin -s). En inglés americano es más sistemático que en británico.',
        tip: 'Expresiones fijas con subjuntivo: "Be that as it may", "if need be", "suffice it to say", "so be it", "come what may". Mandativo: suggest/insist/recommend + that + verbo base (sin -s).',
        signal_words: ['be that as it may', 'if need be', 'so be it', 'come what may', 'suffice it to say', 'lest'],
    },

    'stance-adverbials': {
        explanation: 'Los adverbios de actitud expresan la postura del hablante respecto al contenido del enunciado. Se colocan al inicio de la oración o entre comas. Incluyen: frankly, honestly, obviously, clearly, admittedly, surprisingly, curiously, importantly, significantly, ironically.',
        structure: 'Stance adverb + , + oración | Oración, + stance adverb, + resto',
        examples: [
            { english: 'Frankly, I think the proposal needs significant revision.', spanish: 'Francamente, creo que la propuesta necesita una revisión significativa.' },
            { english: 'Surprisingly, the results were far better than expected.', spanish: 'Sorprendentemente, los resultados fueron mucho mejores de lo esperado.' },
            { english: 'Importantly, this finding has implications for future research.', spanish: 'Significativamente, este hallazgo tiene implicaciones para investigaciones futuras.' },
        ],
        common_mistakes: 'Confundir adverbios de modo con adverbios de actitud: "She spoke frankly" (de modo: de forma franca) vs "Frankly, she\'s wrong" (actitud: siendo sincero). La posición en la oración cambia el significado.',
        tip: 'Al inicio de oración con coma = actitud del hablante (epistémico). "Clearly, he lied" = es obvio que mintió (mi juicio). Dentro de oración = modo: "She clearly stated her position" (de forma clara).',
        signal_words: ['frankly', 'honestly', 'clearly', 'obviously', 'admittedly', 'surprisingly', 'crucially', 'importantly', 'ironically', 'curiously'],
    },

    'textual-cohesion': {
        explanation: 'La cohesión textual se logra mediante referencia (pronombres, demostrativos), sustitución (so, do so), elipsis (omisión de elementos redundantes), conectores y repetición léxica/colocación. Un texto cohesionado fluye naturalmente sin discontinuidades. La coherencia es la organización lógica global.',
        structure: 'Referencia: pronombre/demostrativo refiere a elemento anterior | Sustitución: so/do so/one reemplaza elemento | Elipsis: omisión de elemento recuperable',
        examples: [
            { english: 'The policy was controversial. This led to widespread protests.', spanish: 'La política fue polémica. Esto provocó protestas generalizadas.' },
            { english: '"Will you come?" "I hope so." (sustitución de cláusula)', spanish: '"¿Vendrás?" "Espero que sí."' },
            { english: 'Some students passed and others didn\'t [pass]. (elipsis)', spanish: 'Algunos estudiantes aprobaron y otros no.' },
        ],
        common_mistakes: 'Referencia ambigua: "John told Peter that he was wrong" — ¿quién es "he"? Pronombres con antecedentes poco claros crean confusión. También el abuso de "this" sin referente explícito.',
        tip: 'Los 4 tipos de cohesión léxica: repetición ("the study...the study"), sinónimo ("the research...the investigation"), hiperónimo ("the cat...the animal"), colocación ("research...findings...results").',
        signal_words: ['this', 'these', 'such', 'the former/latter', 'the above', 'the following', 'do so', 'one'],
    },

    'aspect-nuance': {
        explanation: 'El aspecto gramatical en inglés distingue entre acciones completadas (perfectivo) y en progreso (progresivo). Los tiempos continuos implican temporalidad o incomplitud. Los perfectos implican relevancia presente. Los tiempos simples pueden expresar tanto hábito como estado. Los matices son fundamentales para la precisión C1.',
        structure: 'Simple = estado/hábito/completado | Continuo = progreso/temporal/inacabado | Perfecto = relevancia presente del pasado',
        examples: [
            { english: '"I think this is right" (estado) vs "I\'m thinking about it" (proceso activo)', spanish: '"Creo que es correcto" (opinión) vs "Estoy pensándolo" (proceso mental activo)' },
            { english: 'She lived in Paris (pasado, terminado) vs She has lived in Paris (experiencia vital relevante)', spanish: 'Vivió en París (dato histórico) vs Ha vivido en París (relevante para el presente)' },
            { english: 'I was tired so I went home. vs I\'ve been tired all week.', spanish: 'Estaba cansado, así que me fui a casa. vs He estado cansado toda la semana.' },
        ],
        common_mistakes: 'Algunos verbos admiten formas continuas con cambio de significado: "I have a car" (posesión) vs "I\'m having lunch" (actividad). "I see the problem" (percepción) vs "I\'m seeing my doctor" (cita).',
        tip: 'Verbos de estado + continuo = cambio de significado. THINK (creer vs considerar), HAVE (poseer vs hacer/tomar), SEE (ver vs visitar), TASTE (tener sabor vs probar), LOOK (aparecer vs mirar intencionadamente).',
        signal_words: ['at the moment', 'permanently', 'temporarily', 'all my life', 'lately', 'these days', 'always'],
    },

    'spoken-grammar': {
        explanation: 'El inglés hablado tiene características gramaticales propias: cláusulas cortas, más coordinación que subordinación, "heads" y "tails" (topicalización coloquial), respuestas mínimas, discourse markers conversacionales (well, you know, I mean, like, sort of, kind of).',
        structure: 'Head + oración | Oración + tail | Discourse marker + oración',
        examples: [
            { english: 'That restaurant — I\'ve been there loads of times. (head)', spanish: 'Ese restaurante — he ido un montón de veces.' },
            { english: 'It\'s really good, that film. (tail)', spanish: 'Es muy buena, esa película.' },
            { english: '"I mean, it\'s sort of like, you know, complicated."', spanish: '"O sea, es como que, ya sabes, complicado."' },
        ],
        common_mistakes: 'Usar marcadores conversacionales excesivamente en escritura formal. En inglés hablado, la "incorrección" gramatical a veces es normativa: "Who did you go with?" es coloquialmente más natural que "With whom did you go?".',
        tip: 'Heads (tópico al inicio): "That new teacher, she\'s amazing." Tails (tópico al final): "She\'s amazing, that new teacher." Son normales en inglés hablado coloquial. Discourse markers: well/you know/I mean/actually/basically.',
        signal_words: ['well', 'you know', 'I mean', 'sort of', 'kind of', 'like', 'basically', 'actually', 'right?'],
    },

    'preposition-phrases': {
        explanation: 'Las frases preposicionales complejas actúan como conectores formales. Ejemplos: with regard to, in terms of, on account of, in spite of, by means of, in view of, with the exception of, in the event of, on behalf of, by virtue of.',
        structure: 'Frase preposicional compleja + nombre/gerundio',
        examples: [
            { english: 'With regard to your application, we regret to inform you...', spanish: 'En lo que respecta a su solicitud, lamentamos comunicarle...' },
            { english: 'In terms of cost, the second option is more viable.', spanish: 'En términos de coste, la segunda opción es más viable.' },
            { english: 'On behalf of the company, I would like to thank you.', spanish: 'En nombre de la empresa, me gustaría agradecerles.' },
        ],
        common_mistakes: 'Usar estas expresiones en contextos informales donde suenan pedantes. "With regard to your message" en un email a un amigo → simplemente "About your message".',
        tip: 'Estas frases son señales de registro formal/académico. Con respecto a: regarding/with regard to/in relation to/as far as...is concerned. Debido a: owing to/on account of/as a result of/in view of.',
        signal_words: ['with regard to', 'in terms of', 'on account of', 'by means of', 'in view of', 'on behalf of', 'in the event of', 'by virtue of'],
    },

    'complex-sentences': {
        explanation: 'Las oraciones complejas y compuestas-complejas combinan varias cláusulas. La variedad sintáctica (oraciones cortas junto a largas) es clave para un estilo C1 efectivo. Incluye: múltiples cláusulas subordinadas, cláusulas de participio integradas, aposiciones, y oraciones con varios niveles de incrustación.',
        structure: 'Oración principal + múltiples cláusulas subordinadas (relativas, temporales, nominales, adverbiales)',
        examples: [
            { english: 'The study, which was conducted over five years and involved over 1,000 participants, suggests that exercise significantly reduces stress.', spanish: 'El estudio, que se llevó a cabo durante cinco años e involucró a más de 1.000 participantes, sugiere que el ejercicio reduce significativamente el estrés.' },
            { english: 'Having reviewed all the evidence, the committee, which met last Thursday, concluded that no further action was necessary.', spanish: 'Tras revisar todas las pruebas, el comité, que se reunió el jueves pasado, concluyó que no era necesaria ninguna otra medida.' },
            { english: 'What strikes most readers is not the complexity of the argument but the clarity with which it is presented.', spanish: 'Lo que más llama la atención a los lectores no es la complejidad del argumento sino la claridad con que se presenta.' },
        ],
        common_mistakes: 'Crear oraciones tan largas que pierdan claridad. Un estilo C1 equilibra complejidad y claridad. También crear "clichés de complejidad" — oraciones largas que no añaden significado.',
        tip: 'La variedad sintáctica es la clave: alterna oraciones cortas (impacto) con largas (desarrollo). La longitud debe reflejar la complejidad del pensamiento. Revisa que cada cláusula añada información real.',
        signal_words: ['which', 'who', 'that', 'having + pp', 'not only...but also', 'what strikes...is', 'it is...that'],
    },

    // ══════════════════════════════════════════════════════════════ C2
    'stylistic-inversion': {
        explanation: 'La inversión estilística en C2 incluye estructuras muy marcadas literariamente. Inversión locativa (Here comes the sun), inversión con "so/such...that", inversión en diálogo literario (said she, replied John), y estructuras arcaicas o poéticas. Son propias del inglés literario, periodístico de alta gama y retórico.',
        structure: 'Complemento locativo + verbo + sujeto | So + adj + auxiliar + sujeto',
        examples: [
            { english: 'Nowhere in the world is this problem more acute than here.', spanish: 'En ningún lugar del mundo este problema es más agudo que aquí.' },
            { english: 'Such was his dedication that he worked through the night.', spanish: 'Tal era su dedicación que trabajó toda la noche.' },
            { english: '"I cannot accept this," said the minister, "under any circumstances."', spanish: '"No puedo aceptar esto", dijo el ministro, "bajo ninguna circunstancia."' },
        ],
        common_mistakes: 'El uso inapropiado de inversiones en contextos informales o textos donde no hay propósito estilístico real. Las inversiones estilísticas son marcadas — usarlas sin propósito las vacía de efecto.',
        tip: 'NOWHERE/NOT ONCE/UNDER NO CIRCUMSTANCES + inversión = énfasis retórico muy fuerte. SUCH WAS + nombre + THAT = intensidad o cantidad excepcional. Son estructuras que deben usarse con propósito, no mecánicamente.',
        signal_words: ['nowhere', 'not once', 'under no circumstances', 'such was', 'so great', 'little did', 'only too well'],
    },

    'advanced-nominalization': {
        explanation: 'La nominalización avanzada en escritura académica C2 implica elegir entre nominalizar o usar verbos/adjetivos directamente según el efecto deseado. También incluye el uso retórico de grupos nominales complejos (premodificación múltiple, postmodificación con of-phrases y participios).',
        structure: 'Premodificador(es) + núcleo nominal + postmodificador(es)',
        examples: [
            { english: 'The rapidly increasing cost of early childhood education poses significant challenges.', spanish: 'El rápidamente creciente coste de la educación en la primera infancia plantea retos significativos.' },
            { english: 'A carefully designed, multi-phase data collection procedure was employed.', spanish: 'Se empleó un procedimiento de recogida de datos cuidadosamente diseñado y de múltiples fases.' },
            { english: 'The long-term socioeconomic implications of this policy shift remain unclear.', spanish: 'Las implicaciones socioeconómicas a largo plazo de este cambio de política siguen sin estar claras.' },
        ],
        common_mistakes: 'Grupos nominales tan complejos que resultan incomprensibles. El objetivo de la nominalización en C2 es precisión y densidad informativa, no oscuridad. Cada premodificador debe añadir información necesaria.',
        tip: 'Grupos nominales complejos: [Adj/Participio + Adj/Participio] + NÚCLEO + [of + GN] + [participio postmodificador]. "A long-established, internationally recognized system of classification" — cuatro modificadores antes del núcleo.',
        signal_words: ['the + adj + adj + noun + of + noun', 'a carefully designed', 'the rapidly growing', 'long-term implications', 'multi-faceted approach'],
    },

    'pragmatic-markers': {
        explanation: 'Los marcadores pragmáticos codifican la actitud del hablante hacia el mensaje, la relación entre interlocutores y la estructura conversacional. Incluyen: marcadores de evidencialidad (apparently, reportedly), marcadores de actitud evaluativa (unfortunately, remarkably), y marcadores interpersonales (frankly, between you and me).',
        structure: 'Marcador pragmático + , + proposición',
        examples: [
            { english: 'Reportedly, the negotiations have broken down completely.', spanish: 'Según se informa, las negociaciones han fracasado por completo.' },
            { english: 'Remarkably, not a single vote was cast in favour.', spanish: 'Sorprendentemente, no se emitió ni un solo voto a favor.' },
            { english: 'Between you and me, I don\'t think the plan will work.', spanish: 'Entre tú y yo, no creo que el plan vaya a funcionar.' },
        ],
        common_mistakes: 'No reconocer la fuerza pragmática de estos marcadores. "Apparently" puede implicar escepticismo ("apparently she\'s honest" — con dudas). "Frankly" puede ser descortés si se usa de forma incorrecta.',
        tip: 'Los marcadores pragmáticos operan en el nivel metatextual: no modifican el contenido proposicional sino la relación del hablante con el mensaje. "Clearly" puede ser tanto evaluativo como asertivo. Conocer sus implicaturas es clave en C2.',
        signal_words: ['apparently', 'reportedly', 'remarkably', 'understandably', 'predictably', 'interestingly', 'arguably'],
    },

    'register-variation': {
        explanation: 'La variación de registro en C2 implica reconocer y producir diferentes tipos textuales con sus características lingüísticas propias: académico (impersonal, denso, hedged), legal (arcaico, performativo, preciso), periodístico (conciso, activo, nominalizaciones), literario (figurativo, polisémico, ambiguo).',
        structure: 'Reconocimiento de marcadores de registro + adaptación léxica y sintáctica',
        examples: [
            { english: 'Legal: The party of the first part hereby agrees to... | Academic: Evidence suggests that...', spanish: 'Legal: La parte del primer artículo acuerda por el presente... | Académico: La evidencia sugiere que...' },
            { english: 'Journalistic: Talks collapsed yesterday. | Formal letter: I am writing to express my concern regarding...', spanish: 'Periodístico: Las conversaciones se rompieron ayer. | Carta formal: Me dirijo a usted para expresar mi preocupación en relación con...' },
            { english: 'Literary: The shadows lengthened as dusk crept across the valley.', spanish: 'Literario: Las sombras se alargaron mientras el crepúsculo se deslizaba por el valle.' },
        ],
        common_mistakes: 'Ignorar los marcadores de registro en textos de producción. En el CAE/CPE se evalúa la adecuación de registro. Un email formal con "hey" o un ensayo académico con "gonna" son errores de registro graves.',
        tip: 'Cada tipo textual tiene su "gramática". Legal: shall, herein, aforesaid. Académico: passive + hedging. Periodístico: short sentences + active. Literario: varied syntax + figurative language. Reconoce el tipo textual antes de escribir.',
        signal_words: ['hereby', 'henceforth', 'aforesaid', 'pursuant to', 'it is submitted that', 'it is noteworthy', 'one might argue'],
    },

    'advanced-cohesion': {
        explanation: 'La cohesión avanzada en C2 incluye técnicas sofisticadas: referencia catafórica (el referente viene después), conjunciones subordinantes complejas, encapsulación (sustantivos como "this development", "such an approach"), y cohesión léxica mediante redes semánticas y colocaciones esperadas.',
        structure: 'Encapsulación: this/such + sustantivo abstracto resumidor | Referencia catafórica: the following/this: + referente | Redes lexicales: campo semántico coherente',
        examples: [
            { english: 'This reluctance to innovate — a trait common to many established industries — has proven costly.', spanish: 'Esta reticencia a innovar — un rasgo común en muchas industrias establecidas — ha resultado costosa.' },
            { english: 'The following argument will demonstrate that... (catafórica)', spanish: 'El siguiente argumento demostrará que...' },
            { english: 'The crisis deepened. This deterioration proved difficult to reverse.', spanish: 'La crisis se profundizó. Este deterioro resultó difícil de revertir.' },
        ],
        common_mistakes: 'Usar "this" o "these" sin referente claro — la referencia debe ser inequívoca. La encapsulación requiere un sustantivo que encapsule con precisión el contenido anterior: "this problem" es vago; "this fundamental disagreement" es específico.',
        tip: 'Sustantivos encapsuladores sofisticados: this DEVELOPMENT, PHENOMENON, TREND, SHIFT, DISCREPANCY, PARADOX, DILEMMA. Cada uno aporta una evaluación del contenido anterior, no solo lo referencia.',
        signal_words: ['this development', 'such an approach', 'the former/latter', 'the above-mentioned', 'as follows', 'the following'],
    },

    'rhetorical-devices': {
        explanation: 'Los dispositivos retóricos en C2 incluyen: litotes (negación de lo contrario: "not bad" = good), meiosis (subestimación), understatement, antítesis (contraste estructural paralelo), chiasmo (inversión de orden en estructuras paralelas), y ironía lingüística (lo que se dice ≠ lo que se significa).',
        structure: 'Litotes: not + antónimo | Antítesis: A, not B structure | Chiasmo: AB : BA order',
        examples: [
            { english: '"Not the most brilliant plan I\'ve ever heard." (litotes/understatement)', spanish: '"No es el plan más brillante que he escuchado jamás." (eufemismo/subestimación)' },
            { english: '"Ask not what your country can do for you, but what you can do for your country." (antítesis + chiasmo)', spanish: '"No preguntes qué puede hacer tu país por ti, sino qué puedes tú hacer por tu país."' },
            { english: '"Oh, brilliant. Another pointless meeting." (ironía)', spanish: '"Genial. Otra reunión inútil." (ironía)' },
        ],
        common_mistakes: 'Confundir understatement (deliberado) con error de imprecisión. La ironía requiere contexto para ser reconocida — en texto escrito puede malinterpretarse sin marcadores prosódicos o contextuales.',
        tip: 'LITOTES: not + antónimo = afirmación moderada positiva. UNDERSTATEMENT: decir menos de lo que es para mayor impacto. ANTITHESIS: estructuras paralelas contrastivas. CHIASMUS: "He lived for art, for art he died." Reconócelos en lectura C2.',
        signal_words: ['not...exactly', 'not the most', 'not unlike', 'one might say', 'far from', 'hardly what you\'d call'],
    },

    'aspect-mastery': {
        explanation: 'El dominio total del aspecto en C2 implica entender los contrastes más sutiles: simple vs continuous para posiciones epistemológicas (I find/I\'m finding), el uso aspectual del present simple en narrativa histórica (presente histórico), y el perfect aspect como perspectiva vs el simple como reporte de eventos.',
        structure: 'Contraste aspectual: misma situación, diferente perspectiva del hablante',
        examples: [
            { english: 'I find your argument interesting. (juicio permanente) vs I\'m finding this increasingly difficult. (proceso en evolución)', spanish: 'Encuentro tu argumento interesante. (juicio) vs Estoy encontrando esto cada vez más difícil. (proceso)' },
            { english: 'In 1815, Napoleon meets his Waterloo. (presente histórico) — narración dramática', spanish: 'En 1815, Napoleón se enfrenta a su Waterloo. (presente histórico dramático)' },
            { english: 'He has written three novels. (el autor vive o la obra importa) vs He wrote three novels. (dato biográfico, distanciado)', spanish: 'Ha escrito tres novelas. (relevante) vs Escribió tres novelas. (dato histórico)' },
        ],
        common_mistakes: 'Considerar el presente histórico como "error" — es una elección estilística deliberada en narrativa. En C2, la elección aspectual comunica perspectiva y evaluación del hablante, no solo tiempo.',
        tip: 'El aspecto expresa la PERSPECTIVA del hablante, no la realidad objetiva. Present simple = perspectiva completa/distanciada. Present continuous = perspectiva en desarrollo. Perfect = relevancia presente. La "gramática correcta" en C2 es elección estilística.',
        signal_words: ['I find/I\'m finding', 'I think/I\'m thinking', 'I see/I\'m seeing', 'simple vs continuous for states'],
    },

    'collocation-mastery': {
        explanation: 'El dominio de colocaciones en C2 incluye: colocaciones de alta frecuencia con verbos de soporte (make a comeback, run a risk, pay tribute), colocaciones adjetivo-sustantivo sofisticadas (resounding success, sweeping changes, vested interests), y phrasal collocations en contextos académicos y literarios.',
        structure: 'Verbo soporte + sustantivo | Adjetivo intensificador + sustantivo | Adverbio + adjetivo',
        examples: [
            { english: 'The band made a triumphant comeback after a five-year hiatus.', spanish: 'El grupo hizo un triunfal retorno tras cinco años de pausa.' },
            { english: 'The new legislation brought about sweeping changes to the tax system.', spanish: 'La nueva legislación provocó cambios radicales en el sistema fiscal.' },
            { english: 'The report cast serious doubt on the government\'s claims.', spanish: 'El informe arrojó serias dudas sobre las afirmaciones del gobierno.' },
        ],
        common_mistakes: 'Elegir colocaciones incorrectas por transferencia del español: "make damage" → "cause/do damage". "Deeply committed" (muy comprometido) pero "highly unlikely" (muy improbable) — los intensificadores no son intercambiables.',
        tip: 'Intensificadores específicos: DEEPLY (concerned/committed/divided), HIGHLY (likely/unlikely/educated/recommended), STRONGLY (believe/suggest/oppose/recommend), BITTERLY (disappointed/cold), UTTERLY (exhausted/ridiculous/convinced).',
        signal_words: ['deeply', 'highly', 'strongly', 'bitterly', 'utterly', 'sweeping changes', 'vested interests', 'resounding success'],
    },

    'complex-modality': {
        explanation: 'La modalidad epistémica compleja en C2 expresa grados de certeza sofisticados. Incluye: estructuras con "be bound to" (certeza), "be likely to" (probabilidad), "be unlikely to" (improbabilidad), "be set to" (expectativa futura), y combinaciones epistémicas como "might well", "would appear to", "could conceivably".',
        structure: 'Sujeto + epistemic stance + to-infinitivo | Modal + adverbio epistémico + verbo',
        examples: [
            { english: 'This development is bound to have far-reaching consequences.', spanish: 'Este desarrollo está destinado a tener consecuencias de gran alcance.' },
            { english: 'The situation would appear to be more complex than initially thought.', spanish: 'La situación parecería ser más compleja de lo que se pensaba inicialmente.' },
            { english: 'Prices are set to rise sharply in the coming months.', spanish: 'Se espera que los precios suban bruscamente en los próximos meses.' },
        ],
        common_mistakes: 'Usar la modalidad con la misma estructura en todas las oraciones. La variedad de construcciones modales es una marca de dominio C2. "It seems" / "it appears" / "it would seem" expresan certeza decreciente.',
        tip: 'Escala epistémica descendente: IS BOUND TO > IS LIKELY TO > WOULD SEEM TO > MIGHT WELL > COULD CONCEIVABLY. Cada paso reduce la certeza. En textos académicos, hedge with "appear to" more than "seem to" for formality.',
        signal_words: ['bound to', 'likely to', 'set to', 'due to', 'would appear to', 'might well', 'could conceivably', 'would seem to'],
    },

    'discourse-structure': {
        explanation: 'La estructura del discurso académico en C2 incluye la organización retórica de argumentos (problema-solución, causa-efecto, general-específico), las macroestructuras de géneros textuales (ensayo académico, informe, reseña crítica), y las estrategias de persuasión (ethos, pathos, logos en inglés académico moderno).',
        structure: 'Macro: introducción (contexto+tesis) → desarrollo (argumentos+evidencia) → conclusión (síntesis+implicaciones) | Micro: cada párrafo con PEEL o TEEL',
        examples: [
            { english: 'Topic sentence → Evidence → Explanation → Link back to thesis (TEEL structure)', spanish: 'Oración temática → Evidencia → Explicación → Enlace con la tesis (estructura TEEL)' },
            { english: 'This essay will argue that... / Having examined X, it is now possible to conclude...', spanish: 'Este ensayo argumentará que... / Habiendo examinado X, ahora es posible concluir...' },
            { english: 'While some scholars contend that X, others maintain that Y. This essay adopts the position that Z.', spanish: 'Mientras algunos estudiosos sostienen que X, otros afirman que Y. Este ensayo adopta la posición de que Z.' },
        ],
        common_mistakes: 'En el CPE, la ausencia de estructura retórica consciente es uno de los errores más penalizados. Los párrafos sin oración temática o sin conexión con la tesis debilitan el argumento. La conclusión debe añadir, no solo resumir.',
        tip: 'Cada párrafo = PEEL: Point (oración temática), Evidence (ejemplo/dato), Explanation (análisis), Link (enlace con argumento general). Señales retóricas: "Firstly... Furthermore... However... It could be countered that... Ultimately..."',
        signal_words: ['this essay argues', 'it is contended that', 'evidence suggests', 'to conclude', 'in light of this', 'it can be inferred that'],
    },

    'conditional-alternatives': {
        explanation: 'Las alternativas a "if" en C2 incluyen: Assuming/Suppose + cláusula, In the event that, On condition that, Given that (dado que/suponiendo que), Whether or not, Even if. También la inversión condicional sin "if": Were it not for, But for + nombre, Without + nombre/gerundio.',
        structure: 'Assuming/Suppose + cláusula | Were it not for + nombre | But for + nombre, resultado diferente',
        examples: [
            { english: 'Were it not for your help, this project would have failed.', spanish: 'De no ser por tu ayuda, este proyecto habría fracasado.' },
            { english: 'But for a last-minute error, they would have won the championship.', spanish: 'De no haber sido por un error de último minuto, habrían ganado el campeonato.' },
            { english: 'Given that resources are limited, we must prioritise carefully.', spanish: 'Dado que los recursos son limitados, debemos priorizar cuidadosamente.' },
        ],
        common_mistakes: 'Confundir "given that" (porque, ya que — factual) con condicional hipotético. "Given that it\'s raining, I\'ll take an umbrella" (factual) vs "Assuming it rains, take an umbrella" (hipotético).',
        tip: 'WERE IT NOT FOR + nombre/gerundio = IF IT WEREN\'T FOR. BUT FOR = de no ser por (muy formal/literario). GIVEN THAT = ya que (factual). ASSUMING THAT = suponiendo que (hipotético). Todas añaden variedad a las condicionales.',
        signal_words: ['were it not for', 'but for', 'given that', 'assuming that', 'in the event that', 'on condition that', 'whether or not'],
    },

    'passive-ergative': {
        explanation: 'Las construcciones ergativas y medias en C2 describen acciones sin agente explícito ni pasiva: verbos ergativos usan el objeto de la transitiva como sujeto de la intransitiva (The door opened, The glass broke). Los verbos medios expresan propiedades del objeto (This book reads easily, The car drives smoothly).',
        structure: 'Objeto de transitiva → sujeto de intransitiva (ergativa) | Sujeto + verbo + adverbio de modo (media)',
        examples: [
            { english: 'Someone broke the window. → The window broke. (ergativa)', spanish: 'Alguien rompió la ventana. → La ventana se rompió.' },
            { english: 'This fabric washes easily and dries quickly. (media)', spanish: 'Esta tela se lava fácilmente y se seca rápidamente.' },
            { english: 'Her latest novel reads like a thriller. (media)', spanish: 'Su última novela se lee como un thriller.' },
        ],
        common_mistakes: 'Confundir ergativa con pasiva: "The window broke" ≠ "The window was broken" (la pasiva implica agente, la ergativa no). No todos los verbos admiten estas construcciones — hay que reconocer los ergativos comunes.',
        tip: 'Verbos ergativos comunes: break, open, close, change, grow, increase, move, start, stop. Construcción media: verbo + adverbio: "This pen writes smoothly", "This dress looks good". Implican que la propiedad es inherente al objeto.',
        signal_words: ['opened', 'broke', 'changed', 'reads easily', 'washes well', 'sells quickly', 'writes smoothly'],
    },

    'ellipsis-advanced': {
        explanation: 'La elipsis avanzada en C2 incluye: gapping (omisión del verbo en cláusulas coordinadas), stripping (reducción máxima a un elemento), VP ellipsis (omisión del predicado verbal), y comparative ellipsis. Estas estructuras son propias del inglés escrito formal y del hablado muy fluido.',
        structure: 'Gapping: A verbo B, y C [verbo] D | VP ellipsis: Modal + auxiliar (sin complemento) | Stripping: conector + único elemento',
        examples: [
            { english: 'John likes jazz and Mary [likes] classical music. (gapping)', spanish: 'A John le gusta el jazz y a Mary la música clásica.' },
            { english: '"Can you finish it?" "I can." (VP ellipsis — omite "finish it")', spanish: '"¿Puedes terminarlo?" "Puedo."' },
            { english: '"Did everyone agree?" "Most did. Not all, though." (stripping)', spanish: '"¿Estaban todos de acuerdo?" "La mayoría sí. Aunque no todos."' },
        ],
        common_mistakes: 'Crear ambigüedad con la elipsis cuando el referente no es claro. "She can do it and he can too" — "can" sin más es VP ellipsis correcta. La elipsis solo funciona cuando el elemento omitido es recuperable sin ambigüedad.',
        tip: 'VP ELLIPSIS: after modals and auxiliaries: "I haven\'t finished, but I will [finish]." GAPPING: "I love opera; she, jazz." STRIPPING: la reducción más extrema — solo el elemento de contraste permanece.',
        signal_words: ['and so can', 'neither can', 'nor did', 'not all', 'most did', 'some will'],
    },

    'lexical-grammar': {
        explanation: 'La gramática lexical en C2 trata las construcciones en las que el significado gramatical está codificado en unidades léxicas. Incluye: verbos preposicionales (provide with, present with, attribute to), collocational grammar (a tendency to, a commitment to), y frames sintácticos específicos de verbos (put NP to use, take NP into account).',
        structure: 'Verbo + preposición específica + complemento | Nombre + to-infinitivo | Verbo + NP + preposición + complemento',
        examples: [
            { english: 'The findings can be attributed to several contributing factors.', spanish: 'Los resultados pueden atribuirse a varios factores contribuyentes.' },
            { english: 'The team made good use of the available technology.', spanish: 'El equipo hizo buen uso de la tecnología disponible.' },
            { english: 'We need to take all the relevant factors into account.', spanish: 'Necesitamos tener en cuenta todos los factores relevantes.' },
        ],
        common_mistakes: 'Mezclar las preposiciones de verbos con patrones fijos: "attribute for" → "attribute to", "provide for" → "provide with (someone) something". Estas preposiciones son fijas y no siguen lógica semántica.',
        tip: 'Verbos con patrones fijos: attribute X TO Y, provide Y WITH X, present Y WITH X, take X INTO ACCOUNT, put X TO use, bring X TO light, hold X IN high regard. El patrón sintáctico es parte del significado léxico.',
        signal_words: ['attribute to', 'contribute to', 'result in', 'provide with', 'take into account', 'bring to light', 'put to use'],
    },

    'academic-writing-grammar': {
        explanation: 'La gramática del inglés académico en C2 integra todos los recursos anteriores en un estilo cohesivo y apropiado. Características definitorias: alta densidad nominal, uso sistemático de hedging epistémico, pasiva impersonal, nominalizaciones, marcadores metadiscursivos, y variedad sintáctica controlada.',
        structure: 'Metadiscurso + proposición + hedge | Grupos nominales complejos + verbo pasivo/epistémico | Conectores argumentativos sofisticados',
        examples: [
            { english: 'It has been argued that globalisation, while bringing undeniable economic benefits, has simultaneously exacerbated pre-existing inequalities.', spanish: 'Se ha argumentado que la globalización, aunque aporta indudables beneficios económicos, ha exacerbado simultáneamente las desigualdades preexistentes.' },
            { english: 'The present study seeks to investigate the extent to which X influences Y.', spanish: 'El presente estudio pretende investigar en qué medida X influye en Y.' },
            { english: 'These findings have significant implications for both theory and practice.', spanish: 'Estos hallazgos tienen implicaciones significativas tanto para la teoría como para la práctica.' },
        ],
        common_mistakes: 'En el CPE Writing, usar un estilo demasiado personal ("I think", "I believe" en ensayos académicos) o demasiado informal reduce la puntuación. La precisión terminológica y la impersonalidad son criterios de evaluación explícitos.',
        tip: 'Fórmulas de ensayo académico C2: "It is widely acknowledged that...", "Recent scholarship has shed light on...", "The evidence points to the conclusion that...", "This stands in stark contrast to...", "The implications of this are far-reaching."',
        signal_words: ['it has been argued', 'the present study', 'the findings suggest', 'it is noteworthy that', 'in light of', 'the extent to which', 'far-reaching implications'],
    },
}

/**
 * Devuelve el contenido para un slug dado.
 * Si no existe, retorna null.
 */
export function getStaticContent(slug) {
    return GRAMMAR_CONTENT[slug] ?? null
}

/**
 * Lista los slugs que tienen contenido estático disponible.
 */
export function getAvailableSlugs() {
    return Object.keys(GRAMMAR_CONTENT)
}