import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plantillas para Negocios: Pedidos, Clientes e Inventario | DG Solutions",
  description:
    "Herramientas listas para usar desde el primer día: control de pedidos, registro de ingresos, gestión de clientes, inventario y más. Para negocios pequeños en México.",
  keywords: [
    "plantillas negocios México",
    "control de pedidos gratis",
    "gestión clientes pequeño negocio",
    "registro ingresos gastos negocio",
    "herramientas organizar negocio Mazatlán",
  ],
  alternates: { canonical: "https://dg-solutions-web.vercel.app/plantillas" },
  openGraph: {
    title: "Plantillas para Negocios | DG Solutions",
    description:
      "Herramientas listas para usar: control de pedidos, clientes, ingresos e inventario para negocios pequeños en México.",
    url: "https://dg-solutions-web.vercel.app/plantillas",
  },
  twitter: {
    title: "Plantillas para Negocios | DG Solutions",
    description:
      "Herramientas listas para usar para negocios pequeños en México. Control de pedidos, clientes e inventario.",
  },
};

export default function PlantillasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
