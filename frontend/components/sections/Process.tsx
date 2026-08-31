"use client";

import { motion } from "framer-motion";
import { Search, Hammer, ShieldCheck, LifeBuoy, Compass } from "lucide-react";

const STEPS = [
    {
        icon: <Search size={18} />,
        label: "PASO I",
        title: "Descubrimiento",
        desc: "Relevamos el problema real, no solo el pedido. Definimos alcance, stack y un cronograma claro antes de escribir una línea de código.",
    },
    {
        icon: <Hammer size={18} />,
        label: "PASO II",
        title: "Arquitectura & Desarrollo",
        desc: "Construyo en iteraciones cortas con entregas visibles. Vos ves avances reales cada semana, no una caja negra hasta el final.",
    },
    {
        icon: <ShieldCheck size={18} />,
        label: "PASO III",
        title: "Testing & Entrega",
        desc: "Pruebas exhaustivas sobre los flujos críticos antes de cada deploy. Lo que sale a producción, funciona.",
    },
    {
        icon: <LifeBuoy size={18} />,
        label: "PASO IV",
        title: "Soporte Post-Launch",
        desc: "El trabajo no termina en el deploy. Acompaño la puesta en marcha y quedo disponible para ajustes y nuevas iteraciones.",
    },
];

export default function Process() {
    return (
        <section
            id="process"
            className="py-20 px-6 relative"
            style={{ borderTop: "1px solid var(--bb-border)", borderBottom: "1px solid var(--bb-border)" }}
        >
            <div className="max-w-7xl mx-auto mb-10">
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-title text-bb-gold">
                    <Compass size={12} className="inline mr-2" />
                    RUTA DEL CAZADOR
                </p>
                <h2 className="text-4xl md:text-5xl mb-4 font-title text-bb-gold bb-glow-text">
                    Cómo{" "}
                    <span className="text-bb-white" style={{ textShadow: "none" }}>Trabajo</span>
                </h2>
                <div className="bb-separator max-w-[400px]" />
                <p className="mt-4 text-lg max-w-2xl font-body italic text-bb-muted">
                    Un proceso directo, sin sorpresas: cuatro etapas desde la idea hasta el software en producción.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                {STEPS.map((step, idx) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bb-corner-box bg-bb-panel border border-bb-border p-7 relative"
                    >
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />

                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-bb-gold">{step.icon}</span>
                            <p className="text-[0.58rem] tracking-[0.28em] uppercase font-title text-bb-muted">
                                {step.label}
                            </p>
                        </div>

                        <h3 className="text-lg mb-3 font-title text-bb-gold tracking-[0.04em]">
                            {step.title}
                        </h3>

                        <div className="bb-separator mb-3" />

                        <p className="text-sm leading-relaxed font-body text-bb-muted">
                            {step.desc}
                        </p>

                        {idx < STEPS.length - 1 && (
                            <div
                                className="hidden xl:block absolute top-1/2 -right-3 w-6 h-px"
                                style={{ background: "var(--bb-border)" }}
                                aria-hidden="true"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
