import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solicitud enviada | Laura España",
  robots: { index: false, follow: false }
};
export default function Gracias() {
  return <main className="legal">
    <a href="/" className="back">← Volver al inicio</a>
    <p className="eyebrow">CONTACTO</p>
    <h1>Tu idea ya está en camino.</h1>
    <p>Gracias por contarme sobre tu proyecto. Revisaré tu solicitud y te escribiré a través del contacto que compartiste.</p>
    <p>Si necesitas comunicarte antes, también puedes escribirme directamente por <a href="https://wa.me/584242196550" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
  </main>;
}
