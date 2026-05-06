import { useParams, Link } from 'react-router-dom';
import { useGetProductos } from '../hooks/useGetProductos'; // Importamos tu hook de Supabase

export const ProductoDetalle = () => {
    const { id } = useParams(); 
    const { productos, loading } = useGetProductos();

    // Buscamos el producto que coincida con el ID de la URL
    const producto = productos.find(p => p.id === Number(id));

    if (loading) return <div className="loading-text">Cargando detalles...</div>;
    
    // Si no encuentra el producto (por si alguien escribe un ID que no existe)
    if (!producto) return <div className="loading-text">Producto no encontrado</div>;

    return (
        <div className="productos-section">
            <Link to="/productos" className="nav-link" style={{ marginBottom: '30px', display: 'inline-block', textTransform: 'none' }}>
                ← Volver a la lista
            </Link>

            <div className="producto-card" style={{ maxWidth: '1000px', margin: '0 auto', overflow: 'hidden' }}>
                
                {/* Imagen Real de Supabase */}
                <div className="producto-img-wrapper" style={{ height: '400px', backgroundColor: '#020617' }}>
                    <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.6' }}
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                         <h2 style={{ fontSize: '4rem', color: 'white', textTransform: 'uppercase', margin: 0, textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                            {producto.nombre}
                         </h2>
                    </div>
                </div>

                <div className="producto-info" style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                                Especialización en <span className="home-name-highlight">{producto.nombre}</span>
                            </h3>
                            <span className="tech-tag">CURSO PROFESIONAL</span>
                        </div>
                        <div className="producto-precio" style={{ fontSize: '3rem', color: '#facc15' }}>
                            {producto.precio}€
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
                        {/* Descripción Real de Supabase */}
                        <p className="home-description" style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
                            {producto.descripcion}
                        </p>
                        
                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ color: 'white', marginBottom: '15px' }}>¿Qué incluye este producto?</h4>
                            <ul style={{ color: '#94a3b8', marginLeft: '20px', listStyleType: 'disc', lineHeight: '2' }}>
                                <li>Acceso inmediato tras el pago.</li>
                                <li>Código fuente del proyecto {producto.nombre} incluido.</li>
                                <li>Soporte directo para dudas.</li>
                                <li>Certificado de finalización.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="producto-footer" style={{ marginTop: '40px' }}>
                        <button className="btn-comprar" style={{ width: '100%', padding: '20px', fontSize: '1.2rem' }}>
                            COMPRAR {producto.nombre.toUpperCase()} POR {producto.precio}€
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};