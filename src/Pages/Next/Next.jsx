import React from 'react';
import { Link } from 'react-router-dom';
// ✅ CORRECCIÓN: Apuntando a 'projects.js' (plural)
import { projectData } from '../../Pages/Next/next.js'; 
import '../../styles/next.css';

function ProjectsSummary() {
  // Tomamos solo los primeros 3 proyectos para el resumen de la página Home
  const featuredProjects = projectData.slice(0, 3); 

  return (
    <section className="projects-summary">
      <div className="summary-header">
        <h2>Proyectos Destacados</h2>
        <Link to="/projects" className="view-all-link">
          Ver todos mis trabajos &rarr;
        </Link>
      </div>

      <div className="summary-grid">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-card-summary">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
              // Fallback en caso de que la URL de la imagen falle
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/888888/ffffff?text=IMG+ERROR"; }}
            />
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 80)}...</p>
              <div className="card-tech">
                {/* Asegura que 'tech' o 'techStack' exista antes de mapear */}
                {(project.tech || project.techStack || []).map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <Link to={(project.link || project.liveLink || '#')} className="details-link">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSummary;