import './ProjectThumb.css';

const initials = (title) => (title.match(/\b[A-ZÁÉÍÓÚÑ]/g) || []).slice(0, 3).join('') || '··';

function TaskBoard() {
  return (
    <div className="project-thumb__kanban" aria-hidden="true">
      {['BACKLOG', 'EN CURSO', 'LISTO'].map((column, index) => (
        <div className="project-thumb__kanban-column" key={column}>
          <span>{column}</span>
          <i className={index === 1 ? 'active' : ''} />
          <i />
          {index !== 2 && <i />}
        </div>
      ))}
    </div>
  );
}

function KnowledgeConsole() {
  return (
    <div className="project-thumb__knowledge" aria-hidden="true">
      <div className="project-thumb__search">⌕ <span>consultar base de conocimiento</span></div>
      <div className="project-thumb__knowledge-grid">
        <span className="project-thumb__index-lines"><i /><i /><i /><i /></span>
        <span className="project-thumb__document-lines"><i /><i /><i /><i /><i /></span>
      </div>
      <small>RAG INDEX · AES-256 · 0.79ms</small>
    </div>
  );
}

function InventoryTerminal() {
  return (
    <div className="project-thumb__terminal" aria-hidden="true">
      <p><b>inventory-api</b><span>● online</span></p>
      <code><em>$</em> GET /v1/inventory</code>
      <code className="project-thumb__terminal-result">200 <i /> <i /> <i /></code>
      <small>GO · SQLITE · THREAD-SAFE</small>
    </div>
  );
}

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
  const scene = {
    taskmanager: <TaskBoard />,
    kgb: <KnowledgeConsole />,
    golang: <InventoryTerminal />,
  }[project.slug];

  return (
    <div className={`project-thumb project-thumb--${project.slug} ${className}`} role="img" aria-label={project.title}>
      {scene || <span className="project-thumb-mark" aria-hidden="true">{initials(project.title)}</span>}
      <span className="project-thumb-tech" aria-hidden="true">{tech.join(', ')}</span>
    </div>
  );
}
