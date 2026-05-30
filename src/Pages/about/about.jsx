import React, { useState } from 'react';
import { aboutSkills as skillCategories } from '../../data/skills.js';
import '../../styles/about.css';
import '../../Components/Skills/Skills.css'; // Reutilizar estilos premium
import SEO from '../../Components/SEO/SEO.jsx';

// Iconos SVG para habilidades de About Me
const techIcons = {
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'Red Hat (Linux)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg',
  'Docker & Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'IaC (Terraform)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  'Python (Pandas/Spark)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'SQL/T-SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'PostgreSQL/MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'React JS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js (Express)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'CI/CD (GitHub Actions)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Git & GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Bash Scripting': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
};

function SkillTag({ skill }) {
  const icon = techIcons[skill];
  const label = skill.trim();

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

function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="about-page">
      <SEO 
        title="Sobre Mí | Benjamin Hidalgo" 
        description="Conoce más sobre mi perfil como Ingeniero en Informática, mis habilidades en Cloud, Data y Desarrollo, y mis certificaciones."
      />
      {/* 1. Descripción del Perfil Integral */}
      <h1>REGISTRO_CRÓNICA // Benjamín Hidalgo</h1>
      <p className="lead-paragraph">
        <strong>CRÓNICA DEL RADIANTE:</strong> Ingeniero en Informática especializado en la construcción de arquitecturas escalables, seguridad de plataformas corporativas y desarrollo de ecosistemas Full-Stack. Mi flujo operativo combina el estricto rigor del tipado (TypeScript y Go) con despliegues ágiles, garantizando sistemas resilientes ante altos volúmenes de datos. Mi objetivo es transformar la deuda técnica y las amenazas de seguridad en bases estructurales inquebrantables.
      </p>
      
      {/* 3. Mapeo de Habilidades por Categoría */}
      <h2>Stack de Habilidades Técnicas</h2>
      <div className="skills-grid about-skills-grid">
        {skillCategories.map((category, index) => (
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
              <span className="category-index">ORD_{String(index + 1).padStart(2, '0')}</span>
              <span className="category-decorator">◆</span>
              <h3 className="category-title">{category.title.toUpperCase()}</h3>
            </div>

            <div className="skill-tags-container">
              {category.skills.map((skill, i) => (
                <SkillTag key={i} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default About;