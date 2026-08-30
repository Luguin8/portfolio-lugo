export interface PS2Faq {
    q: string;
    a: string;
}

export const PS2_FAQS: PS2Faq[] = [
    {
        q: '¿Por qué un portfolio jugable en vez de uno normal?',
        a: 'Quería destacarme mostrando algo más que una lista de proyectos: un menú de PS2 recreado con CSS 3D real demuestra el mismo nivel de atención al detalle que pongo en el código de producción.',
    },
    {
        q: '¿Qué te llevó a ser desarrollador Full Stack?',
        a: 'Empecé armando y reparando PCs, después programando por necesidad para proyectos propios. Terminé enganchado con poder llevar una idea de negocio de punta a punta: frontend, backend y todo lo que hay en el medio.',
    },
    {
        q: '¿Cuál es tu proyecto favorito de los que hiciste?',
        a: 'CAJIX. Es un SaaS multi-tenant real, en producción, con auth, RLS en PostgreSQL y un panel de superadmin. Es el que más me obligó a pensar en arquitectura y no solo en features.',
    },
    {
        q: '¿Estás disponible para trabajo full-time o freelance?',
        a: 'Estoy full-time en Brickcode, pero sigo tomando proyectos freelance en paralelo. Si aparece una oferta full-time que valga la pena, también la evalúo.',
    },
    {
        q: '¿Cómo es tu forma de trabajo y el pricing en un proyecto nuevo?',
        a: 'Depende del alcance: a veces cierro un presupuesto fijo desde la etapa de Descubrimiento, a veces facturo por hora. Lo definimos juntos apenas tengamos claro el proyecto.',
    },
    {
        q: '¿Cómo pasás de una idea a algo funcionando?',
        a: 'Rápido y sin pulir: armo el flujo core con lo mínimo indispensable, lo pruebo funcionando de punta a punta, y recién después invierto tiempo en UI y detalles.',
    },
    {
        q: '¿Cómo manejás el scope creep o los cambios de plazos?',
        a: 'Priorizo el flujo core primero. Si una feature nueva no lo sostiene directamente, se anota para una iteración post-lanzamiento en vez de meterse a mitad de camino.',
    },
    {
        q: '¿Cómo manejás el feedback con el que no estás de acuerdo?',
        a: 'Lo escucho y lo pruebo si hay forma barata de validarlo. Al final decide la experiencia del usuario y el objetivo del negocio, no mi ego.',
    },
];
