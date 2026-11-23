import Link from "next/link";

export default function Privacidad() {
 return <main className="legal">
  <Link href="/" className="back">← Volver al portafolio</Link>
  <p className="eyebrow">Información legal</p>
  <h1>Privacidad y contacto</h1>
  <p>Esta página es un portafolio profesional de Laura España. No incorpora rastreadores publicitarios, cookies de analítica ni formularios de recopilación de datos.</p>
  <p>Si decides comunicarte por correo o WhatsApp, compartirás voluntariamente los datos que incluyas en tu mensaje. La conversación se gestionará únicamente para responder a tu consulta comercial y realizar el seguimiento solicitado. Para solicitar acceso, rectificación o eliminación de la información compartida, escribe a <a href="mailto:lauraespana63@gmail.com">lauraespana63@gmail.com</a>.</p>
  <p>Los enlaces a plataformas externas como WhatsApp y los reproductores de video pueden aplicar sus propias políticas de privacidad. Los videos procedentes del despliegue anterior de este portafolio se encuentran en el mismo servicio de alojamiento y están sujetos a la disponibilidad de esa versión.</p>
  <p>Esta política se revisará antes de incorporar formularios, herramientas de seguimiento o campañas publicitarias.</p>
 </main>;
}
