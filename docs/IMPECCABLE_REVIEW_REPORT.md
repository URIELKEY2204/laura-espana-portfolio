# Informe de Auditoría Técnica y UX/UI — Portafolio de Laura España

Auditoría ejecutada en **modo solo lectura** sobre el repositorio local y el build estático ya generado en `out/` (servido en `http://127.0.0.1:4187/`), sin modificar archivos, sin desplegar y sin enviar formularios reales.

---

## 1. Resumen Ejecutivo y Puntuación Impeccable

| # | Dimensión | Puntuación | Hallazgo principal |
|---|-----------|------------|--------------------|
| 1 | **Accesibilidad (A11y)** | **2 / 4** | Contraste insuficiente (`2.6:1`–`4.1:1`) en `--accent` (`#d36d3d`), texto muted y overlays sobre foto (`1.3:1` en `LE / 01`); targets táctiles `<24px`; sin subtítulos en videos. |
| 2 | **Rendimiento y Recursos** | **2 / 4** | Videos pesan `42.8 MB` totales (`recap-aniversario.mp4` = `11.2 MB`); retratos `1706×2560` (~`500 KB` c/u) y 6 portadas PNG (`1.28 MB`) sin WebP/AVIF; Google Fonts vía `@import` bloqueante. |
| 3 | **Theming y Consistencia** | **3 / 4** | Paleta crema/naranja/rojo respeta el brief aprobado; sin acentos verdes activos (solo matices neutros muy sutiles). Múltiples colores hardcodeados fuera de `:root`. |
| 4 | **Diseño Responsive (375/768/Desktop)** | **1 / 4** | En `375px`, `min-height` + `aspect-ratio: 4/4` provoca **desbordamiento horizontal real (`459px`)** en `/portafolio/` y **recorte de `104px`** del retrato en `/`; `.nav-links` desaparece en `<=720px` sin menú móvil. |
| 5 | **Integridad de Implementación** | **3 / 4** | Build estático (`out/`), 6/6 videos locales 9:16, embed diferido de YouTube (`youtube-nocookie`), cabeceras de seguridad y marcado de Netlify Forms verificados y funcionales. |
| **Total** | | **11 / 20** | **Aceptable — requiere correcciones P1 antes de publicar** |

**Veredicto de integridad:** **Aprobado con reservas (corregir P1 antes de producción).** La arquitectura comercial y la identidad editorial aprobada por el cliente están bien preservadas (se descartaron como falsos positivos frente al brief las alertas genéricas de `impeccable detect` sobre `cream-palette`, `italic-serif-display`, `hero-eyebrow-chip` y `numbered-section-labels`). Los problemas reales se concentran en **móvil (`375px`)**, **contraste WCAG AA** y **peso de imágenes/video**.

**Conteo de hallazgos verificados:** **0 P0** · **6 P1 (Mayores)** · **7 P2 (Menores)** · **4 P3 (Pulido)**.

---

## 2. Verificación de Requisitos Clave (Pruebas Reales)

### A. Build estático (`out/`), TypeScript y Rutas
- **`npx tsc --noEmit` (`npm run lint`)**: **PASS** (`exit 0`, sin errores de tipos).
- **Build existente (`out/`, generado 23/11/2026 15:30)** comprobado contra `http://127.0.0.1:4187/`:
  - `/` → `out/index.html` (**HTTP 200**, `20,564 B`)
  - `/portafolio/` → `out/portafolio/index.html` (**HTTP 200**, `19,378 B`)
  - `/privacidad/` → `out/privacidad/index.html` (**HTTP 200**, `12,214 B`)
  - `/gracias/` → `out/gracias/index.html` (**HTTP 200**, `7,747 B`)
  - `/404.html` → `out/404.html` y `out/404/index.html` (**HTTP 200**, `7,597 B`)
  - Todos los retratos (`perfil1.jpg`, `perfil2.jpg`), 6 portadas PNG y 6 videos MP4 respondieron **HTTP 200**.

### B. Reproducción real de los 6 videos 9:16
Probados con `ffprobe` y reproducción real en Chromium headless sobre `/portafolio/`:

