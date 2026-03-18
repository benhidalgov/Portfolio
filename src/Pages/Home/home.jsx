import React from 'react';
import Hero from "../../Components/Hero/Hero.jsx";
import Skills from '../../Components/Skills/Skills.jsx';
import ProjectsSummary from '../Projects/projects.jsx';
import SEO from '../../Components/SEO/SEO.jsx';

function Home() {
  return (
    <main className="home-page-container">
      <SEO 
        title="Inicio | Portafolio Benjamin Hidalgo" 
        description="Bienvenido a mi portafolio profesional. Explora mis proyectos en Cloud, Data y Desarrollo Full-Stack."
      />
      <Hero />
      <Skills />

    </main>
  );
}

export default Home;
