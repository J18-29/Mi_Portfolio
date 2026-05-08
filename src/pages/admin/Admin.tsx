import { useState } from 'react';

export const Admin = () => {
  // Estado para controlar qué formulario mostrar según el menú
  const [seccionActiva, setSeccionActiva] = useState('TRABAJOS');

  return (
    <div className="flex-1 h-full bg-zinc-50 overflow-y-auto p-8">
      {/* Este contenedor ahora está totalmente vacío. 
          Aquí es donde debes renderizar tus componentes de formulario.
      */}
      <div className="max-w-6xl mx-auto">
        
        {/* Renderizado condicional de tus formularios */}
        {seccionActiva === 'TRABAJOS' && (
          <div className="animate-in fade-in duration-500">
            {/* INSERTA AQUÍ EL FORMULARIO DE TRABAJOS DIRECTAMENTE */}
            {/* <FormularioTrabajos /> */}
          </div>
        )}

        {seccionActiva === 'CURSOS' && (
          <div className="animate-in fade-in duration-500">
            {/* INSERTA AQUÍ EL FORMULARIO DE CURSOS DIRECTAMENTE */}
            {/* <FormularioCursos /> */}
          </div>
        )}

        {/* Si no hay nada seleccionado o quieres un estado neutro */}
        {!seccionActiva && (
          <div className="flex items-center justify-center h-64 text-zinc-300">
            Selecciona una opción del menú lateral
          </div>
        )}
        
      </div>
    </div>
  );
};