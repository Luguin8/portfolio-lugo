import { getProjects } from "@/lib/actions"; // Importamos la acción de lectura
import ProjectGridClient from "./ProjectGridClient"; // Separamos la lógica del cliente

// Este componente ahora es SERVER COMPONENT (Async)
export default async function ProjectsGrid() {
    const projects = await getProjects(); // Fetch desde Supabase

    return (
        // Pasamos los datos al componente cliente que tiene la animación y el modal
        <ProjectGridClient initialProjects={projects} />
    );
}