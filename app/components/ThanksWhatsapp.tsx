"use client";

import { useEffect, useState } from "react";
import { consultaVigente, enlaceWhatsapp, SESSION_KEY } from "../lib/consultaWhatsapp";

export default function ThanksWhatsapp() {
  const [link, setLink] = useState(() => enlaceWhatsapp(null));
  const [isPrefilled, setIsPrefilled] = useState(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_KEY);
      const data: unknown = stored ? JSON.parse(stored) : null;
      if (consultaVigente(data)) {
        setLink(enlaceWhatsapp(data));
        setIsPrefilled(true);
      }
    } catch {
      // Session storage may be unavailable in private or restricted browsing.
    }
  }, []);

  return (
    <section className="thanks-whatsapp" aria-label="Contacto directo por WhatsApp">
      <p className="thanks-whatsapp-eyebrow">¿Quieres agilizar la conversación?</p>
      <h2>Hablemos directamente por WhatsApp.</h2>
      <p>
        {isPrefilled
          ? "Preparé un mensaje con los datos que acabas de completar. Solo tienes que abrir WhatsApp, revisarlo y pulsar enviar."
          : "También puedes contactar directamente a Laura para comentar tu proyecto."}
      </p>
      <a
        className="thanks-whatsapp-cta"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Continuar por WhatsApp <span aria-hidden="true">↗</span>
      </a>
      <p className="thanks-whatsapp-note">
        WhatsApp no se abre ni envía mensajes automáticamente. Al continuar,
        podrás revisar el texto antes de enviarlo.
      </p>
    </section>
  );
}
