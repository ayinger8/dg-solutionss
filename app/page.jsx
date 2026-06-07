"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WHATSAPP_URL = "https://wa.me/526692291474";

const IMAGES = {
  sol1:    "/IMAGES/1.png",
  sol2:    "/IMAGES/2.png",
  sol3:    "/IMAGES/3.png",
  sol4:    null,
  contact: null,
  heroBg:  null,
  ctaBg:   null,
};

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const plans = [
  {
    title: "Ordena tu negocio",
    price: "$70",
    suffix: "/año · MXN",
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
    label: "Desde · MXN",
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
    label: "Desde · MXN",
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
  { title: "Ordena tu negocio", text: "Creamos herramientas para controlar ingresos y gastos, gestionar clientes y organizar pedidos o servicios en un solo lugar, sin depender de Excel o notas sueltas.", icon: "layers", img: IMAGES.sol1, accent: "var(--color-primary-accent)", bg: "var(--color-primary-muted)", placeholderColor: "var(--color-primary-border)" },
  { title: "Ahorra tiempo", text: "Configuramos automatizaciones simples como recordatorios, respuestas y procesos básicos para reducir trabajo manual y evitar errores en tu operación diaria.", icon: "clock", img: IMAGES.sol2, accent: "var(--color-success)", bg: "var(--color-success-bg)", placeholderColor: "var(--color-success-border)" },
  { title: "Trabaja más inteligente", text: "Implementamos herramientas con IA que te ayudan a generar mensajes, textos y documentos, además de darte soporte práctico para resolver tareas más rápido.", icon: "cpu", img: IMAGES.sol3, accent: "var(--color-blue-accent)", bg: "var(--color-blue-bg)", placeholderColor: "var(--color-blue-border)" },
  { title: "Haz que te encuentren", text: "Desarrollamos páginas web simples y efectivas con contacto directo por WhatsApp, para que tu negocio se vea profesional y sea fácil de contactar.", icon: "globe", img: IMAGES.sol4, accent: "var(--color-orange-accent)", bg: "var(--color-orange-bg)", placeholderColor: "var(--color-orange-border)" },
];

const problems = [
  { icon: "layers", title: "Todo disperso", desc: "Información en WhatsApp, Excel y notas sueltas. Imposible saber qué pasa en tu negocio.", color: "var(--color-primary-accent)", bg: "var(--color-primary-muted)" },
  { icon: "clock", title: "Tiempo perdido", desc: "Tareas repetitivas que consumen horas que podrías dedicar a crecer o descansar.", color: "var(--color-success)", bg: "var(--color-success-bg)" },
  { icon: "users", title: "Clientes perdidos", desc: "Sin seguimiento claro, las oportunidades de venta se escapan sin que te des cuenta.", color: "var(--color-blue-accent)", bg: "var(--color-blue-bg)" },
  { icon: "globe", title: "Sin presencia digital", desc: "Tus clientes no te encuentran en línea, y los que llegan no saben cómo contactarte.", color: "var(--color-orange-accent)", bg: "var(--color-orange-bg)" },
];


const BRAND_NAMES = ["whatsapp", "openai", "google", "notion", "meta", "stripe", "zapier", "airtable"];
const BRAND_LABELS = { whatsapp: "WhatsApp", openai: "OpenAI", google: "Google", notion: "Notion", meta: "Meta", stripe: "Stripe", zapier: "Zapier", airtable: "Airtable" };


function ImagePlaceholder({ color, icon, accent }) {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: color }}>
      <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-white/60">
        <Icon name={icon} size={36} className="opacity-40" style={{ color: accent }} />
      </div>
    </div>
  );
}

