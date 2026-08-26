import './KageRail.css';

const SECTIONS = [
  { id: 'hero',     label: 'Inicio' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact',  label: 'Contacto' },
];

export default function KageRail({ activeSection = 0, onNavigate }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onNavigate) onNavigate(SECTIONS.findIndex(s => s.id === id));
  };

  return (
    <nav className="kage-rail" aria-label="Section navigation">
      {SECTIONS.map((sec, i) => (
        <button
          key={sec.id}
          className={`kage-rail-btn ${activeSection === i ? 'on' : ''}`}
          onClick={() => scrollTo(sec.id)}
          title={sec.label}
          aria-label={sec.label}
        >
          <i />
        </button>
      ))}
    </nav>
  );
}
