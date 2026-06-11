"use client";

import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_URL = "https://wa.me/526692291474";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function Icon({ name, size = 22, className = "" }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": "true" };
  const icons = {
    arrow:         <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    arrowUp:       <svg {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>,
    check:         <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>,
    layers:        <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    zap:           <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    trending:      <svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock:         <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    edit:          <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    layout:        <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    package:       <svg {...p}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    whatsapp:      <svg {...p} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    menu:          <svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
    x:             <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    refresh:       <svg {...p}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
    chevronDown:   <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
    alertTriangle: <svg {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  };
  return icons[name] || null;
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 cursor-pointer" aria-label="DG Solutions">
      <Image src="/IMAGES/LOGO1.png" alt="DG Solutions" width={48} height={48} className="object-contain md:h-12 md:w-12" />
      <div className="leading-none">
        <p className="text-[20px] font-black tracking-[-0.08em] text-[var(--color-primary-logo)] md:text-[24px]">DG SOLUTIONS</p>
        <p className="mt-[3px] text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--color-primary-accent)]/60 md:text-[10.5px]">Hazlo Simple. Hazlo Inteligente.</p>
      </div>
    </Link>
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-body)] transition-colors hover:text-[var(--color-primary)] cursor-pointer">{label}</Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !px-7 !py-3.5 !text-[14px]">
            <Icon name="whatsapp" size={16} /> WhatsApp
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-white md:hidden cursor-pointer" aria-label="Menú" aria-expanded={open}>
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </div>
      <div
        className="border-t border-[var(--color-section-border)] bg-white md:hidden"
        style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 220ms ease-out" }}>
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="flex flex-col gap-1 px-6 py-5" style={{ opacity: open ? 1 : 0, transition: "opacity 150ms ease-out" }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[14px] font-bold text-[var(--color-text-main)] hover:bg-[var(--color-primary-muted)] hover:text-[var(--color-primary)] cursor-pointer">{label}</Link>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-4 text-[14px] font-black text-white cursor-pointer">
              <Icon name="whatsapp" size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[72vh] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,var(--gradient-1) 0%,var(--gradient-2) 38%,var(--gradient-3) 65%,var(--gradient-4) 100%)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="dw dw4" /><div className="dw dw5" />
        <div className="dw dw3" /><div className="dw dw2" /><div className="dw dw1" />
      </div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 55%,rgba(255,255,255,.28) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(196,181,253,.35) 0%,transparent 45%)" }} />
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-12 lg:px-20 pt-28 pb-20 text-center">
        <motion.div {...fadeUp}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-5 py-2.5 text-[12px] font-bold text-[var(--color-primary-dark)] backdrop-blur-sm">
            <Icon name="package" size={13} className="text-[var(--color-primary)]" />
            Listas para usar desde el primer día
          </div>
          <h1 className="mx-auto max-w-[760px] text-[46px] font-black leading-[.92] tracking-[-0.06em] text-[var(--color-text-main)] md:text-[68px] lg:text-[86px]">
            Herramientas listas para usar
          </h1>
          <p className="mx-auto mt-7 max-w-[580px] text-[18px] leading-[1.7] text-[var(--color-text-body)]/80">
            Plantillas diseñadas para negocios reales, listas para implementar desde el primer día.
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function ProblemsBlock() {
  const problems = [
    "Se te pierden pedidos entre mensajes de WhatsApp.",
    "No sabes con claridad cuánto entra y cuánto sale.",
    "Tu inventario físico no coincide con tus registros.",
    "Olvidas dar seguimiento a clientes o citas.",
    "Tienes información importante repartida entre notas, libretas y archivos.",
  ];
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20" style={{ background: "linear-gradient(180deg,var(--color-primary-muted) 0%,white 100%)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[36px] font-black leading-[1.08] tracking-[-0.05em] text-[var(--color-text-main)] md:text-[48px]">
              ¿Te pasa algo de esto?
            </h2>
            <p className="mt-5 text-[18px] leading-[1.7] text-[var(--color-text-secondary)]">
              Muchos negocios pierden ventas, tiempo y dinero por falta de organización. No porque no trabajen duro, sino porque no tienen las herramientas correctas.
            </p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 rounded-2xl border border-[var(--color-primary-border)] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(77,47,191,.05)]"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-orange-bg)]">
                  <Icon name="alertTriangle" size={12} className="text-[var(--color-orange-accent)]" />
                </span>
                <span className="text-[15px] leading-[1.55] text-[var(--color-text-body)]">{problem}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const templates = [
  {
    icon: "layers",
    name: "Control de pedidos",
    tagline: "No pierdas pedidos ni seguimiento de clientes.",
    description: "Ideal para negocios que reciben pedidos por WhatsApp, Facebook o de forma manual y necesitan tener todo organizado en un solo lugar.",
    benefits: [
      "Visualiza pedidos pendientes, en proceso y entregados.",
      "Consulta los datos del cliente junto a cada pedido.",
      "Reduce errores, olvidos y entregas atrasadas.",
    ],
    imageSrc: "/IMAGES/plantillas/control-pedidos.png",
    detailsHref: "/plantillas/control-de-pedidos",
    color: "var(--color-primary-accent)",
    bg: "var(--color-primary-muted)",
    border: "var(--color-primary-border)",
  },
  {
    icon: "trending",
    name: "Registro de ingresos y gastos",
    tagline: "Entiende cuánto entra, cuánto sale y qué tan rentable es tu negocio.",
    description: "Pensada para emprendedores y pequeños negocios que necesitan claridad financiera sin usar sistemas complicados.",
    benefits: [
      "Registra ingresos y gastos por categoría.",
      "Consulta un resumen mensual automático.",
      "Identifica si tu negocio realmente está generando utilidad.",
    ],
    imageSrc: "/IMAGES/plantillas/ingresos-gastos.png",
    detailsHref: "/plantillas/ingresos-y-gastos",
    color: "var(--color-success)",
    bg: "var(--color-success-bg)",
    border: "var(--color-success-border)",
  },
  {
    icon: "clock",
    name: "Control de servicios / agenda",
    tagline: "Nunca vuelvas a olvidar una cita o servicio pendiente.",
    description: "Para prestadores de servicios que necesitan organizar fechas, clientes, horarios y disponibilidad desde una sola herramienta.",
    benefits: [
      "Organiza citas por fecha, cliente y estado.",
      "Visualiza tu ocupación semanal.",
      "Da seguimiento a servicios agendados, completados o cancelados.",
    ],
    imageSrc: "/IMAGES/plantillas/agenda-servicios.png",
    detailsHref: "/plantillas/agenda-servicios",
    color: "var(--color-blue-accent)",
    bg: "var(--color-blue-bg)",
    border: "var(--color-blue-border)",
  },
  {
    icon: "package",
    name: "Inventario inteligente",
    tagline: "Conoce exactamente qué tienes, qué falta y qué necesitas comprar.",
    description: "Para negocios con productos físicos que necesitan controlar entradas, salidas, proveedores y diferencias entre inventario físico y digital.",
    benefits: [
      "Detecta faltantes y diferencias de inventario.",
      "Recibe alertas de stock bajo.",
      "Controla entradas, salidas y proveedores.",
    ],
    imageSrc: "/IMAGES/plantillas/inventario.png",
    detailsHref: "/plantillas/inventario",
    color: "var(--color-orange-accent)",
    bg: "var(--color-orange-bg)",
    border: "var(--color-orange-border)",
  },
];

