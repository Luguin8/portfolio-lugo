import ProjectGridClient from "./ProjectGridClient";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsGrid() {
    return <ProjectGridClient initialProjects={PROJECTS} />;
}
