import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { BackLayout } from '@/layouts/BackLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// IMPORTA TUS PÁGINAS REALES
import { Home } from '@/pages/Home';
import { Trabajos } from '@/pages/Trabajos';
import { TrabajoDetalle } from '@/pages/TrabajoDetalle';
import { Servicios } from '@/pages/servicios/Servicios';
import { ServicioDetalle } from '@/pages/servicios/ServicioDetalle';
import { Productos } from '@/pages/Productos'; 
import { ProductoDetalle } from '@/pages/ProductoDetalle';
import { Cursos } from '@/pages/cursos/Cursos';
import { Contacto } from '@/pages/Contacto';
import { Admin } from '@/pages/admin/Admin';
import { AdminCursos } from '@/pages/admin/AdminCursos';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* GRUPO 1: WEB PÚBLICA */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    /* DENTRO DEL GRUPO 1: WEB PÚBLICA */
                   <Route path="/trabajos" element={<Trabajos />} />
                   <Route path="/trabajos/:id" element={<TrabajoDetalle />} />
                   /* DENTRO DEL GRUPO 1: WEB PÚBLICA */
                   <Route path="/servicios" element={<Servicios />} />
                   <Route path="/servicios/:id" element={<ServicioDetalle />} />
                    <Route path="/productos" element={<Productos />} />
                    
                    {/* RUTA DINÁMICA: No afecta a las demás páginas */}
                    <Route path="/productos/:id" element={<ProductoDetalle />} />
                    
                    <Route path="/cursos" element={<Cursos />} />
                    <Route path="/contacto" element={<Contacto />} />
                </Route>

              {/* GRUPO 2: PANEL ADMIN */}
               <Route path="/admin" element={<BackLayout />}>
                <Route index element={<Admin />} /> 
               <Route path="productos" element={<div>Admin Productos</div>} />
    
              {/* AQUÍ ESTÁ EL CAMBIO CLAVE: */}
             <Route path="cursos" element={<AdminCursos />} /> 
    
             <Route path="servicios" element={<div>Admin Servicios</div>} />
             <Route path="trabajos" element={<div>Admin Trabajos</div>} />
             </Route>

                {/* GRUPO 3: AUTH */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<div>Página de Login</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};