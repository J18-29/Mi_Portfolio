import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from '@/model/api/supabaseClient';
import type{ ICurso } from '@/model/interfaces/ICurso';

// Iconos profesionales
import { Trash2, Edit, PlusCircle, LayoutDashboard, Globe, Save, X } from "lucide-react";

/**
 * 1. ESQUEMA DE VALIDACIÓN
 * Usamos z.coerce.number() para transformar el string del input en number automáticamente.
 * Esto elimina el error: "Type 'unknown' is not assignable to type 'number'".
 */
const cursoSchema = z.object({
    titulo: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    academia: z.string().min(2, "La academia es obligatoria"),
    categoria: z.string().min(2, "La categoría es obligatoria"),
    precio: z.coerce.number().min(0, "El precio no puede ser negativo"), 
    imagen_url: z.string().url("Debe ser una URL válida (http/https)"),
});

// Extraemos el tipo inferido para usarlo en el Hook y en el Handler
type CursoFormValues = z.input<typeof cursoSchema>;

export const AdminCursos = () => {
    const [loading, setLoading] = useState(false);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    /**
     * 2. CONFIGURACIÓN DE REACT HOOK FORM
     * Pasamos <CursoFormValues> para que register() y formState sepan exactamente qué esperar.
     */
    const { 
        register, 
        handleSubmit, 
        reset, 
        setValue, 
        formState: { errors } 
    } = useForm<CursoFormValues>({
        resolver: zodResolver(cursoSchema),
        defaultValues: {
            titulo: '',
            academia: '',
            categoria: '',
            precio: 0,
            imagen_url: ''
        }
    });

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        const { data } = await supabase
            .from('Cursos_2026_2027')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setCursos(data);
    };

    /**
     * 3. HANDLER DE ENVÍO
     * Al usar el tipo SubmitHandler<CursoFormValues>, eliminamos el error:
     * "Argument of type... is not assignable to parameter of type 'SubmitHandler<TFieldValues>'".
     */
    const onSubmit: SubmitHandler<CursoFormValues> = async (values) => {
        setLoading(true);
        try {
            if (editingId) {
                // Actualización de registro existente
                const { error } = await supabase
                    .from('Cursos_2026_2027')
                    .update(values)
                    .eq('curso_id', editingId);
                if (error) throw error;
            } else {
                // Inserción de nuevo registro
                const { error } = await supabase
                    .from('Cursos_2026_2027')
                    .insert([{ ...values, created_at: new Date().toISOString() }]);
                if (error) throw error;
            }
            cancelarEdicion();
            fetchCursos();
        } catch (error) {
            console.error("Error en la operación de Supabase:", error);
            alert("Hubo un error al guardar los datos.");
        } finally {
            setLoading(false);
        }
    };

    const prepararEdicion = (curso: ICurso) => {
        setEditingId(curso.curso_id);
        setValue("titulo", curso.titulo);
        setValue("academia", curso.academia);
        setValue("categoria", curso.categoria);
        setValue("precio", curso.precio);
        setValue("imagen_url", curso.imagen_url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditingId(null);
        reset();
    };

    const eliminarCurso = async (id: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este curso de la base de datos?")) {
            const { error } = await supabase
                .from('Cursos_2026_2027')
                .delete()
                .eq('curso_id', id);
            
            if (!error) fetchCursos();
            else alert("Error al eliminar.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-slate-900">
            {/* Cabecera Estilo Dashboard */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-lg text-white">
                        <LayoutDashboard size={20} />
                    </div>
                    <div>
                        <h1 className="font-black text-sm uppercase tracking-tighter italic">Admin_Panel_v2.6</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Database Management</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        SUPABASE ACTIVE
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl w-full mx-auto py-10 px-6 space-y-8">
                
                {/* SECCIÓN FORMULARIO */}
                <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden transition-all">
                    <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-800">
                            {editingId ? 'Actualizar Información' : 'Registrar Nuevo Curso'}
                        </h2>
                        {editingId && (
                            <button onClick={cancelarEdicion} className="text-slate-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Título del Curso</label>
                                <input {...register("titulo")} className={`w-full p-4 bg-white border ${errors.titulo ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-300`} placeholder="Ej: React 19 Mastery" />
                                {errors.titulo && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.titulo.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Academia / Plataforma</label>
                                <input {...register("academia")} className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none transition-all" placeholder="Ej: Udemy" />
                                {errors.academia && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.academia.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Categoría</label>
                                <input {...register("categoria")} className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none transition-all" placeholder="Ej: Frontend" />
                                {errors.categoria && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.categoria.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">Inversión (€)</label>
                                <input type="number" step="0.01" {...register("precio")} className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none transition-all" />
                                {errors.precio && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.precio.message}</p>}
                            </div>
                            <div className="flex items-end">
                                <button type="submit" disabled={loading} className="w-full p-4 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs shadow-lg shadow-slate-200">
                                    {loading ? 'Procesando...' : editingId ? <><Save size={18}/> Actualizar</> : <><PlusCircle size={18}/> Registrar</>}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">URL de la Imagen (Preview)</label>
                            <input {...register("imagen_url")} className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-100 outline-none transition-all" placeholder="https://images.unsplash.com/..." />
                            {errors.imagen_url && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.imagen_url.message}</p>}
                        </div>
                    </form>
                </section>

                {/* SECCIÓN TABLA DE DATOS */}
                <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-2">
                            <Globe size={18} className="text-slate-400" />
                            <h3 className="text-sm font-black uppercase italic tracking-tighter text-slate-700">Cursos Publicados</h3>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-black uppercase">
                            {cursos.length} Registros totales
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-50">
                                    <th className="pb-4 pl-4">Título del Curso</th>
                                    <th className="pb-4">Academia</th>
                                    <th className="pb-4 text-center">Categoría</th>
                                    <th className="pb-4 text-right">Precio</th>
                                    <th className="pb-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {cursos.map((curso) => (
                                    <tr key={curso.curso_id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-5 pl-4">
                                            <div className="font-bold text-slate-800 text-sm group-hover:text-black transition-colors">{curso.titulo}</div>
                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {curso.curso_id}</div>
                                        </td>
                                        <td className="py-5 text-slate-500 font-medium text-xs uppercase">{curso.academia}</td>
                                        <td className="py-5 text-center">
                                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                                                {curso.categoria}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right font-mono font-bold text-emerald-600 text-sm">{curso.precio.toFixed(2)}€</td>
                                        <td className="py-5">
                                            <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => prepararEdicion(curso)} className="p-2.5 text-slate-400 hover:text-black hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => eliminarCurso(curso.curso_id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {cursos.length === 0 && (
                            <div className="py-20 text-center text-slate-300 font-bold uppercase text-xs tracking-widest">
                                No hay cursos registrados en Supabase
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};