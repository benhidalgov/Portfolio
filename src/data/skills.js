// src/data/skills.js

// Usado en el Componente de la Página de Inicio (Home)
export const homeSkills = [
  { 
    title: 'Desarrollo Frontend', 
    skills: ['React JS', 'Angular', 'HTML5 & CSS3', 'Diseño Responsivo', 'Tailwind CSS', 'Bootstrap'] 
  },
  { 
    title: 'Backend & Bases de Datos', 
    skills: ['Node.js (Express)', 'Python (Flask/Django,Pandas,NumPy)', 'PostgreSQL', 'MongoDB', 'SQL/ T-SQL', 'Bash/ Shell scripting'] 
  },
  { 
    title: 'Metodologías y Herramientas', 
    skills: ['Git & GitHub', 'Metodología SCRUM/Agile', 'Vite/Webpack', 'REST APIs', 'Docker', 'Kubernetes'] 
  },
  { 
    title: 'Certificaciones', 
    skills: ['Google Cybersecurity Professional Certificate', 'Azure Fundamentals', 'Red Hat Certified System Administrator', 'Cisco CCNA', 'Cisco Certified Support Technician (CCST)', 'AWS Certified Cloud Practitioner', 'Big Data Professional Certification (BDPC™)', 'Data Storytelling Professional Certification (DSTPC™)'] 
  },
];

// Lista oficial y detallada de certificaciones profesionales
export const certificationsList = [
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    code: 'SEC_01'
  },
  {
    name: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    code: 'SYS_02'
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    code: 'CLD_03'
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    code: 'CLD_04'
  },
  {
    name: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco',
    code: 'NET_05'
  },
  {
    name: 'Cisco Certified Support Technician (CCST)',
    issuer: 'Cisco',
    code: 'NET_06'
  },
  {
    name: 'Big Data Professional Certification (BDPC™)',
    issuer: 'CertiProf',
    code: 'DAT_07'
  },
  {
    name: 'Data Storytelling Professional Certification (DSTPC™)',
    issuer: 'CertiProf',
    code: 'DAT_08'
  }
];

// Usado en la página "Sobre Mí" (About)
export const aboutSkills = [
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
