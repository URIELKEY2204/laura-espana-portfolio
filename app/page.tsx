"use client";

import { useMemo, useState } from "react";

type Category = "Todos" | "Producto" | "Comercial" | "Social" | "Eventos";
type Project = {
  title: string;
  category: Exclude<Category, "Todos">;
  client: string;
  description: string;
  image: string;
  video: string;
};
const oldMedia = "https://snazzy-manatee-de4ef3.netlify.app";
const whatsapp = "https://wa.me/584242196550?text=" + encodeURIComponent("Hola Laura, vi tu portafolio y me gustaría conversar sobre una producción de contenido para mi marca.");
const projects: Project[] = [
  { title: "Extractor de jugo", category: "Producto", client: "Producto · Video comercial", description: "Demostración audiovisual de producto para comunicar sus detalles y usos.", image: "/images/covers/extractor-de-jugo.png", video: "/videos/projects/Extraxtor de Jugo.mp4" },
  { title: "Camargo Fix Financiado", category: "Comercial", client: "Retail · Comunicación de producto", description: "Pieza audiovisual promocional para la comunicación digital de una marca.", image: "/images/covers/camargo-fix-financiado.png", video: "/videos/projects/Camargo Fix Financiado.mp4" },
  { title: "Alejandro Direccionario", category: "Comercial", client: "Contenido de marca", description: "Contenido de formato corto con un enfoque de narrativa comercial.", image: "/images/covers/alejandro-direccionario.png", video: "/videos/projects/Alejandro Direccionario.mp4" },
  { title: "Semana Rosa", category: "Social", client: "Campaña · Reels", description: "Pieza adaptada a los lenguajes y formatos de redes sociales.", image: "/images/covers/reels-semana-rosa.png", video: "/videos/projects/reels semana rosa.mp4" },
  { title: "Noticias, primera semana", category: "Social", client: "Comunicación digital", description: "Edición y estructura narrativa para información en formato audiovisual.", image: "/images/covers/noticias-1era-semana-marzo.png", video: "/videos/projects/Noticias 1era Semana Marzo.mp4" },
  { title: "Recap aniversario", category: "Eventos", client: "Cobertura · Experiencia de marca", description: "Síntesis audiovisual de un evento y su atmósfera.", image: "/images/covers/recap-aniversario.png", video: "/videos/projects/Recap Aniversario.mp4" },
];
const filters: Category[] = ["Todos", "Producto", "Comercial", "Social", "Eventos"];
const services = [
  { n:"01", title:"Gastronomía y producto", body:"Fotografía y video para presentar alimentos, objetos, texturas, detalles y experiencias de compra.", detail:"Restaurantes · Cafeterías · Retail" },
  { n:"02", title:"Contenido comercial", body:"Piezas audiovisuales para lanzamientos, campañas de temporada, promociones y catálogos digitales.", detail:"Reels · Ads · Campañas" },
  { n:"03", title:"Cobertura de marca", body:"Producción en locación para negocios, activaciones, espacios y eventos que merecen ser contados.", detail:"Eventos · Tiendas · Experiencias" },
  { n:"04", title:"Edición y postproducción", body:"Montaje, ritmo, corrección de color y versiones adaptadas a distintas plataformas.", detail:"Premiere Pro · After Effects · Color" },
];

