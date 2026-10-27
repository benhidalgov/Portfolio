import React from 'react';
import { aboutSkills as skillCategories, certificationsList } from '../../data/skills.js';
import '../../styles/about.css';
import SEO from '../../Components/SEO/SEO.jsx';

const techIcons = {
  'AWS': '/icons/amazonwebservices-original.svg',
  'Azure': '/icons/azure-original.svg',
  'Red Hat (Linux)': '/icons/redhat-original.svg',
  'Docker & Kubernetes': '/icons/docker-original.svg',
  'IaC (Terraform)': '/icons/terraform-original.svg',
  'Python (Pandas/Spark)': '/icons/python-original.svg',
  'SQL/T-SQL': '/icons/microsoftsqlserver-plain.svg',
  'PostgreSQL/MongoDB': '/icons/postgresql-original.svg',
  'React JS': '/icons/react-original.svg',
  'Node.js (Express)': '/icons/nodejs-original.svg',
  'CI/CD (GitHub Actions)': '/icons/github-original.svg',
  'Git & GitHub': '/icons/github-original.svg',
  'Bash Scripting': '/icons/bash-original.svg',
};

function About() {
  return (
    <main className="about-page">
      <SEO
        title="Perfil | Benjamín Hidalgo"
        description="Perfil de Benjamín Hidalgo como Ingeniero en Informática: capacidades en Cloud, Data y Desarrollo, y certificaciones profesionales."
      />

      <header className="about-head">
        <h1>Benjamín Hidalgo</h1>
        <p className="about-kicker">Perfil profesional</p>
      </header>

      <p className="about-lead">
        Estudio Ingeniería Informática y trabajo en arquitectura de sistemas,
        desarrollo Full-Stack y ciberseguridad. Me interesa lo que se siente
        simple porque está bien construido.
      </p>

      <p className="about-body">
        Mi trabajo combina el rigor del tipado (TypeScript y Go) con despliegues
        ágiles. Construyo sistemas resilientes, mantengo la deuda técnica a raya
        y diseño interfaces que no piden atención innecesaria.
      </p>

      <section className="about-section">
        <div className="about-section-head">
          <h2>Capacidades</h2>
          <span className="about-section-note">Herramientas y especialidades</span>
        </div>

        <div className="about-directory">
          {skillCategories.map((category) => (
            <section className="about-directory-col" key={category.title}>
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill) => {
                  const icon = techIcons[skill];
                  return (
                    <li key={skill}>
                      {icon && (
                        <img
                          src={icon}
                          alt=""
                          aria-hidden="true"
                          className="about-skill-icon"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <span>{skill}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-head">
          <h2>Certificaciones</h2>
          <span className="about-section-note">{certificationsList.length} verificadas</span>
        </div>

        <ul className="about-certs">
          {certificationsList.map((cert) => (
            <li key={cert.code} className="about-cert-row">
              <span className="about-cert-code">{cert.code}</span>
              <span className="about-cert-name">{cert.name}</span>
              <span className="about-cert-issuer">{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="about-status">
        <span className="about-status-dot" />
        Disponible para colaborar
      </p>
    </main>
  );
}

export default About;
