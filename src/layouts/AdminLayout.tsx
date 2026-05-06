import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', width: '100%' }}>
            {/* BARRA LATERAL FIJA */}
            <aside style={{ 
                width: '250px', 
                backgroundColor: 'white', 
                borderRight: '1px solid #e5e7eb', 
                display: 'flex', 
                flexDirection: 'column',
                color: '#111827'
            }}>
                <div style={{ padding: '24px', fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'black', color: 'white', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>A</div>
                    Acme Inc.
                </div>
                
                <div style={{ flex: 1 }}>
                    {/* Forzamos que el NavBar aquí sea vertical */}
                    <NavBar isVertical={true} />
                </div>

                <div style={{ padding: '20px', borderTop: '1px solid #f3f4f6', fontSize: '0.9rem', color: '#6b7280' }}>
                    <div style={{ marginBottom: '10px' }}>Settings</div>
                    <div>Get Help</div>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL BLANCO */}
            <main style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                    width: '100%', 
                    maxWidth: '1000px', 
                    backgroundColor: 'white', 
                    padding: '30px', 
                    borderRadius: '12px', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    color: '#111827'
                }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};