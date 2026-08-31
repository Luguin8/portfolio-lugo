export interface PS2Topic {
    title: string;
    text: string;
}

// Content pulled from the real portfolio sections (Hero, SkillsGrid, Extras, Process)
export const PS2_TOPICS: PS2Topic[] = [
    {
        title: "Sobre Mí",
        text: "Soy Martin Lugo, desarrollador Full Stack. Llevo ideas de negocio a producción de punta a punta: interfaces web y mobile, backends escalables y automatizaciones, trabajando directo con founders y equipos técnicos.",
    },
    {
        title: "Desarrollo Full Stack",
        text: "Vue 3 y Nuxt 3, React y Next.js (App Router), TypeScript, React Native con Expo y Tauri para desktop. En el backend: NestJS, Node.js, GraphQL, Python (FastAPI), Rust, Supabase y Docker.",
    },
    {
        title: "Experiencia",
        text: "Full Stack Developer en Brickcode (Francia, remoto) desde 2026, migrando autenticación a OIDC/PKCE y desarrollando módulos corporativos con Vue 3 y GraphQL. Freelance desde 2020: SaaS, bots de trading y e-commerce para clientes en Argentina y España.",
    },
    {
        title: "Herramientas & Proceso",
        text: "Turborepo, pnpm workspaces, Git/GitHub, Vercel, Google Tag Manager y Analytics 4. Trabajo en iteraciones cortas con entregas visibles cada semana, testing exhaustivo antes de cada deploy y soporte post-lanzamiento.",
    },
    {
        title: "Formación",
        text: "Cursando la Licenciatura en Sistemas de Información (UNNE), con formación complementaria 100% autodidacta. Español nativo e inglés técnico intermedio, con lectura fluida de documentación.",
    },
];
