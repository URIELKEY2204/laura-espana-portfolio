import SiteCredit from "../components/SiteCredit";
import Link from "next/link";
import type {Metadata} from "next";
export const metadata:Metadata={title:"Privacidad y contacto | Laura España",robots:{index:false,follow:true}};

export default function Privacidad() {
 return <><main className="legal">
  <Link href="/" className="back">← Volver al portafolio</Link>
  <p className="eyebrow">Información legal</p>
  <h1>Privacidad y contacto</h1>
  <p><strong>Responsable del contacto:</strong> Laura España. Puedes solicitar información sobre tus datos o ejercer tus derechos escribiendo a <a href="mailto:lauraespana63@gmail.com">lauraespana63@gmail.com</a>.</p>
  <p><strong>Qué datos se recogen:</strong> cuando utilizas el formulario de contacto, nos proporcionas tu nombre, WhatsApp, negocio o proyecto y tipo de servicio. Puedes añadir un correo, un plazo aproximado y una descripción voluntaria.</p>
  <p><strong>Finalidad:</strong> responder a tu solicitud de servicios de fotografía y producción audiovisual y realizar únicamente el seguimiento relacionado con esa consulta. No se requiere consentimiento para recibir publicidad o boletines: no se ofrece esa suscripción en el formulario.</p>
  <p><strong>Base de tratamiento:</strong> tu consentimiento explícito al enviar el formulario. Puedes retirarlo solicitándolo por correo; esto no afecta a los tratamientos realizados antes de tu solicitud.</p>
  <p><strong>Almacenamiento y proveedores:</strong> el sitio se aloja en Netlify y las solicitudes se procesan mediante Netlify Forms. Para dar seguimiento a la consulta también se utiliza un CRM privado en Google Sheets (Google). Al enviar el formulario, el navegador puede conservar temporalmente durante la sesión los datos completados para preparar un mensaje de WhatsApp; ese mensaje solo se comparte con WhatsApp (Meta) si eliges abrirlo y enviarlo. Si eliges correo, el proveedor correspondiente procesará la comunicación conforme a sus condiciones.</p>
  <p><strong>Conservación:</strong> los datos se utilizarán durante la gestión y seguimiento de la consulta y deberán revisarse para eliminarse cuando ya no resulten necesarios; como criterio operativo, se establece un máximo de 12 meses desde el último contacto, salvo obligación legal de conservación.</p>
  <p><strong>Tus derechos:</strong> puedes solicitar acceso, corrección, eliminación de datos o retirar tu consentimiento escribiendo a la dirección anterior. Se revisará tu petición conforme a la normativa aplicable.</p>
  <p><strong>Cookies y contenido externo:</strong> este portafolio no instala rastreadores publicitarios ni cookies de analítica propias. El reproductor de YouTube solo se activa cuando decides verlo. Las plataformas externas pueden utilizar sus propias tecnologías de seguimiento.</p>
  <p>Última revisión: 24 de noviembre de 2026.</p>
 </main><footer className="footer"><SiteCredit/></footer></>;
}
