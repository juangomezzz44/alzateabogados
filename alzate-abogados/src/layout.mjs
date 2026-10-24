import { config, waMessages, nav } from '../site.config.mjs';
import { esc, makeUrl, waLink, waPendingAttr, waNumberValid, isProd, isClean, siteUrl, canonicalFor, pending } from './lib.mjs';
import { icon, waIcon } from './icons.mjs';
import { servicePages } from './content.mjs';

/** Botón/enlace de WhatsApp reutilizable. */
export function waButton({ message, label, variant = 'primary', extra = '', size = '' }) {
  return `<a class="btn btn--${variant} ${size ? 'btn--' + size : ''} ${extra}" href="${esc(waLink(message))}" data-wa${waPendingAttr()}${waNumberValid ? ' target="_blank" rel="noopener noreferrer"' : ''}>${waIcon(20)}<span>${esc(label)}</span></a>`;
}

function jsonLdHome() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: config.brand.name,
    description:
      'Asesoría en fideicomisos civiles, sucesiones y herencias, y en derecho de familia y derecho civil, con atención personalizada y trayectoria profesional desde 1985.',
    areaServed: [{ '@type': 'City', name: 'Bogotá' }, { '@type': 'Country', name: 'Colombia' }],
    knowsAbout: ['Fideicomisos civiles', 'Sucesiones', 'Herencias', 'Derecho de familia', 'Derecho civil', 'Sociedades comerciales'],
    employee: { '@type': 'Person', name: config.brand.lawyer, jobTitle: 'Abogado' },
  };
  if (siteUrl) {
    data.url = siteUrl + '/';
    data.image = `${siteUrl}/assets/img/og-image.jpg`;
    data.logo = `${siteUrl}/assets/img/icon-512.png`;
  }
  // Sin dirección, teléfono, reseñas ni calificaciones: no hay datos confirmados.
  return JSON.stringify(data);
}

export function head({ depth, title, description, path, noindex = false, ld = null, ld2 = null, ogType = 'website' }) {
  const u = makeUrl(depth);
  const canonical = canonicalFor(path);
  const ogImage = siteUrl ? `${siteUrl}/assets/img/og-image.jpg` : null;
  const robots = noindex || !isProd ? 'noindex, nofollow' : 'index, follow';
  return `<!doctype html>
<html lang="${config.site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="${config.brand.colors.green}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<meta property="og:locale" content="es_CO">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(config.brand.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Logo de Álzate - Abogados y fotografía del abogado Gilberto Álzate">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${u.prefix}favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="${u.prefix}favicon-32.png">
<link rel="apple-touch-icon" href="${u.asset('img/apple-touch-icon.png')}">
<link rel="preload" href="${u.asset('fonts/cormorant-garamond-latin-600-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${u.asset('fonts/inter-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${u.asset('css/styles.css')}">
${ld ? `<script type="application/ld+json">${ld}</script>` : ''}
${ld2 ? `<script type="application/ld+json">${ld2}</script>` : ''}
</head>
<body>
<script>document.documentElement.classList.add('js')</script>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
${draftBanner()}`;
}

function draftBanner() {
  if (isClean) return '';
  const missing = [];
  if (!waNumberValid) missing.push('número de WhatsApp');
  if (!siteUrl) missing.push('dominio');
  return `<div class="draft-banner" role="note"><strong>Modo borrador.</strong> Pendiente: ${missing.length ? missing.join(', ') + '; ' : ''}datos de contacto, credenciales autorizadas y revisión jurídica. Los avisos <span class="pending">[POR COMPLETAR]</span> no aparecen en producción.</div>`;
}

export function header({ depth }) {
  const u = makeUrl(depth);
  const items = nav
    .map((n) => `<li><a href="${u.page(n.href)}">${esc(n.label)}</a></li>`)
    .join('');
  return `<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="${u.page('index')}" aria-label="${esc(config.brand.name)} — ir al inicio">
      <img class="brand__mark" src="${u.asset('img/logo-mark-green.webp')}" width="56" height="43" alt="" decoding="async">
      <span class="brand__text"><span class="brand__name">Álzate - Abogados</span><span class="brand__tag">Sucesiones, fideicomisos y familia</span></span>
    </a>
    <nav class="nav" aria-label="Principal">
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-list" aria-label="Abrir menú">
        <span class="nav__toggle-open">${icon('menu', { size: 26 })}</span>
        <span class="nav__toggle-close">${icon('close', { size: 26 })}</span>
      </button>
      <ul class="nav__list" id="nav-list">
        ${items}
        <li class="nav__cta">${waButton({ message: waMessages.header, label: 'Consultar por WhatsApp', size: 'sm' })}</li>
      </ul>
    </nav>
  </div>
</header>`;
}

