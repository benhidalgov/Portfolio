import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Projects.css'; 

function CloudDetail() {
    const { theme } = useTheme();

    const project = {
        title: "Cloud & Infraestructura",
        subtitle: "Enfoque en IaC, Kubernetes y automatización de infraestructura.",
        description: "Esta área de enfoque detalla mi capacidad para diseñar y gestionar infraestructura en la nube utilizando herramientas como Terraform, Kubernetes, Docker y servicios de AWS/Azure. La prioridad es la automatización, escalabilidad y seguridad, elementos fundamentales en la Ingeniería en Informática moderna.",
        image: "https://placehold.co/800x450/0066CC/ffffff?text=CLOUD+INFRASTRUCTURE",
        techStack: ["Terraform", "Kubernetes", "Docker", "AWS/Azure", "GitHub Actions", "Linux"],
        goals: [
            "Implementación de infraestructura como código (IaC) para despliegues inmutables.",
            "Automatización de pipelines CI/CD que involucren builds de Docker.",
            "Gestión de clústeres Kubernetes escalables y con alta disponibilidad.",
            "Optimización de costos y recursos en la nube (FinOps básico)."
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
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x450/0066CC/ffffff?text=IMG+CLOUD+ERROR"; }}
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
                        href="https://github.com/[TuUsuario]/cloud-infra-repo" 
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

export default CloudDetail;