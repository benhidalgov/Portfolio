import { Link } from 'react-router-dom';
import { projectData } from '../../data/project.jsx'; 
import './projects.css';
import SEO from '../../Components/SEO/SEO.jsx';
import { calculateReadingTime } from '../../utils/readingMetrics.js';

function ProjectsFull() {
  return (
    <section className="projects-summary" style={{padding: '2rem 3rem'}}>
      <SEO 
        title="Proyectos | Benjamín Hidalgo" 
        description="Directorio completo de repositorios y proyectos técnicos."
      />
      <div className="summary-header">
        <h2>CRÓNICAS // REGISTRO_DE_JURAMENTOS</h2>
        <span style={{color: 'var(--color-primary)', fontSize: '0.8rem', letterSpacing: '0.2em'}}>[ VÍNCULO NAHEL CONECTADO ]</span>
      </div>

      <div className="summary-grid">
        {projectData.map((project) => {
          const reading = calculateReadingTime(project.description);
          return (
          <div key={project.id} className="project-card-summary data-slate" data-rv="up">
            <div className="slate-decorator-top"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/222222/00ff00?text=IMG+ERROR"; }}
            />
            <div className="scanline-hover"></div>
            <div className="card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h3 style={{ margin: 0 }}>{project.title}</h3>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', opacity: 0.85, whiteSpace: 'nowrap' }}>
                  {reading.text}
                </span>
              </div>
              <p>{project.description}</p>
              <div className="card-tech">
                {(project.tech || project.techStack || []).map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="card-links-group" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
                {project.slug && (
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="details-link"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    [ VER CASO DE ESTUDIO ]
                  </Link>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="details-link"
                    style={{ color: '#10b981' }}
                  >
                    [ DEMO EN VIVO ↗ ]
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="details-link"
                  >
                    [ GITHUB ]
                  </a>
                )}
              </div>
            </div>
            <div className="slate-decorator-bottom"></div>
          </div>
        ); })}
      </div>
    </section>
  );
}

export default ProjectsFull;