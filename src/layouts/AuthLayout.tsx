import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};