function BrandLogo({ name, size = 24 }) {
  const logos = {
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    openai:   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>,
    google:   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053z"/></svg>,
    notion:   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>,
    meta:     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.985 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-2.653.936a7.386 7.386 0 0 0-.466.402 5.768 5.768 0 0 0-.682.2c-.726-.63-1.715-1.074-2.952-1.074zm5.098 3.793c.328-.458.658-.866.99-1.207.5-.519 1.096-.888 1.817-.888.893 0 1.786.63 2.548 1.84 1.181 1.867 1.938 4.512 1.938 7.033 0 1.19-.176 2.003-.49 2.542a1.55 1.55 0 0 1-1.372.77c-.635 0-1.156-.199-1.773-.843-.543-.569-1.15-1.487-1.927-2.782l-2.391-3.999a22.161 22.161 0 0 0-.665-1.02c.1-.153.2-.305.325-.446zm-4.713 2.818c-.507.87-.971 1.667-1.402 2.35-1.273 2.03-1.843 2.696-2.583 3.028-.422.19-.795.274-1.15.274-.936 0-1.58-.495-2.013-1.2a5.57 5.57 0 0 1-.245-.498 5.63 5.63 0 0 1-.198-.7A8.725 8.725 0 0 1 .5 14.45c0-2.3.623-4.705 1.835-6.455C3.34 6.5 4.547 5.53 5.915 5.53c.97 0 1.62.42 2.172.932.428.39.794.873 1.148 1.41z"/></svg>,
    stripe:   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg>,
    zapier:   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13.2 12c0 .17-.007.339-.02.505l4.862 2.808a9.173 9.173 0 0 0 .895-3.313H13.2zm-.002-1.008h5.739a9.174 9.174 0 0 0-.891-3.312L13.18 10.49c.012.166.019.334.019.502zM12.507 13.18l-2.806 4.86a9.16 9.16 0 0 0 3.31.896v-5.74a5.62 5.62 0 0 1-.504.02v-.036zm-1.007 0c-.17 0-.34-.007-.505-.02l-2.808 4.862a9.172 9.172 0 0 0 3.313.895V13.18zm-1.005-.484l-4.86 2.806a9.16 9.16 0 0 0 2.392 2.39l2.808-4.862a5.618 5.618 0 0 1-.34-.334zm-.484-1.007a5.619 5.619 0 0 1-.02-.505H4.253a9.173 9.173 0 0 0 .895 3.313l4.862-2.808zm0-1.007c0-.17.007-.34.02-.506L5.168 7.318a9.172 9.172 0 0 0-.895 3.313H10.01zm.484-1.005c.108-.12.22-.231.34-.335L8.04 4.484a9.161 9.161 0 0 0-2.392 2.392l4.862 2.806c.004-.006.007-.011.011-.016h-.003zm1.007-.484c.165-.013.335-.02.504-.02v-5.74a9.173 9.173 0 0 0-3.312.895l2.808 4.865zm1.007 0l2.806-4.86a9.161 9.161 0 0 0-3.312-.895v5.74c.17 0 .34.007.506.015zm1.005.484l4.86-2.806a9.16 9.16 0 0 0-2.392-2.392l-2.808 4.862c.12.108.232.221.34.336zm.484 1.007h5.738a9.172 9.172 0 0 0-.895-3.313l-4.862 2.808c.013.165.02.335.02.505zm-2.506 2.49l2.808 4.862a9.161 9.161 0 0 0 2.392-2.391l-4.862-2.806c-.108.12-.22.232-.338.335z"/></svg>,
    airtable: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.955.592L.592 4.137a.55.55 0 0 0-.004 1.041l11.35 3.596a.55.55 0 0 0 .332 0l11.35-3.596a.55.55 0 0 0-.004-1.041L12.627.592a.55.55 0 0 0-.672 0zM.538 9.625l-.002.001a.55.55 0 0 0-.312.494v9.517a.55.55 0 0 0 .55.549.553.553 0 0 0 .177-.029l9.737-3.342a.55.55 0 0 0 .374-.521V6.777a.55.55 0 0 0-.727-.522L.538 9.625zm22.924.001l-9.8-3.371a.55.55 0 0 0-.727.522v9.517a.55.55 0 0 0 .374.52l9.737 3.343a.55.55 0 0 0 .727-.52V10.12a.55.55 0 0 0-.311-.494z"/></svg>,
  };
  return logos[name] || null;
}

