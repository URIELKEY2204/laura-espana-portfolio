import type { Metadata } from "next";
import ProjectGallery from "../components/ProjectGallery";
import Documentary from "../components/Documentary";
import FoodGallery from "../components/FoodGallery";

export const metadata: Metadata = {
  title: "Portafolio audiovisual | Laura España",
  description: "Fotografía y producciones audiovisuales para marcas que quieren destacar. Conoce los trabajos de Laura España y hablemos de tu próximo proyecto.",
  alternates: { canonical: "/portafolio/" },
};
export default function PortfolioPage() {
 return <>
  <header className="site-header"><div className="wrap nav"><a className="brand" href="/">LAURA<span>ESPAÑA</span><i>.</i></a><nav className="nav-links" aria-label="Navegación del portafolio"><a href="/">Inicio</a><a href="#gastronomia">Gastronomía</a><a href="#documental">Documental</a></nav><details className="mobile-menu"><summary>Menú</summary><nav aria-label="Menú móvil"><a href="/">Inicio</a><a href="#proyectos">Videos</a><a href="#gastronomia">Fotografía gastronómica</a><a href="#documental">Documental</a><a href="/#contacto">Contactar</a></nav></details><a className="nav-cta" href="/#contacto">Contactar ↗</a></div></header>
  <a className="skip-link" href="#contenido">Saltar al contenido</a><main id="contenido">
   <section className="portfolio-intro"><div className="wrap portfolio-intro-grid"><div className="portfolio-intro-copy"><p className="eyebrow">LAURA ESPAÑA / PORTAFOLIO</p><h1>Tu marca merece<br/><em>ser recordada.</em></h1><p>Transformo productos, espacios e ideas en fotografías y videos que conectan con tu público y hacen destacar lo que ofreces.</p><a className="btn btn-dark portfolio-hero-cta" href="#proyectos">Descubre mi trabajo <span>↘</span></a></div><div className="portfolio-intro-portrait"><img src="/images/portraits/perfil1.webp" alt="Retrato de Laura España, realizadora audiovisual" /><div className="portfolio-intro-portrait-label">LAURA ESPAÑA <span>REALIZACIÓN · FOTOGRAFÍA · EDICIÓN</span></div></div></div></section>
   <section id="proyectos" className="section work-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">01 / TRABAJOS DESTACADOS</p><h2>Ideas que se vuelven <em>imágenes.</em></h2></div><p className="section-intro">Cada proyecto es una oportunidad para mostrar una marca desde su mejor ángulo. Mira cómo la imagen puede trabajar a favor de tu negocio.</p></div><ProjectGallery full/></div></section>
   <section className="section food-section" id="gastronomia"><div className="wrap"><div className="section-head"><div><p className="eyebrow">FOTOGRAFÍA GASTRONÓMICA</p><h2>El sabor entra <em>por los ojos.</em></h2></div><p className="section-intro">Imágenes que despiertan el apetito y hacen que cada producto se convierta en una razón para visitar tu negocio.</p></div><FoodGallery/><div className="food-cta"><a className="btn btn-dark" href="/#contacto">Quiero fotografías para mi negocio ↗</a></div></div></section>
   <Documentary/>
   <section className="portfolio-contact"><div className="wrap"><p className="eyebrow">¿TRABAJAMOS JUNTOS?</p><h2>Tu producto tiene potencial.<br/><em>Hagamos que se note.</em></h2><a className="btn btn-light" href="/#contacto">Solicitar una propuesta ↗</a></div></section>
  </main>
  <footer className="footer"><div className="wrap footer-inner"><a href="/" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad/">Privacidad</a><span>© {new Date().getFullYear()} Laura España</span></div></footer>
 </>;
}