function TemplateCard({ template, index }) {
  const [imgError, setImgError] = useState(false);
  const { icon, name, tagline, description, benefits, imageSrc, detailsHref, color, bg, border } = template;
  const waText = encodeURIComponent(`Hola, me interesa la plantilla "${name}"`);
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col overflow-hidden rounded-[28px] border bg-white hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(107,33,168,.1)]"
      style={{ borderColor: border, transition: "transform 300ms ease-out, box-shadow 300ms ease-out" }}
    >
      <div className="relative aspect-video overflow-hidden">
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={`Vista previa - ${name}`}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: bg }}>
            <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-white/50" style={{ color }}>
              <Icon name={icon} size={32} />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-8 pt-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px]" style={{ background: bg, color }}>
            <Icon name={icon} size={20} />
          </div>
          <h3 className="text-[19px] font-black tracking-[-0.03em] text-[var(--color-text-main)]">{name}</h3>
        </div>
        <p className="text-[17px] font-bold leading-[1.35] tracking-[-0.01em]" style={{ color }}>{tagline}</p>
        <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">{description}</p>
        <div className="mt-5 flex-1 space-y-2.5">
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 text-[14px] text-[var(--color-text-body)]">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary-muted)]">
                <Icon name="check" size={11} className="text-[var(--color-primary-accent)]" />
              </span>
              {b}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={detailsHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-primary-border)] px-5 py-3.5 text-[13px] font-black text-[var(--color-primary-accent)] transition-colors hover:bg-[var(--color-primary-muted)] cursor-pointer"
          >
            Ver detalles <Icon name="arrow" size={14} />
          </Link>
          <a
            href={`${WHATSAPP_URL}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !flex-1 !py-3.5 !text-[13px]"
          >
            <Icon name="whatsapp" size={14} /> Solicitar
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Templates() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-16">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[var(--color-success)]">Plantillas disponibles</p>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[52px]">
            Soluciones para organizar tu negocio
          </h2>
          <p className="mt-5 text-[18px] leading-[1.65] text-[var(--color-text-secondary)]">
            Deja de perder tiempo entre mensajes, notas y hojas desordenadas. Elige el problema que quieres resolver y empieza con una herramienta lista para usar desde el primer día.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((t, i) => <TemplateCard key={t.name} template={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const galleryItems = [
  { src: "/IMAGES/plantillas/dashboard-general.png",   label: "Dashboard general",    icon: "layout",   bg: "var(--color-primary-muted)", color: "var(--color-primary-accent)" },
  { src: "/IMAGES/plantillas/registro-datos.png",      label: "Registro de datos",    icon: "edit",     bg: "var(--color-blue-bg)",       color: "var(--color-blue-accent)"    },
  { src: "/IMAGES/plantillas/seguimiento.png",         label: "Vista de seguimiento", icon: "trending", bg: "var(--color-success-bg)",    color: "var(--color-success)"        },
  { src: "/IMAGES/plantillas/resumen-automatico.png",  label: "Resumen automático",   icon: "zap",      bg: "var(--color-orange-bg)",     color: "var(--color-orange-accent)"  },
];

function GalleryItem({ item, index }) {
  const [imgError, setImgError] = useState(false);
  const { src, label, icon, bg, color } = item;
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="overflow-hidden rounded-[24px] border border-[var(--color-primary-border)] bg-white shadow-[0_4px_24px_rgba(77,47,191,.07)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(77,47,191,.13)]">
        <div className="relative aspect-video overflow-hidden">
          {!imgError ? (
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3" style={{ background: bg }}>
              <div className="grid h-14 w-14 place-items-center rounded-[16px] bg-white/60" style={{ color }}>
                <Icon name={icon} size={28} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color }}>Vista previa próximamente</p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-[15px] font-bold text-[var(--color-text-main)]">{label}</p>
    </motion.div>
  );
}

function ScreenshotsGallery() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "var(--color-card-bg)" }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[680px] text-center mb-14">
          <h2 className="text-[36px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[48px]">
            ¿Cómo se ve por dentro?
          </h2>
          <p className="mt-5 text-[18px] leading-[1.65] text-[var(--color-text-secondary)]">
            Mira cómo funcionan las plantillas antes de solicitarlas.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2">
          {galleryItems.map((item, i) => <GalleryItem key={item.label} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const growthSteps = [
  { number: "01", title: "Elige una plantilla",   desc: "Implementa una herramienta lista para resolver un problema concreto." },
  { number: "02", title: "Personalízala",          desc: "Adaptamos campos, vistas y reportes a tu forma de trabajar."         },
  { number: "03", title: "Automatízala",           desc: "Conectamos formularios, alertas, dashboards o flujos internos."      },
  { number: "04", title: "Escálala a sistema",     desc: "Convertimos tu proceso en una solución más robusta para tu negocio." },
];

function GrowthPath() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-16">
          <h2 className="text-[36px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[48px]">
            Empieza simple. Escala cuando tu negocio lo necesite.
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.7] text-[var(--color-text-secondary)]">
            Puedes comenzar con una plantilla lista para usar y, cuando tu operación crezca, convertirla en un sistema personalizado con formularios, dashboards, automatizaciones e integraciones.
          </p>
        </motion.div>
        <div className="relative">
          <div
            className="absolute top-6 hidden h-[2px] bg-[var(--color-primary-border)] md:block"
            style={{ left: "12.5%", right: "12.5%" }}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-4">
            {growthSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center md:px-4"
              >
                <div className="relative z-10 mb-5 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-primary)] text-[15px] font-black text-white shadow-[0_4px_16px_rgba(77,47,191,.3)]">
                  {step.number}
                </div>
                <h4 className="text-[17px] font-black tracking-[-0.02em] text-[var(--color-text-main)]">{step.title}</h4>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-text-secondary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "¿Necesito saber usar Google Sheets o Excel?",
    a: "No necesitas ser experto. Las plantillas están pensadas para ser simples y fáciles de usar desde el primer día.",
  },
  {
    q: "¿Puedo pedir ajustes a una plantilla?",
    a: "Sí. Podemos adaptar campos, estados, reportes o vistas según la forma en que opera tu negocio.",
  },
  {
    q: "¿Las plantillas funcionan para cualquier giro?",
    a: "Funcionan especialmente bien para negocios pequeños de servicios, ventas, inventario, pedidos o atención a clientes.",
  },
  {
    q: "¿Pueden hacerme un sistema más avanzado?",
    a: "Sí. La plantilla puede ser el primer paso para después desarrollar una solución personalizada con automatizaciones e integraciones.",
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--color-primary-border)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-[17px] font-bold text-[var(--color-text-main)]">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <Icon name="chevronDown" size={20} className="text-[var(--color-primary)]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20" style={{ background: "var(--color-card-bg)" }}>
      <div className="mx-auto max-w-[860px]">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <h2 className="text-[36px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[48px]">
            Preguntas frecuentes
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="rounded-[28px] border border-[var(--color-primary-border)] bg-white px-8 py-2">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-12 pb-24 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,var(--color-primary-border) 0%,var(--color-blue-border) 100%)" }}>
      <motion.div {...fadeUp} className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[32px] px-8 py-20 text-center md:px-16"
        style={{ background: "linear-gradient(135deg,var(--color-primary-dark) 0%,var(--color-blue-accent) 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(139,92,246,.6) 0%,transparent 50%),radial-gradient(ellipse at 85% 30%,rgba(59,130,246,.4) 0%,transparent 40%)" }} />
        <div className="relative z-10 mx-auto max-w-[620px]">
          <h2 className="text-[34px] font-black leading-[1.05] tracking-[-0.055em] text-white md:text-[48px]">
            ¿No sabes cuál plantilla elegir?
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-[18px] leading-[1.65] text-white/75">
            Cuéntanos cómo trabajas actualmente y te ayudamos a elegir la herramienta más útil para ordenar tu operación.
          </p>
          <Link
            href="/#contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-[1.1rem] text-[15px] font-black text-[var(--color-primary-dark)] hover:bg-white/90 hover:scale-[1.03] cursor-pointer"
            style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out" }}
          >
            Agendar asesoría gratis <Icon name="arrow" size={17} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/#soluciones", label: "Soluciones" },
    { href: "/precios", label: "Precios" },
    { href: "/#contact", label: "Contacto" },
  ];
  return (
    <footer className="border-t border-[var(--color-primary-border)] bg-white px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-8 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer">{label}</Link>
          ))}
        </nav>
        <p className="text-[12px] text-[var(--color-text-muted)]">© 2026 DG Solutions. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default function PlantillasPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-[100dvh] scroll-smooth bg-white font-sans text-[var(--color-text-main)] antialiased selection:bg-[var(--color-primary)] selection:text-white overflow-x-hidden">
        <Header />
        <Hero />
        <ProblemsBlock />
        <Templates />
        <ScreenshotsGallery />
        <GrowthPath />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </MotionConfig>
  );
}
