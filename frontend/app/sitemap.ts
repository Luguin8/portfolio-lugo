import { MetadataRoute } from 'next';
import { PROJECTS, getProjectSlug } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const projectPages = PROJECTS.map((project) => ({
        url: `https://lugomartin.com/proyectos/${getProjectSlug(project)}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: 'https://lugomartin.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...projectPages,
    ];
}
