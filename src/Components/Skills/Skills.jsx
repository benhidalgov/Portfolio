import React from 'react';
import './Skills.css';

// Datos de habilidades (puedes añadir o quitar las tecnologías relevantes de DUOC)
const skillCategories = [
  { 
    title: 'Desarrollo Frontend', 
    skills: ['React JS', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Diseño Responsivo'] 
  },
  { 
    title: 'Backend & Bases de Datos', 
    skills: ['Node.js (Express)', 'Python (Flask/Django)', 'PostgreSQL', 'MongoDB', 'SQL'] 
  },
  { 
    title: 'Metodologías y Herramientas', 
    skills: ['Git & GitHub', 'Metodología SCRUM/Agile', 'Vite/Webpack', 'REST APIs', 'Docker'] 
  },
];

function Skills() {
  return (
    <section className="skills-section">
      <h2 className="skills-title">TECNOLOGÍAS DUOC UC & HABILIDADES CLAVE</h2>
      
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category-card">
            <h3 className="category-title">{category.title}</h3>
            <ul className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="skill-item">
                  <span className="skill-icon">●</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
