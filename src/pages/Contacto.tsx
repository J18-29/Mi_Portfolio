export const Contacto = () => {
  return (
    <div className="contacto-container">
      {/* Columna Izquierda: Información */}
      <div className="contacto-info">
        <h2>Contacto</h2>
        <p>¿Tienes un proyecto en mente? ¡Hablemos! Estoy disponible para nuevas oportunidades y colaboraciones.</p>
        
        <div className="info-item">
          <span>📍</span> Huércal-Overa, Almería
        </div>
        <div className="info-item">
          <span>✉️</span> tu-email@ejemplo.com
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <form className="contacto-form">
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" className="form-input" placeholder="Ej: José Miguel" />
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" className="form-input" placeholder="tu@email.com" />
        </div>

        <div className="form-group">
          <label>Mensaje</label>
          <textarea className="form-textarea" placeholder="Cuéntame sobre tu idea..."></textarea>
        </div>

        <button type="submit" className="btn-enviar">
          ENVIAR MENSAJE
        </button>
      </form>
    </div>
  );
};