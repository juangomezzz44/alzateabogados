import { config, waMessages } from '../../site.config.mjs';
import { esc, makeUrl, waLink, waPendingAttr, waNumberValid, isProd, isClean, pending } from '../lib.mjs';
import { icon, waIcon } from '../icons.mjs';
import { page, waButton, homeJsonLd } from '../layout.mjs';
import { specialties, familyServices, civilArea, commercialArea, pillars, steps, faqs, articles, comingSoon } from '../content.mjs';

const depth = 0;
const u = makeUrl(depth);

const waAttrs = () => `data-wa${waPendingAttr()}${waNumberValid ? ' target="_blank" rel="noopener noreferrer"' : ''}`;

const svcHref = (s) => `${u.prefix}servicios/${s.slug}/`;

function serviceCard(s) {
  return `<article class="card reveal">
    <span class="card__icon">${icon(s.icon, { size: 26 })}</span>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.text)}</p>
    <a class="card__link" href="${esc(waLink(waMessages.topic(s.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre: ${esc(s.name)}">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
  </article>`;
}

function hero() {
  const [fid, suc] = specialties;
  const chips = [
    fid && { s: fid, label: 'Fideicomisos civiles', ic: fid.icon },
    suc && { s: suc, label: 'Sucesiones', ic: suc.icon },
    suc && { s: suc, label: 'Herencias', ic: 'will' },
  ].filter(Boolean);
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow eyebrow--light">Álzate - Abogados · Bogotá y todo el país</p>
      <h1 id="hero-title">Su caso merece atención jurídica personal</h1>
      <p class="hero__specialty">Fideicomisos civiles, sucesiones y herencias</p>
      <ul class="chips" aria-label="Especialidades destacadas">
        ${chips.map((c) => `<li><a class="chip" href="${svcHref(c.s)}">${icon(c.ic, { size: 22 })}<span>${esc(c.label)}</span></a></li>`).join('')}
      </ul>
      <p class="lead">Asesoría en derecho civil y de familia, con ejercicio profesional desde ${config.brand.practiceSince} y comunicación directa con el abogado.</p>
      <div class="hero__actions">
        ${waButton({ message: waMessages.hero, label: 'Conversemos sobre su caso', variant: 'gold', size: 'lg' })}
        <a class="btn btn--ghost btn--lg" href="#abogado"><span>Conozca al abogado</span></a>
      </div>
    </div>
    <div class="collage">
      <figure class="collage__main">
        <div class="arch"><img src="${u.asset('img/gilberto-retrato.webp')}" width="640" height="810" alt="El abogado Gilberto Álzate, de pie junto a la biblioteca de su despacho" fetchpriority="high" decoding="async"></div>
        <figcaption class="hero__chip"><span class="hero__chip-name">${esc(config.brand.lawyer)}</span><span class="hero__chip-role">Abogado · ejerce desde ${config.brand.practiceSince}</span></figcaption>
      </figure>
      <img class="collage__dot collage__dot--a" src="${u.asset('img/detalle-biblioteca.webp')}" width="300" height="565" alt="Biblioteca jurídica del despacho, con textos de derecho civil y de familia" loading="lazy" decoding="async">
      <img class="collage__dot collage__dot--b" src="${u.asset('img/detalle-banderas.webp')}" width="335" height="400" alt="Detalle del despacho con las banderas de Colombia y de Bogotá" loading="lazy" decoding="async">
      <span class="collage__icon" aria-hidden="true">${icon('lawyer', { size: 34 })}</span>
    </div>
  </div>
</section>`;
}

function facts() {
  const items = [
    ['calendar', `Desde ${config.brand.practiceSince}`, 'ejerciendo en el ámbito jurídico'],
    ['pin', 'Bogotá y todo el país', 'atención desde Bogotá'],
    ['chat', 'Directo con el abogado', 'comunicación clara y cercana'],
    ['scale-balance', 'Familia, civil y sociedades', 'áreas de práctica'],
  ];
  return `<section class="facts" aria-label="Datos destacados"><ul class="container facts__list">
    ${items.map(([ic, t, d]) => `<li>${icon(ic, { size: 30 })}<span><strong>${esc(t)}</strong><small>${esc(d)}</small></span></li>`).join('')}
  </ul></section>`;
}

function specialtiesSection() {
  const tones = ['bosque', 'esmeralda'];
  return `<section class="section section--tight" id="especialidades" aria-labelledby="esp-title">
  <div class="container">
    <header class="section__head reveal">
      <h2 id="esp-title">Especialidades destacadas</h2>
      <p class="section__lead">Orientación en dos asuntos del derecho civil que suelen requerir cuidado: los fideicomisos civiles y las sucesiones y herencias.</p>
    </header>
    <div class="spec">
      ${specialties
        .map(
          (s, i) => `<article class="spec__card spec__card--${tones[i % 2]} reveal">
        <span class="spec__icon">${icon(s.icon, { size: 44 })}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.text)}</p>
        <div class="spec__actions">
          <a class="btn btn--gold btn--sm" href="${svcHref(s)}"><span>Más información</span>${icon('arrow', { size: 16 })}</a>
          <a class="spec__wa" href="${esc(waLink(waMessages.topic(s.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre: ${esc(s.name)}">${waIcon(18)}<span>WhatsApp</span></a>
        </div>
      </article>`,
        )
        .join('')}
      <div class="spec__photo reveal" aria-hidden="true"><img src="${u.asset('img/detalle-biblioteca.webp')}" width="300" height="565" alt="" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>`;
}

function values() {
  return `<section class="section section--mint" id="atencion" aria-labelledby="valor-title">
  <div class="container values">
    <div class="values__copy">
      <header class="section__head reveal">
        <h2 id="valor-title">Más que un trámite, una situación que merece ser comprendida</h2>
        <p class="section__lead">La prioridad es escuchar, comprender las particularidades de cada situación y acompañar con claridad.</p>
      </header>
      <div class="pillars">
        ${pillars
          .map(
            (p, i) => `<article class="pillar reveal" style="--d:${i * 90}ms">
          <span class="pillar__icon">${icon(p.icon, { size: 28 })}</span>
          <div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
        </article>`,
          )
          .join('')}
      </div>
    </div>
    <figure class="values__photo reveal"><img src="${u.asset('img/despacho.webp')}" width="1280" height="960" alt="El abogado Gilberto Álzate en su despacho" loading="lazy" decoding="async"></figure>
  </div>
</section>`;
}

function areas() {
  return `<section class="section section--tight" id="areas" aria-labelledby="areas-title">
  <div class="container">
    <header class="section__head reveal">
      <h2 id="areas-title">Áreas de práctica</h2>
      <p class="section__lead">Cada explicación es general e informativa. Para saber cómo aplica a su situación, conversemos.</p>
    </header>

    <div class="family reveal">
      <div class="family__intro">
        <span class="family__icon">${icon('rings', { size: 40 })}</span>
        <h3>Derecho de familia</h3>
        <p>Acompañamiento en las decisiones familiares y patrimoniales que marcan un antes y un después, con lenguaje claro y atención directa.</p>
      </div>
      <ul class="family__list">
        ${familyServices
          .map(
            (s) => `<li class="frow">
          <a class="frow__main" href="${svcHref(s)}"><span class="frow__icon">${icon(s.icon, { size: 22 })}</span><span><strong>${esc(s.name)}</strong><small>${esc(s.text)}</small></span></a>
          <a class="frow__wa" href="${esc(waLink(waMessages.topic(s.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre: ${esc(s.name)}">${waIcon(20)}</a>
        </li>`,
          )
          .join('')}
      </ul>
    </div>

    <div class="secondary">
      <article class="card card--cream reveal">
        <span class="card__icon">${icon(civilArea.icon, { size: 26 })}</span>
        <h3>${esc(civilArea.name)}</h3>
        <p>${esc(civilArea.text)}</p>
        ${isClean ? '' : `<p>${pending('listado de asuntos civiles que el abogado atiende')}</p>`}
        <a class="card__link" href="${esc(waLink(waMessages.topic(civilArea.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre derecho civil">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
      <article class="card card--mint reveal">
        <span class="card__icon">${icon(commercialArea.icon, { size: 26 })}</span>
        <h3>${esc(commercialArea.name)}</h3>
        <p>${esc(commercialArea.text)}</p>
        ${isClean ? '' : `<p>${pending('alcance confirmado de la asesoría en sociedades comerciales')}</p>`}
        <a class="card__link" href="${esc(waLink(waMessages.topic(commercialArea.asunto)))}" ${waAttrs()} aria-label="Consultar por WhatsApp sobre sociedades comerciales">${waIcon(18)}<span>Consultar por WhatsApp</span>${icon('arrow', { size: 16 })}</a>
      </article>
    </div>
  </div>
</section>`;
}

/** Hotspots sobre la fotografía real del despacho. Coordenadas en % de la imagen 1280x960. */
function officeExplorer() {
  const showCreds = config.profile.showCredentialsFromPhoto;
  const pins = [
    {
      id: 'biblioteca',
      x: 11,
      y: 77,
      title: 'La biblioteca del despacho',
      text: 'Textos de derecho de familia, derecho civil y derecho procesal al alcance de la mano.',
      zoom: null,
    },
    ...(showCreds
      ? [
          {
            id: 'especialista',
            x: 77,
            y: 33,
            title: 'Especialista en Derecho de Familia',
            text: 'Diploma de la Pontificia Universidad Javeriana en el despacho.',
            zoom: 'img/diploma-especialista.webp',
            zoomAlt: 'Diploma de Especialista en Derecho de Familia de la Pontificia Universidad Javeriana',
          },
          {
            id: 'abogado',
            x: 78,
            y: 79,
            title: 'Título de Abogado',
            text: 'Diploma de la Pontificia Universidad Javeriana en el despacho.',
            zoom: 'img/diploma-abogado.webp',
            zoomAlt: 'Diploma de Abogado de la Pontificia Universidad Javeriana',
          },
        ]
      : []),
  ];
  return `<div class="explorer reveal" data-explorer>
    <figure class="explorer__frame">
      <img src="${u.asset('img/despacho.webp')}" width="1280" height="960" alt="El abogado Gilberto Álzate en su despacho, junto a su biblioteca jurídica y sus diplomas enmarcados" loading="lazy" decoding="async">
      ${pins
        .map(
          (p) => `<button class="pin" type="button" style="left:${p.x}%;top:${p.y}%" data-pin="${p.id}" data-title="${esc(p.title)}" data-text="${esc(p.text)}"${p.zoom ? ` data-zoom="${u.asset(p.zoom)}" data-zoom-alt="${esc(p.zoomAlt)}"` : ''} aria-label="Ver detalle: ${esc(p.title)}" aria-pressed="false"><span class="pin__dot"></span></button>`,
        )
        .join('')}
    </figure>
    <div class="explorer__panel" aria-live="polite">
      <p class="explorer__hint" data-hint>${icon('zoom', { size: 18 })} <span>Toque los puntos de la fotografía para conocer su despacho.</span></p>
      <div class="explorer__detail" data-detail hidden>
        <h4 data-detail-title></h4>
        <p data-detail-text></p>
        <button class="btn btn--text" type="button" data-zoom-btn hidden>${icon('zoom', { size: 18 })}<span>Ver diploma ampliado</span></button>
      </div>
    </div>
  </div>
  <dialog class="lightbox" data-lightbox aria-label="Imagen ampliada">
    <form method="dialog"><button class="lightbox__close" aria-label="Cerrar">${icon('close', { size: 24 })}</button></form>
    <img src="" alt="" data-lightbox-img>
  </dialog>`;
}

function profile() {
  const cfg = config.profile;
  const bio = cfg.bio
    ? `<p>${esc(cfg.bio)}</p>`
    : isClean
      ? ''
      : `<p class="slot">${pending('biografía verificada por el abogado')}</p>`;
  const photoSlot = isClean ? '' : `<p class="slot">${pending('fotografía profesional en alta resolución (la actual es de 1280×960)')}</p>`;
  const credentials = cfg.showCredentialsFromPhoto
    ? `<div class="formation reveal">
        <h3>Formación</h3>
        <ul class="formation__list">
          <li>${icon('check', { size: 18 })}<span><strong>Abogado</strong> — Pontificia Universidad Javeriana</span></li>
          <li>${icon('check', { size: 18 })}<span><strong>Especialista en Derecho de Familia</strong> — Pontificia Universidad Javeriana</span></li>
        </ul>
        ${isClean ? '' : `<p class="slot">${pending('validar formación con el abogado; añadir otra formación, experiencia y cargos autorizados')}</p>`}
      </div>`
    : isClean
      ? ''
      : `<div class="formation"><p class="slot">${pending('formación académica y credenciales autorizadas')}</p></div>`;
  return `<section class="section section--cream" id="abogado" aria-labelledby="abogado-title">
  <div class="container profile">
    <div class="profile__media">
      ${officeExplorer()}
      ${photoSlot}
    </div>
    <div class="profile__copy">
      <h2 id="abogado-title" class="reveal">Trayectoria que aporta perspectiva. Atención que pone a las personas en el centro</h2>
      <div class="since reveal" aria-label="Ejerce desde ${config.brand.practiceSince}">
        <span class="since__label">Ejerciendo desde</span>
        <span class="since__year">${config.brand.practiceSince}</span>
      </div>
      <p class="reveal"><strong>${esc(config.brand.lawyer)}</strong> ejerce en el ámbito jurídico desde ${config.brand.practiceSince}. Esa trayectoria se traduce en experiencia acumulada, conocimiento del ejercicio del derecho y una perspectiva que ayuda a comprender cada asunto en su contexto.</p>
      <p class="reveal">La experiencia no está reñida con una atención actual, accesible y cercana: escuchar con atención la situación de cada persona, explicarla con claridad y acompañar con criterio.</p>
      ${bio}
      ${credentials}
      <div class="reveal profile__cta">${waButton({ message: waMessages.profile, label: 'Escribir al doctor Gilberto' })}</div>
    </div>
  </div>
</section>`;
}

function how() {
  return `<section class="section section--emerald" id="como-funciona" aria-labelledby="como-title">
  <div class="container">
    <header class="section__head reveal">
      <h2 id="como-title">Cómo funciona la atención: tres pasos para empezar</h2>
    </header>
    <ol class="steps">
      ${steps
        .map(
          (s, i) => `<li class="step reveal" style="--d:${i * 90}ms">
        <span class="step__num" aria-hidden="true">${i + 1}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <p class="note reveal">${icon('shield', { size: 20 })}<span>El contacto inicial no implica aceptación automática del caso, representación legal ni garantía de resultados.</span></p>
  </div>
</section>`;
}

function faq() {
  return `<section class="section section--tight" id="preguntas-frecuentes" aria-labelledby="faq-title">
  <div class="container faqwrap">
    <div>
      <header class="section__head reveal">
        <h2 id="faq-title">Resolvamos sus primeras dudas</h2>
        <p class="section__lead">Respuestas generales e informativas. No reemplazan una evaluación jurídica de su caso particular.</p>
      </header>
      <div class="faq reveal">
        ${faqs
          .map(
            (f, i) => `<details class="faq__item" name="faq">
          <summary id="faq-q${i}"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true">${icon('plus', { size: 22 })}</span></summary>
          <div class="faq__answer" role="region" aria-labelledby="faq-q${i}">${f.a.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        </details>`,
          )
          .join('')}
      </div>
      ${isClean || config.content.legalReviewDone ? '' : `<p class="slot">${pending('revisión y aprobación del abogado de estas respuestas')}</p>`}
    </div>
    <aside class="faqaside reveal" aria-label="Contacto">
      <img src="${u.asset('img/gilberto-avatar.webp')}" width="88" height="88" alt="" loading="lazy" decoding="async">
      <h3>¿Otra pregunta?</h3>
      <p>Escríbale directamente al abogado y cuéntele su situación.</p>
      ${waButton({ message: waMessages.faq, label: 'Escribir por WhatsApp', variant: 'gold' })}
    </aside>
  </div>
</section>`;
}

function articlesTeaser() {
  return `<section class="section section--mint" id="orientacion" aria-labelledby="art-title">
  <div class="container">
    <header class="section__head reveal">
      <h2 id="art-title">Conozca sus derechos</h2>
      <p class="section__lead">Una sección para comprender conceptos y procedimientos generales. Los artículos se publican después de su revisión jurídica.</p>
    </header>
    <ul class="topics">
      ${articles
        .map((a) => `<li class="topic reveal"><a href="${u.page('articulos')}${a.slug}/"><span>${esc(a.title)}</span></a></li>`)
        .join('')}
      ${comingSoon
        .map((a) => `<li class="topic topic--soon reveal"><span class="topic__title">${esc(a.title)}</span><small>Próximamente</small></li>`)
        .join('')}
    </ul>
    <p class="center reveal"><a class="btn btn--outline" href="${u.page('articulos')}"><span>Ver orientación jurídica</span>${icon('arrow', { size: 18 })}</a></p>
  </div>
</section>`;
}

function finalCta() {
  return `<section class="cta" id="contacto" aria-labelledby="cta-title">
  <img class="cta__mark" src="${u.asset('img/logo-mark-ivory.webp')}" alt="" width="360" height="275" loading="lazy" decoding="async" aria-hidden="true">
  <div class="container cta__inner reveal">
    <h2 id="cta-title">Cada situación tiene sus particularidades. Hablemos de la suya</h2>
    <p>Cuéntenos qué necesita y explore con Álzate - Abogados las posibilidades de recibir orientación jurídica para su situación.</p>
    ${waButton({ message: waMessages.cta, label: 'Contactar por WhatsApp', variant: 'light', size: 'lg' })}
    <p class="cta__small">Por favor no envíe documentos ni datos sensibles en el primer mensaje.</p>
  </div>
</section>`;
}

export function homePage() {
  return page({
    depth,
    title: 'Abogado de sucesiones, herencias y fideicomisos civiles en Bogotá | Álzate - Abogados',
    description:
      'Asesoría en fideicomisos civiles, sucesiones y herencias, y en derecho de familia (divorcios, unión marital de hecho, custodia, alimentos), desde Bogotá para todo el país. Atención personalizada.',
    path: '/',
    ld: homeJsonLd(),
    ld2: isProd && config.content.legalReviewDone ? faqJsonLd() : null,
    main: [hero(), facts(), specialtiesSection(), values(), areas(), profile(), how(), faq(), articlesTeaser(), finalCta()].join('\n'),
  });
}

export const faqJsonLd = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
    })),
  });
