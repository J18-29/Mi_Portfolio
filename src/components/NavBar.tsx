import { Link, useLocation } from 'react-router-dom';
// Importamos los iconos de Lucide
import { 
  LayoutGrid, 
  Briefcase, 
  Wrench, 
  ShoppingBag, 
  GraduationCap, 
  Mail 
} from 'lucide-react';

interface NavBarProps {
  isVertical?: boolean;
}

export const NavBar = ({ isVertical = false }: NavBarProps) => {
    const location = useLocation();
    
    // Lista de enlaces con sus iconos
    const navLinks = [
        { name: 'HOME', path: '/', icon: <LayoutGrid size={18} /> },
        { name: 'TRABAJOS', path: '/trabajos', icon: <Briefcase size={18} /> },
        { name: 'SERVICIOS', path: '/servicios', icon: <Wrench size={18} /> },
        { name: 'PRODUCTOS', path: '/productos', icon: <ShoppingBag size={18} /> },
        { name: 'CURSOS', path: '/cursos', icon: <GraduationCap size={18} /> },
        { name: 'CONTACTO', path: '/contacto', icon: <Mail size={18} /> },
    ];

    // --- DISEÑO PARA LA PÁGINA PRINCIPAL (NO SE TOCA NADA) ---
    if (!isVertical) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {navLinks.map((link, index) => (
                    <div key={link.path} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Link to={link.path} style={{ 
                            color: location.pathname === link.path ? '#3b82f6' : 'white', 
                            textDecoration: 'none', 
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            {link.name}
                        </Link>
                        {index < navLinks.length - 1 && <span style={{ color: 'white', opacity: 0.5 }}>|</span>}
                    </div>
                ))}
            </nav>
        );
    }

    // --- DISEÑO PARA EL ADMIN (CON ICONOS Y ESTILO DASHBOARD) ---
    return (
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
            {navLinks.map((link) => (
                <Link 
                    key={link.path} 
                    to={link.path} 
                    style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 24px', 
                        textDecoration: 'none', 
                        color: location.pathname === link.path ? '#111827' : '#6b7280',
                        backgroundColor: location.pathname === link.path ? '#f3f4f6' : 'transparent',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                        transition: '0.2s'
                    }}
                >
                    {/* El icono solo aparece aquí en el Admin */}
                    <span style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                        {link.icon}
                    </span>
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};