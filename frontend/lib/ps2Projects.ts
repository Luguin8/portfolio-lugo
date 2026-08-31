import { PROJECTS } from './projects';
import { slugify } from './slugify';

export interface PS2ProjectCard {
    id: number;
    title: string;
    tagline: string;
    type: string;
    stack: string;
    desc: string;
    image: string;
    link?: string;
}

const TYPE_LABEL: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    desktop: 'Desktop',
    game: 'Juego',
};

function firstSentence(text: string): string {
    const firstLine = text.split('\n')[0].trim();
    const cut = firstLine.split(/(?<=\.)\s/)[0];
    return cut.length > 140 ? cut.slice(0, 137) + '...' : cut;
}

export const PS2_PROJECTS: PS2ProjectCard[] = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    tagline: firstSentence(p.description),
    type: TYPE_LABEL[p.project_type] || p.project_type,
    stack: p.tags.slice(0, 3).join(' · '),
    desc: p.description,
    image: `/projects/${slugify(p.title)}/ps2-icon.svg`,
    link: p.demo_link || p.repo_link || p.download_link,
}));