| # | Proyecto | Archivo | Peso | Duración | Resolución / Codec | `faststart` (`moov`) | Prueba en Chromium (`readyState` / `played` / ratio) |
|---|----------|---------|------|----------|--------------------|----------------------|------------------------------------------------------|
| 1 | Extractor de jugo | `extractor-de-jugo.mp4` | 2.60 MB | 40.77s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |
| 2 | Camargo Fix Financiado | `camargo-fix-financiado.mp4` | 7.35 MB | 44.05s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |
| 3 | Alejandro Direccionario | `alejandro-direccionario.mp4` | 6.83 MB | 43.82s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |
| 4 | Semana Rosa | `reels-semana-rosa.mp4` | 7.92 MB | 49.22s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |
| 5 | Noticias, primera semana | `noticias-marzo.mp4` | 6.85 MB | 91.20s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |
| 6 | Recap aniversario | `recap-aniversario.mp4` | 11.24 MB | 49.17s | 720×1280 (9:16) H.264/AAC | Sí (offset 36) | **PASS** (`4` / `true` / `0.563`, `error: null`) |

- Los 6 cargaron desde `/videos/projects/` (sin caer al fallback externo), con `preload="none"`, `controls`, `playsInline` y proporción exacta `9:16`.

### C. Formulario `laura-consultas-audiovisuales`, Privacidad y Netlify Forms
- **HTML estático verificado en `out/index.html`**:
  - Presenta `<form name="laura-consultas-audiovisuales" data-netlify="true" netlify-honeypot="bot-field" action="/gracias/" method="POST">` y `<input type="hidden" name="form-name" value="laura-consultas-audiovisuales"/>`.
  - Honeypot `bot-field` oculto visualmente (`.form-honeypot`), `aria-hidden="true"`, `tabIndex={-1}`, `autoComplete="off"`.
  - Todos los campos (`nombre`, `whatsapp`, `negocio`, `servicio`, `plazo`, `email`, `descripcion`, `consentimiento_contacto`) tienen `name`, `<label>` asociado y `maxLength`.
  - En `localhost` / `127.0.0.1`, `onSubmit` bloquea el envío real y muestra aviso `role="status"`.
- **Documental YouTube (privacidad)**: verificado en CDP **0 peticiones a YouTube** al cargar la página; el `<iframe>` a `https://www.youtube-nocookie.com/embed/fJoyTOyoWeI?autoplay=1` se monta únicamente tras interacción del usuario.
- **Cabeceras de seguridad**: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` y `Permissions-Policy` presentes en [netlify.toml](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/netlify.toml) y [public/_headers](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/public/_headers) (copiado a `out/_headers`).

---

## 3. Hallazgos Detallados por Severidad

### P1 — Mayores (Corregir antes de publicar)

1. **[P1] Desbordamiento horizontal en `/portafolio/` y recorte del retrato en `/` a `375px`**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L4) (`.hero-visual`) y [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L54) (`.portfolio-intro-portrait`).
   - **Prueba:** En Chromium a `375×812`:
     - `/portafolio/` alcanza `scrollWidth: 459px` (`+84px` de overflow real) porque `.portfolio-intro-portrait` combina `min-height: 440px` con `aspect-ratio: 4/4`, forzando un ancho de `440px`. En modo móvil Chromium hace zoom-out a toda la página.
     - `/` genera `.hero-visual` de `460px` (`right: 479px`), recortando `104px` a la derecha del retrato de Laura y ocultando `LE / 01` (enmascarado por `overflow: hidden` en `.hero`).
   - **Recomendación:** En `@media (max-width: 720px)`, eliminar `min-height: 460px` / `min-height: 440px` cuando se usa `aspect-ratio` (o usar `width: 100%; min-height: 0; aspect-ratio: 4/5;`).

2. **[P1] Navegación principal inaccesible en móvil (`<=720px`)**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L4) (`.nav-links{display:none}`), [app/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/page.tsx#L22-L24), [app/portafolio/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/portafolio/page.tsx#L11).
   - **Prueba:** En `375×812`, `visibleNavLinks: 0` tanto en `/` como en `/portafolio/`. No existe botón de menú móvil ni enlace directo a `/portafolio/` en el header de `/`.
   - **Recomendación:** Añadir un enlace visible compacto a `Portafolio` en el header móvil (o un menú desplegable accesible `<details>`/botón con `aria-expanded`) para que el visitante móvil pueda navegar entre `/` y `/portafolio/` desde la cabecera.

3. **[P1] Fallos generalizados de contraste WCAG AA (`< 4.5:1`) en texto pequeño y overlays**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L2-L3) y [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L19-L52).
   - **Prueba (`impeccable detect` en Chromium):**
     - `--accent` (`#d36d3d`) en texto de `11px` (`.eyebrow`, `.project-client`, `.service-n`, `.steps li>span`): **2.6:1** sobre `#eaded6`, **2.9:1** sobre `#f1e7e0`, **3.1:1** sobre `#f4f1e9`, **3.4:1** sobre `#fffdf8`.
     - Contadores y numeración: `#91978e` en `.filter span` (**2.9:1**), `#92938d` en `.project-number` (**3.0:1**).
     - Textos secundarios: `#77776f` en `.hero-foot` (**4.0:1**), `#6e726b` sobre `#f1e7e0` (**4.0:1**) y `#ecebe3` (**4.1:1**), `#676b63`/`#77665f` sobre `#eaded6` (**4.1:1**).
     - Overlays sobre foto: `LE / 01` (`.hero-index`) mide **1.3:1** sobre `/images/portraits/perfil1.jpg` (falta scrim superior); `LAURA ESPAÑA` en `.portfolio-intro-portrait-label` mide **3.0:1**.
   - **Estándar:** WCAG 2.1 AA (SC 1.4.3).
   - **Recomendación:** Crear un token de texto acento oscuro (ej. `--accent-text: #a54333` o `--warm: #9c3f32`, que ya cumplen `>= 4.5:1` sobre crema/papel) para texto pequeño y reservar `#d36d3d` para elementos gráficos/grandes; oscurecer `--muted` y textos secundarios a `>= 4.5:1`; añadir scrim superior o fondo semitransparente oscuro tras `LE / 01` y reforzar el gradiente inferior en `.portfolio-intro-portrait:after`.

