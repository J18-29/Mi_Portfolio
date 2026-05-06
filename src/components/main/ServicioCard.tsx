import type { IServicio } from "@/model/interfaces/IServicio"

interface Props {
    servicio: IServicio;
}

export const ServicioCard = ({ servicio }: Props) => {
    return (
        <article className="flex max-w-xl flex-col items-start justify-between rounded-md border-2 border-gray-700 p-3 hover:bg-gray-800 transition-colors overflow-hidden">
            <div className="flex items-center gap-x-4 text-xs">
                <span className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300">
                    {servicio.categoria}
                </span>
            </div>
            <div className="group relative grow">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-300">
                    {servicio.titulo}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                    {servicio.descripcion}
                </p>
            </div>
            {servicio.imagen && (
                <div className="w-full mt-4 rounded-lg overflow-hidden">
                    <img
                        src={servicio.imagen}
                        alt={servicio.titulo}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
                {servicio.tecnologias.map((tech, index) => (
                    <span key={index} className="text-xs text-blue-400">
                        #{tech}
                    </span>
                ))}
            </div>
        </article>
    )
}

export default ServicioCard