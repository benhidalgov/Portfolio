import React from 'react';

function About() {
  // Puedes usar una lista de habilidades para mapear
  const skills = ['React', 'JavaScript (ES6+)', 'HTML & CSS', 'Tailwind CSS', 'Git & GitHub', 'Redux/Context API'];

  return (
    <main className="about-page">
      <h1>Acerca de Mí</h1>
      <p>
        Soy un desarrollador frontend apasionado por construir interfaces de usuario
        limpias y funcionales. Mi enfoque es la modularidad y la eficiencia.
      </p>

      <h2>Habilidades Técnicas</h2>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      
      <h2>Experiencia y Educación</h2>
      <p>
        [Tu resumen profesional y/o educativo].
      </p>
    </main>
  );
}

export default About;