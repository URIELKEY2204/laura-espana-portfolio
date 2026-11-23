import type { Metadata } from "next";
import ProjectGallery from "../components/ProjectGallery";
import Documentary from "../components/Documentary";

export const metadata: Metadata = {
  title: "Portafolio audiovisual | Laura España",
  description: "Fotografía y producciones audiovisuales para marcas que quieren destacar. Conoce los trabajos de Laura España y hablemos de tu próximo proyecto.",
};
export default function PortfolioPage() {
 return <>
  <header className="site-header"><div className="wrap nav"><a className="brand" href="/">LAURA<span>ESPAÑA</span><i>.</i></a><nav className="nav-links"><a href="/">Inicio</a><a href="#proyectos">Proyectos</a><a href="#documental">Documental</a></nav><a className="nav-cta" href="mailto:lauraespana63@gmail.com">Contactar ↗</a></div></header>
  <main>
   <section className="portfolio-intro"><div className="wrap portfolio-intro-grid"><div className="portfolio-intro-copy"><p className="eyebrow">LAURA ESPAÑA / PORTAFOLIO</p><h1>Tu marca merece<br/><em>ser recordada.</em></h1><p>Transformo productos, espacios e ideas en fotografías y videos que conectan con tu público y hacen destacar lo que ofreces.</p><a className="btn btn-dark portfolio-hero-cta" href="#proyectos">Descubre mi trabajo <span>↘</span></a></div><div className="portfolio-intro-portrait"><img src="/images/portraits/perfil1.jpg" alt="Retrato de Laura España, realizadora audiovisual" /><div className="portfolio-intro-portrait-label">LAURA ESPAÑA <span>REALIZACIÓN · FOTOGRAFÍA · EDICIÓN</span></div></div></div></section>
   <section id="proyectos" className="section work-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">01 / TRABAJOS DESTACADOS</p><h2>Ideas que se vuelven <em>imágenes.</em></h2></div><p className="section-intro">Cada proyecto es una oportunidad para mostrar una marca desde su mejor ángulo. Mira cómo la imagen puede trabajar a favor de tu negocio.</p></div><ProjectGallery full/></div></section>
   <Documentary/>
   <section className="portfolio-contact"><div className="wrap"><p className="eyebrow">¿TRABAJAMOS JUNTOS?</p><h2>Tu producto tiene potencial.<br/><em>Hagamos que se note.</em></h2><a className="btn btn-light" href="/#contacto">Solicitar una propuesta ↗</a></div></section>
  </main>
  <footer className="footer"><div className="wrap footer-inner"><a href="/" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad/">Privacidad</a><span>© 2026 Laura España</span></div></footer>
 </>;
}
