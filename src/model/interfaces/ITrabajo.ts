export interface ITrabajo {
    id: number;
    titulo: string;
    descripcion: string;
    imagen_url: string; // Asegúrate que termine en _url
    tecnologias: string; // Este es el campo nuevo que vimos en tu captura
    link: string | null;
}