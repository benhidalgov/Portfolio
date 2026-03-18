import React from 'react';
import { aboutSkills as skillCategories } from '../../data/skills.js';
import '../../styles/about.css'
import SEO from '../../Components/SEO/SEO.jsx';

function About() {

  return (
    <main className="about-page">
      <SEO 
        title="Sobre Mí | Benjamin Hidalgo" 
        description="Conoce más sobre mi perfil como Ingeniero en Informática, mis habilidades en Cloud, Data y Desarrollo, y mis certificaciones."
      />
      {/* 1. Descripción del Perfil Integral */}
      <h1>Ingeniero en Plataformas y Datos</h1>
      <p className="lead-paragraph">
        Soy un Ingeniero en Informática con un perfil integral, especializado en la arquitectura cloud y el procesamiento de datos a gran escala. Mi experiencia combina la arquitectura Cloud,con el desarrollo Full-Stack para construir soluciones robustas y escalables.
      </p>
      {/* 3. Mapeo de Habilidades por Categoría */}
      <h2>Stack de Habilidades Técnicas</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <section key={index} className="skill-category">
            <h3>{category.title}</h3>
            <ul className="skills-list">
              {category.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      

    </main>
  );
}

export default About;