# Benjamín Hidalgo — Portafolio

Portafolio técnico construido en React con una estética **dreamcore / ethereal**: niebla, auroras suaves, una puerta de luz y un suelo ajedrezado que se pierde en la oscuridad. El contenido es profesional; la atmósfera es liminal.

## Stack

| Categoría | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, React Router DOM 7, JavaScript (ES6+) |
| **Animación** | CSS transitions/keyframes |
| **Build** | Vite 7 |
| **SEO** | Metadatos dinámicos con `SEO.jsx` |
| **Estilos** | CSS con variables (`src/styles/variables.css`) |

Sin Three.js, sin librerías de animación y sin imágenes de fondo: la atmósfera se construye con gradientes, `backdrop-filter`, SVG y grano.

## Estructura

```
src/
├── main.jsx                  # Entrada
├── App.jsx                   # Rutas + layout
├── index.css                 # Base global y tokens visuales
├── Context/ThemeContext.jsx  # Nocturno / Diurno
├── Pages/
│   ├── Home/KageHome.jsx     # Landing liminal
│   ├── about/about.jsx       # Perfil y capacidades
│   └── Projects/             # Galería y dossier por proyecto
├── Components/
│   ├── Atmosphere/           # Aurora, nubes, suelo y puerta
│   ├── Umbral/               # Interludio entre Proyectos y Contacto
│   ├── CustomCursor/         # Orbe de luz
│   ├── EtherealMark/         # Logotipo
│   ├── KageNav/ KageRail/    # Navegación
│   ├── Sidebar/ Footer/      # Chrome interno
│   ├── Loading/              # Umbral de carga
│   ├── ProjectThumb/         # Miniaturas
│   └── SEO/
├── data/
│   ├── projects.js
│   └── skills.js
└── styles/                   # Tokens y CSS por página
```

## Rutas

| Ruta | Descripción |
| :--- | :--- |
| `/` | Landing liminal |
| `/about` | Perfil |
| `/projects` | Galería de proyectos |
| `/projects/:slug` | Dossier de proyecto |

## Ejecución

```bash
git clone https://github.com/benhidalgov/Portfolio.git
cd Portfolio
npm install
npm run dev
```

La aplicación se abre en `http://localhost:5173`.

## Scripts

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run test` | Tests |
| `npm run preview` | Previsualizar el build |

## Accesibilidad y movimiento

El sitio respeta `prefers-reduced-motion`: desactiva auroras, suelo, cursor orbe y revelados animados. El cursor personalizado solo se activa en punteros finos; en táctil se usa el nativo.

## Deploy

El proyecto usa `HashRouter`, por lo que los deep-links funcionan en cualquier hosting estático (Vercel, GitHub Pages, Netlify) sin rewrites adicionales.
