import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        /* Usamos la clase que definiste: home-page-wrapper */
        <div className="home-page-wrapper">
            
            {/* El círculo con tus iniciales JM */}
            <div className="home-logo-circle">
                <span className="home-logo-initials">JM</span>
                <div className="home-logo-line"></div>
            </div>

            {/* Títulos con tus clases */}
            <h1 className="home-main-title">
                Hola, soy <span className="home-name-highlight">José Miguel</span>
            </h1>

            <p className="home-description">
                Estudiante de Desarrollo Web apasionado por crear aplicaciones 
                modernas utilizando el patrón MVC, React y Supabase.
            </p>
            
            {/* Grupo de botones con tus clases */}
            <div className="home-button-group">
                <Link to="/trabajos" className="home-btn home-btn-blue">
                    Ver mis proyectos
                </Link>
                <Link to="/contacto" className="home-btn home-btn-outline">
                    Contactar
                </Link>
            </div>

            {/* Opcional: Tus tags amarillos de la sección trabajos quedan genial aquí */}
            <div className="proyecto-tags" style={{ marginTop: '40px', justifyContent: 'center' }}>
                <span className="tech-tag">#React</span>
                <span className="tech-tag">#TypeScript</span>
                <span className="tech-tag">#Supabase</span>
                <span className="tech-tag">#Tailwind</span>
            </div>
        </div>
    );
};