export default function Home() {
 const [filter, setFilter] = useState<Category>("Todos");
 const visibleProjects = useMemo(() => filter === "Todos" ? projects : projects.filter(p => p.category === filter), [filter]);
 return (
  <>
   <a href="#contenido" className="skip-link">Saltar al contenido</a>
   <header className="site-header">
    <div className="wrap nav">
     <a className="brand" href="#inicio" aria-label="Laura España, ir al inicio">LAURA<span>ESPAÑA</span><i>.</i></a>
     <nav className="nav-links" aria-label="Navegación principal">
      <a href="#trabajos">Portafolio</a><a href="#servicios">Servicios</a><a href="#metodo">Cómo trabajo</a>
     </nav>
     <a className="nav-cta" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
    </div>
   </header>
   <main id="contenido">
    <section id="inicio" className="hero">
     <div className="wrap hero-grid">
      <div className="hero-copy">
       <span className="eyebrow"><span className="status-dot"/>Producción visual independiente · Caracas</span>
       <h1>Tu marca tiene<br/>algo que <em>mostrar.</em><br/>Hagamos que<br/><strong>se vea.</strong></h1>
       <p>Fotografía de producto, video comercial y contenido audiovisual para marcas que quieren comunicar con intención, estética y personalidad.</p>
       <div className="hero-actions">
        <a className="btn btn-dark" href="#trabajos">Explorar proyectos <span>↘</span></a>
        <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Cuéntame tu idea <span>↗</span></a>
       </div>
       <div className="hero-foot"><span>LAURA ESPAÑA</span><span>REALIZACIÓN · FOTOGRAFÍA · EDICIÓN</span></div>
      </div>
      <div className="hero-visual">
       <img src="/images/portraits/perfil1.jpg" alt="Retrato de Laura España" className="hero-portrait"/>
       <div className="visual-tint"/>
       <div className="hero-label"><span>UNA MIRADA PROPIA</span><strong>Para lo que vendes.<br/>Para lo que eres.</strong></div>
       <span className="hero-index">LE / 01</span>
      </div>
     </div>
    </section>
    <div className="ticker" aria-hidden="true"><div>ESTÉTICA CON PROPÓSITO <span>✳</span> CONTENIDO DE MARCA <span>✳</span> FOTOGRAFÍA + VIDEO <span>✳</span> ESTÉTICA CON PROPÓSITO <span>✳</span> CONTENIDO DE MARCA <span>✳</span></div></div>
    <section id="trabajos" className="section work-section">
     <div className="wrap">
      <div className="section-head"><div><p className="eyebrow">01 / PORTAFOLIO</p><h2>El trabajo habla<br/><em>por sí mismo.</em></h2></div><p className="section-intro">Una selección de proyectos audiovisuales reales. Explora los formatos y mira cómo una idea cobra vida en pantalla.</p></div>
      <div className="filters" aria-label="Filtrar proyectos">
       {filters.map(f=><button key={f} className={filter===f?"filter active":"filter"} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}<span>{f==="Todos"?String(projects.length).padStart(2,"0"):String(projects.filter(p=>p.category===f).length).padStart(2,"0")}</span></button>)}
      </div>
      <div className="project-grid" aria-live="polite">
       {visibleProjects.map((p,idx)=><article className="project" key={p.title}>
        <div className="project-media">
         <video controls playsInline preload="none" poster={p.image} aria-label={"Reproducir "+p.title}>
          <source src={oldMedia+encodeURI(p.video)} type="video/mp4"/>
          Tu navegador no soporta este video. <a href={oldMedia+encodeURI(p.video)}>Ver video</a>.
         </video>
         <span className="media-type">{p.category}</span>
        </div>
        <div className="project-meta"><div><p className="project-client">{p.client}</p><h3>{p.title}</h3><p>{p.description}</p></div><span className="project-number">{String(idx+1).padStart(2,"0")}</span></div>
       </article>)}
      </div>
      <div className="portfolio-more"><div><span className="asterisk">✳</span><h3>¿Quieres ver más?</h3><p>También puedes explorar otras producciones y colaboraciones audiovisuales.</p></div><a className="btn btn-outline" href={whatsapp} target="_blank" rel="noopener noreferrer">Solicitar más trabajos <span>↗</span></a></div>
     </div>
    </section>
    <section id="servicios" className="section services-section">
     <div className="wrap">
      <div className="section-head services-head"><div><p className="eyebrow">02 / QUÉ PUEDO HACER POR TU MARCA</p><h2>De una idea<br/>a una <em>imagen.</em></h2></div><p className="section-intro">Para un lanzamiento, un menú, una tienda o una campaña: el formato se elige según lo que tu negocio necesita comunicar.</p></div>
      <div className="service-grid">{services.map(s=><article className="service" key={s.n}><span className="service-n">{s.n} /</span><h3>{s.title}</h3><p>{s.body}</p><span className="service-detail">{s.detail}</span></article>)}</div>
      <p className="honesty-note">La selección de fotografía gastronómica de colaboraciones anteriores está en curaduría y validación de uso; se incorporará cuando estén confirmados sus créditos y permisos.</p>
     </div>
    </section>
    <section className="split-section" id="metodo">
      <div className="split-photo"><img src="/images/portraits/perfil2.jpg" alt="Laura España durante su trabajo creativo" loading="lazy" /></div>
      <div className="split-copy"><div><p className="eyebrow">03 / MI FORMA DE TRABAJAR</p><h2>Las buenas imágenes empiezan <em>antes de grabar.</em></h2><p>Escucho la necesidad de la marca, defino un enfoque visual y produzco piezas preparadas para los canales donde deben funcionar.</p><ol className="steps"><li><span>01</span><div><strong>Entendemos el objetivo</strong><p>Producto, público, canal y prioridad comercial.</p></div></li><li><span>02</span><div><strong>Construimos la propuesta</strong><p>Referencias, formato, planificación y dirección visual.</p></div></li><li><span>03</span><div><strong>Producimos y entregamos</strong><p>Captura, edición y formatos preparados para publicar.</p></div></li></ol></div></div>
    </section>
    <section className="about-strip"><div className="wrap about-inner"><p className="eyebrow">SOBRE LA PERSONA DETRÁS DE LA CÁMARA</p><p>Hola, soy <strong>Laura España.</strong> Realizadora audiovisual y editora con experiencia en contenido para redes, fotografía de producto y producción comercial. Combino narrativa, dirección visual y postproducción para traducir ideas en piezas concretas.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">Conversemos sobre tu marca ↗</a></div></section>
    <section id="contacto" className="contact-section"><div className="wrap contact-inner"><p className="eyebrow">04 / HABLEMOS</p><h2>¿Tu próximo proyecto<br/><em>lo hacemos juntos?</em></h2><p>Cuéntame qué vendes, qué quieres mostrar y dónde necesitas que tu contenido llegue.</p><div className="contact-actions"><a className="btn btn-light" href={whatsapp} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <span>↗</span></a><a className="contact-email" href="mailto:lauraespana63@gmail.com?subject=Proyecto%20de%20contenido%20para%20mi%20marca">lauraespana63@gmail.com ↗</a></div><div className="contact-bottom"><span>Caracas · Venezuela</span><span>Disponible para colaboraciones comerciales</span></div></div></section>
   </main>
   <footer className="footer"><div className="wrap footer-inner"><a href="#inicio" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad">Privacidad</a><span>© {new Date().getFullYear()} Laura España</span></div></footer>
  </>
 );
}
