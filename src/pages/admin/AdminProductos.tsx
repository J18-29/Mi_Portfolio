import { useState } from 'react';
import { supabase } from '@/model/utils/supabase'; 

const AdminProductos = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Sincronizado con tus columnas: nombre, precio, imagen, descripcion
  const [formData, setFormData] = useState({ 
    nombre: '', 
    precio: 0, 
    imagen: '', 
    descripcion: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('productos')
        .insert([formData]);

      if (error) throw error;

      setMessage('✅ Producto añadido correctamente');
      setFormData({ nombre: '', precio: 0, imagen: '', descripcion: '' });
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-green-500">Nuevo Producto</h1>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('✅') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-[#1e1e1e] p-6 rounded-lg border border-gray-800">
        <div>
          <label className="block text-sm mb-1">Nombre del Producto</label>
          <input type="text" required value={formData.nombre} 
            onChange={e => setFormData({...formData, nombre: e.target.value})} 
            className="w-full p-3 bg-[#2a2a2a] rounded border border-gray-700 outline-none focus:border-green-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Precio (€)</label>
          <input type="number" required value={formData.precio} 
            onChange={e => setFormData({...formData, precio: parseInt(e.target.value) || 0})} 
            className="w-full p-3 bg-[#2a2a2a] rounded border border-gray-700 outline-none focus:border-green-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">URL de la Imagen</label>
          <input type="text" value={formData.imagen} 
            onChange={e => setFormData({...formData, imagen: e.target.value})} 
            className="w-full p-3 bg-[#2a2a2a] rounded border border-gray-700 outline-none focus:border-green-500" 
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción del Producto</label>
          <textarea required value={formData.descripcion} 
            onChange={e => setFormData({...formData, descripcion: e.target.value})} 
            className="w-full p-3 bg-[#2a2a2a] rounded border border-gray-700 h-32 outline-none focus:border-green-500"
          ></textarea>
        </div>

        <button disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition-colors disabled:opacity-50">
          {loading ? 'Subiendo...' : 'Publicar Producto'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductos;