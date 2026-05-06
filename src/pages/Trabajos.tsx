// src/pages/trabajos/Trabajos.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { getTrabajos } from '@/model/api/main/apiCursos';
import type { ITrabajo } from '@/model/interfaces/ITrabajo';

export const Trabajos = () => {
    const [proyectos, setProyectos] = useState<ITrabajo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrabajos().then(data => {
            setProyectos(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="loading-text">Cargando proyectos...</div>;

    return (
        <div className="trabajos-section">
            {/* Título actualizado como pediste */}
            <h1 className="section-title">Mis Trabajos</h1>
            
            <div className="trabajos-grid">
                {proyectos.map((p) => (
                    /* 2. Envolvemos la tarjeta con el Link dinámico */
                    <Link 
                        to={`/trabajos/${p.id}`} 
                        key={p.id} 
                        className="producto-card-link"
                    >
                        <div className="proyecto-card">
                            <div className="proyecto-img-wrapper">
                                {p.imagen_url ? (
                                    <img src={p.imagen_url} alt={p.titulo} />
                                ) : (
                                    <div className="no-img">🚀</div>
                                )}
                            </div>
                            <div className="proyecto-info">
                                <h3>{p.titulo}</h3>
                                <p>{p.descripcion}</p>
                                <div className="proyecto-tags">
                                    {p.tecnologias?.split(',').map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};