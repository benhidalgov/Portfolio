import React from 'react';
import Hero from "../../Components/Hero/hero.jsx"; // Importar el componente Hero
import Skills from '../../Components/Skills/Skills.jsx'; // Nuevo componente de Habilidades
import Project from '../Projects/projects.jsx'
function Home() {
  return (
    <main className="home-page-container">
      {/* 1. SECCIÓN PRINCIPAL: Presentación Hero */}
      <Hero />

      {/* 2. SECCIÓN DE HABILIDADES TÉCNICAS (Perfil de Ingeniería) */}
      <Skills />

      {/* 3. RESUMEN DE PROYECTOS (Reemplaza el código obsoleto) */}
      <Project />
      
    </main>
  );
}

export default Home;
