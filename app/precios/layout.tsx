import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios y Planes de Automatización | DG Solutions",
  description:
    "Conoce los rangos de inversión para herramientas digitales, automatización e IA para tu negocio en México. Desde $400 MXN. Primera asesoría completamente gratis.",
  keywords: [
    "precios automatización negocios México",
    "planes herramientas digitales",
    "costo chatbot WhatsApp negocio",
    "cuánto cuesta automatizar negocio",
    "consultoría digital precio Mazatlán",
  ],
  alternates: { canonical: "https://dg-solutions-web.vercel.app/precios" },
  openGraph: {
    title: "Precios y Planes | DG Solutions",
    description:
      "Rangos de inversión para herramientas digitales y automatización para negocios en México. Desde $400 MXN. Primera asesoría gratis.",
    url: "https://dg-solutions-web.vercel.app/precios",
  },
  twitter: {
    title: "Precios y Planes | DG Solutions",
    description:
      "Rangos de inversión para herramientas digitales y automatización. Primera asesoría gratis.",
  },
};

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
