import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServicios } from '@/model/api/main/apiCursos';

export const ServicioDetalle = () => {
    const { id } = useParams<{ id: string }>();
    const [servicio, setServicio] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicios().then(data => {
            const encontrado = data.find((s: any) => s.id === Number(id));
            setServicio(encontrado || null);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p className="text-white p-8 text-center">Cargando detalles...</p>;
    if (!servicio) return <p className="text-white p-8 text-center">Servicio no encontrado</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 text-white">
            <Link to="/servicios" className="text-yellow-400 hover:text-yellow-300 transition-colors mb-8 inline-block">
                ← Volver a servicios
            </Link>
            
            <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl">
                {/* Título y Descripción Principal */}
                <h1 className="text-5xl font-bold mb-6">{servicio.titulo}</h1>
                <p className="text-zinc-400 text-xl leading-relaxed mb-10">
                    {servicio.descripcion}
                </p>
                
                {/* Caja de Beneficios Dinámica */}
                <div className="p-8 bg-zinc-950 rounded-2xl border border-yellow-400/10">
                    <h3 className="text-yellow-400 font-bold mb-6 uppercase tracking-widest text-sm">
                        ¿Qué incluye este servicio?
                    </h3>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {servicio.beneficios ? (
                            servicio.beneficios.split(',').map((item: string, index: number) => (
                                <li key={index} className="flex items-center gap-3 text-zinc-300 group">
                                    <span className="text-yellow-400 font-bold group-hover:scale-125 transition-transform">
                                        ✓
                                    </span>
                                    {item.trim()}
                                </li>
                            ))
                        ) : (
                            <li className="text-zinc-500 italic">Personalizando beneficios para ti...</li>
                        )}
                    </ul>
                </div>

                {/* Botón de Acción Final */}
                <div className="mt-12">
                    <Link 
                        to="/contacto" 
                        className="w-full md:w-auto inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 px-10 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:-translate-y-1"
                    >
                        SOLICITAR PRESUPUESTO GRATIS
                    </Link>
                </div>
            </div>
        </div>
    );
};