import { supabase } from '@/model/utils/supabase';
import type { ICurso } from '@/model/interfaces/ICurso';
import type { IServicio } from '@/model/interfaces/IServicio';
import type { ITrabajo } from '@/model/interfaces/ITrabajo'; // Añadimos esta
import type { IProducto } from '@/model/interfaces/IProducto'; // Añadimos esta

// --- CURSOS ---
export const getCursos = async (): Promise<ICurso[]> => {
    const { data, error } = await supabase.from('Cursos_2026_2027').select('*');
    if (error) return [];
    return data as ICurso[];
};

export const createCurso = async (nuevoCurso: Omit<ICurso, 'curso_id' | 'created_at'>): Promise<boolean> => {
    const { error } = await supabase
        .from('Cursos_2026_2027')
        .insert([nuevoCurso]);
    
    if (error) {
        console.error("Error al crear curso:", error);
        return false;
    }
    return true;
};
// --- SERVICIOS ---
export const getServicios = async (): Promise<IServicio[]> => { 
    const { data, error } = await supabase
        .from('servicios') 
        .select('*');
    
    if (error) {
        console.error("Error cargando servicios:", error);
        return [];
    }
    return data as IServicio[];
};

export const getTrabajos = async (): Promise<ITrabajo[]> => {
    const { data, error } = await supabase
        .from('trabajos') 
        .select('id, titulo, descripcion, imagen_url, link, tecnologias'); // Traemos todo explícitamente
    
    if (error) {
        console.error("Error:", error);
        return [];
    }
    return data as ITrabajo[];
};

// --- PRODUCTOS (Nuevo para tu tienda) ---
export const getProductos = async (): Promise<IProducto[]> => {
    const { data, error } = await supabase
        .from('productos')
        .select('*');
    
    if (error) {
        console.error("Error en productos:", error);
        return [];
    }
    return data as IProducto[];
};