4. **[P1] Objetivos táctiles por debajo de `24px` (WCAG 2.5.8) en enlaces y controles**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L3-L4) y [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L69-L71).
   - **Prueba (CDP `375×812` y `768×1024`):** Enlaces de navegación (`17px` de alto), `.text-link` (`19px`), `.about-inner > a` (`15–19px`), enlace `Privacidad` en footer (`12–14px`), `.back` en `/privacidad/` y `/gracias/` (`17px`), y el checkbox `consentimiento_contacto` (`18×18px`).
   - **Estándar:** WCAG 2.2 AA (SC 2.5.8 Target Size ≥ 24×24 CSS px; óptimo 44×44 px en móvil).
   - **Recomendación:** Añadir `padding-block` / `min-height: 44px` (o al menos `24–36px` con espaciado suficiente) a enlaces de cabecera, footer, `.text-link`, `.back` y área táctil del checkbox.

5. **[P1] Peso elevado de recursos multimedia (especialmente `recap-aniversario.mp4`, retratos y portadas PNG)**
   - **Ubicación:** `public/videos/projects/` y `public/images/`.
   - **Prueba:**
     - `recap-aniversario.mp4` pesa **11.24 MB** (`1.83 Mbps` para `720×1280` 49s); total de 6 videos = **42.80 MB**.
     - `perfil1.jpg` (`502 KB`, `1706×2560`) y `perfil2.jpg` (`474 KB`, `1707×2560`) se renderizan a ~`523×650` y `633×803` (~3× más píxeles de los necesarios).
     - Las 6 portadas `.png` (`1080×1920`) suman **1.28 MB** en `/portafolio/`.
   - **Recomendación:** Recomprimir `recap-aniversario.mp4` a ~`900–1100 kbps` (~5–6 MB); convertir retratos y portadas a WebP/AVIF (manteniendo `/images/portraits/perfil1.jpg` como fallback o en resolución optimizada ~`1100px` de ancho, ~120 KB) y añadir `fetchPriority="high"` a la imagen LCP del hero.

