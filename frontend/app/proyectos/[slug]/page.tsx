import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Download, ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { PROJECTS, getProjectSlug, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: getProjectSlug(project) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    const shortDescription = project.description.split("\n")[0].slice(0, 160);

    return {
        title: `${project.title} | Lugo Martin`,
        description: shortDescription,
        openGraph: {
            title: `${project.title} | Lugo Martin`,
            description: shortDescription,
            type: "article",
        },
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const typeLabel =
        project.project_type === "mobile"
            ? "APLICACIÓN MÓVIL"
            : project.project_type === "desktop"
                ? "APLICACIÓN DE ESCRITORIO"
                : project.project_type === "game"
                    ? "VIDEOJUEGO"
                    : "APLICACIÓN WEB";

    return (
        <main className="min-h-screen" style={{ background: "var(--bb-bg)" }}>
            <Navbar />
            <section className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase mb-10 font-title text-bb-muted hover:text-bb-gold transition-colors duration-200"
                    >
                        <ArrowLeft size={14} /> Volver a Obras
                    </Link>

                    <p className="text-xs tracking-[0.3em] uppercase mb-3 font-title text-bb-gold">
                        ✦ &nbsp; CASO DE ESTUDIO &nbsp; · &nbsp; {typeLabel}
                    </p>
                    <h1 className="text-4xl md:text-5xl mb-4 font-title text-bb-gold bb-glow-text">
                        {project.title}
                    </h1>
                    <div className="bb-separator mb-6" style={{ maxWidth: "360px" }} />

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <span key={tag} className="bb-tag">{tag}</span>
                        ))}
                    </div>

                    <div
                        className="relative w-full aspect-video mb-10 overflow-hidden bb-corner-box"
                        style={{ border: "1px solid var(--bb-border)", background: "#000" }}
                    >
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <p className="text-base leading-[1.9] font-body text-bb-muted whitespace-pre-line mb-12">
                        {project.description}
                    </p>

                    <div className="bb-separator mb-8" />

                    <div className="flex flex-wrap gap-4">
                        {project.demo_link && (
                            <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bb-btn"
                            >
                                <ExternalLink size={14} /> Visitar Web
                            </a>
                        )}
                        {project.download_link && (
                            <a
                                href={project.download_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bb-btn-secondary"
                                download
                            >
                                <Download size={14} /> Descargar
                            </a>
                        )}
                        {project.repo_link && (
                            <a
                                href={project.repo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bb-btn-secondary"
                            >
                                <Github size={14} /> Repositorio
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
