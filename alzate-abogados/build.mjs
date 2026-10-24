#!/usr/bin/env node
/**
 * Compila el sitio estático a ./dist
 *   npm run build        → borrador (con avisos de datos pendientes, noindex)
 *   npm run build:prod   → producción (falla si faltan datos obligatorios)
 */
import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './site.config.mjs';
import { isProd, isClean, waNumberValid, siteUrl, waNumberRaw } from './src/lib.mjs';
import { homePage } from './src/pages/home.mjs';
import { articlesIndexPage, articlePage, privacyPage, noticePage } from './src/pages/secondary.mjs';
import { servicePage } from './src/pages/services.mjs';
import { articles, articleWarnings, servicePages } from './src/content.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = process.env.ALZATE_OUT ? path.resolve(process.env.ALZATE_OUT) : path.join(root, 'dist');

/* ---------- Validaciones ---------- */
const warnings = [];
const errors = [];
if (waNumberRaw && !waNumberValid) errors.push(`whatsappNumber "${waNumberRaw}" no es válido: use 57 + 10 dígitos, sin espacios ni signos.`);
if (!waNumberRaw) warnings.push('Falta el número de WhatsApp (config.contact.whatsappNumber o ALZATE_WA_NUMBER).');
if (!siteUrl) warnings.push('Falta la URL del sitio (config.site.url o ALZATE_SITE_URL): no habrá canonical, OG absolutos ni sitemap real.');
if (!config.privacy.responsible || !config.privacy.contactChannel || !config.privacy.lastUpdated) warnings.push('Política de datos incompleta (responsable, canal, fecha).');
if (!config.privacy.validatedByLawyer) warnings.push('La política de datos no está marcada como validada.');
if (!config.content.legalReviewDone) warnings.push('Contenido jurídico (FAQ y textos de servicios) sin aprobación del abogado.');

if (isProd) {
  if (!waNumberValid) errors.push('PRODUCCIÓN: número de WhatsApp obligatorio.');
  if (!siteUrl) errors.push('PRODUCCIÓN: URL del sitio obligatoria.');
  if (!config.privacy.validatedByLawyer) errors.push('PRODUCCIÓN: la política de datos debe estar validada (config.privacy.validatedByLawyer = true y datos completos).');
  if (!config.privacy.responsible || !config.privacy.contactChannel || !config.privacy.lastUpdated) errors.push('PRODUCCIÓN: complete config.privacy.');
  if (!config.content.legalReviewDone) errors.push('PRODUCCIÓN: el abogado debe aprobar el contenido jurídico (config.content.legalReviewDone = true).');
}
if (errors.length) {
  console.error('\n✖ No se puede compilar:\n  - ' + errors.join('\n  - ') + '\n');
  process.exit(1);
}

/* ---------- Salida ---------- */
const write = async (rel, html) => {
  const file = path.join(out, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
};

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'public'), out, { recursive: true });

await write('index.html', homePage());
await write('articulos/index.html', articlesIndexPage());
for (const a of articles) await write(`articulos/${a.slug}/index.html`, articlePage(a));
for (const s of servicePages) await write(`servicios/${s.slug}/index.html`, servicePage(s));
await write('politica-de-tratamiento-de-datos/index.html', privacyPage());
await write('aviso-informativo/index.html', noticePage());
await write('404.html', `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada | ${config.brand.name}</title><body style="font-family:system-ui;background:#0E2D1F;color:#F7F5EF;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center"><main><h1 style="font-weight:600">Página no encontrada</h1><p><a style="color:#F7F5EF" href="/">Volver al inicio</a></p></main></body></html>`);

/* ---------- Sitemap y robots ---------- */
const urls = ['/', ...servicePages.map((s) => `/servicios/${s.slug}/`), ...(articles.length ? ['/articulos/'] : []), ...articles.map((a) => `/articulos/${a.slug}/`)];
const base = siteUrl || 'https://dominio-pendiente.invalid';
await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}\n</urlset>\n`,
);
await write(
  'robots.txt',
  isProd
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${base}/sitemap.xml\n`
    : `# MODO BORRADOR: no indexar hasta publicar en producción\nUser-agent: *\nDisallow: /\n`,
);

console.log(`\n✔ Sitio compilado en ${out} (${isProd ? 'PRODUCCIÓN' : isClean ? 'VISTA PREVIA (noindex)' : 'BORRADOR'})`);
warnings.push(...articleWarnings);
if (warnings.length) console.log('\nPendientes detectados:\n  - ' + warnings.join('\n  - '));
