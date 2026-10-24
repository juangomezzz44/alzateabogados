import { config, waMessages, nav } from '../site.config.mjs';
import { esc, makeUrl, waLink, waPendingAttr, waNumberValid, isProd, isClean, siteUrl, canonicalFor, pending } from './lib.mjs';
import { icon, waIcon } from './icons.mjs';

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
      'Asesoría jurídica en derecho de familia y derecho civil, con atención personalizada y trayectoria profesional desde 1985.',
    areaServed: [{ '@type': 'City', name: 'Bogotá' }, { '@type': 'Country', name: 'Colombia' }],
    knowsAbout: ['Derecho de familia', 'Derecho civil', 'Sociedades comerciales'],
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
<style>
/* ==========================================================
   Álzate - Abogados — sistema de diseño
   Verde medido del logo oficial · serif editorial + sans moderna
   ========================================================== */

@font-face{font-family:"Cormorant Garamond";font-style:normal;font-weight:500;font-display:swap;src:url("../fonts/cormorant-garamond-latin-500-normal.woff2") format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:normal;font-weight:600;font-display:swap;src:url("../fonts/cormorant-garamond-latin-600-normal.woff2") format("woff2")}
@font-face{font-family:"Inter";font-style:normal;font-weight:100 900;font-display:swap;src:url("../fonts/inter-latin-wght-normal.woff2") format("woff2")}

:root{
  --green:#0E2D1F;
  --green-2:#123D2C;
  --ink:#0A2217;
  --white:#fff;
  --ivory:#F7F5EF;
  --ivory-dark:#ECEBDE;
  --text:#303630;
  --muted:#58615a;
  --gold:#B5A078;
  --line:rgba(14,45,31,.14);
  --focus:#0E2D1F;

  --serif:"Cormorant Garamond",Georgia,"Times New Roman",serif;
  --sans:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;

  --radius:14px;
  --radius-lg:24px;
  --shadow:0 1px 2px rgba(10,34,23,.06),0 10px 30px -12px rgba(10,34,23,.22);
  --shadow-lg:0 30px 60px -28px rgba(10,34,23,.55);
  --gold-glow:0 0 15px rgba(181,160,120,.4);
  --gutter:clamp(20px,4vw,40px);
  --header-h:76px;
  --ease:cubic-bezier(.22,.8,.2,1);
}

*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:calc(var(--header-h) + 16px);-webkit-text-size-adjust:100%}
body{margin:0;font-family:var(--sans);font-size:1.0625rem;line-height:1.65;color:var(--text);background:var(--ivory);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img{max-width:100%;height:auto;display:block}
h1,h2,h3,h4{font-family:var(--serif);font-weight:600;color:var(--green);line-height:1.1;margin:0 0 .5em;letter-spacing:-.005em;text-wrap:balance}
h1{font-size:clamp(2.7rem,5.4vw,4.6rem)}
h2{font-size:clamp(2.05rem,3.7vw,3.1rem)}
h3{font-size:1.55rem}
p{margin:0 0 1em;text-wrap:pretty}
a{color:var(--green-2);text-underline-offset:3px}
ul,ol{margin:0;padding:0}
button{font:inherit}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:4px}
.hero :focus-visible,.cta :focus-visible,.site-footer :focus-visible,.page-hero :focus-visible,.family :focus-visible{outline-color:var(--ivory)}
::selection{background:var(--green);color:var(--ivory)}

.container{width:min(1200px,100% - var(--gutter)*2);margin-inline:auto}
.container--narrow{width:min(820px,100% - var(--gutter)*2)}
.center{text-align:center}

