import './ProjectThumb.css';

const initials = (title) => (title.match(/\b[A-ZÁÉÍÓÚÑ]/g) || []).slice(0, 3).join('') || '··';

/**
 * Miniatura de proyecto. Si hay captura real se usa; si no, una ficha con el
 * monograma y el stack en lugar de un placeholder ajeno al tema.
 */
export default function ProjectThumb({ project, className = '' }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className={className}
        width="1200"
        height="675"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const tech = (project.tech || project.techStack || []).slice(0, 3);

  return (
    <div className={`project-thumb ${className}`} role="img" aria-label={project.title}>
      <span className="project-thumb-mark" aria-hidden="true">{initials(project.title)}</span>
      <span className="project-thumb-tech" aria-hidden="true">{tech.join(' · ')}</span>
    </div>
  );
}
