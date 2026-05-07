import { useState, useEffect } from 'react';
import { supabase } from '@/model/utils/supabase';

const AdminServicios = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [servicios, setServicios] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    beneficios: ''
  });

  // 1. CARGAR SERVICIOS AL INICIAR
  const fetchServicios = async () => {
    const { data, error } = await supabase
      .from('servicios')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setServicios(data || []);
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  // 2. INSERTAR O ACTUALIZAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (editId) {
        // ACTUALIZAR
        const { error } = await supabase
          .from('servicios')
          .update(formData)
          .eq('id', editId);
        if (error) throw error;
        setMessage('✅ Servicio actualizado con éxito');
      } else {
        // INSERTAR
        const { error } = await supabase
          .from('servicios')
          .insert([formData]);
        if (error) throw error;
        setMessage('✅ Servicio guardado con éxito');
      }

      setFormData({ titulo: '', descripcion: '', beneficios: '' });
      setEditId(null);
      fetchServicios();
    } catch (error: any) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. ELIMINAR
  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este servicio?')) return;
    
    const { error } = await supabase.from('servicios').delete().eq('id', id);
    if (!error) {
      setMessage('🗑️ Servicio eliminado');
      fetchServicios();
    } else {
      setMessage('❌ Error al eliminar: ' + error.message);
    }
  };

  // 4. PREPARAR EDICIÓN
  const startEdit = (serv: any) => {
    setEditId(serv.id);
    setFormData({
      titulo: serv.titulo,
      descripcion: serv.descripcion,
      beneficios: serv.beneficios
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Panel de Servicios</h1>

        {message && (
          <div className="p-4 mb-6 rounded-lg bg-blue-900/20 border border-blue-800 text-blue-200">
            {message}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="mb-12 space-y-6 bg-[#1e1e1e] p-8 rounded-xl border border-gray-800 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-300">
            {editId ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <input 
              type="text" required placeholder="Título del servicio"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea 
              required placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg h-24 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <textarea 
              required placeholder="Beneficios (separados por comas)"
              value={formData.beneficios}
              onChange={(e) => setFormData({...formData, beneficios: e.target.value})}
              className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-lg h-24 outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-500 p-4 rounded-lg font-bold transition-all">
              {loading ? 'PROCESANDO...' : editId ? 'ACTUALIZAR CAMBIOS' : 'PUBLICAR SERVICIO'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setFormData({titulo:'', descripcion:'', beneficios:''}); }} className="bg-gray-700 hover:bg-gray-600 px-6 rounded-lg">
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* LISTA DE SERVICIOS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-400 mb-4">Servicios Publicados ({servicios.length})</h2>
          {servicios.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-5 bg-[#1e1e1e] border border-gray-800 rounded-xl hover:border-gray-600 transition-all">
              <div>
                <h3 className="font-bold text-lg">{s.titulo}</h3>
                <p className="text-gray-500 text-sm truncate max-w-md">{s.descripcion}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(s)} className="text-blue-400 hover:text-blue-300 font-medium p-2">Editar</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-400 font-medium p-2">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServicios;