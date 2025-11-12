import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Projects.css';

function DataDetail() {
    const { theme } = useTheme();

    const project = {
        title: "Análisis de Datos & BI",
        subtitle: "Enfoque en ETL, Data Warehousing y Business Intelligence.",
        description: "Esta área de enfoque detalla mi capacidad para procesar grandes volúmenes de datos utilizando Python, Apache Spark, SQL y herramientas de BI como Power BI. La prioridad es la calidad de datos, eficiencia en el procesamiento y visualización de insights.",
        image: "https://placehold.co/800x450/FF6600/ffffff?text=DATA+ANALYTICS",
        techStack: ["Python", "Apache Spark", "SQL", "Power BI", "PostgreSQL", "Pandas"],
        goals: [
            "Diseño y construcción de pipelines ETL eficientes.",
            "Implementación de Data Warehouses escalables.",
            "Creación de dashboards y reportes de BI.",
            "Limpieza y validación de datos para garantizar calidad."
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
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x450/FF6600/ffffff?text=IMG+DATA+ERROR"; }}
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
                        href="https://github.com/[TuUsuario]/data-analytics-repo" 
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

export default DataDetail;

