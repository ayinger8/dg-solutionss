"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/526692291474";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const plans = [
  {
    title: "Ordena tu negocio",
    price: "$70",
    suffix: "/año",
    desc: "Para negocios que quieren dejar de improvisar y tener claridad desde el día uno.",
    features: [
      { icon: "layers", text: "Control de ingresos y gastos" },
      { icon: "users", text: "Gestión de clientes" },
      { icon: "trending", text: "Seguimiento de operaciones" },
    ],
  },
  {
    title: "Trabaja con IA",
    price: "$599",
    oldPrice: "$899",
    label: "Desde",
    popular: true,
    gradient: true,
    desc: "Automatiza lo repetitivo y usa inteligencia artificial para trabajar más rápido y mejor.",
    features: [
      { icon: "zap", text: "Respuestas automatizadas" },
      { icon: "cpu", text: "Asistencia con IA" },
      { icon: "refresh", text: "Automatización de tareas" },
    ],
  },
  {
    title: "Consigue más clientes",
    price: "$299",
    oldPrice: "$599",
    label: "Desde",
    desc: "Presencia digital real para que tus clientes te encuentren y puedan contactarte fácil.",
    features: [
      { icon: "globe", text: "Desarrollo de página web" },
      { icon: "edit", text: "Gestión de contenido digital" },
      { icon: "whatsapp", text: "Integración con WhatsApp" },
    ],
  },
];

const faqs = [
  { q: "¿Necesito conocimientos técnicos para usarlo?", a: "No. Todo lo que configuramos está pensado para personas sin experiencia técnica. Te entregamos las herramientas listas para usar y te explicamos cómo funciona cada una de forma simple." },
  { q: "¿Esto funciona para cualquier tipo de negocio?", a: "Sí. Hemos trabajado con tiendas, talleres, restaurantes, freelancers y pequeñas empresas de distintos sectores. El punto de partida siempre es entender cómo funciona tu negocio antes de proponer algo." },
  { q: "¿Qué incluye la asesoría gratuita?", a: "Una sesión de diagnóstico donde revisamos cómo estás operando, identificamos los principales puntos de desorden y te orientamos sobre qué soluciones tienen más sentido para tu situación. Sin presión de venta." },
  { q: "¿Cuánto tiempo toma empezar a usarlo?", a: "Depende del plan, pero en general entre 3 y 10 días hábiles desde que acordamos el alcance. Las herramientas más simples pueden quedar listas en menos tiempo." },
  { q: "¿Puedo adaptar las herramientas a mi negocio?", a: "Sí, todo lo que hacemos es personalizado. No usamos plantillas genéricas. Cada solución se diseña a partir de cómo tú trabajas, no al revés." },
  { q: "¿Qué pasa si necesito algo más avanzado después?", a: "Crecemos contigo. Si en algún momento tu negocio requiere algo más complejo, lo evaluamos juntos y ajustamos las herramientas. No estás limitado por el plan inicial." },
  { q: "¿Cómo empiezo?", a: "Escríbenos por WhatsApp o llena el formulario de contacto. Te respondemos el mismo día y agendamos la asesoría gratuita. No necesitas tener nada preparado, solo contarnos cómo funciona tu negocio." },
];

const solutions = [
  { title: "Ordena tu negocio", text: "Creamos herramientas para controlar ingresos y gastos, gestionar clientes y organizar pedidos o servicios en un solo lugar, sin depender de Excel o notas sueltas.", icon: "layers", img: "https://picsum.photos/seed/bizorder/700/450", accent: "#7C3AED", bg: "#F5F0FF" },
  { title: "Ahorra tiempo", text: "Configuramos automatizaciones simples como recordatorios, respuestas y procesos básicos para reducir trabajo manual y evitar errores en tu operación diaria.", icon: "clock", img: "https://picsum.photos/seed/timesave/700/450", accent: "#059669", bg: "#ECFDF5" },
  { title: "Trabaja más inteligente", text: "Implementamos herramientas con IA que te ayudan a generar mensajes, textos y documentos, además de darte soporte práctico para resolver tareas más rápido.", icon: "cpu", img: "https://picsum.photos/seed/aitools/700/450", accent: "#2563EB", bg: "#EFF6FF" },
  { title: "Haz que te encuentren", text: "Desarrollamos páginas web simples y efectivas con contacto directo por WhatsApp, para que tu negocio se vea profesional y sea fácil de contactar.", icon: "globe", img: "https://picsum.photos/seed/webpres/700/450", accent: "#EA580C", bg: "#FFF7ED" },
];

