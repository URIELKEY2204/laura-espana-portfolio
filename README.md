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
Las imágenes originales públicas se recuperaron del despliegue Netlify; los videos se referencian temporalmente desde la URL anterior para no introducir cientos de MB al repositorio. **No apagar el sitio original ni sustituir el despliegue antes de migrar los videos a almacenamiento estable**. Los contenidos de Café Roma y Lali siguen pendientes de confirmación de autoría y derechos para publicarse como portafolio de Laura.

## Privacidad
Sin scripts de analítica ni cookies no esenciales. El contacto se abre en los proveedores elegidos por el visitante. La sección de privacidad se incluye en `/privacidad`. Revisar requisitos locales antes de activar automatizaciones.

## Aislamiento
Rama `feature/laura-commercial-explorer`. No contiene datos de prospectos, credenciales ni información privada de Where's My Client?.