.skip-link{position:absolute;left:12px;top:-60px;background:var(--green);color:#fff;padding:12px 18px;border-radius:8px;z-index:200;transition:top .2s}
.skip-link:focus{top:12px}
main:focus{outline:none}

/* ---------- Avisos de borrador ---------- */
.draft-banner{background:#fff3c4;color:#5c4300;font-size:.85rem;padding:8px var(--gutter);text-align:center;line-height:1.4}
.pending{background:#fff3c4;color:#5c4300;padding:1px 7px;border-radius:5px;font-size:.82em;font-weight:600;white-space:normal}
.slot{border:1.5px dashed #c7b46a;background:#fffbe8;color:#5c4300;padding:10px 14px;border-radius:10px;font-size:.9rem;margin:16px 0}

/* ---------- Tipografía de apoyo ---------- */
.eyebrow{font-family:var(--sans);font-size:.78rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--green-2);margin:0 0 18px;display:flex;align-items:center;gap:12px}
.eyebrow::before{content:"";width:34px;height:1px;background:var(--gold);flex:none}
.eyebrow--light{color:var(--gold)}
.eyebrow .sep{opacity:.6}
.lead{font-size:clamp(1.1rem,1.5vw,1.28rem);line-height:1.6;max-width:56ch}
.section__lead{font-size:1.15rem;color:var(--muted);max-width:60ch}
.meta{font-size:.9rem;color:var(--muted)}
.meta--light{color:rgba(247,245,239,.8)}

/* ---------- Botones ---------- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:12px 24px;border-radius:8px;border:1.5px solid transparent;font-weight:600;font-size:.98rem;line-height:1.2;text-decoration:none;cursor:pointer;transition:transform .2s var(--ease),background-color .2s,color .2s,border-color .2s,box-shadow .2s;text-align:center}
.btn:hover{transform:translateY(-2px)}
.btn:active{transform:translateY(0)}
.btn--lg{min-height:56px;padding:14px 30px;font-size:1.05rem}
.btn--sm{min-height:44px;padding:9px 18px;font-size:.92rem}
.btn--primary{background:var(--green);color:#fff;box-shadow:0 8px 20px -10px rgba(14,45,31,.7)}
.btn--primary:hover{background:var(--green-2)}
.btn--light{background:var(--ivory);color:var(--green);box-shadow:0 14px 30px -14px rgba(0,0,0,.6)}
.btn--light:hover{background:#fff}
.btn--outline{border-color:var(--green);color:var(--green);background:transparent}
.btn--outline:hover{background:var(--green);color:#fff}
.btn--ghost{border-color:rgba(247,245,239,.55);color:var(--ivory);background:transparent}
.btn--ghost:hover{background:rgba(247,245,239,.12);border-color:var(--ivory)}
.btn--text{background:none;border:0;color:var(--green-2);padding:8px 0;min-height:44px;font-weight:600}
.btn--text:hover{transform:none;text-decoration:underline}

/* ---------- Encabezado ---------- */
.site-header{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.94);backdrop-filter:saturate(1.4) blur(12px);-webkit-backdrop-filter:saturate(1.4) blur(12px);border-bottom:1px solid var(--line);transition:box-shadow .3s}
.site-header.is-scrolled{box-shadow:0 8px 24px -16px rgba(10,34,23,.4)}
.header-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:var(--header-h);transition:min-height .3s var(--ease)}
.is-scrolled .header-inner{min-height:64px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--green)}
.brand__mark{width:56px;height:auto}
.brand__text{display:flex;flex-direction:column;line-height:1.1}
.brand__name{font-family:var(--serif);font-weight:600;font-size:1.55rem;letter-spacing:-.005em}
.brand__tag{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:3px}

