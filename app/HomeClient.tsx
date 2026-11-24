"use client";

import ProjectGallery from "./components/ProjectGallery";
import Documentary from "./components/Documentary";
import ContactIntake from "./components/ContactIntake";

const whatsapp = "https://wa.me/584242196550?text=" + encodeURIComponent("Hola Laura, vi tu portafolio y me gustaría conversar sobre una producción de contenido para mi marca.");
const services = [
  { n:"01", title:"Gastronomía y producto", body:"Sesiones de fotografía para presentar productos, actualizar menús y preparar contenido para redes.", detail:"Restaurantes · Cafeterías · Retail", href:"/servicios/fotografia-gastronomica/" },
  { n:"02", title:"Contenido comercial", body:"Producciones para lanzamientos, demostraciones, anuncios y necesidades de contenido recurrente.", detail:"Reels · Ads · Campañas", href:"/servicios/video-comercial/" },
  { n:"03", title:"Cobertura de marca", body:"Registro audiovisual de eventos, espacios y activaciones para comunicar lo que sucede en tu marca.", detail:"Eventos · Tiendas · Experiencias", href:"/#contacto" },
  { n:"04", title:"Edición y postproducción", body:"Edición de material grabado para agencias, empresas y creadores que necesitan piezas listas para publicar.", detail:"Edición · Postproducción", href:"/servicios/edicion-video/" },
];

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
     <a className="nav-cta" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
    </div>
   </header>
   <main id="contenido">
    <section id="inicio" className="hero">
     <div className="wrap hero-grid">
      <div className="hero-copy">
       <span className="eyebrow"><span className="status-dot"/>Producción visual independiente · Caracas</span>
       <h1>Fotografía y video<br/>para <em>empresas.</em></h1>
       <p>Producción audiovisual para restaurantes, comercios, marcas y agencias que necesitan contenido profesional para sus redes, campañas y canales digitales. Hablemos de proyectos puntuales o colaboraciones recurrentes.</p>
       <div className="hero-actions">
        <a className="btn btn-dark" href="#servicios">Conocer servicios <span>↘</span></a>
        <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Conversemos por WhatsApp <span>↗</span></a>
       </div>
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
    <div className="ticker" aria-hidden="true"><div>ESTÉTICA CON PROPÓSITO <span>✳</span> CONTENIDO DE MARCA <span>✳</span> FOTOGRAFÍA + VIDEO <span>✳</span> ESTÉTICA CON PROPÓSITO <span>✳</span> CONTENIDO DE MARCA <span>✳</span></div></div>
    <section id="servicios" className="section services-section">
     <div className="wrap">
      <div className="section-head services-head"><div><p className="eyebrow">SERVICIOS PARA EMPRESAS</p><h2>Contenido para tus<br/><em>necesidades reales.</em></h2></div><p className="section-intro">Contrata una producción puntual o conversa conmigo sobre un esquema de trabajo mensual, con entregables y plazos acordados.</p></div>
      <div className="service-grid">{services.map(s=><article className="service" key={s.n}><span className="service-n">{s.n} /</span><h3>{s.title}</h3><p>{s.body}</p><span className="service-detail">{s.detail}</span><a className="text-link" href={s.href}>Conocer servicio ↗</a></article>)}</div>

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
   <footer className="footer"><div className="wrap footer-inner"><a href="#inicio" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad/">Privacidad</a><span>© {new Date().getFullYear()} Laura España</span></div></footer>
  </>
 );
}
