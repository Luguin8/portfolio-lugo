// NO PONGAS "use client" AQUÍ
import { getProjects } from "@/lib/actions";
import ProjectGridClient from "./ProjectGridClient"; // Importamos la parte visual

export default async function ProjectsGrid() {
    // Esta llamada ocurre en el Servidor (Backend)
    const projects = await getProjects();

    // Pasamos los datos puros al componente Cliente
    return (
        <ProjectGridClient initialProjects={projects} />
    );
}