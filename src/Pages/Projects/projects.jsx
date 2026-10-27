import { Link } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import './projects.css';
import SEO from '../../Components/SEO/SEO.jsx';
import ProjectThumb from '../../Components/ProjectThumb/ProjectThumb.jsx';

function ProjectsFull() {
  return (
    <section className="projects-summary">
      <SEO 
        title="Proyectos | Benjamín Hidalgo" 
        description="Directorio completo de repositorios y proyectos técnicos."
      />
      <div className="summary-header">
        <h2>Proyectos</h2>
        <span>Casos de estudio</span>
      </div>

      <div className="summary-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card-summary data-slate" data-rv="up">
            <ProjectThumb project={project} className="project-image" />
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="card-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="card-links-group" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
                {project.slug && (
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="details-link"
                  >
                    Ver caso
                  </Link>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="details-link"
                  >
                    Demo
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="details-link"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="slate-decorator-bottom"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsFull;