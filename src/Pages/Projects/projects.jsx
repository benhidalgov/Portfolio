import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { projectData } from '../../data/project.jsx'; 
import '../../Components/ProjectsSummary/ProjectsSummary.css';
import SEO from '../../Components/SEO/SEO.jsx';

function ProjectsFull() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

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

      <Motion.div 
        className="summary-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {projectData.map((project) => (
          <Motion.div variants={itemVariants} key={project.id} className="project-card-summary data-slate">
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
          </Motion.div>
        ))}
      </Motion.div>
    </section>
  );
}

export default ProjectsFull;