const problems = [
  { icon: "layers", title: "Todo disperso", desc: "Información en WhatsApp, Excel y notas sueltas. Imposible saber qué pasa en tu negocio.", color: "#7C3AED", bg: "#F5F0FF" },
  { icon: "clock", title: "Tiempo perdido", desc: "Tareas repetitivas que consumen horas que podrías dedicar a crecer o descansar.", color: "#059669", bg: "#ECFDF5" },
  { icon: "users", title: "Clientes perdidos", desc: "Sin seguimiento claro, las oportunidades de venta se escapan sin que te des cuenta.", color: "#2563EB", bg: "#EFF6FF" },
  { icon: "globe", title: "Sin presencia digital", desc: "Tus clientes no te encuentran en línea, y los que llegan no saben cómo contactarte.", color: "#EA580C", bg: "#FFF7ED" },
];

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
    refresh:    <svg {...p}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
    chevron:    <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
    x:          <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    menu:       <svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
    layers:     <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users:      <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    trending:   <svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    zap:        <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    cpu:        <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    edit:       <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    whatsapp:   <svg {...p} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    clock:      <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mail:       <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    phone:      <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg>,
  };
  return icons[name] || null;
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3 cursor-pointer" aria-label="DG Solutions">
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ href: "#home", label: "Home" }, { href: "#soluciones", label: "Soluciones" }, { href: "#pricing", label: "Precios" }, { href: "#contact", label: "Contacto" }];
  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/97 shadow-[0_1px_20px_rgba(0,0,0,.07)] backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"}`}>
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
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center"
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
            <Icon name="zap" size={13} className="text-[#6B21A8]" />
            Herramientas digitales para negocios reales
          </div>
          <h1 className="mx-auto max-w-[780px] text-[52px] font-black leading-[.92] tracking-[-0.06em] text-[#1e1b4b] md:text-[76px] lg:text-[96px]">
            Organiza tu negocio y vende más fácil
          </h1>
          <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.7] text-[#3730a3]/80">
            Creamos herramientas simples y personalizadas para que tengas claridad, control y más clientes — sin complicaciones técnicas.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[#6B21A8] px-9 py-[1.1rem] text-[16px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_12px_32px_rgba(107,33,168,.4)] cursor-pointer">
              Solicitar Diagnóstico <Icon name="arrow" size={17} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-[#6B21A8]/30 bg-white/60 px-8 py-[1.1rem] text-[16px] font-bold text-[#6B21A8] backdrop-blur-sm transition-all hover:bg-white cursor-pointer">
              <Icon name="whatsapp" size={17} /> WhatsApp
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#4338ca]/80">
            {["Primera consulta gratis", "Sin contratos largos", "Todo México"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/60"><Icon name="check" size={11} className="text-[#6B21A8]" /></span>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">El problema real</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[56px]">Tu negocio no necesita complicarse para crecer</h2>
          <p className="mt-5 text-[19px] text-[#6B7280]">La mayoría de los negocios pequeños tienen los mismos puntos de dolor. Nosotros los resolvemos con herramientas simples.</p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon, title, desc, color, bg }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-[22px] border border-transparent p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(107,33,168,.1)]"
              style={{ background: bg + "55", borderColor: bg }}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: bg, color }}>
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

function CTABanner() {
  return (
    <section className="px-6 py-12 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,#ede9fe 0%,#dbeafe 100%)" }}>
      <motion.div {...fadeUp} className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[32px] px-8 py-20 text-center md:px-16"
        style={{ background: "linear-gradient(135deg,#4c1d95 0%,#1e40af 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(139,92,246,.6) 0%,transparent 50%),radial-gradient(ellipse at 85% 30%,rgba(59,130,246,.4) 0%,transparent 40%)" }} />
        <div className="relative z-10 mx-auto max-w-[720px]">
          <p className="mb-4 text-[12px] font-black uppercase tracking-[0.22em] text-[#c4b5fd]">Sin costo, sin compromiso</p>
          <h2 className="text-[38px] font-black leading-[1.05] tracking-[-0.055em] text-white md:text-[56px]">Primera Consultoría Gratis</h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[1.65] text-white/75">Revisamos tu caso, detectamos el desorden y te orientamos sobre el siguiente paso más útil para tu negocio.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-9 py-[1.1rem] text-[15px] font-black text-white transition-all hover:bg-white hover:text-[#4c1d95] cursor-pointer">
            Agendar ahora <Icon name="arrow" size={17} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="soluciones" className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-20">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Soluciones</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[56px]">Formas en las que mejoramos tu negocio</h2>
          <p className="mt-5 text-[19px] text-[#6B7280]">Soluciones simples para organizarte, ahorrar tiempo y vender más.</p>
        </motion.div>
        <div className="space-y-24">
          {solutions.map(({ title, text, icon, img, accent, bg }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`grid items-center gap-14 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,.1)]" style={{ aspectRatio: "16/10" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 rounded-[28px]" style={{ background: `linear-gradient(135deg,${accent}25 0%,transparent 55%)` }} />
              </div>
              <div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[18px]" style={{ background: bg, color: accent }}>
                  <Icon name={icon} size={26} />
                </div>
                <h3 className="text-[32px] font-black tracking-[-0.04em] text-[#111318] md:text-[40px]">{title}</h3>
                <p className="mt-4 text-[18px] leading-[1.75] text-[#6B7280]">{text}</p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[14px] font-black text-white transition-all hover:opacity-90 cursor-pointer" style={{ background: accent }}>
                  Saber más <Icon name="arrow" size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index }) {
  const g = plan.gradient;
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5 }}
      className={`relative flex flex-col rounded-[28px] border p-9 transition-all duration-300 ${g ? "border-transparent shadow-[0_28px_70px_rgba(107,33,168,.25)]" : "border-[#EDE9FE] bg-[#FDFCFF] hover:border-[#DDD6FE] hover:shadow-[0_16px_48px_rgba(107,33,168,.08)]"}`}
      style={g ? { background: "linear-gradient(135deg,#7C3AED 0%,#4f46e5 100%)" } : {}}>
      {plan.popular && <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC533] px-6 py-2.5 text-[13px] font-black text-[#111318]">★ Popular</span>}
      <h3 className={`text-[26px] font-black leading-[1.2] tracking-[-0.04em] ${g ? "text-white" : "text-[#111318]"}`}>{plan.title}</h3>
      <p className={`mt-2 text-[14px] leading-[1.6] ${g ? "text-white/80" : "text-[#747887]"}`}>{plan.desc}</p>
      <div className="mt-7 flex items-end gap-2">
        {plan.oldPrice && <span className={`pb-1.5 text-[22px] font-semibold line-through ${g ? "text-white/50" : "text-[#9CA3AF]"}`}>{plan.oldPrice}</span>}
        <span className={`text-[52px] font-black leading-none tracking-[-0.06em] ${g ? "text-white" : "text-[#6B21A8]"}`}>{plan.price}</span>
        {plan.suffix && <span className={`pb-1.5 text-[16px] font-semibold ${g ? "text-white/70" : "text-[#9CA3AF]"}`}>{plan.suffix}</span>}
      </div>
      {plan.label && <p className={`mt-1 text-[13px] font-semibold ${g ? "text-white/70" : "text-[#9CA3AF]"}`}>{plan.label}</p>}
      <div className="mt-8 flex-1 space-y-4">
        {plan.features.map(({ icon, text }) => (
          <div key={text} className={`flex items-center gap-3.5 text-[15px] font-medium ${g ? "text-white/90" : "text-[#374151]"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${g ? "bg-white/20" : "bg-[#EDE9FE]"}`}>
              <Icon name={icon} size={15} className={g ? "text-white" : "text-[#7C3AED]"} />
            </span>
            {text}
          </div>
        ))}
      </div>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
        className={`mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full py-4 text-[14px] font-black transition-all cursor-pointer ${g ? "bg-white text-[#6B21A8] hover:bg-white/90" : "bg-[#6B21A8] text-white hover:bg-[#5B1A9A] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)]"}`}>
        Ver Planes <Icon name="arrow" size={15} />
      </a>
    </motion.div>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(180deg,#faf5ff 0%,#eff6ff 100%)" }}>
      <motion.div {...fadeUp} className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Precios</p>
          <h2 className="mx-auto mt-4 max-w-[780px] text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[56px]">Opciones pensadas para que preguntar no dé miedo</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[19px] leading-[1.5] text-[#6B7280]">Te damos una referencia simple y la primera consultoría es gratis.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1200px] gap-6 md:grid-cols-3">
          {plans.map((plan, i) => <PricingCard key={plan.title} plan={plan} index={i} />)}
        </div>
        <p className="mx-auto mt-8 max-w-[880px] text-center text-[13px] leading-[1.8] text-[#9CA3AF]">
          Los precios son referenciales y pueden variar según las necesidades de cada negocio. El alcance, tiempos y entregables se definen después del diagnóstico inicial. La consultoría gratis es informativa y no incluye implementación.
        </p>
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <motion.div {...fadeUp} className="mx-auto max-w-[860px]">
        <div className="text-center mb-14">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">FAQ</p>
          <h2 className="mt-4 text-[38px] font-black tracking-[-0.055em] text-[#111318] md:text-[52px]">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className={`rounded-[20px] border transition-all duration-200 ${openIndex === i ? "border-[#DDD6FE] bg-[#FDFCFF] shadow-[0_8px_32px_rgba(107,33,168,.08)]" : "border-[#EBEBEB] bg-white"}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left cursor-pointer">
                <span className="text-[16px] font-bold text-[#111318]">{q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-200 ${openIndex === i ? "bg-[#6B21A8] text-white rotate-180" : "bg-[#F5F0FF] text-[#6B21A8]"}`}>
                  <Icon name="chevron" size={16} />
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <p className="px-7 pb-6 text-[15px] leading-[1.8] text-[#6B7280]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setStatus("sending"); setTimeout(() => setStatus("sent"), 1200); };
  const contactItems = [
    { icon: "phone", label: "WhatsApp", value: "669 229 1474" },
    { icon: "mail", label: "Email", value: "dg.solutions.contacto@gmail.com" },
    { icon: "globe", label: "Cobertura", value: "Todo México — atendemos en línea" },
  ];
  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,#faf5ff 0%,#eff6ff 100%)" }}>
      <motion.div {...fadeUp} className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#059669]">Contacto</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[#111318] md:text-[52px]">Cuéntanos sobre tu negocio</h2>
          <p className="mt-5 max-w-[520px] text-[18px] leading-[1.7] text-[#6B7280]">Te ayudamos a entender qué necesitas y cómo organizar tu negocio de forma simple. La primera asesoría es gratis y sin compromiso.</p>
          <div className="mt-8 overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(107,33,168,.12)]" style={{ aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/dgteam/700/394" alt="Equipo DG Solutions" className="w-full h-full object-cover" loading="lazy"
              style={{ filter: "saturate(0.8) hue-rotate(220deg) brightness(1.05)" }} />
          </div>
          <div className="mt-8 space-y-5">
            {contactItems.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-[#EDE9FE] text-[#7C3AED]"><Icon name={icon} size={18} /></div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-[#9CA3AF]">{label}</p>
                  <p className="text-[15px] font-semibold text-[#111318]">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-[14px] font-black text-white transition-all hover:bg-[#20B859] hover:shadow-[0_8px_24px_rgba(37,211,102,.35)] cursor-pointer">
            <Icon name="whatsapp" size={17} /> Escríbenos por WhatsApp
          </a>
        </div>
        <div className="rounded-[28px] border border-[#EDE9FE] bg-white p-8 shadow-[0_8px_40px_rgba(107,33,168,.08)] md:p-10">
          {status === "sent" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#ECFDF5]"><Icon name="check" size={28} className="text-[#10B981]" /></div>
              <h3 className="mt-5 text-[24px] font-black text-[#111318]">¡Mensaje enviado!</h3>
              <p className="mt-3 text-[15px] text-[#6B7280]">Te respondemos pronto. También puedes escribirnos por WhatsApp.</p>
              <button onClick={() => { setStatus(""); setForm({ name: "", email: "", message: "" }); }} className="mt-6 text-[13px] font-bold text-[#6B21A8] underline cursor-pointer">Enviar otro mensaje</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {[{ id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" }, { id: "email", label: "Email", type: "email", placeholder: "tu@email.com" }].map(({ id, label, type, placeholder }) => (
                <div key={id} className="mb-5">
                  <label className="mb-1.5 block text-[13px] font-black text-[#111318]" htmlFor={id}>{label}</label>
                  <input id={id} type={type} required value={form[id]} onChange={handleChange} placeholder={placeholder}
                    className="w-full rounded-2xl border border-[#EDE9FE] bg-[#FDFCFF] px-5 py-3.5 text-[15px] text-[#111318] outline-none transition-all focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,.12)]" />
                </div>
              ))}
              <div className="mb-6">
                <label className="mb-1.5 block text-[13px] font-black text-[#111318]" htmlFor="message">Mensaje</label>
                <textarea id="message" required value={form.message} onChange={handleChange} rows={5} placeholder="Cuéntanos qué necesitas o cómo funciona tu negocio"
                  className="w-full rounded-2xl border border-[#EDE9FE] bg-[#FDFCFF] px-5 py-3.5 text-[15px] text-[#111318] outline-none transition-all focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,.12)] resize-none" />
              </div>
              <button type="submit" disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#6B21A8] px-8 py-4 text-[15px] font-black text-white transition-all hover:bg-[#5B1A9A] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)] disabled:opacity-60 cursor-pointer">
                {status === "sending" ? "Enviando..." : <><span>Enviar mensaje</span><Icon name="arrow" size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = [{ href: "#home", label: "Home" }, { href: "#soluciones", label: "Soluciones" }, { href: "#pricing", label: "Precios" }, { href: "#contact", label: "Contacto" }];
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

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#6B21A8] text-white shadow-[0_8px_24px_rgba(107,33,168,.35)] hover:bg-[#5B1A9A] cursor-pointer"
          aria-label="Volver arriba">
          <Icon name="arrowUp" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function DGSolutionsV3() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-[#111318] antialiased selection:bg-[#6B21A8] selection:text-white">
      <Header />
      <Hero />
      <ProblemSection />
      <CTABanner />
      <SolutionsSection />
      <PricingSection />
      <FAQ />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
