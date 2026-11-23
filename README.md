# Laura España — portafolio comercial

Rediseño editorial en Next.js a partir de la web publicada en Netlify en octubre de 2026.

## Objetivo
Pasar de un CV/portafolio de candidatura a un sitio de adquisición B2B: descubrimiento visual, portafolio filtrable, propuesta clara para retail/gastronomía y contacto directo.

## Desarrollo
```bash
npm install
npm run dev
npm run lint
npm run build
```

La exportación estática se genera en `out/`. Netlify: build `npm run build`, publish `out`.

## Estado de activos
Los seis videos de proyecto ahora se sirven desde rutas locales en /public/videos/projects/ y las 25 fotografías gastronómicas seleccionadas (19 de Lali's y 6 de Café Roma) se sirven como WebP optimizados. La autorización de uso web con titularidad compartida declarada consta en docs/asset-audit.md; pueden existir derechos de terceros que deban revisarse.

### Vista previa de los videos

Cada tarjeta utiliza una portada WebP como respaldo y un video MP4 silencioso de 2 segundos en bucle. Los clips están en /public/videos/previews/ y se generan a partir de los originales con python3 scripts/create-video-previews.py (requiere ffmpeg). La reproducción se limita a las tarjetas visibles en pantalla; el ajuste de movimiento reducido la desactiva. El botón «Ver video» abre la versión íntegra con controles. Pruebas con npm run test:preview sobre el servidor local en http://127.0.0.1:4187/.

## Privacidad
Sin scripts de analítica ni cookies no esenciales. El contacto se abre en los proveedores elegidos por el visitante. La sección de privacidad se incluye en `/privacidad`. Revisar requisitos locales antes de activar automatizaciones.

## Aislamiento
Rama `feature/laura-commercial-explorer`. No contiene datos de prospectos, credenciales ni información privada de Where's My Client?.
