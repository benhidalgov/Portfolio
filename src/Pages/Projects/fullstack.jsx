import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Projects.css';

function FullStackDetail() {
    // Usamos useTheme para mantener el tema Dark/Light
    const { theme } = useTheme();

    // Datos del Proyecto Específico (Normalmente vendrían de una llamada a API o un archivo de datos)
    const project = {
        title: "Desarrollo Full-Stack & Patrones Robustos",
        subtitle: "Enfoque en React, Node.js y Testing para aplicaciones empresariales.",
        description: "Esta área de enfoque detalla mi capacidad para construir soluciones completas, desde la interfaz de usuario (UI) en React hasta la lógica de negocio en el backend (Node.js/Express) y la capa de persistencia (PostgreSQL/MongoDB). La prioridad es la modularidad y el rendimiento.",
        image: "https://placehold.co/800x450/4B0082/ffffff?text=FULL+STACK+ARCHITECTURE",
        techStack: ["React (Hooks, Context)", "Node.js (Express)", "REST APIs", "PostgreSQL", "JavaScript/ES6+", "Testing (Jest/Vitest)"],
        goals: [
            "Implementación de arquitecturas desacopladas.",
            "Garantizar un alto rendimiento en el frontend mediante optimizaciones de React.",
            "Desarrollo de API RESTful seguras y eficientes.",
            "Integración de testing unitario y de integración en el ciclo de desarrollo."
        ]
    };

    return (
        <main className="projects-full-page">
            <div className="projects-header">
                <Link to="/projects" className="back-link">
                    &larr; Volver a todos los Enfoques
                </Link>
                <h1>{project.title}</h1>
                <p className="lead-paragraph">{project.subtitle}</p>
            </div>

            <div className="project-detail-container">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-hero-image" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x450/4B0082/ffffff?text=IMG+FULL+STACK+ERROR"; }}
                />

                <p className="project-description-long">{project.description}</p>
                
                <h2>Objetivos Clave de Ingeniería</h2>
                <ul className="goals-list">
                    {project.goals.map((goal, index) => (
                        <li key={index} className="goal-item">⦿ {goal}</li>
                    ))}
                </ul>

                <h2>Stack Utilizado</h2>
                <div className="card-tech-full">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag-full">{tech}</span>
                    ))}
                </div>

                <div className="project-actions mt-5">
                    <a 
                        href="https://github.com/[TuUsuario]/fullstack-repo-ejemplo" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary"
                    >
                        Ver Repositorio General (GitHub)
                    </a>
                </div>
            </div>
        </main>
    );
}

export default FullStackDetail;