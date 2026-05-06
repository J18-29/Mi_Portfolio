import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export const MainLayout = () => {
    return (
        <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white' }}>
            <header style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {/* NavBar en modo horizontal (por defecto) */}
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>
                © 2026 Portfolio Pages. All rights reserved.
            </footer>
        </div>
    );
};