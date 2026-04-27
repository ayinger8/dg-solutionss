"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/526692291474";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const WAVE_CSS = `
@keyframes waveA{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(-5%) scaleY(1.07)}}
@keyframes waveB{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(5%) scaleY(0.94)}}
@keyframes waveC{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(-3%) scaleY(1.03)}}
.dw{position:absolute;width:210%;left:-55%;border-radius:50%;pointer-events:none}
.dw1{height:68%;bottom:-34%;background:rgba(167,139,250,0.42);animation:waveA 8s ease-in-out infinite}
.dw2{height:64%;bottom:-38%;background:rgba(147,197,253,0.32);animation:waveB 11s ease-in-out infinite}
.dw3{height:58%;bottom:-42%;background:rgba(196,181,253,0.22);animation:waveC 14s ease-in-out infinite}
.dw4{height:52%;top:-28%;background:rgba(186,230,253,0.18);animation:waveB 9s ease-in-out infinite}
.dw5{height:46%;top:-32%;background:rgba(167,139,250,0.13);animation:waveA 12s ease-in-out infinite}
`;

function Icon({ name, size = 22, className = "" }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": "true" };
  const icons = {
    arrow:      <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    arrowUp:    <svg {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>,
    check:      <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>,
    globe:      <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>,
    layers:     <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users:      <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    zap:        <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    cpu:        <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    trending:   <svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock:      <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    edit:       <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    layout:     <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    package:    <svg {...p}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    star:       <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    whatsapp:   <svg {...p} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    menu:       <svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
    x:          <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    refresh:    <svg {...p}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
  };
  return icons[name] || null;
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 cursor-pointer" aria-label="DG Solutions">
      <div className="leading-none">
        <p className="text-[20px] font-black tracking-[-0.08em] text-[#5F24D6] md:text-[24px]">DG SOLUTIONS</p>
        <p className="mt-[3px] text-[7.5px] font-bold tracking-[0.12em] uppercase text-[#7C3AED]/60 md:text-[8.5px]">Hazlo Simple. Hazlo Inteligente.</p>
      </div>
      <div className="relative h-12 w-12 md:h-16 md:w-16 shrink-0">
        <div className="absolute inset-2 rotate-45 rounded-md border-[8px] border-[#6B21A8] border-l-transparent" />
        <div className="absolute left-[18px] top-[18px] h-6 w-6 rotate-45 rounded-sm border-[6px] border-[#8B5CF6] border-r-transparent md:left-[22px] md:top-[22px]" />
      </div>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/#soluciones", label: "Soluciones" },
    { href: "/precios", label: "Precios" },
    { href: "/#contact", label: "Contacto" },
  ];
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/97 shadow-[0_1px_20px_rgba(0,0,0,.07)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#374151] transition-colors hover:text-[#6B21A8] cursor-pointer">{label}</a>
          ))}
        </nav>
        <div className="hidden md:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#6B21A8] px-7 py-3.5 text-[14px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)] cursor-pointer">
            <Icon name="whatsapp" size={16} /> WhatsApp
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-[#6B21A8] text-white md:hidden cursor-pointer" aria-label="Menú">
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-[#F0EAFB] bg-white md:hidden">
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[14px] font-bold text-[#111318] hover:bg-[#F5F0FF] hover:text-[#6B21A8] cursor-pointer">{label}</a>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-[#6B21A8] px-6 py-4 text-[14px] font-black text-white cursor-pointer">
                <Icon name="whatsapp" size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[72vh] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#ddd6fe 0%,#bfdbfe 38%,#c7d2fe 65%,#e9d5ff 100%)" }}>
      <style>{WAVE_CSS}</style>
      <div className="absolute inset-0 overflow-hidden">
        <div className="dw dw4" /><div className="dw dw5" />
        <div className="dw dw3" /><div className="dw dw2" /><div className="dw dw1" />
      </div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 55%,rgba(255,255,255,.28) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(196,181,253,.35) 0%,transparent 45%)" }} />
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-12 lg:px-20 pt-28 pb-20 text-center">
        <motion.div {...fadeUp}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-5 py-2.5 text-[12px] font-bold text-[#4c1d95] backdrop-blur-sm">
            <Icon name="package" size={13} className="text-[#6B21A8]" />
            Listas para usar desde el primer día
          </div>
          <h1 className="mx-auto max-w-[760px] text-[46px] font-black leading-[.92] tracking-[-0.06em] text-[#1e1b4b] md:text-[68px] lg:text-[86px]">
            Herramientas listas para usar
          </h1>
          <p className="mx-auto mt-7 max-w-[580px] text-[18px] leading-[1.7] text-[#3730a3]/80">
            Plantillas diseñadas para negocios reales, listas para implementar desde el primer día.
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

const templates = [
  {
    icon: "layers",
    name: "Control de pedidos",
    use: "Controlar y organizar pedidos de clientes",
    for: "Negocios que reciben pedidos por WhatsApp o de forma manual y quieren organizarlos en un solo lugar.",
    features: [
      "Registro de pedidos con estado (pendiente, en proceso, entregado)",
      "Datos del cliente vinculados a cada pedido",
      "Vista rápida de pendientes del día",
    ],
    cta: "Solicitar plantilla",
    color: "#7C3AED",
    bg: "#F5F0FF",
    border: "#DDD6FE",
  },
  {
    icon: "trending",
    name: "Registro de ingresos y gastos",
    use: "Gestionar el flujo de dinero del negocio",
    for: "Emprendedores y pequeños negocios que no tienen claridad sobre cuánto entra y cuánto sale.",
    features: [
      "Registro diario de ingresos y gastos por categoría",
      "Resumen mensual automático",
      "Indicador simple de rentabilidad",
    ],
    cta: "Solicitar plantilla",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
  {
    icon: "users",
    name: "Gestión de clientes",
    use: "Organizar y dar seguimiento a clientes",
    for: "Negocios de servicios que pierden clientes por falta de seguimiento o desorganización.",
    features: [
      "Base de datos de clientes con historial",
      "Recordatorios de seguimiento",
      "Estado de cada relación comercial",
    ],
    cta: "Solicitar plantilla",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  {
    icon: "edit",
    name: "Planeación de contenido",
    use: "Organizar publicaciones y contenido digital",
    for: "Negocios que quieren tener presencia en redes pero no saben por dónde empezar.",
    features: [
      "Calendario mensual de publicaciones",
      "Ideas organizadas por formato y canal",
      "Seguimiento de publicaciones realizadas",
    ],
    cta: "Solicitar plantilla",
    color: "#EA580C",
    bg: "#FFF7ED",
    border: "#FED7AA",
  },
  {
    icon: "clock",
    name: "Control de servicios / agenda",
    use: "Gestionar citas, servicios y disponibilidad",
    for: "Prestadores de servicios que necesitan organizar su agenda y no perder citas.",
    features: [
      "Registro de citas con fecha y cliente",
      "Estado del servicio (agendado, completado, cancelado)",
      "Vista semanal de ocupación",
    ],
    cta: "Solicitar plantilla",
    color: "#7C3AED",
    bg: "#F5F0FF",
    border: "#DDD6FE",
  },
  {
    icon: "package",
    name: "Inventario simple",
    use: "Controlar productos y stock disponible",
    for: "Negocios con productos físicos que necesitan saber qué tienen y qué les falta.",
    features: [
      "Lista de productos con cantidad disponible",
      "Alerta de stock bajo",
      "Registro de entradas y salidas",
    ],
    cta: "Solicitar plantilla",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
];

function TemplateCard({ template, index }) {
  const { icon, name, use, for: forWho, features, cta, color, bg, border } = template;
  const waText = encodeURIComponent(`Hola, me interesa la plantilla "${name}"`);
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-[28px] border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(107,33,168,.1)]"
      style={{ borderColor: border }}>
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: bg, color }}>
        <Icon name={icon} size={22} />
      </div>
      <h3 className="text-[20px] font-black tracking-[-0.03em] text-[#111318]">{name}</h3>
      <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color }}>Para {use}</p>
      <p className="mt-4 text-[14px] leading-[1.65] text-[#6B7280]">{forWho}</p>
      <div className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3 text-[14px] text-[#374151]">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EDE9FE]">
              <Icon name="check" size={11} className="text-[#7C3AED]" />
            </span>
            {f}
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3 flex-wrap">
        <a href={`${WHATSAPP_URL}?text=${waText}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#6B21A8] py-3.5 text-[13px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)] cursor-pointer min-w-[140px]">
          <Icon name="whatsapp" size={14} /> {cta}
        </a>
      </div>
    </motion.div>
  );
}

function Templates() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-16">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Plantillas disponibles</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[52px]">Elige la que necesitas</h2>
          <p className="mt-5 text-[19px] text-[#6B7280]">Herramientas concretas para los problemas más comunes de los negocios pequeños.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => <TemplateCard key={t.name} template={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorBlock() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20" style={{ background: "linear-gradient(180deg,#faf5ff 0%,#eff6ff 100%)" }}>
      <motion.div {...fadeUp} className="mx-auto max-w-[900px] rounded-[32px] border border-[#EDE9FE] bg-white px-10 py-14 shadow-[0_16px_48px_rgba(107,33,168,.08)] text-center md:px-16">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-[16px] bg-[#EDE9FE] text-[#7C3AED]">
          <Icon name="refresh" size={26} />
        </div>
        <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669] mb-3">Pensado para crecer</p>
        <h3 className="text-[28px] font-black leading-[1.1] tracking-[-0.04em] text-[#111318] md:text-[36px]">
          De plantilla a sistema personalizado
        </h3>
        <p className="mx-auto mt-5 max-w-[600px] text-[18px] leading-[1.7] text-[#6B7280]">
          Todas las plantillas pueden escalar a un sistema personalizado según el crecimiento de tu negocio.
        </p>
        <div className="mx-auto mt-10 grid max-w-[720px] gap-4 md:grid-cols-3">
          {[
            { step: "01", label: "Empiezas con una plantilla lista" },
            { step: "02", label: "La ajustamos a tu forma de trabajar" },
            { step: "03", label: "Escalamos cuando lo necesitas" },
          ].map(({ step, label }) => (
            <div key={step} className="rounded-[18px] border border-[#EDE9FE] bg-[#FDFCFF] p-5">
              <p className="text-[12px] font-black tracking-[0.12em] text-[#9CA3AF] uppercase">Paso {step}</p>
              <p className="mt-2 text-[15px] font-bold text-[#111318]">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-12 pb-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,#ede9fe 0%,#dbeafe 100%)" }}>
      <motion.div {...fadeUp} className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[32px] px-8 py-20 text-center md:px-16"
        style={{ background: "linear-gradient(135deg,#4c1d95 0%,#1e40af 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(139,92,246,.6) 0%,transparent 50%),radial-gradient(ellipse at 85% 30%,rgba(59,130,246,.4) 0%,transparent 40%)" }} />
        <div className="relative z-10 mx-auto max-w-[620px]">
          <p className="mb-4 text-[12px] font-black uppercase tracking-[0.22em] text-[#c4b5fd]">Sin costo, sin compromiso</p>
          <h2 className="text-[34px] font-black leading-[1.05] tracking-[-0.055em] text-white md:text-[48px]">¿No sabes cuál elegir?</h2>
          <p className="mx-auto mt-5 max-w-[500px] text-[18px] leading-[1.65] text-white/75">Agenda tu diagnóstico gratis y te ayudamos a encontrar la herramienta correcta para tu negocio.</p>
          <a href="/#contact" className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-9 py-[1.1rem] text-[15px] font-black text-white transition-all hover:bg-white hover:text-[#4c1d95] cursor-pointer">
            Agendar diagnóstico gratis <Icon name="arrow" size={17} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = [{ href: "/", label: "Home" }, { href: "/#soluciones", label: "Soluciones" }, { href: "/precios", label: "Precios" }, { href: "/#contact", label: "Contacto" }];
  return (
    <footer className="border-t border-[#EDE9FE] bg-white px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-8 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-8">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6B7280] hover:text-[#6B21A8] cursor-pointer">{label}</a>
          ))}
        </nav>
        <p className="text-[12px] text-[#9CA3AF]">© 2026 DG Solutions. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default function PlantillasPage() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-[#111318] antialiased selection:bg-[#6B21A8] selection:text-white">
      <Header />
      <Hero />
      <Templates />
      <DifferentiatorBlock />
      <FinalCTA />
      <Footer />
    </main>
  );
}
