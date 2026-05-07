import { useState } from 'react';
import { supabase } from '@/model/utils/supabase'; 

const AdminCursos = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Sincronizado con tus columnas de Supabase: titulo, categoria, academia, precio, imagen_url, descripcion
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    academia: '',
    precio: 0,
    imagen_url: '',
    descripcion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('Cursos_2026_2027') // Nombre exacto de tu tabla
        .insert([formData]);

      if (error) throw error;

      setMessage('✅ ¡Curso guardado con éxito!');
      setFormData({ titulo: '', categoria: '', academia: '', precio: 0, imagen_url: '', descripcion: '' }); 
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-yellow-500">Añadir Nuevo Curso (2026-2027)</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl bg-[#1e1e1e] p-8 rounded-xl shadow-lg">
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Título del Curso</label>
          <input type="text" required value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <input type="text" value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Academia / Plataforma</label>
          <input type="text" value={formData.academia}
            onChange={(e) => setFormData({...formData, academia: e.target.value})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Precio (€)</label>
          <input type="number" value={formData.precio}
            onChange={(e) => setFormData({...formData, precio: parseInt(e.target.value) || 0})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL de la Imagen</label>
          <input type="text" value={formData.imagen_url}
            onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea required value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg h-32 focus:ring-2 focus:ring-yellow-500 outline-none"
          ></textarea>
        </div>

        <button type="submit" disabled={loading}
          className="md:col-span-2 w-full bg-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          {loading ? 'GUARDANDO...' : 'PUBLICAR CURSO'}
        </button>
      </form>
    </div>
  );
};

export default AdminCursos;