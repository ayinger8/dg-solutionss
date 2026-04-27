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
    settings:   <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    star:       <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    target:     <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    edit:       <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    layout:     <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    whatsapp:   <svg {...p} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    menu:       <svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
    x:          <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    chevron:    <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
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
            <a key={href} href={href} className={`text-[12.5px] font-bold uppercase tracking-[0.1em] transition-colors hover:text-[#6B21A8] cursor-pointer ${href === "/precios" ? "text-[#6B21A8]" : "text-[#374151]"}`}>{label}</a>
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
    <section className="relative overflow-hidden min-h-[82vh] flex items-center justify-center"
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
            <Icon name="star" size={13} className="text-[#6B21A8]" />
            Sin compromiso — Primera consultoría gratis
          </div>
          <h1 className="mx-auto max-w-[820px] text-[46px] font-black leading-[.92] tracking-[-0.06em] text-[#1e1b4b] md:text-[68px] lg:text-[86px]">
            Tu primera consultoría es completamente gratis
          </h1>
          <p className="mx-auto mt-7 max-w-[600px] text-[18px] leading-[1.7] text-[#3730a3]/80">
            Antes de hablar de precios, entendemos tu negocio y te decimos exactamente qué necesitas y qué no.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/#contact" className="inline-flex items-center gap-3 rounded-full bg-[#6B21A8] px-9 py-[1.1rem] text-[16px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_12px_32px_rgba(107,33,168,.4)] cursor-pointer">
              Agendar diagnóstico <Icon name="arrow" size={17} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-[#6B21A8]/30 bg-white/60 px-8 py-[1.1rem] text-[16px] font-bold text-[#6B21A8] backdrop-blur-sm transition-all hover:bg-white cursor-pointer">
              <Icon name="whatsapp" size={17} /> Hablar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function ContextBlock() {
  return (
    <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
      <motion.div {...fadeUp} className="mx-auto max-w-[860px] rounded-[28px] border border-[#EDE9FE] bg-[#FDFCFF] p-10 shadow-[0_8px_40px_rgba(107,33,168,.07)] text-center md:p-14">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-[16px] bg-[#F5F0FF] text-[#7C3AED]">
          <Icon name="target" size={26} />
        </div>
        <p className="text-[19px] leading-[1.75] text-[#374151] md:text-[21px]">
          No trabajamos con paquetes rígidos. Cada negocio es diferente, por eso primero analizamos tu situación y después te proponemos la mejor solución.
        </p>
        <p className="mt-5 text-[17px] leading-[1.7] text-[#6B7280]">
          Aún así, estos son los rangos de inversión más comunes según el tipo de solución.
        </p>
      </motion.div>
    </section>
  );
}

const solutionTypes = [
  {
    icon: "layers",
    title: "Organización y control",
    desc: "Para negocios que quieren dejar de improvisar y tener claridad en su operación.",
    color: "#7C3AED",
    bg: "#F5F0FF",
  },
  {
    icon: "target",
    title: "Marketing y presencia",
    desc: "Para negocios que quieren verse profesionales y empezar a generar más clientes.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: "cpu",
    title: "Automatización / IA",
    desc: "Para negocios que quieren ahorrar tiempo y reducir trabajo manual.",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
];

function SolutionTypes() {
  return (
    <section className="bg-white px-6 pb-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-14">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Tipos de solución</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[52px]">¿Qué tipo de solución necesitas?</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {solutionTypes.map(({ icon, title, desc, color, bg }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-[24px] border border-transparent p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(107,33,168,.1)]"
              style={{ background: bg + "55", borderColor: bg }}>
              <div className="mb-5 grid h-13 w-13 place-items-center rounded-[16px]" style={{ background: bg, color }}>
                <Icon name={icon} size={24} />
              </div>
              <h3 className="text-[19px] font-black text-[#111318]">{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#6B7280]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const levels = [
  {
    number: "01",
    title: "Empezar a ordenar",
    price: "Desde $400 – $700 MXN",
    desc: "Para negocios que necesitan estructura básica y control inicial.",
    features: [
      "Organización simple de información",
      "Control básico de ingresos y operaciones",
      "Estructura inicial funcional",
    ],
    color: "#7C3AED",
    bg: "#F5F0FF",
    border: "#DDD6FE",
  },
  {
    number: "02",
    title: "Crecimiento y presencia",
    price: "Desde $700 – $1,500 MXN",
    desc: "Para negocios que quieren mejorar su imagen y empezar a atraer clientes.",
    features: [
      "Contenido digital",
      "Presencia online básica",
      "Organización + enfoque comercial",
    ],
    popular: true,
    color: "#fff",
    bg: "linear-gradient(135deg,#7C3AED 0%,#4f46e5 100%)",
    border: "transparent",
    dark: true,
  },
  {
    number: "03",
    title: "Sistema personalizado",
    price: "Desde $1,500+ MXN",
    desc: "Para negocios que necesitan control total y procesos adaptados.",
    features: [
      "Sistema hecho a la medida",
      "Automatización básica",
      "Personalización completa",
    ],
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
];

function PricingLevels() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(180deg,#faf5ff 0%,#eff6ff 100%)" }}>
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-16">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Precios</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[52px]">Rangos de inversión</h2>
        </motion.div>
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {levels.map(({ number, title, price, desc, features, popular, color, bg, border, dark }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5 }}
              className={`relative flex flex-col rounded-[28px] border p-9 transition-all duration-300 ${dark ? "shadow-[0_28px_70px_rgba(107,33,168,.25)]" : "hover:shadow-[0_16px_48px_rgba(107,33,168,.08)]"}`}
              style={{ background: bg, borderColor: border }}>
              {popular && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC533] px-6 py-2.5 text-[13px] font-black text-[#111318]">★ Popular</span>
              )}
              <p className={`text-[13px] font-black tracking-[0.12em] uppercase ${dark ? "text-white/50" : "text-[#9CA3AF]"}`}>Nivel {number}</p>
              <h3 className={`mt-2 text-[24px] font-black tracking-[-0.04em] leading-[1.2] ${dark ? "text-white" : "text-[#111318]"}`}>{title}</h3>
              <p className={`mt-5 text-[20px] font-black tracking-[-0.03em] ${dark ? "text-white" : "text-[#6B21A8]"}`}>{price}</p>
              <p className={`mt-3 text-[14px] leading-[1.6] ${dark ? "text-white/75" : "text-[#6B7280]"}`}>{desc}</p>
              <div className="mt-7 flex-1 space-y-3.5">
                {features.map((f) => (
                  <div key={f} className={`flex items-start gap-3 text-[14px] font-medium ${dark ? "text-white/90" : "text-[#374151]"}`}>
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? "bg-white/20" : "bg-[#EDE9FE]"}`}>
                      <Icon name="check" size={11} className={dark ? "text-white" : "text-[#7C3AED]"} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a href="/#contact" className={`mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full py-4 text-[14px] font-black transition-all cursor-pointer ${dark ? "bg-white text-[#6B21A8] hover:bg-white/90" : "bg-[#6B21A8] text-white hover:bg-[#5B1A9A] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)]"}`}>
                Agendar diagnóstico <Icon name="arrow" size={15} />
              </a>
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[880px] text-center text-[13px] leading-[1.8] text-[#9CA3AF]">
          Los precios son referenciales y pueden variar según las necesidades de cada negocio. El alcance, tiempos y entregables se definen después del diagnóstico inicial.
        </p>
      </div>
    </section>
  );
}

const includes = [
  { icon: "settings", title: "Diseño del sistema", desc: "Adaptamos todo a la forma en la que funciona tu negocio." },
  { icon: "refresh", title: "Ajuste a tu operación", desc: "No te adaptas tú al sistema, el sistema se adapta a ti." },
  { icon: "layers", title: "Organización y control", desc: "Tendrás claridad sobre clientes, ingresos y procesos." },
  { icon: "zap", title: "Automatización (cuando aplica)", desc: "Reducimos tareas repetitivas para ahorrar tiempo." },
];

function WhatYouGet() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-16">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Lo que incluye</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[52px]">¿Qué incluye trabajar con nosotros?</h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map(({ icon, title, desc }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] border border-[#EDE9FE] bg-[#FDFCFF] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#DDD6FE] hover:shadow-[0_16px_48px_rgba(107,33,168,.08)]">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] bg-[#EDE9FE] text-[#7C3AED]">
                <Icon name={icon} size={22} />
              </div>
              <h3 className="text-[17px] font-black text-[#111318]">{title}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#6B7280]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsAndExamples() {
  const results = [
    "Más control sobre tu negocio",
    "Menos desorden y errores",
    "Menos tiempo perdido en tareas repetitivas",
    "Más claridad para crecer",
  ];
  const examples = [
    { icon: "layers", text: "Un negocio que tenía todo en WhatsApp ahora controla pedidos en un solo lugar." },
    { icon: "globe", text: "Un emprendimiento sin presencia ahora recibe clientes desde su página." },
    { icon: "trending", text: "Un negocio desordenado ahora tiene claridad total de sus ingresos y operaciones." },
  ];
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,#faf5ff 0%,#eff6ff 100%)" }}>
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Results */}
          <motion.div {...fadeUp}>
            <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Resultados</p>
            <h2 className="mt-4 text-[36px] font-black leading-[1.1] tracking-[-0.055em] text-[#111318] md:text-[46px]">Lo que puedes esperar</h2>
            <div className="mt-10 space-y-4">
              {results.map((r, i) => (
                <motion.div key={r} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-center gap-4 rounded-[16px] border border-[#EDE9FE] bg-white p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ECFDF5]">
                    <Icon name="check" size={14} className="text-[#059669]" />
                  </span>
                  <span className="text-[16px] font-semibold text-[#111318]">{r}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Examples */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Ejemplos</p>
            <h2 className="mt-4 text-[36px] font-black leading-[1.1] tracking-[-0.055em] text-[#111318] md:text-[46px]">Casos comunes</h2>
            <div className="mt-10 space-y-5">
              {examples.map(({ icon, text }, i) => (
                <motion.div key={text} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-start gap-4 rounded-[16px] border border-[#EDE9FE] bg-white p-6">
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#EDE9FE] text-[#7C3AED]">
                    <Icon name={icon} size={18} />
                  </div>
                  <p className="text-[15px] leading-[1.7] text-[#374151]">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TemplatesBanner() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <motion.div {...fadeUp} className="mx-auto max-w-[1100px] overflow-hidden rounded-[32px] border border-[#EDE9FE] bg-[#FDFCFF] px-8 py-16 text-center shadow-[0_16px_48px_rgba(107,33,168,.08)] md:px-16">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-[16px] bg-[#EDE9FE] text-[#7C3AED]">
          <Icon name="layout" size={26} />
        </div>
        <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Plantillas</p>
        <h2 className="mt-4 text-[32px] font-black leading-[1.1] tracking-[-0.055em] text-[#111318] md:text-[44px]">¿Quieres empezar más rápido?</h2>
        <p className="mx-auto mt-5 max-w-[540px] text-[18px] leading-[1.7] text-[#6B7280]">
          Si aún no necesitas una solución personalizada, puedes comenzar con herramientas ya listas para usar.
        </p>
        <a href="/plantillas" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#6B21A8] px-9 py-[1.05rem] text-[15px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_12px_32px_rgba(107,33,168,.35)] cursor-pointer">
          Ver plantillas <Icon name="arrow" size={16} />
        </a>
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
        <div className="relative z-10 mx-auto max-w-[660px]">
          <p className="mb-4 text-[12px] font-black uppercase tracking-[0.22em] text-[#c4b5fd]">Sin costo, sin compromiso</p>
          <h2 className="text-[36px] font-black leading-[1.05] tracking-[-0.055em] text-white md:text-[52px]">¿No estás seguro qué necesitas?</h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[18px] leading-[1.65] text-white/75">Agenda tu diagnóstico gratis y te orientamos sin compromiso.</p>
          <a href="/#contact" className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-9 py-[1.1rem] text-[15px] font-black text-white transition-all hover:bg-white hover:text-[#4c1d95] cursor-pointer">
            Agendar diagnóstico <Icon name="arrow" size={17} />
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

export default function PreciosPage() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-[#111318] antialiased selection:bg-[#6B21A8] selection:text-white">
      <Header />
      <Hero />
      <ContextBlock />
      <SolutionTypes />
      <PricingLevels />
      <WhatYouGet />
      <ResultsAndExamples />
      <TemplatesBanner />
      <FinalCTA />
      <Footer />
    </main>
  );
}