function Icon({ name, size = 22, className = "", style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", className, style, "aria-hidden": "true" };
  const icons = {
    arrow:    <svg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    arrowUp:  <svg {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>,
    check:    <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>,
    globe:    <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>,
    refresh:  <svg {...p}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
    chevron:  <svg {...p}><path d="m6 9 6 6 6-6"/></svg>,
    x:        <svg {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    menu:     <svg {...p}><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>,
    layers:   <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users:    <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    trending: <svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    zap:      <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    cpu:      <svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    edit:     <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    clock:    <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mail:     <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    phone:    <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg>,
    layout:   <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    target:   <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    whatsapp: <svg {...p} fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  };
  return icons[name] || null;
}

function Logo() {
  return (
    <Link href="/#home" className="flex items-center gap-3 cursor-pointer" aria-label="DG Solutions">
      <Image src="/IMAGES/LOGO1.png" alt="DG Solutions" width={48} height={48} className="object-contain" />
      <div className="leading-none">
        <p className="text-[20px] font-black tracking-[-0.08em] text-[var(--color-primary-logo)] md:text-[24px]">DG SOLUTIONS</p>
        <p className="mt-[3px] text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--color-primary-accent)]/60 md:text-[10.5px]">Hazlo Simple. Hazlo Inteligente.</p>
      </div>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#soluciones", label: "Soluciones" },
    { href: "/precios", label: "Precios" },
    { href: "/#contact", label: "Contacto" },
  ];
  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full ${scrolled ? "bg-white/97 shadow-[0_1px_20px_rgba(0,0,0,.07)] backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"}`}
      style={{ transition: "background-color 300ms ease, box-shadow 300ms ease" }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {links.map(({ href, label }) => {
            const isActive = pathname === href.replace("/#home","").replace("/#soluciones","").replace("/#contact","") || (href === "/precios" && pathname === "/precios");
            return (
              <Link key={href} href={href} aria-current={isActive ? "page" : undefined}
                className={`text-[12.5px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-body)] hover:text-[var(--color-primary)]"}`}>{label}</Link>
            );
          })}
          <Link href="/plantillas" aria-current={pathname === "/plantillas" ? "page" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-muted)] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[var(--color-primary-accent)] transition-colors hover:bg-[var(--color-primary-border)] cursor-pointer">
            <Icon name="layout" size={11} /> Plantillas
          </Link>
        </nav>
        <div className="hidden md:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary !px-7 !py-3.5 !text-[14px]">
            <Icon name="whatsapp" size={16} /> WhatsApp
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-primary)] text-white md:hidden cursor-pointer" aria-label="Menú" aria-expanded={open}>
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </div>
      <div
        className="border-t border-[var(--color-section-border)] bg-white md:hidden"
        style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 220ms ease-out" }}>
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="flex flex-col gap-1 px-6 py-5"
            style={{ opacity: open ? 1 : 0, transition: "opacity 150ms ease-out" }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[14px] font-bold text-[var(--color-text-main)] hover:bg-[var(--color-primary-muted)] hover:text-[var(--color-primary)] cursor-pointer">{label}</Link>
            ))}
            <Link href="/plantillas" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[14px] font-bold text-[var(--color-primary-accent)] hover:bg-[var(--color-primary-muted)] cursor-pointer">Plantillas →</Link>
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
    <section id="home" className="relative overflow-hidden min-h-[100dvh] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,var(--gradient-1) 0%,var(--gradient-2) 38%,var(--gradient-3) 65%,var(--gradient-4) 100%)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="dw dw4" /><div className="dw dw5" />
        <div className="dw dw3" /><div className="dw dw2" /><div className="dw dw1" />
      </div>
      {IMAGES.heroBg && (
        <div className="absolute inset-0 opacity-10">
          <Image src={IMAGES.heroBg} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 55%,rgba(255,255,255,.28) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(196,181,253,.35) 0%,transparent 45%)" }} />

      {/* Floating card izquierda */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
        aria-hidden="true"
        className="float-a pointer-events-none absolute left-[2%] top-[30%] hidden w-[190px] select-none lg:block p-1 rounded-[18px] bg-white/25 ring-1 ring-black/8 shadow-[0_4px_16px_rgba(107,33,168,.06)]">
        <div className="rounded-[14px] bg-white/85 p-4 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,.6)]">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Pedidos hoy</p>
        <p className="mt-1 text-[28px] font-black leading-none text-[var(--color-primary)]">24</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
          <p className="text-[11px] font-semibold text-[var(--color-success)]">+12% vs ayer</p>
        </div>
        <div className="mt-3 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-[var(--color-primary-border)]" style={{ height: `${h * 0.28}px` }} />
          ))}
        </div>
        </div>
      </motion.div>

      {/* Floating card derecha */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.4 }}
        aria-hidden="true"
        className="float-b pointer-events-none absolute right-[2%] top-[34%] hidden w-[188px] select-none lg:block p-1 rounded-[18px] bg-white/25 ring-1 ring-black/8 shadow-[0_4px_16px_rgba(107,33,168,.06)]">
        <div className="rounded-[14px] bg-white/85 p-4 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,.6)]">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-primary-border)] text-[var(--color-primary-accent)]">
            <Icon name="users" size={14} />
          </div>
          <div>
            <p className="text-[11px] font-black text-[var(--color-text-main)]">Cliente nuevo</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">hace 2 min</p>
          </div>
        </div>
        <div className="mt-3 rounded-[10px] bg-[var(--color-primary-muted)] px-3 py-2">
          <p className="text-[11px] font-semibold text-[var(--color-primary)]">IA respondió automáticamente ✓</p>
        </div>
        </div>
      </motion.div>

      {/* Floating card abajo izquierda */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.4 }}
        aria-hidden="true"
        className="float-a pointer-events-none absolute bottom-[22%] left-[3%] hidden w-[172px] select-none lg:block p-1 rounded-[18px] bg-white/25 ring-1 ring-black/8 shadow-[0_4px_16px_rgba(107,33,168,.06)]">
        <div className="rounded-[14px] bg-white/85 p-4 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,.6)]">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Ingresos mes</p>
        <p className="mt-1 text-[20px] font-black leading-none text-[var(--color-text-main)]">$48,200</p>
        <p className="mt-1.5 text-[11px] font-semibold text-[var(--color-success)]">↑ Todo organizado</p>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 pt-28 pb-20 text-center">
        <motion.div {...fadeUp}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-5 py-2.5 text-[12px] font-bold text-[var(--color-primary-dark)] backdrop-blur-sm">
            <Icon name="zap" size={13} className="text-[var(--color-primary)]" />
            Herramientas digitales para negocios reales
          </div>
          <h1 className="mx-auto max-w-[780px] text-[52px] font-black leading-[.92] tracking-[-0.06em] text-[var(--color-text-main)] md:text-[76px] lg:text-[96px]" style={{ textWrap: "balance" }}>
            Organiza tu negocio y vende más fácil
          </h1>
          <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.7] text-[var(--color-text-body)]/80">
            Creamos herramientas simples y personalizadas para que tengas claridad, control y más clientes, sin complicaciones técnicas.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact"
              className="btn-primary !px-9 !py-[1.1rem] !text-[16px]">
              Solicitar Asesoría Gratis
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><Icon name="arrow" size={15} /></span>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="btn-secondary">
              <Icon name="whatsapp" size={17} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function IntegrationsStrip() {
  return (
    <section className="border-y border-[var(--color-section-border)] bg-white py-10 overflow-hidden" aria-label="Integraciones">
      <p className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6 px-6">
        Herramientas que conectamos para tu negocio
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max">
          <div className="marquee-track flex shrink-0 items-center gap-14 px-6" aria-hidden="true">
            {[...BRAND_NAMES, ...BRAND_NAMES, ...BRAND_NAMES, ...BRAND_NAMES].map((name, i) => (
              <div key={`${name}-${i}`} className="flex shrink-0 flex-col items-center gap-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-secondary)]">
                <BrandLogo name={name} size={24} />
                <span className="text-[10px] font-bold tracking-[0.05em]">{BRAND_LABELS[name]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-white px-6 py-32 md:px-12 lg:px-20" aria-label="Problemas comunes">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-success)]">El problema real</span>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[56px]">Tu negocio no necesita complicarse para crecer</h2>
          <p className="mt-5 text-[19px] text-[var(--color-text-secondary)]">La mayoría de los negocios pequeños tienen los mismos puntos de dolor. Nosotros los resolvemos con herramientas simples.</p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ icon, title, desc, color, bg }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}
              className="p-1 rounded-[24px] ring-1"
              style={{ background: bg + "18", ringColor: bg + "44" }}>
              <div className="rounded-[20px] p-7 h-full" style={{ background: bg + "33", boxShadow: "inset 0 1px 1px rgba(255,255,255,.5)" }}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px]" style={{ background: bg, color }}>
                <Icon name={icon} size={22} />
              </div>
              <h3 className="text-[17px] font-black text-[var(--color-text-main)]">{title}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="px-6 py-12 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg,var(--color-primary-border) 0%,var(--color-blue-border) 100%)" }} aria-label="Llamada a la acción">
      <motion.div {...fadeUp} className="mx-auto max-w-[1350px] p-2 rounded-[36px] ring-1 ring-white/20" style={{ background: "rgba(255,255,255,.08)" }}>
      <div className="relative overflow-hidden rounded-[32px] px-8 py-20 text-center md:px-16"
        style={{ background: "linear-gradient(135deg,var(--color-primary-dark) 0%,var(--color-blue-accent) 100%)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.12)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(139,92,246,.6) 0%,transparent 50%),radial-gradient(ellipse at 85% 30%,rgba(59,130,246,.4) 0%,transparent 40%)" }} />
        {IMAGES.ctaBg && (
          <div className="absolute inset-0 opacity-10 mix-blend-luminosity">
            <Image src={IMAGES.ctaBg} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-[720px]">
          <h2 className="text-[38px] font-black leading-[1.05] tracking-[-0.055em] text-white md:text-[64px] lg:text-[72px]">Primera Asesoría Gratis</h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[1.65] text-white/75">Revisamos tu caso, detectamos el desorden y te orientamos sobre el siguiente paso más útil para tu negocio.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-[1.1rem] text-[15px] font-black text-[var(--color-primary-dark)] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out" }}>
            Agendar asesoría gratis
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black/10"><Icon name="arrow" size={15} /></span>
          </a>
        </div>
      </div>
      </motion.div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="soluciones" className="bg-white px-6 py-32 md:px-12 lg:px-20" aria-label="Soluciones">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="mx-auto max-w-[760px] text-center mb-20">
          <h2 className="text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[56px]">Formas en las que mejoramos tu negocio</h2>
          <p className="mt-5 text-[19px] text-[var(--color-text-secondary)]">Soluciones simples para organizarte, ahorrar tiempo y vender más.</p>
        </motion.div>
        <div className="space-y-24">
          {/* Primeras 2 soluciones: zigzag */}
          {solutions.slice(0, 2).map(({ title, text, icon, img, accent, bg, placeholderColor }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`grid items-center gap-14 lg:grid-cols-2 ${i === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="p-1.5 rounded-[32px] ring-1 ring-black/6 shadow-[0_8px_32px_rgba(0,0,0,.07)]">
              <div className="relative overflow-hidden rounded-[26px]" style={{ aspectRatio: "16/10" }}>
                {img ? (
                  <Image src={img} alt={title} fill className="object-cover" loading="lazy" />
                ) : (
                  <ImagePlaceholder color={placeholderColor} icon={icon} accent={accent} />
                )}
                <div className="absolute inset-0 rounded-[26px]" style={{ background: `linear-gradient(135deg,${accent}25 0%,transparent 55%)` }} />
              </div>
              </div>
              <div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[18px]" style={{ background: bg, color: accent }}>
                  <Icon name={icon} size={26} />
                </div>
                <h3 className="text-[32px] font-black tracking-[-0.04em] text-[var(--color-text-main)] md:text-[40px]">{title}</h3>
                <p className="mt-4 text-[18px] leading-[1.75] text-[var(--color-text-secondary)]">{text}</p>
                <Link href="/precios"
                  className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[14px] font-black text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                  style={{ background: accent, transition: "transform 160ms ease-out, opacity 160ms ease-out" }}>
                  Ver precios
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20"><Icon name="arrow" size={13} /></span>
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Últimas 2 soluciones: grid de tarjetas para romper el zigzag */}
          <motion.div {...fadeUp} className="grid gap-8 md:grid-cols-2">
            {solutions.slice(2).map(({ title, text, icon, img, accent, bg, placeholderColor }) => (
              <div key={title} className="flex flex-col overflow-hidden rounded-[28px] border border-[var(--color-section-border)] shadow-[0_8px_40px_rgba(0,0,0,.06)]">
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  {img ? (
                    <Image src={img} alt={title} fill className="object-cover" loading="lazy" />
                  ) : (
                    <ImagePlaceholder color={placeholderColor} icon={icon} accent={accent} />
                  )}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${accent}20 0%,transparent 55%)` }} />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[16px]" style={{ background: bg, color: accent }}>
                    <Icon name={icon} size={22} />
                  </div>
                  <h3 className="text-[24px] font-black tracking-[-0.04em] text-[var(--color-text-main)]">{title}</h3>
                  <p className="mt-3 flex-1 text-[16px] leading-[1.75] text-[var(--color-text-secondary)]">{text}</p>
                  <Link href="/precios"
                    className="mt-6 inline-flex items-center gap-2 text-[14px] font-black transition-opacity hover:opacity-75 cursor-pointer"
                    style={{ color: accent }}>
                    Ver precios
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-current/10"><Icon name="arrow" size={13} /></span>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Antes tardaba horas llevando mis pedidos en Excel. Con DG Solutions lo tengo todo organizado y sé exactamente cuánto gané cada semana.",
    name: "Carlos M.",
    business: "Taller de herrería, Mazatlán",
  },
  {
    quote: "El chatbot de WhatsApp responde a mis clientes automáticamente. Mis ventas subieron porque ya no pierdo pedidos por no contestar.",
    name: "Laura R.",
    business: "Boutique de ropa, Culiacán",
  },
  {
    quote: "Me hicieron una página web sencilla y en dos semanas ya tenía clientes nuevos que me encontraron en Google. No esperaba resultados tan rápidos.",
    name: "Roberto G.",
    business: "Servicio de limpieza, CDMX",
  },
];

