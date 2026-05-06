import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrabajos } from '@/model/api/main/apiCursos';
import type { ITrabajo } from '@/model/interfaces/ITrabajo';

export const TrabajoDetalle = () => {
    // 1. Obtenemos el ID de la URL
    const { id } = useParams<{ id: string }>();
    
    // 2. Estados para el proyecto, carga y posibles errores
    const [proyecto, setProyecto] = useState<ITrabajo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 3. Llamada a la API de Supabase
        getTrabajos()
            .then(data => {
                // Buscamos el proyecto que coincida con el ID (convertido a número)
                const encontrado = data.find(p => p.id === Number(id));
                setProyecto(encontrado || null);
            })
            .catch(err => {
                console.error("Error al obtener el detalle:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // 4. Manejo de estados de carga y no encontrado
    if (loading) return <div className="loading-text">Cargando detalles del proyecto...</div>;
    
    if (!proyecto) {
        return (
            <div className="loading-text">
                <p>El proyecto no existe.</p>
                <Link to="/trabajos" className="nav-link">Volver a Trabajos</Link>
            </div>
        );
    }

    return (
        <div className="trabajos-section">
            {/* Botón de retorno */}
            <Link to="/trabajos" className="nav-link" style={{ marginBottom: '30px', display: 'inline-block' }}>
                ← Volver a Mis Trabajos
            </Link>

            <div className="proyecto-card" style={{ maxWidth: '1000px', margin: '0 auto', cursor: 'default' }}>
                {/* Cabecera con Imagen */}
                <div className="proyecto-img-wrapper" style={{ height: '400px', backgroundColor: '#020617' }}>
                    {proyecto.imagen_url ? (
                        <img 
                            src={proyecto.imagen_url} 
                            alt={proyecto.titulo} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <div className="no-img" style={{ fontSize: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>🚀</div>
                    )}
                </div>

                {/* Contenido del Trabajo */}
                <div className="proyecto-info" style={{ padding: '40px' }}>
                    <h1 className="home-main-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>
                        {proyecto.titulo}
                    </h1>
                    
                    <div className="proyecto-tags" style={{ marginBottom: '30px' }}>
                        {proyecto.tecnologias?.split(',').map((tech, i) => (
                            <span key={i} className="tech-tag" style={{ padding: '8px 15px', fontSize: '14px' }}>
                                {tech.trim()}
                            </span>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
                        <h3 style={{ color: 'white', marginBottom: '15px' }}>Sobre este proyecto</h3>
                        <p className="home-description" style={{ maxWidth: '100%', color: '#94a3b8', lineHeight: '1.8' }}>
                            {proyecto.descripcion}
                        </p>
                    </div>

                    {/* Footer con botones de acción (puedes añadir campos url_demo en Supabase) */}
                    <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                        <button className="home-btn home-btn-blue" style={{ flex: 1 }}>
                            VISITAR SITIO WEB
                        </button>
                        <button className="home-btn home-btn-outline" style={{ flex: 1 }}>
                            VER EN GITHUB
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};