import React from 'react';
import Hero from "../../Components/Hero/hero.jsx"; // Importar el componente Hero
import ProjectsSummary from '../../Components/ProjectsSummary/ProjectsSummary.jsx'; // Componente de Resumen de Proyectos
import Skills from '../../Components/Skills/Skills.jsx'; // Nuevo componente de Habilidades

function Home() {
  return (
    <main className="home-page-container">
      {/* 1. SECCIÓN PRINCIPAL: Presentación Hero */}
      <Hero />

      {/* 2. SECCIÓN DE HABILIDADES TÉCNICAS (Perfil de Ingeniería) */}
      <Skills />

      {/* 3. RESUMEN DE PROYECTOS (Reemplaza el código obsoleto) */}
      <ProjectsSummary />
      
    </main>
  );
}

export default Home;
