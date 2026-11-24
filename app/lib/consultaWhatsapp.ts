export const SESSION_KEY = "laura:consulta:whatsapp";
const FRESHNESS_MS = 10 * 60 * 1000;

export type ConsultaWhatsapp = {
  nombre: string;
  whatsapp: string;
  negocio: string;
  servicio: string;
  plazo: string;
  email: string;
  descripcion: string;
  timestamp: number;
};

export const WHATSAPP_LAURA = "584242196550";

function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function capturaConsulta(data: FormData): ConsultaWhatsapp {
  return {
    nombre: clean(data.get("nombre"), 90),
    whatsapp: clean(data.get("whatsapp"), 30),
    negocio: clean(data.get("negocio"), 120),
    servicio: clean(data.get("servicio"), 100),
    plazo: clean(data.get("plazo"), 90),
    email: clean(data.get("email"), 150),
    descripcion: clean(data.get("descripcion"), 1500),
    timestamp: Date.now(),
  };
}

export function mensajeWhatsapp(c: ConsultaWhatsapp): string {
  const items: [string, string][] = [
    ["Mi nombre", c.nombre],
    ["Negocio o proyecto", c.negocio],
    ["Servicio que necesito", c.servicio],
    ["Plazo", c.plazo],
    ["WhatsApp de contacto", c.whatsapp],
    ["Correo", c.email],
    ["Detalles", c.descripcion],
  ];
  return [
    "Hola, Laura. Acabo de completar el formulario de tu portafolio y quiero conversar sobre mi proyecto.",
    ...items.filter(([, value]) => value).map(([label, value]) => label + ": " + value),
    "Gracias.",
  ].join("\n");
}

export function enlaceWhatsapp(c: ConsultaWhatsapp | null): string {
  const msg = c
    ? mensajeWhatsapp(c)
    : "Hola, Laura. Acabo de visitar tu portafolio y me gustaría conversar sobre un proyecto audiovisual.";
  return "https://wa.me/" + WHATSAPP_LAURA + "?text=" + encodeURIComponent(msg);
}

export function consultaVigente(v: unknown): v is ConsultaWhatsapp {
  if (!v || typeof v !== "object") return false;
  const c = v as Record<string, unknown>;
  return (
    typeof c.timestamp === "number" &&
    c.timestamp <= Date.now() &&
    Date.now() - c.timestamp < FRESHNESS_MS &&
    ["nombre", "whatsapp", "negocio", "servicio", "plazo", "email", "descripcion"]
      .every((key) => typeof c[key] === "string")
  );
}
