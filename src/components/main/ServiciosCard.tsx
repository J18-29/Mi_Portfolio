import { NavLink } from "react-router-dom";
import ServicioCard from "./ServicioCard";
import type { IServicio } from "@/model/interfaces/IServicio"; 

interface Props {
    servicios: IServicio[];
}

export const ServiciosCard = ({ servicios }: Props) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio) => (
                <NavLink 
                    key={servicio.id} 
                    to={`/servicios/${servicio.id}`} 
                    className="block hover:opacity-90 transition-opacity"
                >
                    <ServicioCard servicio={servicio} />
                </NavLink>
            ))}
        </div>
    );
};
export default ServiciosCard