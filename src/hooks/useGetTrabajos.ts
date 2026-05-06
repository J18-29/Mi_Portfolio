import { useEffect, useState } from 'react';
import { supabase } from '@/model/utils/supabase';
import type { ITrabajo } from '@/model/interfaces/ITrabajo';

export const useGetTrabajos = () => {
    const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrabajos = async () => {
            const { data, error } = await supabase
                .from('trabajos') // Nombre de tu tabla en la captura
                .select('*');
            
            if (error) {
                console.error("Error cargando trabajos:", error.message);
            } else {
                setTrabajos(data || []);
            }
            setLoading(false);
        };
        fetchTrabajos();
    }, []);

    return { trabajos, loading };
};