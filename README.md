# 🚀 Portafolio | Benjamín Hidalgo

Portafolio técnico construido en React, con una estética inspirada en *El Archivo de las Tormentas* (The Stormlight Archive) de Brandon Sanderson. Muestra un perfil de Ingeniería en Informática con enfoque en desarrollo Full-Stack, infraestructura Cloud (AWS/Azure) y datos.

El diseño usa alto contraste (Dark Mode), tipografía `Cinzel`/`Raleway` y glifos de los Caballeros Radiantes para reflejar rigor técnico.

## Stack Tecnológico

| Categoría | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, React Router DOM 7, JavaScript (ES6+) |
| **Animación / 3D** | Framer Motion, Three.js (fondo 3D de la home) |
| **Build** | Vite 7 |
| **SEO** | react-helmet-async |
| **Estilos** | CSS con variables (`src/styles/variables.css`) |

## Estructura del Proyecto

```
src/
├── main.jsx                  # Entrada (HashRouter + HelmetProvider)
├── App.jsx                   # Enrutado y selección de layout
├── index.css                 # Estilos globales + tema Stormlight
├── Context/
│   └── ThemeContext.jsx      # Tema DARK/LIGHT (persistido en localStorage)
├── Pages/
│   ├── Home/KageHome.jsx     # Landing — experiencia "Kage" (canvas 3D + scroll)
│   ├── about/about.jsx       # Sobre mí / stack de habilidades
│   ├── Projects/             # Galería de proyectos y detalle por categoría
│   └── Next/Next.jsx         # Próximos pasos / proyectos futuros
├── Components/
│   ├── Sidebar/              # Navegación lateral (páginas internas)
│   ├── Footer/
│   ├── SEO/
│   ├── Glyphs/RadiantGlyphs.jsx  # Glifos de las Órdenes (SVG inline)
│   └── Kage*/                # KageNav, KageRail, KageCursor, KageCanvas, KagePreloader
├── data/
│   ├── project.jsx           # Proyectos principales
│   ├── categories.js         # Detalle por categoría
│   └── skills.js             # Habilidades (home y about)
└── styles/                   # CSS por sección
```

## Rutas

| Ruta | Descripción |
| :--- | :--- |
| `/` | Landing (Kage) |
| `/about` | Sobre mí |
| `/projects` | Galería de proyectos |
| `/projects/:categoryId` | Detalle de un proyecto |
| `/Next` | Próximos proyectos |

## Ejecución Local

```bash
# 1. Clonar
git clone https://github.com/benhidalgov/Portfolio.git
cd Portfolio

# 2. Instalar dependencias
npm install

# 3. Ejecutar
npm run dev
```

La aplicación se abre en `http://localhost:5173`.

## Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run preview` | Previsualizar el build |

## Deploy

El proyecto usa `HashRouter`, por lo que los deep-links (`/#/projects`, `/#/about`) funcionan en cualquier hosting estático (Vercel, GitHub Pages, Netlify) sin configuración adicional de rewrites.
