import { supabase } from '../../utils/supabase';

export const getCursosDB = async () => {
  const { data, error } = await supabase
    .from('Cursos_2026_2027') // El nombre exacto de tu captura
    .select('*');

  if (error) {
    console.error("Error en Supabase:", error.message);
    return [];
  }
  return data;
};