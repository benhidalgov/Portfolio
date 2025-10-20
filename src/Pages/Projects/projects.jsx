import React from 'react';
// Usaremos 'useState' para almacenar la lista de proyectos
import { useState, useEffect } from 'react';
// Importarás el componente que muestra la tarjeta de cada proyecto
// import ProjectCard from '../components/ProjectCard/ProjectCard';

function Projects() {
  // Simulación de una lista de proyectos que podrías importar
  const [projects, setProjects] = useState([
    { id: 1, title: 'App del Clima', desc: 'Usa la API OpenWeatherMap.', link: '#' },
    { id: 2, title: 'Tienda Virtual', desc: 'Manejo de Context API para el carrito.', link: '#' },
  ]);

  return (
    <main className="projects-page">
      <h1>Portafolio de Proyectos</h1>
      <p>Aquí puedes ver una muestra de mi trabajo reciente en React.</p>
      
      <section className="projects-grid">
        {/* El método map() es esencial para React: 
          renderiza una lista de componentes basada en un array. 
        */}
        {projects.map((project) => (
          // <ProjectCard key={project.id} data={project} />
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <a href={project.link}>Ver Demo</a>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Projects;