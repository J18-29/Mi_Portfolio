import { useEffect, useState } from 'react';
import { getCursos } from '@/model/api/main/apiCursos';
import type { ICurso } from '@/model/interfaces/ICurso';

export const useGetCursos = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCursos().then(data => {
            setCursos(data);
            setLoading(false);
        });
    }, []);

    return { cursos, loading };
};