6. **[P1] Metadatos de bloqueo de indexación (`noindex`) y `metadataBase` de preview en `layout.tsx`**
   - **Ubicación:** [app/layout.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/layout.tsx#L7-L8).
   - **Prueba:** `out/index.html` y `out/portafolio/index.html` contienen `<meta name="robots" content="noindex, follow"/>` y `metadataBase` apunta a `https://snazzy-manatee-de4ef3.netlify.app`.
   - **Impacto:** Correcto para vista previa, pero impedirá la indexación en buscadores si se despliega a producción sin actualizarse.
   - **Recomendación:** Antes del lanzamiento a producción, cambiar `robots` a `{ index: true, follow: true }` (manteniendo `noindex` solo en `/gracias/`) y actualizar `metadataBase` al dominio definitivo.

---

### P2 — Menores

7. **[P2] Peticiones externas a Google Fonts no declaradas en la Política de Privacidad y carga bloqueante**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L1) y [app/privacidad/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/privacidad/page.tsx#L15).
   - **Prueba (CDP Network):** Todas las rutas realizan peticiones inmediatas a `fonts.googleapis.com` y `fonts.gstatic.com`, pese a que `/privacidad/` solo menciona Netlify, WhatsApp, correo y YouTube bajo demanda.
   - **Recomendación:** Migrar `DM Sans` y `Manrope` a `next/font/google` (se empaquetan en el build estático sin llamadas de terceros en tiempo de ejecución, mejorando privacidad y LCP).

8. **[P2] Textos funcionales por debajo de `11px`**
   - **Ubicación:** [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L3) y [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L52).
   - **Prueba (`impeccable detect`):** `.hero-foot`, `.filter span` y `.portfolio-intro-portrait-label span` están en `9px`; `.hero-label span`, `.hero-index`, `.service-detail`, `.steps li>span` y `.contact-bottom` en `10px`.
   - **Recomendación:** Subir el piso tipográfico de etiquetas funcionales a `11px–12px`.

9. **[P2] Inconsistencias de accesibilidad y navegación en `/portafolio/`, `/privacidad/` y `/gracias/`**
   - **Ubicación:** [app/portafolio/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/portafolio/page.tsx#L10-L19), [app/privacidad/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/privacidad/page.tsx#L1-L18), [app/gracias/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/gracias/page.tsx#L6-L14).
   - **Prueba:**
     - `/portafolio/` omite `.skip-link`, omite `aria-label` en `<nav>`, su botón de cabecera apunta a `mailto:` en vez de `/#contacto`, y tiene `© 2026` hardcodeado.
     - `/privacidad/` no exporta `metadata` (hereda el `<title>` de la portada) y su medida de `.legal` (`800px`) genera líneas de `93–102` caracteres (`impeccable detect` → `[line-length]`).
   - **Recomendación:** Añadir `skip-link`, `aria-label="Navegación principal"` y `href="/#contacto"` en `/portafolio/`; exportar `metadata` propia en `/privacidad/` y limitar `.legal p` a `max-width: 65ch`.

10. **[P2] Ticker sin padding ni adaptación en `375px` y `1280px`**
    - **Ubicación:** [app/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/page.tsx#L49), [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L3).
    - **Prueba:** `div.ticker > div` excede `19px` el borde derecho en `1280px` y se corta sin control en `375px` (`letter-spacing: 0.27em`, `white-space: nowrap`).
    - **Recomendación:** Ajustar contenido/tracking para que encaje limpiamente o implementar desplazamiento suave con respeto a `prefers-reduced-motion`.

11. **[P2] Flechas decorativas sin `aria-hidden="true"` y `aria-live="polite"` sobre todo el grid de videos**
    - **Ubicación:** [app/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/page.tsx#L36-L37), [app/portafolio/page.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/portafolio/page.tsx#L11-L16), [app/components/ProjectGallery.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/components/ProjectGallery.tsx#L20-L39), [app/components/Documentary.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/components/Documentary.tsx#L21).
    - **Recomendación:** Añadir `aria-hidden="true"` a todos los símbolos `↗`, `↘`, `✳`; mover `aria-live="polite"` a un contador compacto tipo `"Mostrando X proyectos"` en lugar de envolver las tarjetas `<video>`.

12. **[P2] Párrafo vacío `<p className="video-privacy"></p>` en la sección Documental**
    - **Ubicación:** [app/components/Documentary.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/components/Documentary.tsx#L22).
    - **Recomendación:** Eliminarlo o incluir un aviso breve de una línea (ej. *"El video se carga desde YouTube únicamente al reproducirlo."*).

13. **[P2] Videos sin pista de subtítulos (`<track>`)**
    - **Ubicación:** [app/components/ProjectGallery.tsx](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/components/ProjectGallery.tsx#L23-L27).
    - **Estándar:** WCAG 2.1 AA (SC 1.2.2) para piezas con voz en off/locución.
    - **Recomendación:** Incorporar archivos `.vtt` en español para los videos con locución cuando estén disponibles.

---

### P3 — Pulido

14. **[P3] Referencias `legacyVideo` hacia `snazzy-manatee-de4ef3.netlify.app`** en [app/data/projects.ts](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/data/projects.ts#L11-L18): innecesarias ahora que los 6 videos son propios y locales.
15. **[P3] Archivos sin uso en `public/`**: `public/images/portraits/perfil3.jpg` (`92 KB`) y `public/images/documentary.jpg` (`9.8 KB`, sustituido por gradiente CSS en `Documentary.tsx`) se copian al directorio `out/`.
16. **[P3] Sutiles tonos gris-verdoso heredados** en [app/globals.css](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/app/globals.css#L2-L3) (`#62675f`, `#676b63`, `#6e726b`, `#91978e`, `#d7d9d1`): no son acentos verdes visibles, pero conviene virarlos a grises cálidos (`#5c544f`) para cohesión total con la paleta crema/terracota.
17. **[P3] `Content-Security-Policy` ausente** en [netlify.toml](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/netlify.toml) y [public/_headers](file:///home/urielk/Trabajo/Desarrollo/laura-espana-portfolio/public/_headers) (recomendable añadir tras migrar Google Fonts a `next/font/google`).

---

## 4. Aspectos Positivos Verificados
- **6/6 videos 9:16 locales** reproducen correctamente en Chromium con `faststart`, `preload="none"`, `playsInline` y `controls`.
- **Privacidad del documental** impecable: carga diferida tras clic vía `youtube-nocookie.com`.
- **Netlify Forms bien estructurado** en el HTML estático exportado (`data-netlify`, `form-name`, `netlify-honeypot`, `/gracias/`, consentimiento obligatorio explícito y guarda de entorno local).
- **Retrato de Laura (`/images/portraits/perfil1.jpg`)** preservado en `/` y `/portafolio/` según el brief.
- **Jerarquía de encabezados (`H1→H2→H3`)** limpia y coherente en todas las rutas.

---

## 5. Limitaciones de esta Auditoría
1. **Modo solo lectura:** No se ejecutó `npm run build` ni se escribieron archivos (incluyendo `docs/IMPECCABLE_REVIEW_REPORT.md`) para respetar la restricción de solo lectura y no interferir con cambios en curso en el árbol de trabajo (`app/globals.css`, `app/page.tsx`, `app/privacidad/page.tsx`, `app/components/ContactIntake.tsx`, `app/gracias/`). Se auditó el build `out/` existente del 23/11/2026 15:30 servido en `http://127.0.0.1:4187/`.
2. **Entorno de navegador:** Las mediciones de DOM, contraste, overflow, red y reproducción de video se ejecutaron en **Chromium headless** (`chromium-1255` vía CDP e `impeccable detect`). No se realizó inspección visual manual en monitor físico, Safari/iOS real, audio en altavoces ni gestos táctiles en dispositivo físico.
3. **Netlify Forms en vivo:** No se realizó envío real del formulario ni despliegue a Netlify; el cumplimiento de Netlify Forms está verificado a nivel de HTML estático (`out/index.html`) y configuración (`netlify.toml`), quedando pendiente una prueba de envío real tras publicar en un deploy preview.

---

## 6. Siguientes Pasos Recomendados (orden de prioridad)
1. **[P1] `$impeccable adapt`**: Corregir el overflow/recorte de `.hero-visual` y `.portfolio-intro-portrait` en `375px` y añadir navegación móvil accesible en `<=720px`.
2. **[P1] `$impeccable colorize` / `$impeccable audit`**: Ajustar tokens de contraste (`--accent-text`, `--muted`, scrim superior en `LE / 01`, gradiente en `/portafolio/`) y tamaños de targets táctiles (`>= 24px`/`44px`).
3. **[P1] `$impeccable optimize`**: Migrar fuentes a `next/font/google`, convertir retratos/portadas a WebP/AVIF y recomprimir `recap-aniversario.mp4`.
4. **[P2] `$impeccable harden` + `$impeccable polish`**: Añadir `skip-link`/metadata en subpáginas, limpiar `legacyVideo` y archivos huérfanos, y preparar `robots: index` antes de producción.
