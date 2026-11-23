# Encargo de revisión de UX/UI con Impeccable

Proyecto: Laura España (portafolio audiovisual comercial Next.js 15, export estático).
Fecha: 23 de noviembre de 2026.

## Prioridad y límites definidos por el cliente

1. **Refinar, no rediseñar**. El cliente aprobó explícitamente la composición editorial, las jerarquías y la estética visual de la portada.
2. Conservar **la fotografía de Laura en la entrada de inicio** (`/images/portraits/perfil1.jpg`) y en la página independiente `/portafolio/`. No sustituirla por otros recursos.
3. Acentos visuales **naranja y rojo**; eliminar vestigios del verde del diseño anterior. Mantener fondo crema y combinación tipográfica editorial.
4. Los seis videos son todos **verticales (9:16)**, deben reproducirse completos y en su proporción, con controles accesibles. Son archivos propios en `/public/videos/projects/` (sin hotlinks necesarios).
5. Existe documental integrado desde YouTube en sección independiente, con carga del embed tras interacción por privacidad y rendimiento.
6. Arquitectura comercial: portada persuasiva, selección de trabajos, portafolio completo, servicios, metodología, contacto directo por WhatsApp/email. **No usar textos técnicos, notas internas ni etiquetas como «9:16» en la web pública**.
7. La navegación NO debe salir de este proyecto. Localmente revisar `http://127.0.0.1:4187/` y `http://127.0.0.1:4187/portafolio/`.
8. Autorización de fotografías gastronómicas: el 23/11/2026 Uriel Key declaró titularidad conjunta con Laura España y autorizó que Laura las muestre en su web (ver `docs/asset-audit.md` y la constancia en Notion). Seleccionar archivos concretos y usar copias optimizadas; atender eventuales derechos de terceros. La titularidad declarada es conjunta entre Laura y Uriel; no se requiere generar borrador de cesión. No inventar clientes ni métricas de rendimiento.
9. No desplegar a producción, no modificar el sitio Netlify actual, no abrir credenciales ni tocar otros repositorios. Trabajar solo en `feature/laura-commercial-explorer`.

## Trabajo pedido a Impeccable

- Ejecutar revisión real de usabilidad, contraste, accesibilidad (teclado, foco, texto alternativo, controles de video), respuesta móvil y escritorio, consistencia visual, microcopy y jerarquía de CTA.
- Priorizar problemas reproducibles de alto impacto. **Aplicar directamente las correcciones pertinentes**, preservando el diseño aprobado, e indicar los cambios en un reporte `docs/IMPECCABLE_REVIEW_REPORT.md`.
- Probar `npm run lint` y `npm run build`; verificar rutas y que ninguno de los seis videos queda roto.
- Usar skill instalado `/home/urielk/.agents/skills/impeccable/SKILL.md`, comenzando con su comando `context` solo si esta sesión nueva lo requiere, y los playbooks de `critique`, `audit`, `polish` y `adapt` según resulten pertinentes.
- En caso de no disponer de navegador automatizado, documentar qué pruebas visuales no se pudieron completar y qué se comprobó realmente.

## Entrega esperada

Reporte corto de problemas, severidad, archivos modificados, pruebas ejecutadas y limitaciones. Sin envío de mensajes ni despliegue a producción.
