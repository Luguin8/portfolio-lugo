import ProjectGridClient from "./ProjectGridClient";
import { PORTFOLIO_PROJECTS } from "@/lib/projects";

export default function ProjectsGrid() {
    return <ProjectGridClient initialProjects={PORTFOLIO_PROJECTS} />;
}
