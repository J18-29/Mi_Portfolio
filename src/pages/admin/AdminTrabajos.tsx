import { useState } from 'react';
import { supabase } from '@/model/utils/supabase';

const AdminTrabajos = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Sincronizado con tus columnas: titulo, descripcion, imagen_url, link, tecnologias
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: '',
    link: '',
    tecnologias: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('trabajos')
        .insert([formData]);

      if (error) throw error;

      setMessage('✅ ¡Trabajo guardado con éxito!');
      // Limpiar formulario
      setFormData({ titulo: '', descripcion: '', imagen_url: '', link: '', tecnologias: '' }); 
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-yellow-500">Gestionar Trabajos</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm mb-1">Título del Proyecto</label>
          <input 
            type="text" 
            required
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded outline-none focus:border-yellow-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">URL de la Imagen</label>
          <input 
            type="text" 
            value={formData.imagen_url}
            onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded outline-none focus:border-yellow-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tecnologías (ej: React, Tailwind)</label>
          <input 
            type="text" 
            value={formData.tecnologias}
            onChange={(e) => setFormData({...formData, tecnologias: e.target.value})}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded outline-none focus:border-yellow-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Link (GitHub/Web)</label>
          <input 
            type="text" 
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded outline-none focus:border-yellow-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción del trabajo</label>
          <textarea 
            required
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-700 rounded h-32 outline-none focus:border-yellow-500"
          ></textarea>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          {loading ? 'GUARDANDO...' : 'GUARDAR TRABAJO'}
        </button>
      </form>
    </div>
  );
};

export default AdminTrabajos;