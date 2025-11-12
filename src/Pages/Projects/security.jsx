import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Projects.css';

function SecurityDetail() {
    const { theme } = useTheme();

    const project = {
        title: "Ciberseguridad & Ética",
        subtitle: "Enfoque en hardening, compliance y protección de datos.",
        description: "Esta área de enfoque detalla mi capacidad para implementar medidas de seguridad, cumplir con normativas de protección de datos y desarrollar políticas de gobernanza. La prioridad es la protección de la información, compliance y ética en el manejo de datos personales.",
        image: "https://placehold.co/800x450/CC0000/ffffff?text=CYBERSECURITY",
        techStack: ["Linux Hardening", "Compliance", "GDPR", "Data Governance", "Security Policies", "Ethical Hacking"],
        goals: [
            "Implementación de políticas de gobernanza de datos.",
            "Cumplimiento con normativas de protección de datos personales.",
            "Hardening de servidores y sistemas.",
            "Desarrollo de prácticas éticas en el manejo de información."
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
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x450/CC0000/ffffff?text=IMG+SECURITY+ERROR"; }}
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
                        href="https://github.com/[TuUsuario]/security-repo" 
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

export default SecurityDetail;

