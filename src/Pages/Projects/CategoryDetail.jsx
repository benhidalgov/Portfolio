import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import '../../styles/Projects.css';
import SEO from '../../Components/SEO/SEO.jsx';
import ProjectThumb from '../../Components/ProjectThumb/ProjectThumb.jsx';
import { calculateReadingTime } from '../../utils/readingMetrics.js';

function CategoryDetail() {
    const { categoryId } = useParams();
    const project = projects.find((p) => p.slug === categoryId);

    if (!project) {
        return (
            <main className="projects-full-page" style={{ textAlign: 'center', paddingTop: '10rem' }}>
                <h1>Proyecto no encontrado</h1>
                <p>El registro solicitado no existe en este archivo.</p>
                <Link to="/projects" className="btn-primary mt-5">Volver a proyectos</Link>
            </main>
        );
    }

    const dossierContent = [project.subtitle, project.description, ...(project.goals || [])].filter(Boolean).join(' ');
    const readingMetric = calculateReadingTime(dossierContent);

    return (
        <main className="projects-full-page">
            <SEO
                title={`${project.title} | Benjamin Hidalgo`}
                description={project.subtitle}
            />
            <div className="projects-header">
                <Link to="/projects" className="back-link">
                    ← Volver a proyectos
                </Link>
                <div className="project-title-row">
                    <h1>{project.title}</h1>
                    <div className="project-meta-row">
                        <span className="project-meta">{readingMetric.text}</span>
                        <span className="project-meta">Estado: estable</span>
                    </div>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
            </div>

            <div className="project-detail-container">
                {project.image && (
                    <div className="project-hero-wrapper">
                        <ProjectThumb project={project} className="project-hero-image" />
                    </div>
                )}

                <p className="project-description-long">{project.description}</p>

                <h2>Objetivos de ingeniería</h2>
                <ul className="goals-list">
                    {project.goals.map((goal, index) => (
                        <li key={index} className="goal-item">
                            <span className="goal-index">{String(index + 1).padStart(2, '0')}</span>
                            <span>{goal}</span>
                        </li>
                    ))}
                </ul>

                <h2>Stack utilizado</h2>
                <p className="project-tech">{project.tech.join(', ')}</p>

                <div className="project-actions">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Ver aplicación
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={project.link ? "btn-secondary" : "btn-primary"}
                        >
                            Ver repositorio
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CategoryDetail;