export function footer({ depth }) {
  const u = makeUrl(depth);
  const links = nav.map((n) => `<li><a href="${u.page(n.href)}">${esc(n.label)}</a></li>`).join('');
  const c = config.contact;
  const contactRows = [
    c.email ? `<li>Correo: <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : '',
    c.coverage ? `<li>${esc(c.coverage)}</li>` : '',
    c.address ? `<li>${esc(c.address)}</li>` : '',
    c.hours ? `<li>${esc(c.hours)}</li>` : '',
  ].join('');
  const draftContact = isClean ? '' : `<li>${pending('correo, ciudad, dirección y horarios')}</li>`;
  const card = config.profile.professionalCard
    ? `<p class="footer__small">Tarjeta profesional: ${esc(config.profile.professionalCard)}</p>`
    : isClean
      ? ''
      : `<p class="footer__small">${pending('tarjeta profesional (opcional)')}</p>`;
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer__brand">
      <img src="${u.asset('img/logo-full-ivory.webp')}" width="260" height="178" alt="Álzate - Abogados" loading="lazy" decoding="async">
      <p>Derecho de familia y civil.</p>
    </div>
    <div>
      <h2 class="footer__title">Navegación</h2>
      <ul class="footer__list">${links}</ul>
    </div>
    <div>
      <h2 class="footer__title">Servicios</h2>
      <ul class="footer__list">${servicePages.map((s) => `<li><a href="${u.prefix}servicios/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div id="contacto-datos">
      <h2 class="footer__title">Contacto</h2>
      <ul class="footer__list">
        <li><a href="${esc(waLink(waMessages.general))}" data-wa${waPendingAttr()}${waNumberValid ? ' target="_blank" rel="noopener noreferrer"' : ''}>Escribir por WhatsApp</a></li>
        ${contactRows}${draftContact}
      </ul>
      ${card}
    </div>
    <div>
      <h2 class="footer__title">Información legal</h2>
      <ul class="footer__list">
        <li><a href="${u.page('politica-de-tratamiento-de-datos')}">Política de tratamiento de datos personales</a></li>
        <li><a href="${u.page('aviso-informativo')}">Aviso sobre el contenido informativo</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>El contenido de este sitio es informativo y no sustituye una evaluación jurídica individual. El contacto inicial no implica aceptación del caso, representación legal ni garantía de resultados.</p>
    <p>© <span id="year">${new Date().getFullYear()}</span> ${esc(config.brand.name)}. Todos los derechos reservados.</p>
  </div>
</footer>`;
}

/** Acceso flotante discreto con el avatar del abogado. */
export function floatingWa({ depth }) {
  const u = makeUrl(depth);
  return `<a class="wa-float" href="${esc(waLink(waMessages.float))}" data-wa${waPendingAttr()}${waNumberValid ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="Escribir por WhatsApp al abogado Gilberto Álzate">
  <img src="${u.asset('img/gilberto-avatar.webp')}" width="44" height="44" alt="" decoding="async" loading="lazy">
  <span class="wa-float__text"><span class="wa-float__small">Hable directamente con el abogado</span><span class="wa-float__big">Escribir por WhatsApp</span></span>
  ${waIcon(22)}
</a>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>`;
}

export function scripts({ depth }) {
  const u = makeUrl(depth);
  const a = config.analytics;
  const analytics =
    a.provider === 'ga4' && a.measurementId
      ? `<script>window.ALZATE_ANALYTICS=${JSON.stringify({ provider: a.provider, id: a.measurementId })}</script>`
      : '';
  return `${analytics}<script src="${u.asset('js/main.js')}" defer></script>
</body>
</html>`;
}

export const homeJsonLd = jsonLdHome;

/** Página completa. */
export function page({ depth, title, description, path, noindex, ld, ld2, main, ogType }) {
  return `${head({ depth, title, description, path, noindex, ld, ld2, ogType })}
${header({ depth })}
<main id="contenido" tabindex="-1">
${main}
</main>
${footer({ depth })}
${floatingWa({ depth })}
${scripts({ depth })}`;
}
