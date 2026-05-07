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

// ADMIN PAGES (Aquí usamos tus archivos nuevos)
import { Admin } from '@/pages/admin/Admin';
import AdminCursos from '@/pages/admin/AdminCursos';
import AdminTrabajos from '@/pages/admin/AdminTrabajos';
import AdminServicios from '@/pages/admin/AdminServicios';
import AdminProductos from '@/pages/admin/AdminProductos';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* GRUPO 1: WEB PÚBLICA */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                   <Route path="/trabajos" element={<Trabajos />} />
                   <Route path="/trabajos/:id" element={<TrabajoDetalle />} />
                   <Route path="/servicios" element={<Servicios />} />
                   <Route path="/servicios/:id" element={<ServicioDetalle />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/productos/:id" element={<ProductoDetalle />} />
                    <Route path="/cursos" element={<Cursos />} />
                    <Route path="/contacto" element={<Contacto />} />
                </Route>

              {/* GRUPO 2: PANEL ADMIN (Dentro de /admin/...) */}
               <Route path="/admin" element={<BackLayout />}>
                    <Route index element={<Admin />} /> 
                    <Route path="productos" element={<AdminProductos />} />
                    <Route path="cursos" element={<AdminCursos />} /> 
                    <Route path="servicios" element={<AdminServicios />} />
                    <Route path="trabajos" element={<AdminTrabajos />} />
               </Route>

                {/* GRUPO 3: AUTH */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<div>Página de Login</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};