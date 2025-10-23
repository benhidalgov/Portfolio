import React from 'react';
import '../../styles/about.css'
function About() {
  // Las habilidades se separan por categorías para un mejor mapeo en la UI
  const skillCategories = [
    { 
      title: 'Infraestructura & Cloud', 
      skills: ['AWS', 'Azure', 'Red Hat (Linux)', 'Docker & Kubernetes', 'IaC (Terraform)'],
      certifications: ['AWS Certified Cloud Practitioner', 'Azure Fundamentals', 'RHCSA']
    },
    { 
      title: 'Ingeniería de Datos & BI', 
      skills: ['Python (Pandas/Spark)', 'SQL/T-SQL', 'PostgreSQL/MongoDB', 'Data Storytelling'],
      certifications: ['Big Data Professional Certification', 'Data Storytelling Professional Certification']
    },
    { 
      title: 'Desarrollo & Automatización', 
      skills: ['React JS', 'Node.js (Express)', 'CI/CD (GitHub Actions)', 'Git & GitHub', 'Bash Scripting'],
      certifications: ['DevOps Essentials', 'CCNA']
    },
    {
      title: 'Ciberseguridad',
      skills: ['Análisis de Riesgos', 'Network Security'],
      certifications: ['Google Cybersecurity Professional Certificate', 'Cisco CCNA']
    }
  ];

  return (
    <main className="about-page">
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