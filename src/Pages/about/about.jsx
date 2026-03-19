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
      <h1>OPERATIVE_DOSSIER // Benjamín Hidalgo</h1>
      <p className="lead-paragraph">
        <strong>PROFILE SUMMARY:</strong> Ingeniero en Informática especializado en la construcción de arquitecturas escalables, seguridad de plataformas corporativas y desarrollo de ecosistemas Full-Stack. Mi flujo operativo combina el estricto rigor del tipado (TypeScript y Go) con despliegues ágiles, garantizando sistemas resilientes ante altos volúmenes de datos. Mi objetivo es transformar la deuda técnica y las amenazas de seguridad en bases estructurales inquebrantables.
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