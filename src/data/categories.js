export const categoriesData = {
    taskmanager: {
        title: "TaskManager (Kanban Board)",
        subtitle: "Gestión ágil Fullstack con Drag & Drop continuo.",
        description: "Un tablero Kanban de alto rendimiento construido con React y TypeScript, enfocado en una experiencia de usuario instantánea y fluida. Este sistema maneja persistencia de datos segura en PostgreSQL a través de Supabase, asegurando que las actualizaciones de tareas sean consistentes entre sesiones mediante políticas RLS (Row Level Security).",
        image: "https://placehold.co/800x450/BB86FC/000000?text=TASKMANAGER+KANBAN",
        techStack: ["TypeScript", "React", "Supabase", "Zustand", "PostgreSQL", "TailwindCSS"],
        goals: [
            "Implementación iterativa de Drag & Drop para manipular tickets sin latencia.",
            "Gestión de estado global eficiente utilizando el patrón Observer con Zustand.",
            "Desarrollo de autenticación robusta y control de acceso (RLS).",
            "Sincronización de base de datos relacional y UI optimista."
        ],
        repoLink: "https://github.com/benhidalgov/TaskManager"
    },
    portfolio: {
        title: "Portafolio NERV Base",
        subtitle: "Sistema interactivo de presentación profesional.",
        description: "El kernel original que dio vida a este portafolio web. Comenzó como una plantilla pulida y optimizada utilizando React y Vite, diseñada para exponer un alto nivel de escalabilidad modular y responsividad. Evolucionó iterativamente hacia una intrincada UI inspirada en el sistema MAGI de Neon Genesis Evangelion, demostrando un profundo control sobre CSS Variables y el DOM.",
        image: "https://placehold.co/800x450/80d400/ffffff?text=PORTFOLIO+REACT",
        techStack: ["JavaScript", "React", "Vite", "Framer Motion", "Vanilla CSS", "React Router"],
        goals: [
            "Desacoplamiento total de datos visuales mediante estructuras JSON-like modularizadas.",
            "Animaciones fluidas y enrutamiento dinámico sin recargas de página.",
            "Diseño de interfaces con animaciones CSS complejas (CRT scanlines, Glitches).",
            "Gestión de Feedback auditivo (Web Audio API) e interacciones táctiles móviles responsivas."
        ],
        repoLink: "https://github.com/benhidalgov/Portfolio"
    },
    perlenoir: {
        title: "Perle Noir Landing",
        subtitle: "Exhibición de catálogo interactivo para marca comercial.",
        description: "Desarrollo de una Landing Page inmersiva e interactiva orientada a la conversión y retención del cliente para la marca Perle Noir. Construida en base a componentes React reutilizables, priorizando tiempos de carga ultrarrápidos, optimización de assets e interacciones elegantes.",
        image: "https://placehold.co/800x450/ff6f00/ffffff?text=PERLE+NOIR",
        techStack: ["JavaScript", "React", "Responsive Web Design", "UX/UI Design"],
        goals: [
            "Creación de una interfaz gráfica intuitiva orientada al e-commerce/catálogo.",
            "Desempeño optimizado con renderizado del lado del cliente.",
            "Aseguramiento de consistencia y fluidez del layout en dispositivos móviles.",
            "Despliegue ágil mediante Vercel con integración contínua (CI)."
        ],
        repoLink: "https://github.com/benhidalgov/PerleNoir"
    },
    golang: {
        title: "Inventario Golang",
        subtitle: "Microservicio concurrente de alto rendimiento para Backend.",
        description: "Un sofisticado sistema backend modelado como un microservicio, diseñado para procesar y gestionar inventarios de manera ultra-rápida. Escrito íntegramente en Go (Golang), enfatizando la seguridad en la concurrencia (goroutines), el fuerte tipado estático y el bajo consumo de recursos (footprint de memoria).",
        image: "https://placehold.co/800x450/00ADD8/000000?text=GOLANG+BACKEND",
        techStack: ["Go (Golang)", "Microservices Architecture", "Structs & Interfaces", "Concurrency", "REST"],
        goals: [
            "Construcción de un binario ultra-rápido y autocontenido sin dependencias pesadas.",
            "Manejo seguro de concurrencia y acceso a datos sin race-conditions.",
            "Organización arquitectónica orientada a servicios (Domain-Driven Design básico).",
            "Desarrollo de endpoints eficientes para operaciones CRUD de inventario."
        ],
        repoLink: "https://github.com/benhidalgov/Inventario_Golang"
    }
};
