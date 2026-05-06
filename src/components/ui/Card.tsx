import * as React from "react"
import { cn } from "../../lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      /* CORRECCIÓN: Usamos borde y fondo específicos para modo oscuro */
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-950 py-6 text-white shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      /* CORRECCIÓN: Simplificamos el grid complejo de v4 que no es necesario aquí */
      className={cn("flex flex-col space-y-1.5 px-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  /* CORRECCIÓN: Usamos una etiqueta h3 real para mejor SEO/Accesibilidad */
  return (
    <h3
      data-slot="card-title"
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  /* CORRECCIÓN: Usamos etiqueta p y un color gris zinc claro */
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-zinc-400", className)}
      {...props}
    />
  )
}

// Nota: He comentado CardAction porque no suele usarse en formularios sencillos y complica el layout
/*
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}
*/

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  // CardAction, // Lo quitamos del export si lo hemos comentado arriba
  CardDescription,
  CardContent,
}