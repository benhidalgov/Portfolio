import React from 'react';
import { Link } from 'react-router-dom';
import { projectData } from '../../data/project.jsx'; 
import './ProjectsSummary.css';

function ProjectsSummary() {
  const featuredProjects = projectData.slice(0, 3); 

  return (
    <section className="projects-summary">
      <div className="summary-header">
        <h2>Últimas Operaciones</h2>
        <Link to="/projects" className="view-all-link">
          Ver Dossier Completo &rarr;
        </Link>
      </div>

      <div className="summary-grid">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-card-summary data-slate">
            <div className="slate-decorator-top"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/222222/00ff00?text=IMG+ERROR"; }}
            />
            <div className="scanline-hover"></div>
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 80)}...</p>
              <div className="card-tech">
                {(project.tech || project.techStack || []).map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a 
                href={project.github || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="details-link"
              >
                [ ACCEDER AL ARCHIVO MESTRO ]
              </a>
            </div>
            <div className="slate-decorator-bottom"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSummary;
