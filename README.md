# LinguaFlow

> Plataforma web para el aprendizaje del inglés de nivel A1 a C2 con ejercicios interactivos, repetición espaciada (SM-2), gamificación y corrector gramatical en tiempo real.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)

LinguaFlow es el TFG del ciclo Desarrollo de Aplicaciones Multiplataforma (DAM2). Demuestra que es posible construir una plataforma de aprendizaje de inglés profesional, completa y gratuita combinando el ecosistema de servicios cloud actuales (Vercel, Render, Supabase) con APIs públicas libres (LanguageTool, Free Dictionary).

---

## Tabla de contenidos

1. [Características](#características)
2. [Stack tecnológico](#stack-tecnológico)
3. [Arquitectura](#arquitectura)
4. [Estructura del repositorio](#estructura-del-repositorio)
5. [Instalación local](#instalación-local)
6. [Variables de entorno](#variables-de-entorno)
7. [Base de datos](#base-de-datos)
8. [APIs externas integradas](#apis-externas-integradas)
9. [Endpoints de la API REST](#endpoints-de-la-api-rest)
10. [Despliegue en producción](#despliegue-en-producción)
11. [Diseño y Laws of UX](#diseño-y-laws-of-ux)
12. [Capturas](#capturas)
13. [Roadmap](#roadmap)
14. [Autoría y licencia](#autoría-y-licencia)

---

## Características

### Contenido educativo
- **40 lecciones** distribuidas entre los seis niveles del Marco Común Europeo de Referencia (A1, A2, B1, B2, C1, C2).
- **211 ejercicios interactivos** de cuatro tipos: opción múltiple, completar frases, tarjetas (flashcards) y comprensión auditiva.
- **115 temas de gramática** con explicación en español, fórmula gramatical, ejemplos con audio nativo, errores frecuentes de hispanohablantes y truco mnemotécnico.
- **72 preguntas de calentamiento** organizadas por nivel CEFR como apoyo opcional antes de cada lección.

### Sistema de aprendizaje
- **Algoritmo SM-2 de repetición espaciada** que ajusta los intervalos de repaso según la dificultad percibida por el usuario.
- **Sesión de repaso diaria** con pantalla especial cuando no hay nada pendiente.
- **Corrector gramatical en tiempo real** integrado con LanguageTool, con sugerencias clicables que se aplican al texto.
- **TTS multicapa de cinco niveles** con tres acentos seleccionables (British, American, Australian).

### Gamificación
- Sistema de **experiencia (XP)** con recompensas por ejercicio completado.
- **9 niveles** con umbrales exponenciales (100 XP → 21.000 XP).
- **Rachas diarias** con icono de llama que se intensifica visualmente.
- **8 logros desbloqueables** (primera lección, racha de 7 días, nivel 5, sesión perfecta...).
- **Tabla de clasificación global** entre todos los usuarios.

### Experiencia de usuario
- Diseño completamente **responsive** para móvil, tableta y escritorio.
- **Modo claro y oscuro** con dos paletas independientes (no es una simple inversión de colores).
- **Microinteracciones** con Framer Motion en todas las transiciones importantes.
- **Sistema de notificaciones** propio inspirado en Flowbite con cinco variantes.
- **Aplicación de 10 Laws of UX** documentadas en la memoria del proyecto.

---

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 18 · Vite 8 · TailwindCSS 3 · Framer Motion · React Router 6 · TanStack Query · Zustand · Recharts · Axios · react-hot-toast |
| **Backend** | Node.js 18+ · Express 4 (ESM) · Helmet · express-rate-limit · CORS · HPP · Supabase SDK |
| **Base de datos** | PostgreSQL 15 (Supabase) · Row Level Security · 8 tablas |
| **Autenticación** | Supabase Auth con JWT y refresh tokens automáticos |
| **APIs externas** | LanguageTool · Free Dictionary API · Microsoft Edge TTS · Web Speech API · YouTube Data API v3 |
| **Despliegue** | Vercel (frontend) · Render (backend) · Supabase (BD) |
| **Control de versiones** | Git · GitHub · CI/CD automático |

---

## Arquitectura

LinguaFlow sigue una arquitectura cliente-servidor de tres capas con el frontend completamente desacoplado del backend:

```
┌──────────┐   HTTPS   ┌──────────────────┐   REST   ┌─────────────┐   SQL   ┌──────────────┐
│ Usuario  │ ────────► │ Frontend React   │ ───────► │ Backend     │ ──────► │ PostgreSQL   │
│ (Web)    │           │ Vercel (CDN)     │ ◄─────── │ Express     │ ◄────── │ Supabase+RLS │
└──────────┘           └──────────────────┘  JSON+   └─────────────┘  Rows   └──────────────┘
                                              JWT             │
                                                              │
                                                              ▼
                                                   ┌──────────────────────┐
                                                   │ APIs externas:       │
                                                   │ LanguageTool ·       │
                                                   │ Free Dictionary ·    │
                                                   │ Edge TTS · YouTube   │
                                                   └──────────────────────┘
```

**Frontend** — Aplicación React desplegada como sitio estático en Vercel. Comunica con el backend mediante peticiones HTTPS y con Supabase directamente para la autenticación (login con SDK, registro vía backend).

**Backend** — Servidor Express en Render que expone una API REST. Valida los tokens JWT emitidos por Supabase Auth y aplica las reglas de negocio: cálculo de experiencia, gestión de rachas, algoritmo de repetición espaciada y desbloqueo de logros.

**Base de datos** — Proyecto Supabase con PostgreSQL, autenticación, almacenamiento de avatares y políticas Row Level Security que garantizan que un usuario solo accede a sus propios datos.

---

## Estructura del repositorio

```
linguaflow/
├── README.md                    Este archivo
├── .gitignore                   Bloqueo de .env y node_modules
│
├── frontend/                    Aplicación React + Vite
│   ├── public/
│   │   └── _redirects           SPA fallback para Netlify/CF
│   ├── src/
│   │   ├── components/          Componentes reutilizables
│   │   │   ├── audio/           AccentSelector, AudioPlayer, VoicePanel
│   │   │   ├── exercises/       MultipleChoice, FillBlank, FlashCard, ListeningExercise, AnswerFeedback
│   │   │   ├── gamification/    XPBar, AchievementToast
│   │   │   ├── layout/          Layout principal con sidebar
│   │   │   ├── theory/          GrammarChecker
│   │   │   ├── ui/              Toast (sistema custom estilo Flowbite)
│   │   │   └── video/           YouTubePlayer
│   │   ├── pages/               Páginas (rutas)
│   │   │   ├── Auth/            Login, Register
│   │   │   ├── Exercises/       ExerciseRunner, ReviewSession
│   │   │   ├── Lessons/         LessonList, LessonDetail
│   │   │   ├── Theory/          TheoryList, TheoryDetail
│   │   │   ├── Profile/         Profile
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   ├── hooks/               Hooks de React Query y custom
│   │   ├── services/            api.js, supabaseClient.js, speech.js, dictionaryApi.js, triviaApi.js
│   │   ├── store/               Zustand store (auth + darkMode)
│   │   ├── App.jsx              Router + PrivateRoute/PublicRoute
│   │   ├── main.jsx             Entry point + QueryClient + Toaster
│   │   └── index.css            Sistema de color global y utilidades
│   ├── .env.example             Plantilla de variables de entorno
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json              Configuración de despliegue Vercel
│
└── backend/                     API REST Node.js + Express
    ├── src/
    │   ├── middleware/
    │   │   ├── auth.middleware.js     Verificación JWT
    │   │   └── validate.middleware.js Validación de payloads
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   ├── users.routes.js
    │   │   ├── lessons.routes.js
    │   │   ├── exercises.routes.js
    │   │   ├── progress.routes.js
    │   │   ├── stats.routes.js
    │   │   ├── achievements.routes.js
    │   │   ├── theory.routes.js
    │   │   └── tts.routes.js
    │   ├── services/
    │   │   ├── supabase.js            Cliente Supabase
    │   │   ├── spacedRepetition.js    Algoritmo SM-2
    │   │   ├── grammarContent.js      115 temas de gramática estática
    │   │   └── languagetool.js        Wrapper del corrector
    │   └── app.js                     Punto de entrada
    ├── supabase_setup.sql       Esquema inicial (8 tablas + RLS)
    ├── fix_rls_policies.sql     Ajuste de políticas RLS
    ├── seed_full_lessons.sql    40 lecciones + 211 ejercicios
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── render.yaml              Configuración de despliegue Render
```

---

## Instalación local

### Requisitos previos

- **Node.js 18 o superior** (`node --version`)
- **npm** (incluido con Node)
- **Git**
- Una cuenta gratuita en **[Supabase](https://supabase.com)**

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/linguaflow.git
cd linguaflow
```

### Paso 2 — Configurar Supabase

1. Crea un nuevo proyecto en [supabase.com](https://supabase.com).
2. En el SQL Editor, ejecuta los scripts en este orden exacto:
   ```
   1. backend/supabase_setup.sql       → crea las 8 tablas y políticas RLS
   2. backend/fix_rls_policies.sql     → ajustes de políticas
   3. backend/seed_full_lessons.sql    → 40 lecciones + 211 ejercicios A1-C2
   ```
3. Copia los valores de **Project URL**, **anon key** y **service_role key** desde Settings → API. Los necesitarás para los `.env`.

### Paso 3 — Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm install
npm run dev
```

El backend arranca en `http://localhost:3000`.

### Paso 4 — Frontend

```bash
cd ../frontend
cp .env.example .env
# Edita .env con tus credenciales de Supabase
npm install
npm run dev
```

El frontend arranca en `http://localhost:5173`.

### Paso 5 — Crear usuario de prueba

Abre `http://localhost:5173`, pulsa **Empezar gratis**, rellena el formulario de registro y empieza a usar la aplicación.

---

## Variables de entorno

### `backend/.env`

```env
# Entorno
NODE_ENV=development

# Servidor
PORT=3000

# CORS — URLs autorizadas (separadas por comas en producción)
FRONTEND_URL=http://localhost:5173

# Supabase — Settings → API en supabase.com
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Opcional: ElevenLabs para TTS de calidad superior
# ELEVENLABS_API_KEY=
```

### `frontend/.env`

```env
# Supabase
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Backend
# En desarrollo: http://localhost:3000
# En producción: URL pública del backend en Render
VITE_API_URL=http://localhost:3000

# Opcional: YouTube Data API v3 para vídeos en temas de gramática
# VITE_YOUTUBE_API_KEY=
```

---

## Base de datos

El esquema PostgreSQL en Supabase está formado por **8 tablas** relacionadas mediante claves foráneas y protegidas con políticas Row Level Security:

| Tabla | Propósito | Filas iniciales |
|-------|-----------|-----------------|
| `profiles` | Perfil extendido del usuario (XP, nivel, racha, avatar) | 0 (se crean al registrarse) |
| `lessons` | Catálogo de lecciones con nivel CEFR y categoría | 40 |
| `exercises` | Ejercicios individuales asociados a cada lección | 211 |
| `user_progress` | Registro de cada intento con parámetros SM-2 | 0 (se llenan al usar) |
| `achievements` | Catálogo de logros desbloqueables | 8 |
| `user_achievements` | Logros desbloqueados por cada usuario (N:M) | 0 |
| `daily_stats` | Agregados diarios para gráficas de actividad | 0 |
| `grammar_topics` | Caché de los 115 temas de gramática estática | 115 (al consultar) |

**Row Level Security:** las tablas con datos personales tienen políticas que permiten leer/modificar solo las filas donde `user_id` coincide con el JWT del usuario autenticado. Las tablas de contenido global tienen lectura pública.

**Distribución de lecciones por nivel:**

| A1 | A2 | B1 | B2 | C1 | C2 |
|----|----|----|----|----|----|
| 8  | 7  | 8  | 7  | 6  | 4  |

---

## APIs externas integradas

LinguaFlow integra cinco servicios externos, todos gratuitos, para enriquecer la experiencia educativa sin coste:

### 1. LanguageTool — Corrector gramatical

| | |
|---|---|
| **URL** | `https://api.languagetool.org/v2/check` |
| **Auth** | Ninguna (plan gratuito público) |
| **Límites** | 20 peticiones/minuto · 75.000 caracteres/mes |
| **Uso en LinguaFlow** | Comprobador de gramática en `TheoryDetail` con sugerencias clicables |
| **Implementación** | `backend/src/services/languagetool.js` |

```js
// Ejemplo de respuesta normalizada
{
  correct: false,
  errors: [
    {
      message: "Did you mean 'doesn't'?",
      offset: 4,
      length: 4,
      suggestions: ["doesn't"],
      rule: { category: "TYPOS" }
    }
  ],
  corrected: "She doesn't likes coffee."
}
```

### 2. Free Dictionary API — Definiciones y pronunciación

| | |
|---|---|
| **URL** | `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` |
| **Auth** | Ninguna |
| **Límites** | Sin límite documentado |
| **Uso en LinguaFlow** | Definiciones en vivo, fonética IPA, audio UK/US, sinónimos y antónimos |
| **Implementación** | `frontend/src/services/dictionaryApi.js` con caché en memoria |

### 3. Microsoft Edge Neural TTS — Voces neuronales

| | |
|---|---|
| **URL** | Endpoint público del navegador Edge |
| **Auth** | Ninguna |
| **Calidad** | Voces neurales casi indistinguibles de voz humana |
| **Acentos** | British (en-GB) · American (en-US) · Australian (en-AU) |
| **Uso en LinguaFlow** | Capa principal del sistema TTS multicapa |

### 4. Web Speech API — Sintetizador nativo

| | |
|---|---|
| **API** | `window.speechSynthesis` |
| **Auth** | Ninguna (API del navegador) |
| **Calidad** | Variable según sistema operativo |
| **Uso en LinguaFlow** | Última capa de fallback del sistema TTS multicapa, funciona offline |

### 5. YouTube Data API v3 — Vídeos educativos

| | |
|---|---|
| **URL** | `https://www.googleapis.com/youtube/v3/search` |
| **Auth** | API Key (gratuita en Google Cloud Console) |
| **Límites** | 10.000 unidades/día gratis |
| **Uso en LinguaFlow** | Búsqueda automática de vídeos relacionados en temas de gramática |
| **Variable** | `VITE_YOUTUBE_API_KEY` (opcional) |

### Sistema TTS multicapa

El sistema de texto a voz prueba las cinco capas en este orden hasta encontrar una que funcione:

```
1. Free Dictionary API  →  archivo MP3 oficial nativo (si existe la palabra)
2. Microsoft Edge TTS   →  voz neural de alta calidad
3. Google Translate TTS →  endpoint público (calidad media)
4. ElevenLabs API       →  opcional con clave (calidad superior)
5. Web Speech API       →  fallback nativo del navegador
```

---

## Endpoints de la API REST

La API expone **9 módulos de endpoints** agrupados por recurso:

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Crear cuenta nueva | No |
| POST | `/api/auth/refresh` | Renovar token JWT | No |
| GET | `/api/auth/me` | Datos del usuario actual | Sí |

### Usuarios

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/users/me` | Perfil del usuario autenticado | Sí |
| PATCH | `/api/users/me` | Actualizar nombre o avatar | Sí |
| POST | `/api/users/me/avatar` | Subir foto de perfil | Sí |
| GET | `/api/users/leaderboard` | Top 10 por XP | Sí |

### Lecciones y ejercicios

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/lessons` | Catálogo (filtros: level, category) | Opc |
| GET | `/api/lessons/:id` | Detalle con ejercicios | Opc |
| GET | `/api/exercises/:id` | Ejercicio individual | Sí |
| POST | `/api/exercises/:id/answer` | Registrar respuesta y actualizar XP | Sí |

### Progreso

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/progress/due` | Ejercicios pendientes de repaso (SM-2) | Sí |
| GET | `/api/progress/lesson/:id` | Progreso en una lección | Sí |

### Estadísticas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/stats/weekly` | Actividad de los últimos 7 días | Sí |
| GET | `/api/stats/accuracy` | Precisión por tipo de ejercicio | Sí |

### Logros

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/achievements` | Logros del usuario (con desbloqueados) | Sí |

### Teoría (gramática)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/theory` | Catálogo de los 115 temas | Opc |
| GET | `/api/theory/:slug` | Contenido completo de un tema | Opc |
| POST | `/api/theory/check-grammar` | Comprobar frase con LanguageTool | Sí |

### TTS

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/tts?text=...&accent=en-US` | Audio de pronunciación | Sí |

### Health check

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/health` | Estado del servicio (para Render) | No |

---

## Despliegue en producción

LinguaFlow está pensado para desplegarse con **coste cero** combinando los planes gratuitos de Vercel, Render y Supabase.

| Servicio | Plataforma | Plan | Coste |
|----------|-----------|------|-------|
| Frontend | Vercel | Free (100 GB/mes, builds ilimitados) | 0 € |
| Backend | Render | Free (750 h/mes, duerme tras 15 min) | 0 € |
| Base de datos | Supabase | Free (500 MB · 1 GB Storage · 50K MAU) | 0 € |
| **TOTAL** | | | **0 €/mes** |

### Despliegue del frontend en Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new).
2. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Añade las variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`).
4. El archivo `frontend/vercel.json` ya gestiona las rewrites para React Router.
5. Deploy automático en cada push a `main`.

### Despliegue del backend en Render

1. Crea un **Web Service** en [render.com](https://render.com) conectado al repositorio.
2. Configura:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/app.js`
   - **Health Check Path:** `/api/health`
3. Añade todas las variables de `.env` en la sección Environment.
4. Importante: en `FRONTEND_URL` pon la URL de Vercel (acepta varias separadas por comas para los previews).

### Conexión entre servicios

```
Frontend (Vercel)        Backend (Render)         Database (Supabase)
       │                        │                          │
       │  VITE_API_URL ────────►│                          │
       │                        │  SUPABASE_URL ──────────►│
       │  FRONTEND_URL◄─────────│                          │
       │  (CORS)                │                          │
```

### Mantener el backend despierto

El plan gratuito de Render duerme el servicio tras 15 minutos sin tráfico. Para evitarlo, puedes usar [UptimeRobot](https://uptimerobot.com) (también gratuito) y hacer un ping a `/api/health` cada 14 minutos.

---

## Diseño y Laws of UX

LinguaFlow aplica diez principios de diseño basados en las [Laws of UX](https://lawsofux.com):

| Ley | Aplicación en LinguaFlow |
|-----|--------------------------|
| **Umbral de Doherty** | Skeletons contextuales en lugar de spinners |
| **Ley de Miller** | Máximo 5 ejercicios visibles con botón "ver más" |
| **Ley de Hick** | 3 dimensiones de filtro, no 10 opciones planas |
| **Memoria de trabajo** | Badge del tipo de ejercicio oculto al responder |
| **Efecto Von Restorff** | CTA dominante "Empezar" + "Salir" en estilo débil |
| **Carga cognitiva** | AudioPlayer compacto + VoicePanel global |
| **Regla del pico y final** | CTA positivo "Siguiente lección →" al terminar |
| **Conectividad uniforme** | Borde lateral del color del nivel CEFR |
| **Posición en serie** | Fade-out + contador "X de N" en listas largas |
| **Sobrecarga de opciones** | Paginación de 12 temas por página |

### Sistema de color

Dos paletas completas independientes (no es una simple inversión):

**Modo claro (slate-azul profundo):**
- Fondo principal: `#0F1117`
- Tarjetas: `#161B27`
- Texto principal: `#E2E8F0`
- Acento: `#6366F1` (índigo) · `#8B5CF6` (violeta)

**Modo oscuro (negro neón):**
- Fondo principal: `#07060F`
- Tarjetas: `#0F0E20`
- Texto principal: `#E8E4FF`
- Acento: `#8B5CF6` · `#22D3EE` (cyan neón)

### Tipografía

- **Títulos:** Poppins (geométrica, con personalidad)
- **Cuerpo:** Nunito (legible, redondeada)

---

## Capturas

> Para añadir capturas a este README, crea una carpeta `docs/screenshots/` y añádelas con el siguiente formato:

```markdown
![Home](docs/screenshots/home.png)
![Dashboard](docs/screenshots/dashboard.png)
![LessonDetail](docs/screenshots/lesson-detail.png)
![ExerciseRunner](docs/screenshots/exercise-runner.png)
![TheoryDetail](docs/screenshots/theory-detail.png)
![GrammarChecker](docs/screenshots/grammar-checker.png)
![Profile](docs/screenshots/profile.png)
```

---

## Roadmap

Funcionalidades pensadas para futuras versiones:

- [ ] **App móvil nativa** con React Native compartiendo lógica del frontend.
- [ ] **Generación de ejercicios con IA** según las debilidades detectadas en cada usuario.
- [ ] **Modo offline (PWA)** con Service Workers para usar sin conexión.
- [ ] **Sistema social** con amigos, retos y leaderboards por grupos.
- [ ] **Certificados PDF** descargables al completar cada nivel CEFR.
- [ ] **Modo profesor** con asignación de lecciones y seguimiento de alumnos.
- [ ] **Soporte multi-idioma** (francés, alemán, italiano).
- [ ] **Tests automatizados** con Vitest (unitarios) y Playwright (E2E).
- [ ] **Migración a TypeScript** para tipado end-to-end.

---

## Problemas conocidos y soluciones

Durante el desarrollo se resolvieron varios problemas técnicos documentados aquí por si te encuentras alguno:

| Problema | Solución |
|----------|----------|
| `syntax error at or near` en SQL con `\'` | PostgreSQL escapa con `''`, no con barra invertida |
| `invalid input syntax for type uuid: l001` | Generar UUIDs deterministas con `uuid.UUID(int=n)` |
| `Rendered more hooks than during the previous render` | Mover hooks antes de cualquier early return |
| `Invalid output options: For manualChunks Expected Function but received Object` | Vite 8 / Rollup 4: `manualChunks` debe ser función |
| `Could not resolve` solo en Vercel | Case-sensitivity Linux vs Windows: `git config core.ignorecase false` |
| CORS bloqueado en preview URLs de Vercel | Lista separada por comas en `FRONTEND_URL` |
| `Ineffective dynamic import` warning | Convertir imports dinámicos a estáticos cuando ya están importados estáticamente |

---

## Comandos útiles

### Frontend

```bash
cd frontend
npm run dev          # Servidor de desarrollo (puerto 5173)
npm run build        # Build de producción a dist/
npm run preview      # Vista previa del build
npm run lint         # ESLint
```

### Backend

```bash
cd backend
npm run dev          # Servidor con hot reload (puerto 3000)
npm start            # Servidor de producción
```

### Verificar despliegue

```bash
curl https://tu-backend.onrender.com/api/health
# Respuesta esperada: {"status":"ok","uptime":123.45}
```

---

## Autoría y licencia

**Autor:** Bryan
**Centro:** Centro Prometeo
**Ciclo:** 2º DAM CM (Desarrollo de Aplicaciones Multiplataforma)
**Curso académico:** 2025-2026

Este proyecto se distribuye bajo licencia **MIT** — eres libre de usarlo, modificarlo y distribuirlo siempre que mantengas el aviso de copyright.

```
MIT License

Copyright (c) 2026 Bryan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

## Agradecimientos

- A los equipos de **Supabase**, **Vercel** y **Render** por ofrecer planes gratuitos generosos que permiten construir productos completos sin coste.
- A **LanguageTool** y **Free Dictionary API** por mantener servicios públicos gratuitos.
- A **Jon Yablonski** por documentar las [Laws of UX](https://lawsofux.com).
- A **Piotr Wozniak** por el algoritmo SM-2 de SuperMemo.

---

<div align="center">

**LinguaFlow** — TFG DAM2 · 2026

Hecho con ❤️ y mucho café ☕

</div>