.nav__toggle{display:none;width:48px;height:48px;border:1px solid var(--line);background:#fff;border-radius:10px;color:var(--green);cursor:pointer;align-items:center;justify-content:center}
.nav__toggle-close{display:none}
.nav__toggle[aria-expanded="true"] .nav__toggle-open{display:none}
.nav__toggle[aria-expanded="true"] .nav__toggle-close{display:inline-flex}
.nav__list{list-style:none;display:flex;align-items:center;gap:6px}
.nav__list a:not(.btn){display:inline-flex;align-items:center;min-height:44px;padding:8px 12px;color:var(--text);text-decoration:none;font-size:.95rem;font-weight:500;border-radius:8px;position:relative}
.nav__list a:not(.btn)::after{content:"";position:absolute;left:12px;right:12px;bottom:6px;height:1px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .3s var(--ease)}
.nav__list a:not(.btn):hover{color:var(--green)}
.nav__list a:not(.btn):hover::after{transform:scaleX(1)}
.nav__cta{margin-left:10px}

@media (max-width:1040px){
  .nav__toggle{display:inline-flex}
  .nav__list{position:absolute;left:0;right:0;top:100%;flex-direction:column;align-items:stretch;gap:0;background:#fff;border-bottom:1px solid var(--line);padding:8px var(--gutter) 22px;box-shadow:0 24px 40px -24px rgba(10,34,23,.45);display:none}
  .nav__list.is-open{display:flex}
  .nav__list a:not(.btn){padding:14px 4px;border-bottom:1px solid var(--line);font-size:1.05rem}
  .nav__list a:not(.btn)::after{display:none}
  .nav__cta{margin:16px 0 0}
  .nav__cta .btn{width:100%}
}
@media (max-width:420px){.brand__tag{display:none}.brand__name{font-size:1.35rem}.brand__mark{width:46px}}

/* ---------- Hero ---------- */
.hero{position:relative;overflow:hidden;background:radial-gradient(120% 100% at 85% 0%,#17503a 0%,var(--green) 55%,var(--ink) 100%);color:var(--ivory);padding-block:clamp(48px,7vw,96px) clamp(64px,8vw,112px)}
.hero__bg{position:absolute;inset:0;pointer-events:none}
.hero__bg::before,.hero__bg::after{content:"";position:absolute;border:1px solid rgba(181,160,120,.22);border-bottom:0;border-radius:999px 999px 0 0}
.hero__bg::before{width:720px;height:820px;right:-120px;bottom:-40px}
.hero__bg::after{width:520px;height:620px;right:-20px;bottom:-40px;border-color:rgba(247,245,239,.1)}
.hero__grid{position:relative;display:grid;grid-template-columns:1.12fr .88fr;gap:clamp(32px,6vw,88px);align-items:center}
.hero h1{color:#fff;margin-bottom:.45em}
.hero h1 em{font-style:normal;color:var(--ivory);background:linear-gradient(transparent 88%,rgba(181,160,120,.9) 88%,rgba(181,160,120,.9) 93%,transparent 93%);padding-bottom:.04em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.hero .lead{color:rgba(247,245,239,.9);margin-bottom:2em}
.hero__actions{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:34px}
.hero__facts{list-style:none;display:flex;flex-wrap:wrap;gap:10px 26px;font-size:.95rem;color:rgba(247,245,239,.85);padding-top:26px;border-top:1px solid rgba(247,245,239,.18)}
.hero__facts li{display:flex;align-items:center;gap:8px}
.hero__facts .icon{color:var(--gold)}

.hero__visual{position:relative;margin:0;justify-self:center;width:min(100%,460px)}
.hero__visual::before{content:"";position:absolute;inset:0;transform:translate(18px,18px);border:1px solid var(--gold);border-radius:999px 999px 16px 16px;opacity:.85}
.arch{position:relative;aspect-ratio:4/5;border-radius:999px 999px 16px 16px;overflow:hidden;background:#d9d5c8;box-shadow:var(--shadow-lg)}
.arch img{width:100%;height:100%;object-fit:cover;object-position:50% 20%}
.hero__chip{position:absolute;left:-18px;bottom:34px;background:var(--ivory);color:var(--green);padding:14px 20px;border-radius:12px;box-shadow:0 18px 36px -14px rgba(0,0,0,.55);display:flex;flex-direction:column;line-height:1.25}
.hero__chip-name{font-family:var(--serif);font-weight:600;font-size:1.35rem}
.hero__chip-role{font-size:.8rem;color:var(--muted)}

@media (max-width:900px){
  .hero__grid{grid-template-columns:1fr}
  .hero__visual{width:min(100%,380px);margin-top:12px}
  .hero__chip{left:12px;bottom:20px}
  .hero__bg::before{right:-260px}
}

/* ---------- Secciones ---------- */
.section{padding-block:clamp(64px,9vw,124px)}
.section--ivory{background:var(--ivory)}
.section__head{max-width:760px;margin-bottom:clamp(36px,5vw,60px)}

/* Pilares */
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,3vw,40px)}
.pillar{padding-top:26px;border-top:2px solid var(--green);position:relative}
.pillar::before{content:"";position:absolute;top:-2px;left:0;width:56px;height:2px;background:var(--gold)}
.pillar__icon{display:inline-grid;place-items:center;width:60px;height:60px;border-radius:999px 999px 10px 10px;background:var(--ivory);color:var(--green);margin-bottom:20px;border:1px solid var(--line)}
.pillar h3{margin-bottom:.4em}
.pillar p{color:var(--muted);margin:0}
@media (max-width:860px){.pillars{grid-template-columns:1fr}}

/* Tarjetas */
.card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px;transition:transform .3s var(--ease),box-shadow .3s,border-color .3s,box-shadow .3s var(--ease)}
.card:hover{transform:translateY(-4px);box-shadow:var(--shadow);border-color:rgba(14,45,31,.28);box-shadow:var(--shadow), var(--gold-glow)}
.card__icon{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:999px 999px 8px 8px;background:var(--ivory);color:var(--green);margin-bottom:18px}
.card h3{font-size:1.45rem;margin-bottom:.45em}
.card p{color:var(--muted);font-size:.98rem;flex:1}
.card__link{display:inline-flex;align-items:center;gap:8px;margin-top:10px;min-height:44px;font-weight:600;font-size:.92rem;color:var(--green-2);text-decoration:none;border-top:1px solid var(--line);padding-top:12px}
.card__link .icon:last-child{margin-left:auto;transition:transform .25s var(--ease)}
.card__link:hover{color:var(--green)}
.card--featured .card__link{font-size:.88rem;gap:8px}
.card--featured .card__link .icon:last-child{display:none}
.card__link:hover .icon:last-child{transform:translateX(4px)}

/* Derecho de familia (protagonista) */
.family{background:linear-gradient(160deg,var(--green-2),var(--green) 60%,var(--ink));color:var(--ivory);border-radius:var(--radius-lg);padding:clamp(26px,4.5vw,56px);position:relative;overflow:hidden;box-shadow:var(--shadow-lg)}
.family::after{content:"";position:absolute;width:480px;height:560px;right:-120px;top:-180px;border:1px solid rgba(181,160,120,.25);border-radius:999px;pointer-events:none}
.family__intro{position:relative;max-width:640px;margin-bottom:clamp(26px,4vw,44px)}
.family__badge{display:inline-block;font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(181,160,120,.5);padding:6px 12px;border-radius:999px;margin-bottom:16px}
.family__intro h3{color:#fff;font-size:clamp(2.1rem,3.6vw,3rem)}
.family__intro p{color:rgba(247,245,239,.88);font-size:1.1rem;margin:0}
.family__grid{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.card--featured{padding:24px;border-color:transparent}
.card--featured h3{font-size:1.32rem}
@media (max-width:1120px){.family__grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:620px){.family__grid{grid-template-columns:1fr}}

.secondary{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:24px}
.card--wide{padding:32px}
.card--quiet{background:transparent}
@media (max-width:820px){.secondary{grid-template-columns:1fr}}

/* Perfil + explorador de la fotografía */
.profile{display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(32px,6vw,88px);align-items:start}
.explorer__frame{position:relative;margin:0;border-radius:var(--radius-lg) var(--radius-lg) var(--radius-lg) 140px;overflow:hidden;box-shadow:var(--shadow-lg);background:#ddd}
.explorer__frame img{width:100%;aspect-ratio:4/3;object-fit:cover}
.explorer{position:relative}
.explorer::before{content:"";position:absolute;inset:18px -18px -18px 18px;border:1px solid var(--gold);border-radius:var(--radius-lg) var(--radius-lg) var(--radius-lg) 140px;z-index:-1}
.pin{position:absolute;width:48px;height:48px;margin:-24px 0 0 -24px;padding:0;border:0;background:transparent;cursor:pointer;display:grid;place-items:center;border-radius:50%}
.pin__dot{position:relative;width:18px;height:18px;border-radius:50%;background:var(--ivory);border:3px solid var(--green);box-shadow:0 2px 8px rgba(0,0,0,.4);transition:transform .25s var(--ease),background-color .2s}
.pin__dot::after{content:"";position:absolute;inset:-9px;border-radius:50%;border:2px solid rgba(247,245,239,.9);animation:ping 2.6s var(--ease) infinite}
.pin:hover .pin__dot,.pin[aria-pressed="true"] .pin__dot{transform:scale(1.25);background:var(--green)}
.pin[aria-pressed="true"] .pin__dot{border-color:var(--ivory)}
.pin:focus-visible{outline:3px solid var(--ivory);outline-offset:0;box-shadow:0 0 0 6px var(--green)}
@keyframes ping{0%{transform:scale(.6);opacity:.9}70%,100%{transform:scale(1.5);opacity:0}}
.explorer__panel{margin-top:22px;min-height:96px;padding:16px 20px;background:var(--ivory);border-radius:var(--radius);border:1px solid var(--line)}
.explorer__hint{display:flex;align-items:center;gap:10px;margin:0;color:var(--muted);font-size:.95rem}
.explorer__hint .icon{color:var(--green);flex:none}
.explorer__detail h4{font-size:1.4rem;margin-bottom:.2em}
.explorer__detail p{margin:0 0 4px;color:var(--muted);font-size:.98rem}
.lightbox{border:0;padding:0;background:transparent;max-width:min(92vw,1000px);max-height:92vh;overflow:visible}
.lightbox::backdrop{background:rgba(6,20,13,.86);backdrop-filter:blur(3px)}
.lightbox img{max-height:84vh;width:auto;max-width:100%;border-radius:10px;box-shadow:var(--shadow-lg);background:#fff}
.lightbox__close{position:absolute;top:-52px;right:0;width:48px;height:48px;border-radius:50%;border:0;background:var(--ivory);color:var(--green);cursor:pointer;display:grid;place-items:center}
.lightbox__close:focus-visible{outline-color:#fff}

.since{display:flex;align-items:baseline;gap:16px;margin:8px 0 24px;padding-block:14px;border-block:1px solid var(--line)}
.since__label{font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-weight:600}
.since__year{font-family:var(--serif);font-weight:600;font-size:4.4rem;line-height:1;color:var(--green)}
.profile__copy p{color:var(--text)}
.formation{margin:26px 0}
.formation h3{font-size:1.5rem}
.formation__list{list-style:none;display:grid;gap:10px}
.formation__list li{display:flex;gap:10px;align-items:flex-start;color:var(--text)}
.formation__list .icon{color:var(--green);margin-top:3px;flex:none}
.profile__cta{margin-top:28px}
.profile__media{position:sticky;top:calc(var(--header-h) + 28px)}
@media (max-width:940px){
  .profile{grid-template-columns:1fr}
  .profile__media{position:static}
  .explorer::before{inset:12px -10px -12px 10px}
  .explorer__frame,.explorer::before{border-bottom-left-radius:80px}
}

/* Pasos */
.steps{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,3vw,40px);counter-reset:s;position:relative}
.step{position:relative;background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:56px 28px 28px}
.step__num{position:absolute;top:-24px;left:24px;width:52px;height:52px;border-radius:999px 999px 8px 8px;background:var(--green);color:var(--ivory);display:grid;place-items:center;font-family:var(--serif);font-weight:600;font-size:1.7rem;box-shadow:var(--shadow)}
.step p{color:var(--muted);margin:0}
.note{display:flex;gap:12px;align-items:flex-start;margin-top:32px;padding:16px 20px;border-radius:var(--radius);background:#fff;border:1px solid var(--line);color:var(--text);font-size:.95rem}
.note .icon{color:var(--green);flex:none;margin-top:2px}
.section--ivory .note{background:#fff}
.note--warn{background:#fff3c4;border-color:#e6cf7a}
@media (max-width:860px){.steps{grid-template-columns:1fr;gap:36px}}

/* Preguntas frecuentes */
.faq{border-top:1px solid var(--line)}
.faq__item{border-bottom:1px solid var(--line)}
.faq__item summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:68px;padding:18px 4px;cursor:pointer;font-family:var(--serif);font-weight:600;font-size:1.4rem;line-height:1.2;color:var(--green)}
.faq__item summary::-webkit-details-marker{display:none}
.faq__item summary:hover{color:var(--green-2)}
.faq__icon{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);transition:transform .3s var(--ease),background-color .2s,color .2s}
.faq__item[open] .faq__icon{transform:rotate(45deg);background:var(--green);color:#fff;border-color:var(--green)}
.faq__answer{padding:0 56px 22px 4px;color:var(--muted)}
.faq__answer p:last-child{margin-bottom:0}
.faq__cta{margin-top:34px;text-align:center}

/* Temas / artículos */
.topics{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 28px;margin-bottom:36px}
.topic a{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:64px;padding:16px 4px;border-bottom:1px solid var(--line);text-decoration:none;color:var(--green);font-family:var(--serif);font-weight:600;font-size:1.3rem;line-height:1.2;transition:padding .25s var(--ease),color .2s}
.topic a:hover{padding-left:12px;color:var(--green-2)}
.topic--soon{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:64px;padding:16px 4px;border-bottom:1px solid var(--line);color:var(--muted);font-family:var(--serif);font-weight:600;font-size:1.3rem;line-height:1.2}
.article-card--soon{background:transparent;border-style:dashed}
.article-card--soon:hover{transform:none;box-shadow:none}
.prose img{border-radius:var(--radius);margin-block:1em}
.prose h3{font-size:1.45rem;margin-top:1.4em}
.prose blockquote{border-left:3px solid var(--gold);margin:1.2em 0;padding:.2em 0 .2em 1.2em;color:var(--muted)}
.topic small{font-family:var(--sans);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
@media (max-width:760px){.topics{grid-template-columns:1fr}}

.article-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.article-card h2{font-size:1.45rem}
.article-card h2 a{text-decoration:none;color:var(--green)}

/* Páginas internas */
.page-hero{background:linear-gradient(160deg,var(--green-2),var(--green));color:var(--ivory);padding-block:clamp(40px,6vw,76px)}
.page-hero h1{color:#fff;font-size:clamp(2.2rem,4.5vw,3.5rem);margin-bottom:.3em}
.page-hero .lead{color:rgba(247,245,239,.9)}
.breadcrumb{display:flex;flex-wrap:wrap;gap:8px;font-size:.88rem;margin-bottom:22px;color:rgba(247,245,239,.8)}
.breadcrumb a{color:var(--ivory)}
.prose{font-size:1.08rem}
.prose h2{font-size:1.9rem;margin-top:1.6em}
.prose ul,.prose ol{padding-left:1.2em;margin-bottom:1em}
.outline{display:grid;gap:8px;color:var(--text)}
.prose__aside{margin-top:44px;padding:28px;border-radius:var(--radius);background:var(--ivory);border:1px solid var(--line)}
.prose__aside h2{margin-top:0;font-size:1.6rem}
.disclaimer{margin-top:26px;font-size:.88rem;color:var(--muted)}

/* Llamado final */
.cta{position:relative;overflow:hidden;background:radial-gradient(90% 140% at 15% 0%,#17503a,var(--green) 60%);color:var(--ivory);padding-block:clamp(72px,10vw,132px);text-align:center}
.cta__mark{position:absolute;right:-60px;bottom:-70px;width:min(520px,70vw);opacity:.07;pointer-events:none}
.cta__inner{position:relative;max-width:820px}
.cta h2{color:#fff}
.cta p{color:rgba(247,245,239,.9);font-size:1.15rem;max-width:56ch;margin-inline:auto}
.cta .btn{margin-top:14px}
.cta .cta__small{font-size:.88rem;color:rgba(247,245,239,.7);margin-top:20px}

/* Pie */
.site-footer{background:var(--ink);color:rgba(247,245,239,.82);padding-top:clamp(48px,6vw,80px);font-size:.95rem}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.2fr;gap:36px;padding-bottom:44px}
.footer__brand img{width:220px;height:auto;margin-bottom:10px}
.footer__title{font-family:var(--sans);font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;margin:0 0 16px}
.footer__list{list-style:none;display:grid;gap:4px}
.footer__list a{color:rgba(247,245,239,.88);display:inline-block;padding:5px 0}
.footer__list a:hover{color:#fff}
.footer__small{font-size:.85rem;margin-top:10px}
.footer-bottom{border-top:1px solid rgba(247,245,239,.14);padding-block:24px 96px;font-size:.84rem;color:rgba(247,245,239,.7)}
.footer-bottom p{max-width:78ch;margin-bottom:.6em}
@media (max-width:900px){.footer-grid{grid-template-columns:1fr 1fr}}
@media (max-width:540px){.footer-grid{grid-template-columns:1fr}}

/* WhatsApp flotante */
.wa-float{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:90;display:flex;align-items:center;gap:12px;padding:6px 18px 6px 6px;background:var(--green);color:var(--ivory);border-radius:999px;text-decoration:none;box-shadow:0 14px 34px -10px rgba(10,34,23,.7),0 0 0 1px rgba(247,245,239,.2);transition:transform .3s var(--ease),opacity .3s,box-shadow .3s}
.wa-float:hover{transform:translateY(-3px);box-shadow:0 20px 40px -10px rgba(10,34,23,.8),0 0 0 1px rgba(247,245,239,.35);animation:wa-pulse 2s infinite}
@keyframes wa-pulse{0%{box-shadow:0 0 0 0 rgba(14,45,31,.4)}70%{box-shadow:0 0 0 15px rgba(14,45,31,0)}100%{box-shadow:0 0 0 0 rgba(14,45,31,0)}}
.wa-float img{width:44px;height:44px;border-radius:50%;border:2px solid var(--ivory);object-fit:cover}
.wa-float__text{display:flex;flex-direction:column;line-height:1.15}
.wa-float__small{font-size:.7rem;opacity:.8}
.wa-float__big{font-size:.92rem;font-weight:600}
.js .wa-float{opacity:0;transform:translateY(20px);pointer-events:none}
.js .wa-float.is-visible{opacity:1;transform:none;pointer-events:auto}
@media (max-width:560px){.wa-float__small{display:none}.wa-float{padding-right:14px}}

.toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:120;max-width:min(92vw,460px);background:#fff3c4;color:#5c4300;padding:14px 18px;border-radius:12px;box-shadow:var(--shadow);font-size:.92rem;text-align:center}

/* Revelado suave (solo con JS; el contenido es visible sin él) */
.js .reveal{opacity:0;transform:translateY(16px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:var(--d,0ms)}
.js .reveal.is-in{opacity:1;transform:none}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!//Línea corregida para evitar errores de sintaxis
  .js .reveal{opacity:1;transform:none}
  .js .wa-float{transform:none}
}
@media print{.site-header,.wa-float,.draft-banner{display:none}}

/* ---------- Ornamentos y Detalles Premium ---------- */
.ornament{display:block;width:120px;height:2px;background:var(--gold);margin:0 auto 32px;position:relative}
.ornament::before,.ornament::after{content:"";position:absolute;width:8px;height:8px;background:var(--gold);border-radius:50%;top:-3px}
.ornament::before{left:0}.ornament::after{right:0}

.section--dark{background:var(--green);color:var(--ivory)}
.section--dark h2, .section--dark h3{color:#fff}
.section--dark .section__lead, .section--dark p{color:rgba(247,245,239,.8)}
.section--dark .eyebrow{color:var(--gold)}
.section--dark .eyebrow::before{background:var(--gold)}
.section--dark .btn--outline{border-color:var(--ivory);color:var(--ivory)}
.section--dark .btn--outline:hover{background:var(--ivory);color:var(--green)}
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
      <span class="brand__text"><span class="brand__name">Álzate - Abogados</span><span class="brand__tag">Derecho de familia y civil</span></span>
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
</style>
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
