import type { Metadata } from "next";
import "./globals.css";
import {DM_Sans, Manrope} from "next/font/google";
const dm = DM_Sans({subsets:["latin"],variable:"--font-dm",display:"swap"});
const manrope = Manrope({subsets:["latin"],variable:"--font-manrope",display:"swap"});

export const metadata: Metadata = {
  title: "Laura España | Fotografía y video para marcas",
  description: "Fotografía gastronómica, video comercial y edición audiovisual para empresas, restaurantes y agencias. Proyectos puntuales y colaboraciones recurrentes según alcance.",
  metadataBase: new URL("https://snazzy-manatee-de4ef3.netlify.app"),
  robots: { index: true, follow: true },
  openGraph: {
    title: "Laura España — Contenido que muestra mejor lo que vendes",
    description: "Fotografía, video comercial y contenido visual para marcas.",
    type: "website",
    url: "https://snazzy-manatee-de4ef3.netlify.app/",
    images: [{url:"/images/portraits/perfil1.webp",width:1200,height:1800,alt:"Laura España — fotografía y video para marcas"}],
  },

};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={dm.variable+" "+manrope.variable}>{children}</body></html>;
}