function TestimonialsSection() {
  return (
    <section className="px-6 py-32 md:px-12 lg:px-20 bg-[var(--color-primary-muted)]" aria-label="Testimonios">
      <div className="mx-auto max-w-[1400px]">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-[var(--color-primary-border)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary-accent)]">Clientes</span>
          <h2 className="mt-4 text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[52px]">Lo que dicen quienes ya lo usan</h2>
          <p className="mt-4 text-[18px] text-[var(--color-text-secondary)]">Negocios reales en México que ya están organizados.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, business }, i) => (
            <motion.div key={name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-[24px] border border-[var(--color-primary-border)] bg-white p-8">
              <p className="flex-1 text-[16px] leading-[1.8] text-[var(--color-text-body)]">&#x201C;{quote}&#x201D;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-primary-border)] pt-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[14px] font-black text-white">
                  {name[0]}
                </div>
                <div>
                  <p className="text-[14px] font-black text-[var(--color-text-main)]">{name}</p>
                  <p className="text-[12px] text-[var(--color-text-muted)]">{business}</p>
                </div>
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
    <motion.div {...fadeUp} transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
      className={`relative p-1 rounded-[30px] ${g ? "shadow-[0_28px_70px_rgba(107,33,168,.25)]" : "ring-1 ring-[var(--color-primary-border)]"}`}
      style={g ? { background: "linear-gradient(135deg,var(--color-primary-accent) 0%,var(--color-blue-accent) 100%)" } : { background: "transparent" }}>
    <div className={`relative flex flex-col rounded-[27px] p-9 h-full ${g ? "" : "bg-[var(--color-card-bg)]"}`}
      style={g ? { background: "linear-gradient(135deg,rgba(123,92,229,.9) 0%,rgba(91,124,250,.9) 100%)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.25)" } : {}}>
      {plan.popular && <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-yellow-popular)] px-6 py-2.5 text-[13px] font-black text-[var(--color-text-main)]">★ Popular</span>}
      <h3 className={`text-[26px] font-black leading-[1.2] tracking-[-0.04em] ${g ? "text-white" : "text-[var(--color-text-main)]"}`}>{plan.title}</h3>
      <p className={`mt-2 text-[14px] leading-[1.6] ${g ? "text-white/80" : "text-[var(--color-text-secondary)]"}`}>{plan.desc}</p>
      <div className="mt-7 flex items-end gap-2">
        {plan.oldPrice && <span className={`pb-1.5 text-[22px] font-semibold line-through ${g ? "text-white/50" : "text-[var(--color-text-muted)]"}`}>{plan.oldPrice}</span>}
        <span className={`text-[52px] font-black leading-none tracking-[-0.06em] tabular-nums ${g ? "text-white" : "text-[var(--color-primary)]"}`}>{plan.price}</span>
        {plan.suffix && <span className={`pb-1.5 text-[16px] font-semibold ${g ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{plan.suffix}</span>}
      </div>
      {plan.label && <p className={`mt-1 text-[13px] font-semibold ${g ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{plan.label}</p>}
      <div className="mt-8 flex-1 space-y-4">
        {plan.features.map(({ icon, text }) => (
          <div key={text} className={`flex items-center gap-3.5 text-[15px] font-medium ${g ? "text-white/90" : "text-[var(--color-text-body)]"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${g ? "bg-white/20" : "bg-[var(--color-primary-border)]"}`}>
              <Icon name={icon} size={15} className={g ? "text-white" : "text-[var(--color-primary-accent)]"} />
            </span>
            {text}
          </div>
        ))}
      </div>
      <Link href="/precios"
        className={`mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full py-4 text-[14px] font-black hover:scale-[1.02] active:scale-[0.97] cursor-pointer ${g ? "bg-white text-[var(--color-primary)] hover:bg-white/90" : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)]"}`}
        style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out, box-shadow 200ms ease-out" }}>
        Ver detalle
        <span className={`grid h-6 w-6 place-items-center rounded-full ${g ? "bg-[var(--color-primary)]/15" : "bg-white/20"}`}><Icon name="arrow" size={13} /></span>
      </Link>
    </div>
    </motion.div>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-32 md:px-12 lg:px-20" style={{ background: "linear-gradient(180deg,var(--color-card-bg) 0%,var(--color-blue-bg) 100%)" }} aria-label="Precios">
      <motion.div {...fadeUp} className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-success)]">Precios</span>
          <h2 className="mx-auto mt-4 max-w-[780px] text-[38px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[56px]">Opciones pensadas para que preguntar no dé miedo</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[19px] leading-[1.5] text-[var(--color-text-secondary)]">Te damos una referencia simple y la primera asesoría es gratis.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1200px] gap-6 md:grid-cols-3">
          {plans.map((plan, i) => <PricingCard key={plan.title} plan={plan} index={i} />)}
        </div>
        <p className="mx-auto mt-8 max-w-[880px] text-center text-[13px] leading-[1.8] text-[var(--color-text-muted)]">
          Los precios son referenciales y pueden variar según las necesidades de cada negocio. El alcance, tiempos y entregables se definen después del diagnóstico inicial. La asesoría gratis es informativa y no incluye implementación.
        </p>
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="bg-white px-6 py-32 md:px-12 lg:px-20" aria-label="Preguntas frecuentes">
      <motion.div {...fadeUp} className="mx-auto max-w-[860px]">
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-muted)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary-accent)]">FAQ</span>
          <h2 className="mt-4 text-[32px] font-black tracking-[-0.055em] text-[var(--color-text-main)] md:text-[44px]">Preguntas frecuentes</h2>
          <p className="mt-4 text-[17px] text-[var(--color-text-secondary)]">Las dudas que casi todos tienen antes de agendar su primera asesoría.</p>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={q}
              className={`rounded-[20px] border ${openIndex === i ? "border-[var(--color-primary-border)] bg-[var(--color-card-bg)] shadow-[0_8px_32px_rgba(107,33,168,.08)]" : "border-[var(--color-section-border)] bg-white hover:border-[var(--color-primary-border)]"}`}
              style={{ transition: "border-color 150ms ease, box-shadow 150ms ease" }}>
              <button aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left cursor-pointer">
                <span className="text-[16px] font-bold text-[var(--color-text-main)]">{q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${openIndex === i ? "bg-[var(--color-primary)] text-white rotate-180" : "bg-[var(--color-primary-muted)] text-[var(--color-primary)]"}`}
                  style={{ transition: "transform 200ms ease-out, background-color 150ms ease, color 150ms ease" }}>
                  <Icon name="chevron" size={16} />
                </span>
              </button>
              <div style={{ display: "grid", gridTemplateRows: openIndex === i ? "1fr" : "0fr", transition: "grid-template-rows 200ms ease-out" }}>
                <div style={{ overflow: "hidden", minHeight: 0 }}>
                  <p className="px-7 pb-6 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]"
                    style={{ opacity: openIndex === i ? 1 : 0, transition: "opacity 150ms ease-out" }}>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      const ok = Math.random() > 0.05;
      setStatus(ok ? "sent" : "error");
    }, 1200);
  };
  const contactItems = [
    { icon: "phone", label: "WhatsApp", value: "669 229 1474" },
    { icon: "mail", label: "Email", value: "dg.solutions.contacto@gmail.com" },
    { icon: "globe", label: "Cobertura", value: "Todo México, atendemos en línea" },
  ];
  return (
    <section id="contact" className="px-6 py-20 md:px-12 md:py-24 lg:px-20" style={{ background: "linear-gradient(135deg,var(--color-card-bg) 0%,var(--color-blue-bg) 100%)" }} aria-label="Contacto">
      <motion.div {...fadeUp} className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-muted)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary-accent)]">Contacto</span>
          <h2 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.055em] text-[var(--color-text-main)] md:text-[44px]">Cuéntanos sobre tu negocio</h2>
          <p className="mt-4 max-w-[480px] text-[16px] leading-[1.7] text-[var(--color-text-secondary)]">Te ayudamos a entender qué necesitas y cómo organizar tu negocio de forma simple. La primera asesoría es gratis y sin compromiso.</p>
          <div className="mt-6 space-y-3">
            {contactItems.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[var(--color-primary-border)] text-[var(--color-primary-accent)]"><Icon name={icon} size={16} /></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
                  <p className="text-[14px] font-semibold text-[var(--color-text-main)] break-all">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-[var(--color-success)] px-7 py-3.5 text-[14px] font-black text-white hover:bg-[var(--color-success)]/90 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_8px_24px_rgba(37,211,102,.35)] cursor-pointer"
            style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out, box-shadow 200ms ease-out" }}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><Icon name="whatsapp" size={16} /></span> Escríbenos por WhatsApp
          </a>
        </div>
        <div className="rounded-[28px] border border-[var(--color-primary-border)] bg-white p-6 shadow-[0_8px_40px_rgba(107,33,168,.08)] md:p-7">
          {status === "sent" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center py-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-success-bg)]"><Icon name="check" size={26} className="text-[var(--color-success)]" /></div>
              <h3 className="mt-4 text-[22px] font-black text-[var(--color-text-main)]">¡Mensaje enviado!</h3>
              <p className="mt-2 text-[14px] text-[var(--color-text-secondary)]">Te respondemos pronto. También puedes escribirnos por WhatsApp.</p>
              <button onClick={() => { setStatus(""); setForm({ name: "", email: "", phone: "", message: "" }); }} className="mt-5 text-[13px] font-bold text-[var(--color-primary)] underline cursor-pointer">Enviar otro mensaje</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} role="alert"
                  className="mb-4 flex items-center gap-3 rounded-2xl border border-[var(--color-orange-border)] bg-[var(--color-orange-bg)] px-4 py-3 text-[13px] font-bold text-[var(--color-orange-accent)]">
                  <Icon name="x" size={15} />
                  <span>Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.</span>
                </motion.div>
              )}
              {[{ id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre", autoComplete: "name", required: true }, { id: "email", label: "Email", type: "email", placeholder: "tu@email.com", autoComplete: "email", required: true }].map(({ id, label, type, placeholder, autoComplete, required }) => (
                <div key={id} className="mb-3">
                  <label className="mb-1.5 block text-[13px] font-black text-[var(--color-text-main)]" htmlFor={id}>
                    {label}<span aria-hidden="true" className="ml-0.5 text-[var(--color-orange-accent)]">*</span>
                  </label>
                  <div className="p-0.5 rounded-2xl ring-1 ring-[var(--color-primary-border)] bg-[var(--color-card-bg)] focus-within:ring-2 focus-within:ring-[var(--color-primary-accent)]/50 transition duration-200" style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,.04)" }}>
                    <input id={id} name={id} type={type} required={required} autoComplete={autoComplete} spellCheck={id === "email" ? false : undefined} value={form[id]} onChange={handleChange} placeholder={placeholder}
                      className="w-full rounded-[14px] bg-transparent px-4 py-2.5 text-[16px] md:text-[15px] text-[var(--color-text-main)] outline-none focus:bg-white transition-colors duration-200 placeholder:text-[var(--color-text-light)]" />
                  </div>
                </div>
              ))}
              <div className="mb-3">
                <label className="mb-1.5 block text-[13px] font-black text-[var(--color-text-main)]" htmlFor="phone">
                  WhatsApp / Teléfono<span className="ml-1 text-[11px] font-normal text-[var(--color-text-muted)]">(opcional)</span>
                </label>
                <div className="p-0.5 rounded-2xl ring-1 ring-[var(--color-primary-border)] bg-[var(--color-card-bg)] focus-within:ring-2 focus-within:ring-[var(--color-primary-accent)]/50 transition duration-200" style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,.04)" }}>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="Ej. 669 229 1474"
                    className="w-full rounded-[14px] bg-transparent px-4 py-2.5 text-[16px] md:text-[15px] text-[var(--color-text-main)] outline-none focus:bg-white transition-colors duration-200 placeholder:text-[var(--color-text-light)]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-1.5 block text-[13px] font-black text-[var(--color-text-main)]" htmlFor="message">
                  Mensaje<span aria-hidden="true" className="ml-0.5 text-[var(--color-orange-accent)]">*</span>
                </label>
                <div className="p-0.5 rounded-2xl ring-1 ring-[var(--color-primary-border)] bg-[var(--color-card-bg)] focus-within:ring-2 focus-within:ring-[var(--color-primary-accent)]/50 transition duration-200" style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,.04)" }}>
                  <textarea id="message" name="message" required autoComplete="off" value={form.message} onChange={handleChange} rows={4} placeholder="Cuéntanos qué necesitas o cómo funciona tu negocio…"
                    className="w-full rounded-[14px] bg-transparent px-4 py-2.5 text-[16px] md:text-[15px] text-[var(--color-text-main)] outline-none focus:bg-white transition-colors duration-200 placeholder:text-[var(--color-text-light)] resize-none" />
                </div>
              </div>
              <motion.button type="submit" disabled={status === "sending"} whileTap={{ scale: 0.97 }}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-8 py-4 text-[15px] font-black text-white hover:bg-[var(--color-primary-hover)] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(107,33,168,.3)] disabled:opacity-60 cursor-pointer"
                style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out, box-shadow 200ms ease-out" }}>
                {status === "sending" ? "Enviando…" : <><span>Enviar mensaje</span><span className="grid h-7 w-7 place-items-center rounded-full bg-white/20"><Icon name="arrow" size={15} /></span></>}
              </motion.button>
              <p className="mt-3 text-center text-[12px] text-[var(--color-text-muted)]">Te respondemos por WhatsApp o email en menos de 24&nbsp;h.</p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#soluciones", label: "Soluciones" },
    { href: "/precios", label: "Precios" },
    { href: "/plantillas", label: "Plantillas" },
    { href: "/#contact", label: "Contacto" },
  ];
  return (
    <footer className="border-t border-[var(--color-primary-border)] bg-white px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer transition-colors duration-150">{label}</Link>
          ))}
        </nav>
        <div className="text-center md:text-right">
          <p className="text-[12px] text-[var(--color-text-muted)]">© 2026 DG Solutions. Todos los derechos reservados.</p>
          <p className="mt-1 text-[11px] text-[var(--color-text-light)]">Mazatlán, Sinaloa - Todo México</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_8px_24px_rgba(107,33,168,.35)] hover:bg-[var(--color-primary-hover)] hover:scale-[1.08] cursor-pointer"
          style={{ transition: "transform 160ms ease-out, background-color 160ms ease-out" }}
          aria-label="Volver arriba">
          <Icon name="arrowUp" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DG Solutions",
  description:
    "Automatización, inteligencia artificial y herramientas digitales para pequeños negocios en Mazatlán, Sinaloa y todo México.",
  url: "https://dg-solutions-web.vercel.app",
  telephone: "+526692291474",
  email: "dg.solutions.contacto@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mazatlán",
    addressRegion: "Sinaloa",
    addressCountry: "MX",
  },
  areaServed: { "@type": "Country", name: "México" },
  serviceType: [
    "Automatización de negocios",
    "Inteligencia Artificial para negocios",
    "Herramientas digitales personalizadas",
    "Desarrollo de páginas web",
    "Chatbots WhatsApp",
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function DGSolutionsV4() {
  return (
    <MotionConfig reducedMotion="user">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="overflow-x-hidden w-full min-h-[100dvh] scroll-smooth bg-white font-sans text-[var(--color-text-main)] antialiased selection:bg-[var(--color-primary)] selection:text-white">
        <Header />
        <Hero />
        <IntegrationsStrip />
        <ProblemSection />
        <CTABanner />
        <SolutionsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQ />
        <ContactForm />
        <Footer />
        <ScrollToTop />
      </main>
    </MotionConfig>
  );
}
