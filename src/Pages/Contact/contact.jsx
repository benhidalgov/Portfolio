import React, { useState } from 'react';

function Contact() {
  // 1. Usar useState para manejar la entrada de datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert(`Gracias ${formData.name}, te responderé pronto.`);
    // 2. Aquí integrarías un servicio como Formspree o un backend
  };

  return (
    <main className="contact-page">
      <h1>Contáctame</h1>
      <p>Estoy disponible para nuevos proyectos y oportunidades.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Tu Nombre" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Tu Correo Electrónico" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="message" 
          placeholder="Tu Mensaje" 
          rows="5" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Enviar Mensaje</button>
      </form>
      
      <p>También puedes contactarme en LinkedIn o GitHub.</p>
    </main>
  );
}

export default Contact;