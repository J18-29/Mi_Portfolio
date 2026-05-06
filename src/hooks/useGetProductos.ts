import { useEffect, useState } from 'react';
import { supabase } from '@/model/utils/supabase'; // Usando el mismo alias que trabajos
import type { IProducto } from '@/model/interfaces/IProducto';

export const useGetProductos = () => {
    const [productos, setProductos] = useState<IProducto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase
                .from('productos')
                .select('*');
            
            if (error) {
                console.error("Error al traer productos:", error.message);
            } else {
                setProductos(data || []);
            }
            setLoading(false);
        };
        fetchProductos();
    }, []);

    return { productos, loading };
};