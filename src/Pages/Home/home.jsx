import React from 'react';
import Hero from "../../Components/Hero/Hero.jsx";
import Skills from '../../Components/Skills/Skills.jsx';
import ProjectsSummary from '../../Components/ProjectsSummary/ProjectsSummary.jsx';
import SEO from '../../Components/SEO/SEO.jsx';

function Home() {
  return (
    <main className="home-page-container">
      <SEO 
        title="Inicio | Portafolio Benjamin Hidalgo" 
        description="Bienvenido a mi portafolio profesional y dossier de ingeniería. Explora mis proyectos de desarrollo Full-Stack y arquitectura de sistemas."
      />
      <Hero />
      <Skills />

    </main>
  );
}

export default Home;
