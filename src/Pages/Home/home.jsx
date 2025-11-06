import React from 'react';
import Hero from "../../Components/Hero/hero.jsx";
import Skills from '../../Components/Skills/Skills.jsx';
import ProjectsSummary from '../Projects/projects.jsx';

function Home() {
  return (
    <main className="home-page-container">
      <Hero />
      <Skills />

    </main>
  );
}

export default Home;
