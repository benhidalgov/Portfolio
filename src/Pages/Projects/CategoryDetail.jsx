import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoriesData } from '../../data/categories.js';
import '../../styles/Projects.css'; 
import SEO from '../../Components/SEO/SEO.jsx';

function CategoryDetail() {
    // Extrae el categoryId de la URL (ej. 'cloud', 'data')
    const { categoryId } = useParams();
    
    // Busca la data correspondiente en el objeto
    const project = categoriesData[categoryId];

    // Si no existe, muestra un mensaje de error estilo terminal
    if (!project) {
        return (
            <main className="projects-full-page" style={{ textAlign: 'center', paddingTop: '10rem' }}>
                <h1 style={{ color: 'var(--color-primary)' }}>REGISTRO VACÍO</h1>
                <p>REGISTRO_NO_ENCONTRADO // El registro solicitado no existe en los anales de Urithiru.</p>
                <Link to="/projects" className="btn-primary mt-5">Volver al Registro</Link>
            </main>
        );
    }

    return (
        <main className="projects-full-page">
            <SEO 
                title={`${project.title} | Benjamin Hidalgo`}
                description={project.subtitle}
            />
            <div className="projects-header">
                <Link to="/projects" className="back-link">
                    &larr; VOLVER_AL_REGISTRO
                </Link>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem'}}>
                    <h1 style={{margin: 0}}>{project.title}</h1>
                    <span className="storm-status-stamp">[REGISTRO: LUZ TORMENTOSA // ESTABLE]</span>
                </div>
                <p className="lead-paragraph">{project.subtitle}</p>
            </div>

            <div className="project-detail-container">
                <div className="project-hero-wrapper">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="project-hero-image" 
                        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x450/0066CC/ffffff?text=IMG+ERROR`; }}
                    />
                </div>

                <p className="project-description-long">{project.description}</p>
                
                <h2>Objetivos Clave de Ingeniería</h2>
                <ul className="goals-list">
                    {project.goals.map((goal, index) => (
                        <li key={index} className="goal-item dossier-log">
                            <span className="log-prefix">&gt; // JURAMENTO_META: </span> 
                            {goal}
                        </li>
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
                        href={project.repoLink}
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

export default CategoryDetail;
