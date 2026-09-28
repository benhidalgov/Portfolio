export const categoriesData = {
    taskmanager: {
        title: "TaskManager (Kanban Board)",
        subtitle: "Gestión ágil Fullstack con Drag & Drop continuo y persistencia en tiempo real.",
        description: "Un tablero Kanban de alto rendimiento construido con React y TypeScript, enfocado en una experiencia de usuario instantánea y fluida. Este sistema maneja persistencia de datos segura en PostgreSQL a través de Supabase, asegurando que las actualizaciones de tareas sean consistentes entre sesiones mediante políticas RLS (Row Level Security) y gestión de estado con Zustand.",
        image: "https://placehold.co/800x450/1e1b4b/38bdf8?text=TASKMANAGER+KANBAN",
        techStack: ["TypeScript", "React", "Supabase", "Zustand", "PostgreSQL", "TailwindCSS"],
        goals: [
            "Implementación iterativa de Drag & Drop para manipular tickets sin latencia.",
            "Gestión de estado global eficiente utilizando el patrón Observer con Zustand.",
            "Desarrollo de autenticación robusta y control de acceso granular mediante políticas RLS en PostgreSQL.",
            "Sincronización de base de datos relacional y UI optimista para feedback instantáneo."
        ],
        repoLink: "https://github.com/benhidalgov/TaskManager",
        liveLink: ""
    },
    kgb: {
        title: "Consola Knowledge Base (KGB)",
        subtitle: "Base de conocimiento indexada en memoria, búsqueda semántica RAG (Gemini) y bóveda cifrada AES-256.",
        description: "Plataforma corporativa de conocimiento técnico y gestión documental. Incorpora un índice de conocimiento en memoria con DuckDB (latencia < 2 ms y cero I/O de disco), búsqueda semántica generativa con Google Gemini RAG (gemini-2.5-flash) con fallback autónomo, control de acceso perimetral RBAC con contraseñas PBKDF2-HMAC-SHA256 y bóveda de seguridad cifrada con AES-256 Fernet.",
        image: "https://placehold.co/800x450/0f172a/38bdf8?text=KGB+KNOWLEDGE+BASE",
        techStack: ["Python", "DuckDB", "Google Gemini RAG", "AES-256 Fernet", "PBKDF2", "Streamlit"],
        goals: [
            "Motor de búsqueda dual: indexación textual ultrarrápida en memoria (DuckDB) y RAG generativo con Gemini.",
            "Bóveda de credenciales con cifrado simétrico AES-256 y jerarquía en cascada para API Keys.",
            "Query Response Cache en RAM que entrega consultas resueltas en 0.79 milisegundos.",
            "Control de versiones inmutable documental, comparador visual Diff y registro centralizado de auditoría."
        ],
        repoLink: "https://github.com/benhidalgov/KGB",
        liveLink: ""
    },
    autodocs: {
        title: "Autodocs (Sistema de Tickets de Soporte)",
        subtitle: "Gestión corporativa de incidencias con validación de identidad chilena Módulo 11.",
        description: "Sistema full-stack para la recepción, priorización y resolución de tickets de soporte técnico. Integra validación matemática estricta de RUT chileno bajo el algoritmo Módulo 11, persistencia relacional administrada mediante Prisma ORM con migraciones controladas, y una interfaz de usuario reactiva desplegada en Vercel.",
        image: "https://placehold.co/800x450/1e293b/10b981?text=AUTODOCS+TICKETS",
        techStack: ["TypeScript", "React", "Node.js", "Prisma ORM", "PostgreSQL", "Vercel"],
        goals: [
            "Validación rigurosa de identidad tributaria mediante algoritmo chileno Módulo 11.",
            "Arquitectura modular desacoplada entre backend de servicios y cliente SPA.",
            "Modelado relacional de datos y migraciones controladas con Prisma ORM.",
            "Despliegue continuo en producción a través de la infraestructura global de Vercel."
        ],
        repoLink: "https://github.com/benhidalgov/Autodocs",
        liveLink: "https://autodocs-mu.vercel.app"
    },
    minutera: {
        title: "Minutera Web App",
        subtitle: "Plataforma interactiva para el seguimiento de compromisos y acuerdos de equipo.",
        description: "Aplicación web orientada a la organización ágil de equipos de trabajo. Permite registrar, estructurar y catalogar minutas de reuniones semanales, registrar compromisos asignados por participante y dar seguimiento a los acuerdos con feedback visual interactivo y tipado estricto.",
        image: "https://placehold.co/800x450/0f2b1d/34d399?text=MINUTERA+WEB",
        techStack: ["TypeScript", "React", "Vite", "Canvas Confetti", "Responsive UI", "Vercel"],
        goals: [
            "Diseño de interfaz ágil y amigable para redacción y archivo de minutas.",
            "Tipado estricto con TypeScript para garantizar la consistencia en el modelo de acuerdos.",
            "Feedback dinámico e interactivo mediante animaciones reactivas y celebraciones de metas.",
            "Despliegue en producción con integración continua en Vercel."
        ],
        repoLink: "https://github.com/benhidalgov/Minutera",
        liveLink: "https://minutera.vercel.app"
    },
    golang: {
        title: "API Inventario Golang",
        subtitle: "Microservicio concurrente de alto rendimiento para Backend.",
        description: "Un sofisticado sistema backend modelado como un microservicio, diseñado para procesar y gestionar inventarios de manera ultra-rápida. Escrito íntegramente en Go (Golang), enfatizando la seguridad en la concurrencia (`sync.Mutex`), el fuerte tipado estático, prevención de inyecciones SQL y arquitectura limpia desacoplada.",
        image: "https://placehold.co/800x450/003d4d/00ADD8?text=GO+INVENTORY",
        techStack: ["Go (Golang)", "SQLite", "sync.Mutex", "Thread-Safety", "Clean Architecture", "REST API"],
        goals: [
            "Construcción de un binario ultra-rápido y autocontenido sin dependencias pesadas.",
            "Manejo seguro de concurrencia y acceso a datos sin condiciones de carrera (race conditions).",
            "Organización arquitectónica limpia separando cmd/ de la lógica de dominio en internal/.",
            "Desarrollo de endpoints REST parametrizados para prevención estricta de inyecciones SQL."
        ],
        repoLink: "https://github.com/benhidalgov/Inventario_Golang",
        liveLink: ""
    },
    portfolio: {
        title: "Portafolio Roshar",
        subtitle: "Experiencia inmersiva en WebGL inspirada en El Archivo de las Tormentas.",
        description: "Portafolio profesional interactivo construido en React 19 y Three.js. Combina un motor WebGL interactivo con 1,400 partículas de tormenta, shaders GLSL de alta fidelidad, conmutación fluida entre modos Alta Tormenta y Luz Tormentosa, sintetizador Web Audio API y cursor temático Shardblade optimizado por GPU.",
        image: "https://placehold.co/800x450/0a0e1a/00D4FF?text=PORTFOLIO+ROSHAR",
        techStack: ["React 19", "Three.js", "Framer Motion", "WebGL Shaders", "Vite 7", "Web Audio API"],
        goals: [
            "Renderizado 3D interactivo con Three.js, shaders GLSL y partículas reactivas al cursor.",
            "Cursor Shardblade animado con GPU acceleration sin provocar re-renderizados de React.",
            "Arquitectura modularizada, responsive y con accesibilidad auditada bajo estándares WCAG.",
            "Sistema de sonido interactivo sintetizado en tiempo real con Web Audio API."
        ],
        repoLink: "https://github.com/benhidalgov/Portfolio",
        liveLink: "https://portfolio-bice-eight-77.vercel.app"
    }
};
