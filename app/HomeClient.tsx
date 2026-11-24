"use client";
import SiteCredit from "./components/SiteCredit";
import ServicePreviewGallery from "./components/ServicePreviewGallery";
import {ApertureIcon,CameraSoundToggle} from "./components/CameraEffects";

import ProjectGallery from "./components/ProjectGallery";
import Documentary from "./components/Documentary";
import ContactIntake from "./components/ContactIntake";

const whatsapp = "https://wa.me/584242196550?text=" + encodeURIComponent("Hola Laura, vi tu portafolio y me gustaría conversar sobre una producción de contenido para mi marca.");

export default function Home() {
 return (
  <>
   <a href="#contenido" className="skip-link">Saltar al contenido</a>
   <header className="site-header">
    <div className="wrap nav">
     <a className="brand" href="#inicio" aria-label="Laura España, ir al inicio">LAURA<span>ESPAÑA</span><i>.</i></a>
     <nav className="nav-links" aria-label="Navegación principal">
      <a href="/portafolio/">Portafolio</a><a href="#servicios">Servicios</a><a href="#metodo">Cómo trabajo</a>
     </nav>
     <details className="mobile-menu"><summary>Menú</summary><nav aria-label="Menú móvil"><a href="/portafolio/">Portafolio</a><a href="#trabajos">Videos</a><a href="#servicios">Servicios</a><a href="#metodo">Cómo trabajo</a><a href="#contacto">Solicitar propuesta</a></nav></details>
     <a className="nav-cta" href="#contacto">Hablemos <ApertureIcon className="camera-aperture"/></a>
    </div>
   </header>
   <main id="contenido">
    <section id="inicio" className="hero">
     <div className="wrap hero-grid">
      <div className="hero-copy">
       <span className="eyebrow"><span className="status-dot"/>Caracas, Venezuela - Remoto</span>
       <h1>Fotografía y video<br/>para <em>empresas.</em></h1>
       <p>Producción audiovisual para restaurantes, comercios, marcas y agencias que necesitan contenido profesional para sus redes, campañas y canales digitales. Hablemos de proyectos puntuales o colaboraciones recurrentes.</p>
       <div className="hero-actions">
        <a className="btn btn-dark" href="#servicios">Conocer servicios <ApertureIcon className="camera-aperture"/></a>
        <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Conversemos por WhatsApp <span>↗</span></a>
       </div>
       <CameraSoundToggle/>
       <div className="hero-foot"><span>LAURA ESPAÑA</span><span>REALIZACIÓN · FOTOGRAFÍA · EDICIÓN</span></div>
      </div>
      <div className="hero-visual">
       <img src="/images/portraits/perfil1.webp" alt="Retrato de Laura España" className="hero-portrait"/>
       <div className="visual-tint"/>
       <div className="hero-label"><span>UNA MIRADA PROPIA</span><strong>Para lo que vendes.<br/>Para lo que eres.</strong></div>
       <span className="hero-index">LE / 01</span>
      </div>
     </div>
    </section>
    <nav className="ticker service-banner" aria-label="Servicios audiovisuales"><div className="service-banner-inner"><a href="/servicios/fotografia-gastronomica/">Fotografía gastronómica y de producto</a><span aria-hidden="true"><ApertureIcon/></span><a href="/servicios/video-comercial/">Video comercial</a><span aria-hidden="true"><ApertureIcon/></span><a href="#servicio-cobertura">Cobertura de marca</a><span aria-hidden="true"><ApertureIcon/></span><a href="/servicios/edicion-video/">Edición y postproducción</a></div></nav>
    <section id="servicios" className="section services-section">
     <div className="wrap">
      <div className="section-head services-head"><div><p className="eyebrow">SERVICIOS PARA EMPRESAS</p><h2>Contenido para tus<br/><em>necesidades reales.</em></h2></div><p className="section-intro">Contrata una producción puntual o conversa conmigo sobre un esquema de trabajo mensual, con entregables y plazos acordados.</p></div>
      <ServicePreviewGallery/>

     </div>
    </section>
    <section id="trabajos" className="section work-section">
     <div className="wrap">
      <div className="section-head"><div><p className="eyebrow">01 / PORTAFOLIO</p><h2>Trabajos para<br/><em>marcas y productos.</em></h2></div><p className="section-intro">Explora ejemplos de presentación de productos, comunicación de marca y contenido para canales digitales.</p></div>
      <ProjectGallery/>
     </div>
    </section>
    <section className="split-section" id="metodo">
      <div className="split-photo"><img src="/images/portraits/perfil2.webp" alt="Laura España durante su trabajo creativo" loading="lazy" /></div>
      <div className="split-copy"><div><p className="eyebrow">04 / MI FORMA DE TRABAJAR</p><h2>De la necesidad comercial <em>a la entrega.</em></h2><p>Cada proyecto comienza con un objetivo y un alcance acordado: qué necesitas comunicar, qué piezas necesitas y cuándo deben estar listas.</p><ol className="steps"><li><span>01</span><div><strong>Entendemos el objetivo</strong><p>Conozco tu producto, tu público y lo que necesitas comunicar.</p></div></li><li><span>02</span><div><strong>Construimos la propuesta</strong><p>Acordamos formatos, cantidad de piezas, plazos y revisiones antes de empezar.</p></div></li><li><span>03</span><div><strong>Producimos y entregamos</strong><p>Produzco y entrego el material en los formatos definidos para tus canales.</p></div></li></ol></div></div>
    </section>
    <Documentary/>
    <section className="about-strip"><div className="wrap about-inner"><p className="eyebrow">SOBRE LA PERSONA DETRÁS DE LA CÁMARA</p><p>Hola, soy <strong>Laura España.</strong> Realizadora audiovisual y editora con experiencia en contenido para redes, fotografía de producto y producción comercial. Me gusta encontrar eso que hace especial a cada marca y convertirlo en imágenes que conecten con su público.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">Conversemos sobre tu marca ↗</a></div></section>
    <section id="contacto" className="contact-section"><div className="wrap contact-inner"><p className="eyebrow">05 / HABLEMOS</p><h2>Solicita una propuesta<br/><em>para tu empresa.</em></h2><p>Cuéntame qué contenido necesitas y si buscas una producción puntual o apoyo audiovisual recurrente. Revisaremos el alcance antes de acordar una contratación.</p><p>Si buscas un servicio específico, explora <a href="/servicios/fotografia-gastronomica/">fotografía gastronómica</a>, <a href="/servicios/video-comercial/">video comercial</a> o <a href="/servicios/edicion-video/">edición de video</a>.</p><ContactIntake/><div className="contact-actions"><a className="btn btn-light" href={whatsapp} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <span>↗</span></a><a className="contact-email" href="mailto:lauraespana63@gmail.com?subject=Proyecto%20de%20contenido%20para%20mi%20marca">lauraespana63@gmail.com ↗</a></div><div className="contact-bottom"><span>Caracas · Venezuela</span><span>Proyectos puntuales y colaboraciones empresariales</span></div></div></section>
   </main>
   <footer className="footer"><div className="wrap footer-inner"><a href="#inicio" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad/">Privacidad</a><span>© {new Date().getFullYear()} Laura España</span></div><SiteCredit/></footer>
  </>
 );
}
