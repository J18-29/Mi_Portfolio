import { useState } from 'react';
import { supabase } from '@/model/utils/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

// Definimos los tipos de contenido que manejas
type TipoContenido = 'trabajos' | 'Cursos_2026_2027' | 'productos';

export const Admin = () => {
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [tablaDestino, setTablaDestino] = useState<TipoContenido>('trabajos');

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCargando(true);
        setMensaje('');
        
        const formData = new FormData(e.currentTarget);
        
        // Creamos el objeto dinámicamente según la tabla
        let datosAEnviar: any = {
            titulo: formData.get('titulo'),
            descripcion: formData.get('descripcion'),
            imagen_url: formData.get('imagen_url'),
        };

        // Si es un TRABAJO, añadimos el link
        if (tablaDestino === 'trabajos') {
            datosAEnviar.link = formData.get('link');
        }

        // Si es un CURSO, añadimos los campos de tu interfaz ICurso
        if (tablaDestino === 'Cursos_2026_2027') {
            datosAEnviar.academia = formData.get('academia');
            datosAEnviar.categoria = formData.get('categoria');
            datosAEnviar.precio = Number(formData.get('precio')) || 0;
        }

        const { error } = await supabase.from(tablaDestino).insert([datosAEnviar]);

        if (error) {
            setMensaje("❌ Error: " + error.message);
        } else {
            setMensaje(`✅ ¡${tablaDestino === 'trabajos' ? 'Trabajo' : 'Curso'} guardado con éxito!`);
            (e.target as HTMLFormElement).reset(); 
        }
        setCargando(false);
    };

    return (
        <div className="min-h-screen bg-black p-6 flex items-center justify-center">
            <Card className="max-w-2xl w-full border-zinc-800 bg-zinc-950 shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white">Panel de Control</CardTitle>
                    <CardDescription>Gestiona el contenido de tu web en tiempo real.</CardDescription>
                    
                    {/* SELECTOR DE TABLA */}
                    <div className="flex justify-center gap-2 mt-4">
                        {(['trabajos', 'Cursos_2026_2027'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTablaDestino(t); setMensaje(''); }}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                    tablaDestino === t 
                                    ? 'bg-yellow-400 text-black' 
                                    : 'bg-zinc-900 text-zinc-500 hover:text-white'
                                }`}
                            >
                                {t === 'trabajos' ? 'TRABAJOS' : 'CURSOS'}
                            </button>
                        ))}
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={manejarEnvio} className="space-y-5">
                        {/* CAMPOS COMUNES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Título</label>
                                <input name="titulo" required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                            </div>
                            <div>
                                <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">URL Imagen</label>
                                <input name="imagen_url" required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Descripción</label>
                            <textarea name="descripcion" rows={3} required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400 resize-none" />
                        </div>

                        {/* CAMPOS ESPECÍFICOS PARA TRABAJOS */}
                        {tablaDestino === 'trabajos' && (
                            <div>
                                <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Link (GitHub/Web)</label>
                                <input name="link" className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                            </div>
                        )}

                        {/* CAMPOS ESPECÍFICOS PARA CURSOS */}
                        {tablaDestino === 'Cursos_2026_2027' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Academia</label>
                                    <input name="academia" required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                                </div>
                                <div>
                                    <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Categoría</label>
                                    <input name="categoria" required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                                </div>
                                <div>
                                    <label className="block text-zinc-500 text-xs mb-2 ml-1 uppercase font-bold">Precio (€)</label>
                                    <input name="precio" type="number" required className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-yellow-400" />
                                </div>
                            </div>
                        )}

                        <button 
                            disabled={cargando}
                            className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 mt-4"
                        >
                            {cargando ? 'PROCESANDO...' : `PUBLICAR EN ${tablaDestino.split('_')[0].toUpperCase()}`}
                        </button>

                        {mensaje && (
                            <p className={`text-center mt-4 font-bold ${mensaje.includes('Error') ? 'text-red-400' : 'text-yellow-400'}`}>
                                {mensaje}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};