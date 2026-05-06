import { Link } from 'react-router-dom'; // 1. Importamos Link
import { useGetProductos } from '../hooks/useGetProductos';
import type { IProducto } from '../model/interfaces/IProducto';

export const Productos = () => {
    const { productos, loading } = useGetProductos();

    if (loading) {
        return <div className="loading-text">Cargando productos...</div>;
    }

    return (
        <div className="productos-section">
            <h1 className="section-title">Mis Productos</h1>
            
            <div className="productos-grid">
                {productos.map((producto: IProducto) => (
                    /* 2. Envolvemos todo en el Link usando el ID de Supabase */
                    <Link 
                        to={`/productos/${producto.id}`} 
                        key={producto.id} 
                        className="producto-card-link"
                    >
                        <div className="producto-card">
                            <div className="producto-img-wrapper">
                                <img 
                                    src={producto.imagen} 
                                    alt={producto.nombre} 
                                />
                            </div>
                            
                            <div className="producto-info">
                                <h3>{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                
                                <div className="producto-footer">
                                    <span className="producto-precio">
                                        {producto.precio}€
                                    </span>
                                    <button className="btn-comprar">
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};