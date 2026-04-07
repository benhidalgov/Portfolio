import React, { useState } from 'react';
import { homeSkills as skillCategories } from '../../data/skills.js';
import './Skills.css';

// Mapa de iconos SVG por tecnología (usando Devicons CDN)
const techIcons = {
  'React JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'React ': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'HTML5 & CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'Node.js (Express)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Python (Flask/Django,Pandas,NumPy)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'SQL/ T-SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'Git & GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Vite/Webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Kubernetes,': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
};

// Iconos para certificaciones
const certIcons = {
  'Google': '🛡',
  'Azure': '☁',
  'Red hat': '🔴',
  'Cisco': '🌐',
  'AWS': '☁',
  'Big Data': '📊',
  'Data Story': '📈',
};

const getCertIcon = (name) => {
  const key = Object.keys(certIcons).find(k => name.toLowerCase().includes(k.toLowerCase()));
  return key ? certIcons[key] : '🏆';
};

// Categorías que NO son certificaciones
const SKILL_CATEGORIES = skillCategories.filter(c => c.title !== 'Certificaciones');
const CERT_CATEGORY = skillCategories.find(c => c.title === 'Certificaciones');

function SkillTag({ skill }) {
  const icon = techIcons[skill];
  const label = skill.replace(',', '').trim();

  return (
    <div className="skill-tag">
      {icon && (
        <img
          src={icon}
          alt={label}
          className="skill-tag-icon"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <span className="skill-tag-label">{label}</span>
    </div>
  );
}

function CertBadge({ cert }) {
  const icon = getCertIcon(cert);
  return (
    <div className="cert-badge">
      <span className="cert-badge-icon">{icon}</span>
      <span className="cert-badge-label">{cert}</span>
    </div>
  );
}

function Skills() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="skills-section">
      <h2 className="skills-title">TECNOLOGÍAS & HABILIDADES CLAVE</h2>

      {/* Grid de habilidades técnicas */}
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((category, index) => (
          <div
            key={index}
            className={`skill-category-card ${hoveredCard === index ? 'is-hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-scan-line" />
            <div className="card-corner card-corner--tl" />
            <div className="card-corner card-corner--br" />

            <div className="category-header">
              <span className="category-index">SYS_{String(index + 1).padStart(2, '0')}</span>
              <h3 className="category-title">{category.title.toUpperCase()}</h3>
            </div>

            <div className="skill-tags-container">
              {category.skills.map((skill, skillIndex) => (
                <SkillTag key={skillIndex} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Certificaciones separada */}
      {CERT_CATEGORY && (
        <div className="cert-section">
          <div className="cert-section-header">
            <span className="cert-section-label">// SECURITY_CLEARANCES &amp; CERTIFICATIONS</span>
            <span className="cert-count">[{CERT_CATEGORY.skills.length} REGISTERED]</span>
          </div>
          <div className="cert-grid">
            {CERT_CATEGORY.skills.map((cert, i) => (
              <CertBadge key={i} cert={cert} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Skills;
