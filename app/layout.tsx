import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dg-solutions-web.vercel.app"),
  title: {
    default: "DG Solutions - Automatización e IA para negocios en México",
    template: "%s | DG Solutions",
  },
  description:
    "Automatización, inteligencia artificial y herramientas digitales para pequeños negocios en Mazatlán, Sinaloa y todo México. Primera consultoría gratis.",
  keywords: [
    "automatización para negocios en Mazatlán",
    "IA para negocios México",
    "chatbots WhatsApp negocios",
    "automatización de clientes",
    "herramientas digitales Mazatlán",
    "organizar negocio pequeño",
    "software negocios Sinaloa",
    "consultoría digital México",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dg-solutions-web.vercel.app" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://dg-solutions-web.vercel.app",
    siteName: "DG Solutions",
    title: "DG Solutions - Automatización e IA para negocios en México",
    description:
      "Herramientas digitales personalizadas para organizar tu negocio, ahorrar tiempo y conseguir más clientes. Primera consultoría completamente gratis.",
    images: [{ url: "/IMAGES/LOGO1.png", width: 512, height: 512, alt: "DG Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DG Solutions - Automatización e IA para negocios en México",
    description: "Herramientas digitales personalizadas para organizar tu negocio. Primera consultoría gratis.",
    images: ["/IMAGES/LOGO1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased text-text-main">
        {children}
      </body>
    </html>
  );
}
