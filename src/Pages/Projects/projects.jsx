import React from 'react';
  import { Link } from 'react-router-dom';
  import { projectData } from '../../data/project.jsx'; 
  import '../../Components/ProjectsSummary/ProjectsSummary.css';
  import SEO from '../../Components/SEO/SEO.jsx';

  function ProjectsSummary() {
    const featuredProjects = projectData.slice(0, 3); 

    return (
      <section className="projects-summary">
        <SEO 
          title="Proyectos | Benjamin Hidalgo" 
          description="Galería de proyectos destacados en Cloud Computing, Big Data y Desarrollo Full-Stack."
        />
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
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/888888/ffffff?text=IMG+ERROR"; }}
              />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description.substring(0, 80)}...</p>
                <div className="card-tech">
                  {(project.tech || project.techStack || []).map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {/* 🏆 CAMBIO CLAVE: Usamos <a> para el enlace externo de GitHub */}
                <a 
                  href={project.github || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="details-link"
                >
                  Ver Código Fuente (GitHub)
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  export default ProjectsSummary;