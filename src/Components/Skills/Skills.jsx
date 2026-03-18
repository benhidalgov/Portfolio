import React from 'react';
import { homeSkills as skillCategories } from '../../data/skills.js';
import './Skills.css';

function Skills() {
  return (
    <section className="skills-section">
      <h2 className="skills-title">TECNOLOGÍAS & HABILIDADES CLAVE</h2>
      
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
