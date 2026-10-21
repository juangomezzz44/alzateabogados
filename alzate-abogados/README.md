# Álzate - Abogados — Sitio web

Sitio estático (HTML/CSS/JS, sin framework ni dependencias en producción). Se genera con un script de Node a partir de plantillas y una configuración central, lo que permite cambiar datos en un solo lugar.

## Ejecutar

Requiere Node 18+ (y Python 3 solo si desea regenerar las imágenes).

```bash
npm install          # la primera vez (instala marked y gray-matter)
npm run dev          # compila en modo borrador y abre http://localhost:4173
npm run build        # compila en ./dist (borrador, con avisos de datos pendientes, noindex)
npm run build:prod   # compila para publicar; SE DETIENE si faltan datos obligatorios
```

La carpeta `dist/` es el sitio listo para subir a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, cPanel…).

## Configurar el WhatsApp (un solo lugar)

Edite `site.config.mjs` → `contact.whatsappNumber`, con indicativo 57 + 10 dígitos, sin espacios, signos ni guiones:

```js
whatsappNumber: '57XXXXXXXXXX',   // formato; reemplace por el número oficial
```

o pase el valor por variable de entorno: `ALZATE_WA_NUMBER=57XXXXXXXXXX npm run build`.
Todos los botones (encabezado, hero, tarjetas de servicios, perfil, preguntas, cierre, pie y acceso flotante) usan ese único valor. Los textos de los mensajes están en `waMessages` del mismo archivo. Mientras el número no exista, los botones muestran un aviso en lugar de abrir un enlace falso.

## Panel de administración (/admin)

El contenido (datos de contacto, servicios, preguntas frecuentes y artículos) vive en la carpeta `content/` y se edita desde `tusitio/admin` (Decap CMS). Pasos de puesta en marcha: `GUIA-ADMIN.md`. Guía para el abogado: `GUIA-ABOGADO.md`. El diseño y la estructura de secciones siguen en el código.

## Dónde editar cada cosa

| Qué | Archivo |
|---|---|
| Contacto, URL, perfil, privacidad, aprobaciones | `content/settings.json` (o el panel /admin) |
| Marca, mensajes de WhatsApp, menú | `site.config.mjs` |
| Servicios, preguntas frecuentes, artículos | `content/servicios.json`, `content/faq.json`, `content/articulos/*.md` (o el panel /admin) |
| Pilares y pasos (texto fijo) | `src/content.mjs` |
| Secciones de la página principal | `src/pages/home.mjs` |
| Artículos, política de datos, aviso informativo | `src/pages/secondary.mjs` |
| Encabezado, pie, botón flotante, SEO por página | `src/layout.mjs` |
| Colores, tipografías, espaciados | `public/assets/css/styles.css` (variables en `:root`) |
| Imágenes | `public/assets/img/` (se regeneran con `npm run assets`) |

## Publicar un artículo

Desde el panel: **Artículos jurídicos → + Artículo**, con "Publicar en el sitio" y fecha. Solo los artículos publicados (con fecha y texto) generan página, aparecen en el sitemap y son indexables; los borradores no generan ninguna página. A mano: crea `content/articulos/mi-titulo.md` con `published: true`, `date: AAAA-MM-DD` y el texto en Markdown.

## Imágenes y logo

- `logo-oficial*`: el archivo suministrado, sin modificar (solo reescalado).
- `logo-mark-*`, `logo-full-*`: el mismo logo con el fondo convertido en transparencia (la forma se extrae del archivo oficial, no se redibuja) para usarlo sobre fondo claro u oscuro.
- Fotografías: recortes de la imagen suministrada (retrato en arco, despacho completo, diplomas, avatar). La original es de 1280×960; para impresión o pantallas muy grandes conviene una foto profesional de mayor resolución.

## Analítica (apagada)

No hay analítica ni cookies. Para activarla: `analytics.provider: 'ga4'` y `measurementId`. Solo se carga si el visitante acepta el aviso de consentimiento. Actualice la política de datos antes.

## Verificado

Se comprobaron con un navegador real: 17 enlaces de WhatsApp (todos desde la configuración única), navegación móvil con teclado (Esc), acordeón, explorador de la fotografía y ventana ampliada de diplomas, 11 páginas sin enlaces rotos, ausencia de desbordes horizontales en 390 px, objetivos táctiles ≥ 44 px, sin errores de consola. Ver `PENDIENTES.md` para lo que falta.
