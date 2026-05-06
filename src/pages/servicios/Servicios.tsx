// src/pages/servicios/Servicios.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { getServicios } from '@/model/api/main/apiCursos'; 

export const Servicios = () => {
    const [servicios, setServicios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServicios().then(data => {
            setServicios(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-white p-8">Cargando servicios...</p>;

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-10 border-l-4 border-yellow-400 pl-4">Servicios</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicios.map(s => (
                    /* 2. Envolvemos con Link y añadimos efectos de hover */
                    <Link 
                        to={`/servicios/${s.id}`} 
                        key={s.id} 
                        className="block group no-underline"
                    >
                        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 transition-all duration-300 group-hover:border-yellow-400/50 group-hover:bg-zinc-800/50 h-full">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                {s.titulo}
                            </h3>
                            <p className="text-zinc-400 text-sm">{s.descripcion}</p>
                            <div className="mt-4 text-xs text-yellow-400/70 font-semibold uppercase tracking-wider">
                                Leer más +
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};