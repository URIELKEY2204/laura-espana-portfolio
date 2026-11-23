import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laura España | Fotografía y video para marcas",
  description: "Fotografía de producto, contenido gastronómico y producción audiovisual para marcas, restaurantes y retail en Caracas. Explora el trabajo de Laura España y conversemos sobre tu proyecto.",
  metadataBase: new URL("https://snazzy-manatee-de4ef3.netlify.app"),
  robots: { index: false, follow: true },
  openGraph: {
    title: "Laura España — Contenido que muestra mejor lo que vendes",
    description: "Fotografía, video comercial y contenido visual para marcas.",
    type: "website",
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
