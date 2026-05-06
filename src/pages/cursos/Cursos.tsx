import { useEffect, useState } from 'react';
import { getCursos } from '@/model/api/main/apiCursos';
import type { ICurso } from '@/model/interfaces/ICurso';

export const Cursos = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const data = await getCursos();
                setCursos(data || []);
            } catch (error) {
                console.error("Error al cargar cursos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="animate-pulse text-yellow-400 font-bold tracking-widest uppercase text-sm">
                        Cargando Formación...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] p-6 md:p-12 text-white">
            {/* Cabecera Principal */}
            <header className="max-w-6xl mx-auto mb-20 text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent italic uppercase tracking-tighter">
                    Formación <span className="text-white">&</span> Certificaciones
                </h1>
                <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Trayectoria de aprendizaje técnico y especializaciones en desarrollo de software.
                </p>
            </header>

            {/* Cuadrícula de Cursos (Grid) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {cursos.map((curso) => (
                    <div 
                        key={curso.curso_id} 
                        className="group bg-zinc-900/40 rounded-3xl border border-zinc-800/50 overflow-hidden hover:border-yellow-400/40 transition-all duration-500 flex flex-col shadow-2xl hover:-translate-y-2"
                    >
                        {/* Contenedor de Imagen */}
                        <div className="h-56 w-full overflow-hidden relative bg-zinc-800">
                            {curso.imagen_url ? (
                                <img 
                                    src={curso.imagen_url} 
                                    alt={curso.titulo} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest text-[10px]">
                                    No Preview Available
                                </div>
                            )}
                            
                            {/* Badge de Categoría */}
                            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                                {curso.categoria || 'Especialidad'}
                            </div>
                        </div>

                        {/* Contenido de la Tarjeta */}
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em]">
                                    {curso.academia}
                                </span>
                                <span className="text-zinc-700 text-[10px] font-mono font-bold bg-zinc-800/50 px-2 py-0.5 rounded">
                                    ID-{curso.curso_id}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 group-hover:text-yellow-400 transition-colors leading-tight min-h-[3.5rem]">
                                {curso.titulo}
                            </h2>

                            {/* Footer de la Tarjeta */}
                            <div className="mt-auto pt-6 border-t border-zinc-800/50 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1">Inversión</span>
                                    <span className="text-3xl font-black text-white tracking-tighter">
                                        {curso.precio > 0 ? `${curso.precio}€` : 'FREE'}
                                    </span>
                                </div>
                                <div className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje si la base de datos está vacía */}
            {cursos.length === 0 && (
                <div className="text-center py-32">
                    <div className="inline-block p-6 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6">
                        <svg className="w-12 h-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <p className="text-zinc-600 font-medium italic">No se han encontrado registros en la base de datos de 2026.</p>
                </div>
            )}
        </div>
    );
};