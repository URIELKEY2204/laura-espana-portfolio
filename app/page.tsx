"use client";

import ProjectGallery from "./components/ProjectGallery";
import Documentary from "./components/Documentary";
import ContactIntake from "./components/ContactIntake";

const whatsapp = "https://wa.me/584242196550?text=" + encodeURIComponent("Hola Laura, vi tu portafolio y me gustaría conversar sobre una producción de contenido para mi marca.");
const services = [
  { n:"01", title:"Gastronomía y producto", body:"Haz que cada plato, producto y detalle despierte ganas de conocer tu negocio.", detail:"Restaurantes · Cafeterías · Retail" },
  { n:"02", title:"Contenido comercial", body:"Presenta tus lanzamientos, promociones y novedades con piezas que capten la atención desde el primer segundo.", detail:"Reels · Ads · Campañas" },
  { n:"03", title:"Cobertura de marca", body:"Muestra la energía de tu evento, tu espacio y la experiencia de marca que tus clientes se están perdiendo.", detail:"Eventos · Tiendas · Experiencias" },
  { n:"04", title:"Edición y postproducción", body:"Dale ritmo, intención y un acabado profesional a tu contenido para que destaque en cada plataforma.", detail:"Premiere Pro · After Effects · Color" },
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
       <h1>Tu marca tiene<br/>algo que <em>mostrar.</em><br/>Hagamos que<br/><strong>se vea.</strong></h1>
       <p>Fotografías y videos que hacen destacar tus productos, muestran la personalidad de tu marca y despiertan el interés de quienes quieres conquistar.</p>
       <div className="hero-actions">
        <a className="btn btn-dark" href="#trabajos">Explorar proyectos <span>↘</span></a>
        <a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Cuéntame tu idea <span>↗</span></a>
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
    <section id="trabajos" className="section work-section">
     <div className="wrap">
      <div className="section-head"><div><p className="eyebrow">01 / PORTAFOLIO</p><h2>El trabajo habla<br/><em>por sí mismo.</em></h2></div><p className="section-intro">Descubre cómo una buena imagen puede hacer irresistible un producto, comunicar una idea o darle vida a una experiencia.</p></div>
      <ProjectGallery/>
     </div>
    </section>
    <Documentary/>
    <section id="servicios" className="section services-section">
     <div className="wrap">
      <div className="section-head services-head"><div><p className="eyebrow">03 / QUÉ PUEDO HACER POR TU MARCA</p><h2>De una idea<br/>a una <em>imagen.</em></h2></div><p className="section-intro">Desde el primer vistazo hasta la decisión de compra: crea una presencia visual que haga destacar tu negocio.</p></div>
      <div className="service-grid">{services.map(s=><article className="service" key={s.n}><span className="service-n">{s.n} /</span><h3>{s.title}</h3><p>{s.body}</p><span className="service-detail">{s.detail}</span></article>)}</div>

     </div>
    </section>
    <section className="split-section" id="metodo">
      <div className="split-photo"><img src="/images/portraits/perfil2.webp" alt="Laura España durante su trabajo creativo" loading="lazy" /></div>
      <div className="split-copy"><div><p className="eyebrow">04 / MI FORMA DE TRABAJAR</p><h2>Las buenas imágenes empiezan <em>antes de grabar.</em></h2><p>Cada producción parte de lo que tu negocio quiere lograr: una idea clara, una imagen que destaque y contenido listo para comunicar.</p><ol className="steps"><li><span>01</span><div><strong>Entendemos el objetivo</strong><p>Conozco tu producto, tu público y lo que necesitas comunicar.</p></div></li><li><span>02</span><div><strong>Construimos la propuesta</strong><p>Definimos cómo mostrar tu marca para que cada imagen tenga intención.</p></div></li><li><span>03</span><div><strong>Producimos y entregamos</strong><p>Fotografías y videos listos para impactar en tus canales.</p></div></li></ol></div></div>
    </section>
    <section className="about-strip"><div className="wrap about-inner"><p className="eyebrow">SOBRE LA PERSONA DETRÁS DE LA CÁMARA</p><p>Hola, soy <strong>Laura España.</strong> Realizadora audiovisual y editora con experiencia en contenido para redes, fotografía de producto y producción comercial. Me gusta encontrar eso que hace especial a cada marca y convertirlo en imágenes que conecten con su público.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">Conversemos sobre tu marca ↗</a></div></section>
    <section id="contacto" className="contact-section"><div className="wrap contact-inner"><p className="eyebrow">05 / HABLEMOS</p><h2>¿Tu próximo proyecto<br/><em>lo hacemos juntos?</em></h2><p>Hablemos de lo que hace único a tu negocio y creemos imágenes que tus futuros clientes quieran mirar.</p><ContactIntake/><div className="contact-actions"><a className="btn btn-light" href={whatsapp} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <span>↗</span></a><a className="contact-email" href="mailto:lauraespana63@gmail.com?subject=Proyecto%20de%20contenido%20para%20mi%20marca">lauraespana63@gmail.com ↗</a></div><div className="contact-bottom"><span>Caracas · Venezuela</span><span>Disponible para colaboraciones comerciales</span></div></div></section>
   </main>
   <footer className="footer"><div className="wrap footer-inner"><a href="#inicio" className="footer-brand">LAURA ESPAÑA<span>.</span></a><span>Fotografía, video y dirección visual</span><a href="/privacidad/">Privacidad</a><span>© {new Date().getFullYear()} Laura España</span></div></footer>
  </>
 );
}
