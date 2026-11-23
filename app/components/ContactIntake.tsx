"use client";

import { useState } from "react";

export default function ContactIntake() {
  const [previewNotice, setPreviewNotice] = useState(false);
  return (
    <div className="lead-form-shell">
      <div className="lead-form-heading">
        <p className="eyebrow">CUÉNTAME QUÉ TIENES EN MENTE</p>
        <h3>Hagamos que tu idea tome forma.</h3>
        <p>Cuéntame un poco sobre lo que necesitas y te escribiré para conversar sobre el proyecto.</p>
      </div>
      <form
        name="laura-consultas-audiovisuales"
        method="POST"
        action="/gracias/"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="lead-form"
        onSubmit={(event) => {
          if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
            event.preventDefault();
            setPreviewNotice(true);
          }
        }}
      >
        <input type="hidden" name="form-name" value="laura-consultas-audiovisuales" />
        <p className="form-honeypot" aria-hidden="true"><label>Deja este campo vacío<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
        <div className="lead-fields">
          <label>Tu nombre <span aria-hidden="true">*</span><input name="nombre" type="text" autoComplete="name" maxLength={90} placeholder="¿Cómo te llamas?" required /></label>
          <label>WhatsApp <span aria-hidden="true">*</span><input name="whatsapp" type="tel" autoComplete="tel" maxLength={30} placeholder="+58 4XX XXX XXXX" required /></label>
          <label className="lead-wide">Nombre del negocio o proyecto <span aria-hidden="true">*</span><input name="negocio" type="text" maxLength={120} placeholder="¿Para qué marca trabajaremos?" required /></label>
          <label className="lead-wide">¿Qué contenido necesitas? <span aria-hidden="true">*</span>
            <select name="servicio" defaultValue="" required>
              <option value="" disabled>Selecciona un servicio</option>
              <option value="Fotografía gastronómica o de producto">Fotografía gastronómica o de producto</option>
              <option value="Videos para redes y publicidad">Videos para redes y publicidad</option>
              <option value="Cobertura de eventos">Cobertura de eventos</option>
              <option value="Edición y postproducción">Edición y postproducción</option>
              <option value="Una propuesta integral">Una propuesta integral</option>
              <option value="Necesito orientación">Necesito orientación</option>
            </select>
          </label>
          <label>¿Cuándo lo necesitas?
            <select name="plazo" defaultValue="Por definir">
              <option>Por definir</option>
              <option>En las próximas dos semanas</option>
              <option>En el próximo mes</option>
              <option>Más adelante</option>
            </select>
          </label>
          <label>Correo electrónico (opcional)<input name="email" type="email" maxLength={150} autoComplete="email" placeholder="hola@tuempresa.com" /></label>
          <label className="lead-wide">Tu idea, en pocas palabras <textarea name="descripcion" rows={4} maxLength={1500} placeholder="Cuéntame qué quieres mostrar o conseguir con estas imágenes" /></label>
        </div>
        <label className="lead-consent"><input name="consentimiento_contacto" type="checkbox" value="si" required /><span>Autorizo el uso de estos datos únicamente para responder a mi solicitud. He leído la <a href="/privacidad/" target="_blank" rel="noopener noreferrer">política de privacidad</a>. <b aria-hidden="true">*</b></span></label>
        <button className="btn btn-dark lead-submit" type="submit">Solicitar una propuesta <span aria-hidden="true">↗</span></button>
        {previewNotice && <p className="lead-preview-notice" role="status">Esta es la vista local de prueba. La solicitud no se envió; el formulario se habilitará al publicar la web con Netlify Forms.</p>}
        <p className="lead-fine-print">Enviar el formulario no implica contratar un servicio. También puedes escribirme directamente por WhatsApp.</p>
      </form>
    </div>
  );
}
